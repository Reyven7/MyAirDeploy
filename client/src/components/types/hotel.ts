export interface HotelData {
  hotelId: string;
  type: string;
  name: string;
  rating?: string; 
  latitude: number;
  longitude: number;
  cityCode: string;
  address: {
    lines: string[];
    postalCode: string;
    cityName: string;
    countryCode: string;
  };

  imageUrl?: string;    
  googleRating?: number; 
}

export interface RoomTypeEstimated {
  category: string;
}

export interface Room {
  type: string;
  typeEstimated: RoomTypeEstimated;
}

export interface Price {
  currency: string;
  total: string;
  base: string;
  grandTotal: string;
}

export interface GuestInfo {
  adults: number;
}

export interface Offer {
  id: string;
  room: Room;
  price: Price;
  guests: GuestInfo;
  availability: string;
  self: string;
}

export interface HotelOffer {
  hotel: HotelData;
  offers: Offer[];
  self: string;
}

export interface HotelOffersResponse {
  data: HotelOffer[];
  meta: {
    links: {};
    count: number;
  };
}

export interface Media {
  uri: string;
  category: string;
}