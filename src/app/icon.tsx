import { ImageResponse } from 'next/og';

// Configuración del runtime
export const runtime = 'edge';

// Tamaño del icono
export const size = {
  width: 32,
  height: 32,
};

// Tipo de contenido
export const contentType = 'image/png';

// Generar el favicon
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(135deg, #A78BFA 0%, #EC4899 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20%',
          fontWeight: 'bold',
        }}
      >
        🛡️
      </div>
    ),
    {
      ...size,
    }
  );
}