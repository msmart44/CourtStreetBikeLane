import React from 'react';
import { Phone, MapPin, MessageSquare, ExternalLink } from 'lucide-react';
import { Business } from '../types';
import { CALL_SCRIPT } from '../constants';

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const [showScript, setShowScript] = React.useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">{business.name}</h3>
            {business.category && (
              <span className="inline-block mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {business.category}
              </span>
            )}
          </div>
          <div className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">
            Opposing
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-start text-slate-600 text-sm">
            <MapPin size={16} className="mr-2 mt-0.5 text-slate-400 flex-shrink-0" />
            <span>{business.address || 'Address pending...'}</span>
          </div>
          {business.notes && (
            <p className="text-xs text-slate-500 italic pl-6 border-l-2 border-gray-100 ml-1">
              "{business.notes}"
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {business.phoneNumber ? (
            <a 
              href={`tel:${business.phoneNumber}`}
              className="flex-1 flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition"
            >
              <Phone size={16} />
              <span>{business.phoneNumber}</span>
            </a>
          ) : (
            <div className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-400 px-4 py-2.5 rounded-lg font-medium text-sm">
              <Phone size={16} />
              <span>No Phone</span>
            </div>
          )}
          
          <button 
            onClick={() => setShowScript(!showScript)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg font-medium text-sm transition border ${showScript ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-slate-700 border-gray-300 hover:bg-gray-50'}`}
          >
            <MessageSquare size={16} />
            <span>{showScript ? 'Close Script' : 'Call Script'}</span>
          </button>
        </div>
      </div>

      {showScript && (
        <div className="bg-orange-50 p-5 border-t border-orange-100 animate-in slide-in-from-top-2 duration-200">
          <p className="text-xs font-bold text-orange-800 uppercase mb-2">What to say:</p>
          <p className="text-slate-800 text-sm leading-relaxed font-medium">"{CALL_SCRIPT}"</p>
        </div>
      )}
    </div>
  );
};