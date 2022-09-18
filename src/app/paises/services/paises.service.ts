import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { PaisSmall } from '../interfaces/paises.interface';

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

  constructor(private httpClient: HttpClient) { }

  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    const url: string = `${this.apiUrl}/region/${region}?fields=alpha3Code,name`;
    return this.httpClient.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo(codigo: string): Observable<any | null> {
    if (!codigo) {
      return of(null);
    }
    const url: string = `${this.apiUrl}/alpha/${codigo}`;
    return this.httpClient.get<any>(url);
  }

  getPaisSmallPorCodigo(codigo: string): Observable<PaisSmall> {
    const url: string = `${this.apiUrl}/alpha/${codigo}?fields=alpha3Code,name`;
    return this.httpClient.get<PaisSmall>(url);
  }

  getPaisesPorCodigos(borders: string[]): Observable<PaisSmall[]> {
    if (!borders) {
      return of([]);
    }
    const peticiones: Observable<PaisSmall>[] = [];
    borders.forEach(codigo => {
      const peticion = this.getPaisSmallPorCodigo(codigo);
      peticiones.push(peticion);
    });
    return combineLatest(peticiones);
  }

}
