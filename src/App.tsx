import { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ChatBot from './components/ChatBot';

function App() {
  const [showChatBot, setShowChatBot] = useState(false);

  const handleInteractWithDocs = () => {
    setShowChatBot(true);
  };

  const handleBackToUpload = () => {
    setShowChatBot(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />
      
      <main className="px-4 sm:px-6 lg:px-8 py-12">
        {!showChatBot ? (
          <FileUpload onInteractWithDocs={handleInteractWithDocs} />
        ) : (
          <ChatBot onBack={handleBackToUpload} />
        )}
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-300 dark:bg-emerald-800 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
}

export default App;