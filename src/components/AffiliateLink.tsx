import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AffiliateLinkProps {
  url: string;
  partnerName: string;
  buttonText: string;
}

export const AffiliateLink: React.FC<AffiliateLinkProps> = ({ url, partnerName, buttonText }) => {
  return (
    <div className="flex flex-col items-start space-y-1.5 mt-4">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
      >
        {buttonText}
        <ExternalLink className="w-4 h-4" />
      </a>
      <span className="text-sm text-slate-500 italic">
        Partner: {partnerName} (We may earn a commission from bookings via this link)
      </span>
    </div>
  );
};
