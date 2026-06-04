import { Country } from "../interfaces/country.interface";
import { RestCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RestCountry): Country {
    return {
      cca2: restCountry.cca2,
      capital: restCountry.capital.join(','),
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No spanish Name',
      population: restCountry.population
    }
  }

  static mapRestCountryArrayToCountryArray(restCountries: RestCountry[]): Country[] {
    return restCountries.map(c=> this.mapRestCountryToCountry(c));
  }
}
