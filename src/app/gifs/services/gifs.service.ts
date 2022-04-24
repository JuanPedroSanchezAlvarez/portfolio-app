import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor() { }

  private _historial: string[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string): void {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial == this._historial.splice(10);
    }
  }

}
