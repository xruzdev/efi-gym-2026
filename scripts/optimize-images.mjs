/**
 * Genera las variantes responsive de todas las imágenes del sitio.
 *
 * - Fuente:  assets/images/**  (originales, versionados en git)
 * - Salida:  public/_img/<nombre>.<hash>-<ancho>.webp  (generado, en .gitignore)
 * - Manifest: lib/image-manifest.json → lo usa lib/image-loader.ts para armar
 *   el srcset de next/image sin servidor de optimización (static export).
 *
 * Los anchos salen de lib/image-widths.json (los mismos que usa next.config).
 * Nunca se agranda una imagen: los anchos mayores al original se reemplazan por
 * el ancho original. El hash del contenido va en el nombre, así se puede
 * cachear como `immutable`. Es incremental: si el archivo ya existe se saltea.
 */
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "assets/images");
const OUT_DIR = path.join(ROOT, "public/_img");
const MANIFEST = path.join(ROOT, "lib/image-manifest.json");
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const { deviceSizes, imageSizes } = JSON.parse(
  await fs.readFile(path.join(ROOT, "lib/image-widths.json"), "utf8"),
);
const ALL_WIDTHS = [...new Set([...imageSizes, ...deviceSizes])].sort((a, b) => a - b);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])),
  );
  return files.flat().filter((f) => EXTENSIONS.has(path.extname(f).toLowerCase()));
}

const exists = (p) => fs.access(p).then(() => true, () => false);

const sources = await walk(SRC_DIR);
const manifest = {};
const keep = new Set();
let generated = 0;

await fs.mkdir(OUT_DIR, { recursive: true });

for (const file of sources) {
  const rel = path.relative(SRC_DIR, file).split(path.sep).join("/");
  const key = `/${rel}`;
  const buffer = await fs.readFile(file);
  const hash = crypto.createHash("sha1").update(buffer).digest("hex").slice(0, 8);
  const meta = await sharp(buffer).metadata();
  const hasAlpha = Boolean(meta.hasAlpha);

  const widths = [...new Set([...ALL_WIDTHS.filter((w) => w < meta.width), meta.width])];
  const base = rel.replace(/\.[^.]+$/, "").replaceAll("/", "_");
  const outBase = `${base}.${hash}`;

  for (const w of widths) {
    const name = `${outBase}-${w}.webp`;
    const out = path.join(OUT_DIR, name);
    keep.add(name);
    if (await exists(out)) continue;
    await sharp(buffer)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp(hasAlpha ? { quality: 82, alphaQuality: 90, effort: 6 } : { quality: 74, effort: 6, smartSubsample: true })
      .toFile(out);
    generated++;
  }

  manifest[key] = { base: `/_img/${outBase}`, widths, width: meta.width, height: meta.height };
}

// Limpia variantes viejas (imágenes borradas o reemplazadas).
for (const name of await fs.readdir(OUT_DIR)) {
  if (!keep.has(name)) await fs.rm(path.join(OUT_DIR, name));
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await fs.writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");

console.log(`[images] ${sources.length} fuentes, ${keep.size} variantes (${generated} nuevas)`);
