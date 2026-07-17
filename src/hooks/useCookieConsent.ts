import { useState, useEffect } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp?: string;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cookieConsentData');
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing cookie consent", e);
      }
    }
  }, []);

  const savePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const toSave = { ...DEFAULT_PREFERENCES, ...newPreferences, timestamp: new Date().toISOString() };
    setPreferences(toSave);
    localStorage.setItem('cookieConsentData', JSON.stringify(toSave));
    
    // Trigger a custom event so other scripts can react immediately
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: toSave }));
  };

  const acceptAll = () => savePreferences({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => savePreferences({ necessary: true, analytics: false, marketing: false });

  return { preferences, savePreferences, acceptAll, rejectAll };
}
