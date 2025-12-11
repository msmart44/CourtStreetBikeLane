import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BusinessCard } from './components/BusinessCard';
import { OppositionSign } from './components/OppositionSign';
import { INITIAL_BUSINESSES } from './constants';
import { fetchMapBusinesses } from './services/mapService';
import { fetchBusinessDetails } from './services/geminiService';
import { Business } from './types';
import { AlertCircle, Map as MapIcon, ArrowRight, Bike, Loader2, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [isFetching, setIsFetching] = useState(true);
  const [enrichingCount, setEnrichingCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setIsFetching(true);
      
      // 1. Fetch base list from Google My Maps KML
      const mapData = await fetchMapBusinesses();
      let initialList: Business[] = [];
      
      if (mapData.length > 0) {
        const mapNames = new Set(mapData.map(b => b.name.toLowerCase()));
        
        // Find businesses in our static list that aren't on the map (legacy support)
        const uniqueInitial = INITIAL_BUSINESSES.filter(b => !mapNames.has(b.name.toLowerCase()));
        
        // Merge map data with static data to preserve any manual notes/phones we had hardcoded
        const merged = mapData.map(mapBiz => {
            const existing = INITIAL_BUSINESSES.find(b => b.name.toLowerCase() === mapBiz.name.toLowerCase());
            if (existing) {
                return {
                    ...mapBiz,
                    // Prefer existing manual data if available, otherwise map data
                    phoneNumber: existing.phoneNumber || mapBiz.phoneNumber,
                    notes: existing.notes || mapBiz.notes,
                    status: existing.status
                };
            }
            return mapBiz;
        });
        
        initialList = [...merged, ...uniqueInitial];
      } else {
        // Fallback to static list if map fetch fails
        initialList = INITIAL_BUSINESSES;
      }
      
      setBusinesses(initialList);
      setIsFetching(false);

      // 2. Background Enrichment: Find phone numbers for map entries
      enrichBusinesses(initialList);
    };
    
    loadData();
  }, []);

  const enrichBusinesses = async (list: Business[]) => {
    // Identify businesses that are missing phone numbers or have generic map addresses
    // We filter to find ones that actually need looking up
    const toEnrich = list.filter(b => !b.phoneNumber || b.address === 'Court St, Brooklyn, NY');
    
    // Process sequentially to be gentle on rate limits
    for (const biz of toEnrich) {
        try {
            // Small delay between requests
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const details = await fetchBusinessDetails(biz.name);
            
            if (details) {
                setBusinesses(currentList => currentList.map(item => {
                    if (item.id === biz.id) {
                        return {
                            ...item,
                            address: (details.address && details.address !== 'Address not found') ? details.address : item.address,
                            phoneNumber: (details.phoneNumber && details.phoneNumber !== 'Phone not listed') ? details.phoneNumber : item.phoneNumber,
                            googleMapsLink: details.googleMapsLink || item.googleMapsLink
                        };
                    }
                    return item;
                }));
                setEnrichingCount(prev => prev + 1);
            }
        } catch (err) {
            console.debug(`Skipping enrichment for ${biz.name}`);
        }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-gray">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Intro Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                        The Bike Lane is Built. Let's Keep It.
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        The protected bike lane on Court Street is operational, finally providing a safe corridor for our community. 
                        However, local businesses are actively organizing and litigating to <strong>remove this safety infrastructure</strong> and return the street to a dangerous state.
                        Businesses are citing many false things such as the bike lane not accounting for emergency vehicles, even though that was a key element of the plan.
                        In reality, these businesses don't understand how many of their customers are walking and crossing Court Street, which had a two lane design that endangered families.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        We must show that we support safe streets. If a business prioritizes double-parking over our safety, they don't deserve our dollars.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#targets" className="inline-flex items-center px-6 py-3 bg-brand-navy text-white font-bold rounded-lg hover:bg-slate-800 transition shadow-lg shadow-blue-900/20">
                            See Who Is Protesting
                            <ArrowRight size={18} className="ml-2" />
                        </a>
                        <a href="https://iapps.courts.state.ny.us/nyscef/ViewDocument?docIndex=TbVHksDIB6O306ySzz6Y0g==" target="_blank" className="inline-flex items-center px-6 py-3 bg-white text-slate-700 font-bold rounded-lg border border-gray-300 hover:bg-gray-50 transition">
                            <Bike size={18} className="mr-2" />
                            Read DOT Survey
                        </a>
                    </div>
                </div>

                {/* Map Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[500px]">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 flex-shrink-0">
                        <h3 className="font-bold text-slate-800 flex items-center">
                            <MapIcon size={18} className="mr-2 text-brand-orange" />
                            Opposition Map
                        </h3>
                        <span className="text-xs text-slate-500">Auto-syncing...</span>
                    </div>
                    <div className="flex-grow w-full bg-slate-100 relative">
                        <iframe 
                            src="https://www.google.com/maps/d/embed?mid=1T81uohEGzKzNIp2wevV3nwErTv56jAY&ehbc=2E312F" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            title="Court Street Boycott Map"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Sidebar Visuals */}
            <div className="space-y-6">
                <OppositionSign />
            </div>
        </div>

        <div id="targets" className="pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Businesses Opposing</h2>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                           <span>{businesses.length} businesses populated from bike lane opponents google map, sourced from local community observation</span>
                           {enrichingCount > 0 && (
                             <span className="flex items-center text-brand-orange text-xs bg-orange-50 px-2 py-0.5 rounded-full">
                                <RefreshCw size={10} className="mr-1 animate-spin" />
                                Updated contacts for {enrichingCount}
                             </span>
                           )}
                        </div>
                    </div>
                </div>
                {isFetching && <Loader2 className="animate-spin text-slate-400" />}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businesses.map((b, idx) => (
                  <BusinessCard key={b.id || idx} business={b} />
                ))}
            </div>
        </div>

      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-black text-brand-navy text-xl mb-2">Safer Court Street</p>
            <p className="text-slate-500 text-sm mb-6">A community-run initiative to defend the Court Street bike lane.</p>
            <div className="text-xs text-slate-400">
                Data sourced dynamically from the Opposition Map.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;