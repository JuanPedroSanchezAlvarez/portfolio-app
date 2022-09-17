import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  //private apiUrl: string = 'https://restcountries.eu/rest/v2';
  private apiUrl: string = 'https://restcountries.com/v2';

  private _regiones: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor() { }
}
