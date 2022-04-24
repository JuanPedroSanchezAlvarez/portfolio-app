import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  //private const API_KEY: string = '2Z2GMYmT90OyrtpHQ6vX5IE4Ofu5EV33';
  //private const API_URL: string = 'api.giphy.com/v1/gifs/search';
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
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=2Z2GMYmT90OyrtpHQ6vX5IE4Ofu5EV33&q=${query}`).subscribe(response => {
      this.resultados = response.data;
    });
  }

}
