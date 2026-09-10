/**
 * Inyecta datos estructurados JSON-LD. Se renderiza en el servidor, por lo que
 * el markup queda en el HTML inicial que lee el crawler.
 */
export const JsonLd = ({ data }: { data: object | object[] }) => (
  <script
    type="application/ld+json"
    // El contenido es estático y generado por nosotros (no input de usuario).
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\u003c"),
    }}
  />
);
