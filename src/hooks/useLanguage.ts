import { useState, useEffect } from 'react';
import { Language } from '../types';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['en', 'es', 'fr', 'de'].includes(saved)) {
      return saved;
    }
    
    // Detect browser language
    const browserLang = navigator.language.slice(0, 2);
    return ['en', 'es', 'fr', 'de'].includes(browserLang) ? browserLang as Language : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return { language, setLanguage };
};