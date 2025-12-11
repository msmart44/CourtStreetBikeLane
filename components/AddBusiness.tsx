import React, { useState } from 'react';
import { Search, Plus, Loader2 } from 'lucide-react';
import { fetchBusinessDetails } from '../services/geminiService';
import { Business } from '../types';

interface AddBusinessProps {
  onAdd: (business: Business) => void;
}

export const AddBusiness: React.FC<AddBusinessProps> = ({ onAdd }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchBusinessDetails(query);
      if (result) {
        const newBusiness: Business = {
          id: Date.now().toString(),
          name: result.name,
          address: result.address,
          phoneNumber: result.phoneNumber,
          status: 'confirmed',
          googleMapsLink: result.googleMapsLink,
          notes: 'Added by community member'
        };
        onAdd(newBusiness);
        setQuery('');
      } else {
        setError("Could not find business details via Gemini. Try a more specific name.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Help Build the List</h2>
      <p className="text-sm text-gray-600 mb-4">
        Found a business on the <a href="https://www.google.com/maps/d/u/0/viewer?ll=40.681043108731906%2C-73.99203354177824&z=16&mid=1T81uohEGzKzNIp2wevV3nwErTv56jAY" target="_blank" className="text-blue-600 hover:underline">source map</a> not listed here? 
        Enter their name below. Our AI will find their phone number and address automatically.
      </p>
      
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. 'Key Food Court St'"
          className="w-full pl-10 pr-24 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-protest-red focus:border-protest-red outline-none transition"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
        
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-1 top-1.5 bottom-1.5 bg-urban-gray hover:bg-gray-800 text-white px-4 rounded font-medium text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={16} />
              Searching...
            </>
          ) : (
            <>
              <Plus size={16} className="mr-1" />
              Add
            </>
          )}
        </button>
      </form>
      
      {error && (
        <div className="mt-3 text-red-600 text-sm bg-red-50 p-2 rounded border border-red-100">
          {error}
        </div>
      )}
    </div>
  );
};