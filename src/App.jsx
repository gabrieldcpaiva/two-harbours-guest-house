import { Breakfast } from './components/Breakfast.jsx';
import { Enquire } from './components/Enquire.jsx';
import { Footer } from './components/Footer.jsx';
import { Gallery } from './components/Gallery.jsx';
import { Hero } from './components/Hero.jsx';
import { Journey } from './components/Journey.jsx';
import { Manifesto } from './components/Manifesto.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Proof } from './components/Proof.jsx';
import { Protocol } from './components/Protocol.jsx';
import { Rooms } from './components/Rooms.jsx';

function Noise() {
  return (
    <div className="noise" aria-hidden="true">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" focusable="false">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Noise />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Proof />
        <Gallery />
        <Manifesto />
        <Protocol />
        <Breakfast />
        <Rooms />
        <Journey />
        <Enquire />
      </main>
      <Footer />
    </>
  );
}
