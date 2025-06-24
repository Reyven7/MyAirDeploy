export type FlightOffer = {
  id: string;
  oneWay: boolean;
  lastTicketingDate: string;
  numberOfBookableSeats: number;

  itineraries: Array<{
    duration: string;
    segments: Array<{
      departure: {
        iataCode: string;
        terminal: number;
        at: string;
      };
      arrival: {
        iataCode: string;
        terminal: number;
        at: string;
      };
      carrierCode: string;
      number: string;
      aircraft: {
        code: string;
      };
      duration: string;
      numberOfStops: number;
    }>;
  }>;

  price: {
    currency: string;
    total: number;
    base: number;
  };

  travelerPricings: Array<{
    travelerId: string;
    travelerType: string;
    price: {
      currency: string;
      total: string;
      base: string;
    };
    fareDetailsBySegment: Array<{
      segmentId: string;
      cabin: string;
      class: string;
      includedCheckedBags?: {
        quantity: number;
      };
    }>;
  }>;

  validatingAirlineCodes: string[];
};

export type FlightOffersResponse = {
  meta?: { count: number };
  data: FlightOffer[];
};
