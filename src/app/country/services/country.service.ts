import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RestCountry } from '../interfaces/rest-countries.interface';
import { Observable, map } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1'
@Injectable({
  providedIn: 'root',

})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(res => CountryMapper.mapRestCountryArrayToCountryArray(res))
      )
  }

}
