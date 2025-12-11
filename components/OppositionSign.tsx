import React from 'react';

export const OppositionSign: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Seen in Windows</h3>
      
      {/* 
        NOTE: This image src should be replaced with the actual photo provided by the user.
        For now, we use a placeholder or assume the file is named 'opposition-sign.jpg' in public folder.
        Since we don't have file upload in this environment, using a generic placeholder service to represent the sign.
      */}
      <div className="relative overflow-hidden rounded-lg shadow-inner bg-gray-100 aspect-[3/4]">
        <img 
            src="https://i.imgur.com/oDtQAWN.jpeg" 
            alt="Protest sign in window reading: We Support Safer Streets But Not This Design"
            className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-2 text-center backdrop-blur-sm">
            Example of opposition sign displayed by listed businesses
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-3 text-center">
        Look for this sign in windows. These businesses are asking the city to remove the bike lane.
      </p>
    </div>
  );
};