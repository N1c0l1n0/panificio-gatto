import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-bakery-light/90 backdrop-blur-md border-b border-bakery-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <img src="/images/LogoPanificioGatto.jpg" alt="Logo Panificio Gatto" className="h-16 w-auto rounded-xl object-cover" />
            <span className="font-serif text-2xl font-bold text-bakery-dark">Panificio Gatto</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-bakery-dark hover:text-bakery-accent transition-colors font-medium">Home</a>
            <a href="#specialita" className="text-bakery-dark hover:text-bakery-accent transition-colors font-medium">Specialità</a>
            <a href="#calendario" className="text-bakery-dark hover:text-bakery-accent transition-colors font-medium">Calendario</a>
            <a href="#dove-siamo" className="text-bakery-dark hover:text-bakery-accent transition-colors font-medium">Dove Siamo</a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-bakery-dark">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-bakery-light border-b border-bakery-gold/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-bakery-dark hover:text-bakery-accent font-medium">Home</a>
            <a href="#specialita" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-bakery-dark hover:text-bakery-accent font-medium">Specialità</a>
            <a href="#calendario" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-bakery-dark hover:text-bakery-accent font-medium">Calendario</a>
            <a href="#dove-siamo" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-bakery-dark hover:text-bakery-accent font-medium">Dove Siamo</a>
          </div>
        </div>
      )}
    </nav>
  );
}
