export type Location = {
  type: string;
  subType: "CITY" | "AIRPORT";
  name: string;
  iataCode: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    cityName: string;
    cityCode: string;
    countryName: string;
  };
};

export type LocationResponse = {
  meta?: { count: number };
  data: Location[];
};
