export default function HeroSection() {
  return (
    <section id="home" className="relative pt-20 h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80")',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-bakery-dark/60"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-bakery-light mb-6 leading-tight drop-shadow-md">
          Il profumo del pane fresco,<br />ogni mattina dalle 6:30
        </h1>
        <p className="text-xl md:text-2xl text-bakery-light/90 mb-10 font-light max-w-2xl mx-auto">
          Tradizione, passione e ingredienti genuini. Dal nostro forno alla tua tavola, per accompagnare ogni momento della tua giornata.
        </p>
        <a 
          href="#dove-siamo" 
          className="inline-block bg-bakery-gold hover:bg-bakery-accent text-white font-semibold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
        >
          Vieni a trovarci
        </a>
      </div>
    </section>
  );
}
