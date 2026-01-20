import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between', // Spacing out top, center, bottom
      minHeight: '100vh',
      padding: '2rem 1rem',
      position: 'relative'
    }}>

      {/* Top Section: Title */}
      <header style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h1 className="home-title" style={{
          fontSize: '2.5rem',
          fontWeight: '500',
          fontFamily: 'var(--font-heading)',
          color: 'var(--foreground)',
          textShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          Send your letter anonymously!
        </h1>
      </header>

      {/* Center Section: Image */}
      <main className="home-image-container" style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '300px',
        transition: 'max-width 0.3s ease' // Smooth transition on resize
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/3', // Approximate aspect ratio of the envelope
        }}>
          <Link href="/write" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Image
              src="/envelope.png"
              alt="Hand drawn envelope"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>
        </div>
      </main>

      {/* Bottom Section: Button */}
      <footer style={{ marginBottom: '3rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Link href="/write" className="btn-primary home-button">
          Write
        </Link>
      </footer>

    </div>
  );
}
