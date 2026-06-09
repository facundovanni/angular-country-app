import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RestCountry } from '../interfaces/rest-countries.interface';
import { Observable, catchError, count, delay, map, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1'
@Injectable({
  providedIn: 'root',

})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if( this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query)!);
    }
    console.log( 'llegando al server');
    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
        tap( countries => this.queryCacheCapital.set(query, countries)),
        catchError((error) => {
          console.log('Error fetching', error);
          return throwError(
            () => new Error(`No se pudo obtener países con esta query ${query}`)
          )
        })
      )
  }



  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    if( this.queryCacheCapital.has(query)){
      return of(this.queryCacheCountry.get(query)!);
    }
    return this.http.get<RestCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
        tap( countries => this.queryCacheCountry.set(query, countries)),
        catchError((error) => {
          console.log('Error fetching', error);
          return throwError(
            () => new Error(`No se pudo obtener países con esta query ${query}`)
          )
        })
      )
  }

  seaachCountryByAlphaCode(code: string): Observable<Country> {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RestCountry[]>(url)
      .pipe(
        map(res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
        map(countries => countries[0]),
        catchError((error) => {
          console.log('Error fetching', error);
          return throwError(
            () => new Error(`No se pudo obtener un país con ese código ${code}`)
          )
        })
      )
  }

}
