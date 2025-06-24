import { Country } from "@src/types/geo.types";
import axios from "axios";
import countryImages from "@src/data/counties.images.json" assert { type: "json" };
let cachedCountries: Country[] = [];

const bannedCountries = [
  "Afghanistan",
  "Syria",
  "Yemen",
  "South Sudan",
  "Russia",
  "Belarus",
  "North Korea",
  "Haiti",
  "Palestine",
  "Kosovo",
  "Somaliland",
  "Transnistria",
  "South Ossetia",
  "Abkhazia",
  "Nagorno-Karabakh",
  "Western Sahara",
  "Vatican City",
  "Gibraltar",
  "Isle of Man",
  "Jersey",
  "Guernsey",
  "San Marino",
  "Monaco",
  "Liechtenstein",
  "Andorra",
  "Tuvalu",
  "Nauru",
  "Åland Islands",
  "Aruba",
  "Anguilla",
  "Bouvet Island",
  "British Indian Ocean Territory",
  "British Virgin Islands",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Cook Islands",
  "Curaçao",
  "Falkland Islands",
  "French Guiana",
  "French Southern and Antarctic Lands",
  "Greenland",
  "Niue",
  "Tokelau",
  "Pitcairn Islands",
  "Antarctica",
  "Saint Helena",
  "Sint Maarten",
  "Turks and Caicos Islands",
  "Montserrat",
  "Norfolk Island",
  "Saint Pierre and Miquelon",
  "Wallis and Futuna",
  "Palau",
  "Marshall Islands",
  "Micronesia",
  "Northern Mariana Islands",
  "American Samoa",
  "Guam",
  "Bermuda",
  "Iran",
  "Iraq",
  "Libya",
  "Saint Barthélemy",
  "Saint Martin",
  "South Georgia",
  "Svalbard and Jan Mayen",
  "United States Minor Outlying Islands",
  "Mayotte",
  "Heard Island and McDonald Islands",
  "Somalia",
  "Lebanon",
];

export const fecthCountries = async () => {
  if (cachedCountries.length > 0) {
    return cachedCountries;
  }

  const response = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,cca2,flags"
  );

  cachedCountries = response.data.map((country: any) => ({
    name: country.name.common,
    code: country.cca2,
    flag: country.flags?.png || country.flag,
  }));

  cachedCountries = cachedCountries.filter(
    (c) => !bannedCountries.includes(c.name)
  );

  cachedCountries.sort((a, b) => a.name.localeCompare(b.name));

  return cachedCountries;
};

export const getCountriesWithImage = async () => {
  const countries = await fecthCountries();

  const result = countries.map((country) => {
    const match = countryImages.find(
      (img) => img.country_code === country.code
    );

    return {
      ...country,
      img: match?.country_image ?? null,
    };
  });

  return result;
};
