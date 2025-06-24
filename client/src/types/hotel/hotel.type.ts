export type HotelOffer = {
  hotel: {
    hotelId: string;
    name: string;
    cityCode: string;
    latitude: number;
    longitude: number;
  };
  available: boolean;
  offers: Array<{
    id: string;
    checkInDate: string;
    checkOutDate: string;
    boardType: string;
    room: {
      type: string;
      description: string;
    };
    guests: {
      adults: number;
      children?: number;
    };
    price: {
      currency: string;
      total: string;
    };
    refundable: boolean;
  }>;
};

export type HotelOffersResponse = {
  data: HotelOffer[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};
