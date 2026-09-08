import React from 'react';

interface AdSlotProps {
  format: 'banner' | 'leaderboard' | 'rectangle'; // 320x50, 728x90, 300x250
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ format, className = '' }) => {
  const getDimensions = () => {
    switch (format) {
      case 'leaderboard': return 'w-full max-w-[728px] h-[90px]';
      case 'rectangle': return 'w-[300px] h-[250px]';
      case 'banner': return 'w-full max-w-[320px] h-[50px]';
      default: return 'w-full h-[90px]';
    }
  };

  return (
    <div className={`flex justify-center items-center my-8 ${className}`}>
      <div className={`bg-slate-100 border-2 border-slate-200 border-dashed flex items-center justify-center text-slate-400 text-base ${getDimensions()}`}>
        {/* 
          Google AdSense Code Goes Here 
          Example:
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        */}
        <span className="font-semibold tracking-wider uppercase text-sm">Advertisement Placeholder ({format})</span>
      </div>
    </div>
  );
};
