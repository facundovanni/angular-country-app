import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryService } from '../../services/country.service';
import { CountryInformationPageComponent } from "./country-information-page/country-information-page.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationPageComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.seaachCountryByAlphaCode(request.code);
    }
  })
}
