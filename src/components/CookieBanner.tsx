import { useState, useEffect } from 'react';
import { Cookie, X, Check, Info, Settings, FileText } from 'lucide-react';
import { useCookieConsent, type CookiePreferences } from '../hooks/useCookieConsent';

type ModalView = 'none' | 'preferences' | 'policy';

export default function CookieBanner() {
  const { preferences, savePreferences, acceptAll, rejectAll } = useCookieConsent();
  const [modalView, setModalView] = useState<ModalView>('none');
  const [localPref, setLocalPref] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Open preferences from external trigger (like footer)
  useEffect(() => {
    const handleOpen = () => {
      setModalView('preferences');
    };
    window.addEventListener('openCookiePreferences', handleOpen);
    return () => window.removeEventListener('openCookiePreferences', handleOpen);
  }, []);

  // Sync local state when preferences are loaded
  useEffect(() => {
    if (preferences) {
      setLocalPref(preferences);
    }
  }, [preferences]);

  const handleSavePreferences = () => {
    savePreferences(localPref);
    setModalView('none');
  };

  const handleAcceptAll = () => {
    acceptAll();
    setModalView('none');
  };

  const handleRejectAll = () => {
    rejectAll();
    setModalView('none');
  };

  const toggleToggle = (key: 'analytics' | 'marketing') => {
    setLocalPref(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // If no preferences are set and no modal is open, show the bottom banner
  const showBanner = preferences === null && modalView === 'none';

  return (
    <>
      {/* INITIAL BANNER */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-bakery-dark text-white p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] border-t border-bakery-gold/20">
          <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <Cookie className="text-bakery-gold shrink-0 w-8 h-8 mt-1" />
              <div>
                <h3 className="font-serif text-xl text-bakery-gold mb-1">La tua privacy è importante per noi</h3>
                <p className="text-sm text-gray-300 max-w-3xl">
                  Utilizziamo i cookie per offrirti la migliore esperienza sul nostro sito, per analizzare il traffico e personalizzare i contenuti. 
                  Scegliendo "Accetta tutti" acconsenti all'uso di tutti i cookie. Puoi anche personalizzare le tue preferenze o rifiutare i cookie non essenziali.
                  Consulta la nostra <button onClick={() => setModalView('policy')} className="text-bakery-gold underline hover:text-white transition-colors">Cookie Policy</button> per maggiori dettagli.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
              <button
                onClick={() => setModalView('preferences')}
                className="px-4 py-2 border-b border-transparent text-gray-300 hover:text-white hover:border-white transition-colors text-sm"
              >
                Personalizza
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 border border-gray-500 text-gray-300 hover:text-white hover:border-white transition-colors rounded-sm text-sm"
              >
                Solo essenziali
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-5 py-2 bg-bakery-gold text-bakery-dark hover:bg-yellow-500 transition-colors font-semibold rounded-sm text-sm"
              >
                Accetta tutti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY FOR MODALS */}
      {modalView !== 'none' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          
          {/* PREFERENCES MODAL */}
          {modalView === 'preferences' && (
            <div className="bg-bakery-light text-bakery-dark w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
                  <Settings className="w-6 h-6 text-bakery-gold" />
                  Impostazioni Cookie
                </h2>
                <button onClick={() => setModalView(preferences ? 'none' : 'none')} className="text-gray-500 hover:text-bakery-dark transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-5 overflow-y-auto flex-grow space-y-6">
                <p className="text-sm text-gray-600">
                  Quando visiti un sito web, questo può memorizzare o recuperare informazioni sul tuo browser, principalmente sotto forma di cookie. 
                  Queste informazioni potrebbero riguardare te, le tue preferenze o il tuo dispositivo.
                </p>

                {/* Necessary Cookies */}
                <div className="border border-gray-200 rounded-md p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      Strettamente necessari
                    </h4>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sempre attivi</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Questi cookie sono necessari per il funzionamento del sito e non possono essere disattivati. Di solito vengono impostati solo in risposta ad azioni da te effettuate che costituiscono una richiesta di servizi, come l'impostazione delle preferenze di privacy o il login.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 rounded-md p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      Statistiche e Analisi
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={localPref.analytics} onChange={() => toggleToggle('analytics')} />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bakery-gold"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600">
                    Permettono di contare le visite e le fonti di traffico, in modo da poter misurare e migliorare le prestazioni del nostro sito. Ci aiutano a sapere quali sono le pagine più e meno popolari e a vedere come i visitatori si muovono nel sito.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 rounded-md p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Info className="w-5 h-5 text-purple-600" />
                      Marketing e Profilazione
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={localPref.marketing} onChange={() => toggleToggle('marketing')} />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bakery-gold"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600">
                    Questi cookie possono essere impostati attraverso il nostro sito dai nostri partner pubblicitari. Possono essere utilizzati da queste aziende per costruire un profilo dei tuoi interessi e mostrarti annunci pertinenti su altri siti.
                  </p>
                </div>
                
                <div className="pt-2 text-center">
                  <button onClick={() => setModalView('policy')} className="text-bakery-gold text-sm underline hover:text-bakery-ochre">
                    Leggi la Cookie Policy completa
                  </button>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-wrap justify-end gap-3">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors rounded-sm text-sm"
                >
                  Rifiuta tutti
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 bg-bakery-dark text-white hover:bg-black transition-colors rounded-sm text-sm"
                >
                  Salva Preferenze
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-bakery-gold text-bakery-dark hover:bg-yellow-500 font-medium transition-colors rounded-sm text-sm"
                >
                  Accetta tutti
                </button>
              </div>
            </div>
          )}

          {/* POLICY MODAL */}
          {modalView === 'policy' && (
            <div className="bg-bakery-light text-bakery-dark w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
                  <FileText className="w-6 h-6 text-bakery-gold" />
                  Informativa sui Cookie (Cookie Policy)
                </h2>
                <button onClick={() => setModalView('preferences')} className="text-gray-500 hover:text-bakery-dark transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-grow prose prose-sm max-w-none text-gray-700">
                <h3>1. Cosa sono i cookie?</h3>
                <p>I cookie sono stringhe di testo di piccole dimensioni che i siti visitati dall'utente inviano al suo terminale (solitamente al browser), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente.</p>
                
                <h3>2. Tipologie di cookie utilizzati da questo sito</h3>
                <p><strong>Cookie strettamente necessari:</strong> Questi cookie sono essenziali per il corretto funzionamento del nostro sito web e per consentirti di navigare e utilizzarne le funzionalità. Ad esempio, memorizzano le tue preferenze sulla privacy.</p>
                <p><strong>Cookie analitici (Statistiche):</strong> Utilizziamo questi cookie, spesso di terze parti (es. Google Analytics in forma anonimizzata), per raccogliere informazioni sull'uso del sito, sapere quali sono le pagine più visitate e migliorare costantemente i nostri servizi.</p>
                <p><strong>Cookie di profilazione (Marketing):</strong> Questi cookie sono volti a creare profili relativi all'utente e vengono utilizzati al fine di inviare messaggi pubblicitari in linea con le preferenze manifestate dallo stesso nell'ambito della navigazione in rete. (Attualmente non ne facciamo un uso attivo, ma predisponiamo la struttura per eventuali futuri pixel social).</p>

                <h3>3. Base giuridica del trattamento</h3>
                <p>Il trattamento dei dati per i cookie tecnici si basa sul legittimo interesse del Titolare (art. 6, lett. f, GDPR) a fornire un sito funzionante. Il trattamento tramite cookie analitici e di marketing si basa esclusivamente sul consenso esplicito dell'utente (art. 6, lett. a, GDPR).</p>

                <h3>4. Titolare del trattamento</h3>
                <p>Panificio Gatto, Via Marsala, 15, Gallarate (VA). P.IVA 01545680124.</p>

                <h3>5. Come gestire le preferenze</h3>
                <p>Puoi gestire o revocare il tuo consenso in qualsiasi momento cliccando sul link "Impostazioni Cookie" presente nel footer (fondo pagina) di questo sito. In alternativa, puoi configurare le impostazioni del tuo browser per bloccare o cancellare i cookie.</p>
                
                <p className="mt-8 text-xs text-gray-500">Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
              </div>
              
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                <button
                  onClick={() => setModalView(preferences ? 'none' : 'preferences')}
                  className="px-5 py-2 bg-bakery-dark text-white hover:bg-black transition-colors rounded-sm text-sm"
                >
                  Torna indietro
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}
