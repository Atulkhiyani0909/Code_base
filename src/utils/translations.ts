import { Language } from '../types';

export const translations = {
  en: {
    title: 'File Upload & AI Assistant',
    upload: {
      title: 'Upload Files',
      dragDrop: 'Drag and drop files here, or click to select',
      selectFiles: 'Select Files',
      uploading: 'Uploading...',
      completed: 'Upload completed',
      error: 'Upload failed',
    },
    chat: {
      title: 'AI Assistant',
      placeholder: 'Ask me anything about your files...',
      send: 'Send',
      typing: 'AI is typing...',
    },
    common: {
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      language: 'Language',
    },
  },
  es: {
    title: 'Subida de Archivos y Asistente IA',
    upload: {
      title: 'Subir Archivos',
      dragDrop: 'Arrastra y suelta archivos aquí, o haz clic para seleccionar',
      selectFiles: 'Seleccionar Archivos',
      uploading: 'Subiendo...',
      completed: 'Subida completada',
      error: 'Error en la subida',
    },
    chat: {
      title: 'Asistente IA',
      placeholder: 'Pregúntame cualquier cosa sobre tus archivos...',
      send: 'Enviar',
      typing: 'La IA está escribiendo...',
    },
    common: {
      darkMode: 'Modo Oscuro',
      lightMode: 'Modo Claro',
      language: 'Idioma',
    },
  },
  fr: {
    title: 'Téléchargement de Fichiers et Assistant IA',
    upload: {
      title: 'Télécharger des Fichiers',
      dragDrop: 'Glissez et déposez les fichiers ici, ou cliquez pour sélectionner',
      selectFiles: 'Sélectionner les Fichiers',
      uploading: 'Téléchargement...',
      completed: 'Téléchargement terminé',
      error: 'Échec du téléchargement',
    },
    chat: {
      title: 'Assistant IA',
      placeholder: 'Demandez-moi tout sur vos fichiers...',
      send: 'Envoyer',
      typing: 'L\'IA tape...',
    },
    common: {
      darkMode: 'Mode Sombre',
      lightMode: 'Mode Clair',
      language: 'Langue',
    },
  },
  de: {
    title: 'Datei-Upload und KI-Assistent',
    upload: {
      title: 'Dateien Hochladen',
      dragDrop: 'Dateien hier hineinziehen oder klicken zum Auswählen',
      selectFiles: 'Dateien Auswählen',
      uploading: 'Hochladen...',
      completed: 'Upload abgeschlossen',
      error: 'Upload fehlgeschlagen',
    },
    chat: {
      title: 'KI-Assistent',
      placeholder: 'Fragen Sie mich alles über Ihre Dateien...',
      send: 'Senden',
      typing: 'KI tippt...',
    },
    common: {
      darkMode: 'Dunkler Modus',
      lightMode: 'Heller Modus',
      language: 'Sprache',
    },
  },
};

export const getTranslation = (language: Language, key: string) => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};