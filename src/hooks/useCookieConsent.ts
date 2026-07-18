import { useState } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  timestamp?: string;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
};

const getInitialPreferences = (): CookiePreferences | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('cookieConsentData');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Error parsing cookie consent", e);
      }
    }
  }
  return null;
};

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(getInitialPreferences);

  const accept = () => {
    const toSave = { ...DEFAULT_PREFERENCES, timestamp: new Date().toISOString() };
    setPreferences(toSave);
    localStorage.setItem('cookieConsentData', JSON.stringify(toSave));
    
    // Trigger a custom event so other scripts can react immediately
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: toSave }));
  };

  return { preferences, accept };
}
