import React from 'react';
import { X } from 'lucide-react';

export const PrivacyPolicy: React.FC<{ isOpen: boolean; onClose: () => void; currentLang: string }> = ({ isOpen, onClose, currentLang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">
            {currentLang === 'en' ? "Privacy Policy & Affiliate Disclosure" : "Politique de confidentialité et divulgation d'affiliation"}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto text-base text-slate-700 space-y-4">
          <p>
            <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mt-4">1. Information We Collect</h3>
          <p>
            We collect standard analytics information (such as browser type, referring pages, and IP addresses) to improve our service. 
            Google Analytics and Google AdSense may use cookies to serve ads based on your prior visits to this or other websites.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mt-4">2. Advertising & Cookies (Google AdSense)</h3>
          <p>
            This site uses Google AdSense to display targeted advertisements. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. 
            You may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" className="text-blue-600 underline">Ads Settings</a>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mt-4">3. Affiliate Links Disclosure</h3>
          <p>
            Some links on this website (such as those pointing to Booking.com, Expedia, or Skyscanner) may be affiliate links. 
            This means that if you click on the link and make a purchase or booking, we may receive a small commission at no extra cost to you. 
            These commissions help support the maintenance of this informational portal.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mt-4">4. Chat Assistant Data</h3>
          <p>
            The AI Chat Assistant is powered by Google Gemini. We do not store personally identifiable information from chat transcripts, but we recommend avoiding sharing sensitive personal data in the chat interface. All processing is proxied securely through our backend servers.
          </p>

          <div className="mt-8 pt-4 border-t border-slate-100 text-center">
            <button onClick={onClose} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors">
              {currentLang === 'en' ? "Close" : "Fermer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
