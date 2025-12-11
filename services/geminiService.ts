import { GoogleGenAI } from "@google/genai";
import { SearchResult } from '../types';

const getClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const fetchBusinessDetails = async (businessName: string): Promise<SearchResult | null> => {
  try {
    const ai = getClient();
    
    // We use gemini-2.5-flash for speed and efficiency with the Maps tool
    const modelId = "gemini-2.5-flash";
    
    // Appending specific location context to ensure we get the Court St location
    const prompt = `
      Find the business "${businessName}" located on or near Court Street in Brooklyn, New York (Zip codes 11201, 11231).
      I need their phone number and specific street address to contact them.
      
      Please format the output exactly as follows:
      Name: [Exact Business Name]
      Address: [Full Street Address]
      Phone: [Phone Number]
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        // Note: responseMimeType is NOT supported with googleMaps
      },
    });

    const text = response.text || "";
    
    // Extract grounding link if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    let mapLink = "";
    
    for (const chunk of chunks) {
      if (chunk.web?.uri) {
        mapLink = chunk.web.uri;
        break;
      }
      
      // Check for maps grounding as per instructions.
      // Cast to any to handle potential missing type definition for 'maps' in the current environment.
      const c = chunk as any;
      if (c.maps?.uri) {
        mapLink = c.maps.uri;
        break;
      }
    }

    // Parse the text output loosely since we can't force JSON with Maps tool easily
    const nameMatch = text.match(/Name:\s*(.+)/i);
    const addressMatch = text.match(/Address:\s*(.+)/i);
    const phoneMatch = text.match(/Phone:\s*(.+)/i);

    if (nameMatch) {
      return {
        name: nameMatch[1].trim(),
        address: addressMatch ? addressMatch[1].trim() : "Address not found",
        phoneNumber: phoneMatch ? phoneMatch[1].trim() : "Phone not listed",
        googleMapsLink: mapLink
      };
    }

    // Fallback: if structured parsing failed, return what we have if it looks like a result
    if (text.length > 10) {
        return {
            name: businessName, // Use original query as name fallback
            address: text.split('\n')[0].substring(0, 50), // Rough heuristic
            phoneNumber: "Check description",
            googleMapsLink: mapLink
        }
    }

    return null;

  } catch (error) {
    console.error("Error fetching business details:", error);
    return null;
  }
};