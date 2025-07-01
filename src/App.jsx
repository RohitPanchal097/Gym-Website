import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Classes from './components/Classes';
import Trainers from './components/Trainers';
import Gallery from './components/Gallery';
import Facilities from './components/Facilities';
import Membership from './components/Membership';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import useLenis from './useLenis';

function App() {
  useLenis();
  return (
    <div className="bg-gradient-to-br from-[#0f2027] to-[#2c5364] min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Classes />
      <Trainers />
      <Gallery />
      <Facilities />
      <Membership />
      <FAQ />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
