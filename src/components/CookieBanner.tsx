import { useState, useEffect } from 'react';
import { Cookie, X, FileText } from 'lucide-react';
import { useCookieConsent } from '../hooks/useCookieConsent';

type ModalView = 'none' | 'policy';

export default function CookieBanner() {
  const { preferences, accept } = useCookieConsent();
  const [modalView, setModalView] = useState<ModalView>('none');

  // Open policy from external trigger (like footer)
  useEffect(() => {
    const handleOpen = () => {
      setModalView('policy');
    };
    window.addEventListener('openCookiePreferences', handleOpen);
    return () => window.removeEventListener('openCookiePreferences', handleOpen);
  }, []);

  const handleAccept = () => {
    accept();
    setModalView('none');
  };

  // If no preferences are set and no modal is open, show the bottom banner
  const showBanner = preferences === null && modalView === 'none';

  return (
    <>
      {/* INITIAL BANNER */}
      {showBanner && (
        <div className="fixed bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-auto sm:max-w-[420px] bg-white/85 backdrop-blur-xl text-bakery-dark p-5 sm:p-6 z-50 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-white/50 rounded-3xl animate-in slide-in-from-bottom-8 fade-in duration-500 ease-out">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-bakery-gold/30 to-bakery-gold/5 p-3 rounded-2xl shrink-0 shadow-inner border border-white/60">
              <Cookie className="text-bakery-accent w-7 h-7" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="font-serif font-bold text-xl text-bakery-dark mb-1.5 tracking-tight">I nostri Cookie</h3>
              <p className="text-sm text-bakery-dark/70 leading-relaxed mb-5">
                Utilizziamo esclusivamente cookie tecnici strettamente necessari al funzionamento del sito. Zero tracciamenti o profilazione marketing.
                <button onClick={() => setModalView('policy')} className="block mt-1 text-bakery-accent font-medium hover:underline decoration-bakery-gold underline-offset-4 transition-all">
                  Leggi l'informativa
                </button>
              </p>
              <button
                onClick={handleAccept}
                className="w-full py-3 px-4 bg-bakery-dark text-white hover:bg-black hover:shadow-lg transition-all active:scale-[0.98] font-medium rounded-xl text-sm flex items-center justify-center gap-2"
              >
                Ho capito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY FOR MODAL */}
      {modalView === 'policy' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setModalView('none')}></div>
          
          <div className="relative bg-[#faf8f5] text-bakery-dark w-full max-w-3xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-400 ease-out border border-white/60">
            
            {/* Header */}
            <div className="bg-white px-6 py-5 sm:px-8 sm:py-6 border-b border-bakery-gold/10 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="bg-bakery-gold/10 p-2.5 rounded-xl">
                  <FileText className="w-6 h-6 text-bakery-accent" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-bakery-dark tracking-tight">Informativa sui Cookie</h2>
                  <p className="text-sm text-bakery-dark/50 font-medium">Trasparenza e Privacy</p>
                </div>
              </div>
              <button 
                onClick={() => setModalView('none')} 
                className="p-2 text-bakery-dark/40 hover:text-bakery-dark hover:bg-bakery-dark/5 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-white/50 to-transparent">
              
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-bakery-gold/10 flex flex-col gap-5">
                
                <p className="text-bakery-dark/80 text-sm leading-relaxed">
                  <strong className="text-bakery-accent text-base block mb-1">1. Cosa sono i cookie?</strong>
                  I cookie sono piccoli file di testo che i siti salvano sul tuo dispositivo per migliorarne il funzionamento e ricordare le tue scelte.
                </p>
                
                <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 flex items-start gap-3">
                  <Cookie className="w-6 h-6 text-green-700 shrink-0 mt-0.5" />
                  <p className="text-green-800/90 text-sm leading-relaxed">
                    <strong className="block text-base mb-0.5">Solo Cookie Essenziali</strong>
                    Questo sito utilizza <strong>esclusivamente</strong> cookie tecnici necessari al corretto funzionamento della piattaforma. Non utilizziamo alcun tipo di strumento di tracciamento, profilazione o statistica di terze parti.
                  </p>
                </div>
                
                <div className="text-bakery-dark/70 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <strong className="text-bakery-accent block mb-2">2. Dettagli Legali</strong>
                  <ul className="space-y-1">
                    <li><strong>Titolare:</strong> Panificio Gatto, Via Marsala, 15, Gallarate (VA). P.IVA 01545680124.</li>
                    <li><strong>Base giuridica:</strong> Legittimo interesse (art. 6, lett. f, GDPR).</li>
                  </ul>
                </div>
                
              </div>
              
            </div>
            
            {/* Footer */}
            <div className="px-4 sm:px-6 pt-4 pb-6 sm:pt-5 sm:pb-7 bg-white border-t border-bakery-gold/10 flex justify-end">
              <button
                onClick={() => setModalView('none')}
                className="px-8 py-2.5 bg-bakery-dark text-white hover:bg-black transition-all active:scale-95 font-medium rounded-xl text-sm shadow-md"
              >
                Chiudi informativa
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
