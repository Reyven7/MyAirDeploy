export type Country = {
  name: string;
  code: string;
  flag: string;
  img?: string;
};

export type CountriesResponce = {
  data: Country[];
};

export type City = {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  latitude: string;
  longitude: string;
  wikiDataId: string;
};

export type citiesResponce = {
  data: City[];
};
