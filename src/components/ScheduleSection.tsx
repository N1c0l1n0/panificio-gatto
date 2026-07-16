import { useState } from 'react';
import { CalendarDays, ChefHat, CheckCircle2 } from 'lucide-react';

type DailySchedule = {
  day: string;
  items: React.ReactNode[];
};

const schedule: DailySchedule[] = [
  {
    day: 'Lunedì',
    items: [
      <>Pagnotte di grano tenero a <strong>LIEVITAZIONE NATURALE</strong></>,
      <>Pagnotte, filoni e ciambelle di <strong>SEGALE</strong></>,
      <><strong>GRISSINI</strong> lisci o farciti</>,
      <><strong>PURPLE BREADY</strong> (lievito madre)</>,
    ]
  },
  {
    day: 'Martedì',
    items: [
      <>Pagnotte multicereali <strong>PROKORN</strong></>,
      <><strong>SALUS</strong> (lievito madre)</>,
      <>Bocconcini di <strong>SOIA</strong> e in cassetta</>,
      <>Panini di <strong>KAMUT</strong> a lievitazione naturale</>,
      <>Panini di <strong>GRANO SARACENO</strong></>,
      <><strong>FOCACCIA</strong> di <strong>KAMUT</strong></>,
      <><strong>CANAPINA</strong> a lievitazione naturale</>,
      <>Pagnotte di grano <strong>ARSO</strong> a lievitazione naturale</>,
    ]
  },
  {
    day: 'Mercoledì',
    items: [
      <>Pagnotte di grano tenero a <strong>LIEVITAZIONE NATURALE</strong></>,
      <>Pagnotte, filoni, ciambelle di <strong>SEGALE</strong></>,
      <><strong>CIAMBELLA RUSTICA</strong> multicereali</>,
      <>Filoni <strong>SOLEGRAIN</strong> con segale integrale</>,
      <><strong>PURPLE BREADY</strong> (lievito madre)</>,
      <>Bocconcini di <strong>PANE</strong> con <strong>OLIVE</strong></>,
      <>Bocconcini <strong>SEMI DOLCI</strong> al <strong>LATTE</strong></>,
      <>Pane e focacce con <strong>UVETTA</strong></>,
      <>Pane multicereali <strong>MOREO</strong></>,
    ]
  },
  {
    day: 'Giovedì',
    items: [
      <>Filoncini di <strong>PANE SENZA SALE</strong></>,
      <>Panini <strong>SPIGA</strong> multicereali</>,
      <>Pagnotte <strong>LOW CARB</strong> multicereali</>,
      <>Pagnotte di <strong>FARRO BIO</strong></>,
      <><strong>SEGALE SENZA SALE</strong> a lievitazione naturale</>,
      <>Bocconcini di <strong>SOIA</strong> e in cassetta</>,
      <>Pane e focacce con <strong>UVETTA</strong></>,
      <>Bocconcini <strong>SEMI DOLCI</strong> al <strong>LATTE</strong></>,
      <><strong>FIORE</strong> ai cereali, peperoni e zucchine</>,
      <><strong>SPIRULINO (LIEVITO MADRE)</strong></>,
    ]
  },
  {
    day: 'Venerdì',
    items: [
      <>Panini di riso <strong>VENERE</strong> (lievito madre)</>,
      <>Filoni <strong>NERETTA</strong> multicereali</>,
      <><strong>CEREALI</strong> in cassetta multicereali</>,
      <>Panini <strong>MULTYGRAINFIT</strong> multicereali</>,
      <>Filoncini <strong>TUMMINIA</strong> di grano duro integrale con o senza semi</>,
      <><strong>FARRO MONOCOCCO</strong> (lievito madre)</>,
      <>Bocconcini di <strong>PANE</strong> con <strong>OLIVE</strong></>,
      <>Pane e focacce con <strong>UVETTA</strong></>,
      <>Bocconcini <strong>SEMI DOLCI</strong> al <strong>LATTE</strong></>,
      <><strong>FIORE</strong> ai cereali con peperoni e zucchine</>,
    ]
  },
  {
    day: 'Sabato',
    items: [
      <>Filoni <strong>NERETTA</strong> multicereali</>,
      <><strong>SALUS</strong> (lievito madre)</>,
      <>Filoncini di <strong>PANE SENZA SALE</strong></>,
      <>Panini <strong>RUSTICO</strong> multicereali</>,
      <>Pagnotte <strong>PURA VITA LADY</strong></>,
      <>Bocconcini <strong>CURCUMA</strong></>,
      <>Pagnotte con semi di <strong>ZUCCA</strong></>,
      <><strong>CEREALI</strong> in cassetta multicereali</>,
      <>Bocconcini di <strong>CHIA e QUINOA</strong> a lievitazione naturale</>,
      <>Filoni <strong>VITASAN</strong> (integrale ideale per diabetici)</>,
      <>Treccione <strong>TRIS</strong></>,
      <>Filoni <strong>DOMENICA</strong> e <strong>CIAMBELLA</strong> all'olio</>,
      <><strong>PICIURLO</strong> e <strong>TRECCIA</strong> di pasta dura</>,
      <><strong>FILONE QUADRO</strong> di grano tenero</>,
      <>Pagnotta di <strong>GRANO DURO</strong> a lievitazione naturale</>,
      <>Filoncini di <strong>PANE FICHI, NOCI E UVETTA</strong></>,
      <>Bocconcini <strong>SEMI DOLCI</strong> al <strong>LATTE</strong></>,
      <><strong>FIORE</strong> ai cereali, peperoni e zucchine</>,
      <><strong>PIZZETTE</strong> e <strong>SALATINI</strong> di pasta sfoglia (anche al venerdì e su ordinazione tutti i giorni)</>,
    ]
  }
];

const everydayItems: React.ReactNode[] = [
  <><strong>PANE ALL'OLIO</strong> in vari formati</>,
  <><strong>ROSETTE</strong>, <strong>TARTARUGHE</strong> e <strong>PAPERE</strong></>,
  <><strong>FRANCESE</strong>, <strong>FRANCESINO</strong> morbido, <strong>BOCCONCINI</strong>, <strong>FILONE</strong> e <strong>PARIGINE</strong></>,
  <><strong>CIABATTE</strong> al malto e <strong>PUFFO</strong></>,
  <><strong>STIRATI</strong> al malto (tranne al lunedì)</>,
  <><strong>CIABATTE INTEGRALI</strong> e panini</>,
  <><strong>ARABI</strong> all'olio e <strong>ARABI</strong> all'<strong>AVENA</strong></>,
  <>Pagnotta <strong>PUGLIESE</strong> e <strong>RUSTICHELLE</strong></>,
  <>Filone di <strong>GRANO DURO</strong></>,
  <><strong>BAGUETTE</strong> di grano duro (tranne al lunedì)</>,
  <><strong>MANTOVANE</strong> e <strong>FERRARESE</strong></>,
  <><strong>MAGGIOLINI</strong></>,
  <><strong>CORONA</strong> all'olio, <strong>QUADRO</strong></>,
  <>Panini <strong>SICILIANI</strong> di grano duro</>,
  <>Panini <strong>HAMBURGER</strong> con semi misti o solo sesamo</>,
  <><strong>PANCARRE'</strong></>,
  <><strong>PANBRIOCHE</strong> e <strong>BAR</strong> semi dolci (tranne al lunedì)</>,
  <><strong>RE SEMOLA</strong> di grano duro con olio (tranne al lunedì)</>,
  <>Pane <strong>BRUCO</strong> con sopra l'emmenthal</>,
  <><strong>CROCCANTINA</strong> integrale</>,
  <><strong>FOCACCIA</strong> e <strong>PIZZA</strong> in teglia e mignon</>,
  <><strong>SACCOTTINI</strong> ai <strong>WUSTEL</strong> e <strong>OLIVE</strong> e <strong>BOCCONCINI</strong> assortiti, <strong>GRECO</strong>, <strong>PICCANTINE</strong>, <strong>PANPIZZA</strong>, <strong>PANZOLA</strong> e <strong>PANVERDURA</strong></>,
  <>Molte varietà di <strong>BRIOCHES</strong> anche <strong>SENZA LATTOSIO</strong> e <strong>VEGANE</strong></>
];

export default function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<string>('Lunedì');

  const activeItems = schedule.find(s => s.day === activeDay)?.items || [];

  return (
    <section id="calendario" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-bakery-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-bakery-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-bakery-light rounded-full mb-4 shadow-sm border border-bakery-gold/20 text-bakery-accent">
            <CalendarDays className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-bakery-dark mb-4">Il Calendario del Pane</h2>
          <div className="w-24 h-1 bg-bakery-gold mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-bakery-dark/70 max-w-2xl mx-auto font-medium">
            Ogni giorno sforniamo specialità diverse. Scopri cosa troverai in negozio durante la settimana.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Daily Schedule - Left Side (8 cols) */}
          <div className="lg:col-span-7 bg-bakery-light p-6 md:p-8 rounded-3xl shadow-sm border border-bakery-gold/20">
            <h3 className="text-2xl font-serif font-bold text-bakery-dark mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-bakery-gold/20 text-bakery-accent flex items-center justify-center text-sm">📅</span>
              Specialità del Giorno
            </h3>
            
            {/* Days Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {schedule.map((s) => (
                <button
                  key={s.day}
                  onClick={() => setActiveDay(s.day)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeDay === s.day
                      ? 'bg-bakery-accent text-white shadow-md scale-105'
                      : 'bg-white text-bakery-dark border border-bakery-gold/30 hover:border-bakery-accent hover:text-bakery-accent'
                  }`}
                >
                  {s.day}
                </button>
              ))}
            </div>

            {/* Active Day Content */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-bakery-gold/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h4 className="text-xl font-bold text-bakery-accent mb-4 border-b border-bakery-gold/20 pb-2">
                Sforniamo il {activeDay}
              </h4>
              <ul className="space-y-3">
                {activeItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-bakery-gold shrink-0 mt-0.5" />
                    <span className="text-bakery-dark/80 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Everyday Items - Right Side (4 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-bakery-dark text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-bakery-gold/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3 relative z-10 text-bakery-gold">
                <ChefHat className="w-7 h-7" />
                Tutti i Giorni
              </h3>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-bakery-gold/30 scrollbar-track-transparent relative z-10">
                {everydayItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-bakery-gold shrink-0 mt-2"></div>
                    <span className="text-white/90 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
