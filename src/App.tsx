import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CatalogSection from './components/CatalogSection';
import ScheduleSection from './components/ScheduleSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-bakery-gold selection:text-white">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <CatalogSection />
        <ScheduleSection />
        <ContactSection />
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}

export default App;
