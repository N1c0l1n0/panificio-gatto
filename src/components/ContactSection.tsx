import { MapPin, Phone, Clock, Euro } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="dove-siamo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-bakery-dark mb-4">Vieni a Trovarci</h2>
          <div className="w-24 h-1 bg-bakery-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info Card */}
          <div className="bg-bakery-light p-8 rounded-2xl shadow-sm border border-bakery-gold/20 space-y-8">
            
            <div className="flex items-start gap-4">
              <div className="bg-bakery-gold/20 p-3 rounded-full text-bakery-accent shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-bakery-dark mb-1">Indirizzo</h3>
                <p className="text-bakery-dark/80">Via Marsala, 15<br />21013 Gallarate (VA)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-bakery-gold/20 p-3 rounded-full text-bakery-accent shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif font-bold text-xl text-bakery-dark mb-3">Orari di Apertura</h3>
                <ul className="text-bakery-dark/80 space-y-2 text-sm sm:text-base">
                  <li className="flex justify-between border-b border-bakery-gold/10 pb-1">
                    <span className="font-medium">Lunedì e Sabato</span>
                    <span>06:30 - 13:00</span>
                  </li>
                  <li className="flex justify-between border-b border-bakery-gold/10 pb-1">
                    <span className="font-medium">Martedì - Venerdì</span>
                    <span className="text-right">06:30 - 13:00<br/>16:00 - 19:00</span>
                  </li>
                  <li className="flex justify-between pb-1 text-bakery-accent/80">
                    <span className="font-medium">Domenica</span>
                    <span>Chiuso</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-bakery-gold/20 p-3 rounded-full text-bakery-accent shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-bakery-dark mb-1">Telefono</h3>
                <a href="tel:+390331792056" className="text-bakery-dark/80 hover:text-bakery-accent transition-colors">
                  0331 792056
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-bakery-gold/20 p-3 rounded-full text-bakery-accent shrink-0">
                <Euro className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-bakery-dark mb-1">Prezzi</h3>
                <p className="text-bakery-dark/80">Accessibile, per tutti i giorni (1-10 € a persona)</p>
              </div>
            </div>

          </div>

          {/* Map Placeholder */}
          <div className="h-full min-h-[400px] bg-gray-200 rounded-2xl overflow-hidden relative group">
            {/* Placeholder for iframe Google Maps */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2787.973950478051!2d8.790938676646542!3d45.67137837107775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47868dc3b999c15d%3A0xc3174abfa3ecba6a!2sVia%20Marsala%2C%2015%2C%2021013%20Gallarate%20VA!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Mappa Panificio Gatto"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
