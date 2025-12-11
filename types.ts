export interface Business {
  id: string;
  name: string;
  address?: string;
  phoneNumber?: string;
  category?: string;
  notes?: string;
  status: 'confirmed' | 'pending_details';
  googleMapsLink?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SearchResult {
  name: string;
  address: string;
  phoneNumber: string;
  googleMapsLink: string;
}