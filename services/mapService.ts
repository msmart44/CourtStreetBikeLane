import { Business } from '../types';

export const fetchMapBusinesses = async (): Promise<Business[]> => {
  const MAP_ID = '1T81uohEGzKzNIp2wevV3nwErTv56jAY';
  // We use the KML export feature of Google My Maps
  const KML_URL = `https://www.google.com/maps/d/u/0/kml?mid=${MAP_ID}&forcekml=1`;
  // A CORS proxy is required to fetch Google content from a browser client
  const PROXY_URL = 'https://corsproxy.io/?' + encodeURIComponent(KML_URL);

  try {
    const response = await fetch(PROXY_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const kmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(kmlText, "text/xml");
    
    const placemarks = xmlDoc.getElementsByTagName("Placemark");
    const businesses: Business[] = [];

    for (let i = 0; i < placemarks.length; i++) {
      const placemark = placemarks[i];
      const name = placemark.getElementsByTagName("name")[0]?.textContent?.trim() || "Unknown Business";
      // Skip points that might be just markers for "Bike Lane" etc, usually businesses have specific names
      if (name.toLowerCase().includes("layer") || name.toLowerCase().includes("directions")) continue;

      const description = placemark.getElementsByTagName("description")[0]?.textContent?.trim() || "";
      
      // Simple heuristic to extract phone numbers from description if they exist in the KML
      const phoneMatch = description.match(/(\(\d{3}\)\s?\d{3}-\d{4})|(\d{3}[-.]\d{3}[-.]\d{4})/);
      const phoneNumber = phoneMatch ? phoneMatch[0] : undefined;

      businesses.push({
        id: `map-dest-${i}`,
        name: name,
        address: 'Court St, Brooklyn, NY', // KML gives coordinates, we default the text
        phoneNumber: phoneNumber,
        status: 'confirmed',
        notes: description.slice(0, 100) + (description.length > 100 ? '...' : ''), // Preview of notes
        category: 'Opposition Member'
      });
    }

    return businesses;
  } catch (error) {
    console.error("Failed to fetch live map data, defaulting to static list.", error);
    return [];
  }
};