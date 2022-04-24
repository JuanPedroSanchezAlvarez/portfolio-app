import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  private API_URL: string = 'https://api.giphy.com/v1/gifs/search';
  private API_KEY: string = '2Z2GMYmT90OyrtpHQ6vX5IE4Ofu5EV33';
  private API_LIMIT: string = '10';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string): void {
    // Guardamos la búsqueda en el historial:
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial == this._historial.splice(10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    // Hacemos la petición al API de GIPHY:
    const params = new HttpParams().set('api_key', this.API_KEY).set('limit', this.API_LIMIT).set('q', query);
    this.http.get<SearchGifsResponse>(`${this.API_URL}`, {params}).subscribe(response => {
      this.resultados = response.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
  }

}
