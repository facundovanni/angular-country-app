import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { RestCountry } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  query = signal('');
  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query()) return [];

      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      );

    }
  });
  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);


  // onSearch(value: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(value)
  //     .subscribe({
  //       next: (resp) => {
  //           this.countries.set(resp);
  //           this.isLoading.set(false);
  //       },
  //       error: (err) => {
  //         this.isLoading.set(false);
  //         this.isError.set(`No se encontró un país con esa capital: ${value}`);
  //         this.countries.set([]);
  //       }
  //     })
  // }
}
