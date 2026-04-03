import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const revalidate = 3600; // Cache for 1 hour

export default async function appleIcon() {
  try {
    // Read logo.jpeg from public folder
    const logoPath = path.join(process.cwd(), 'public', 'logo.jpeg');
    const logoData = fs.readFileSync(logoPath);
    const base64Logo = logoData.toString('base64');

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            background: '#ffffff',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url('data:image/jpeg;base64,${base64Logo}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: '45px',
          }}
        >
        </div>
      ),
      {
        size: [180, 180],
        type: 'image/png',
      }
    );
  } catch (error) {
    console.error('Apple icon generation error:', error);
    // Fallback to simple response if logo doesn't exist
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 60,
            background: 'linear-gradient(135deg, #0B3D91, #1a5eb8)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            fontFamily: 'serif',
            borderRadius: '45px',
          }}
        >
          KR
        </div>
      ),
      {
        size: [180, 180],
        type: 'image/png',
      }
    );
  }
}
