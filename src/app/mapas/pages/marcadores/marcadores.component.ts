import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-6.412063328686943, 38.67405463033422];
  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });
    //const markerHtml: HTMLElement = document.createElement('div');
    //markerHtml.innerHTML = 'Hola Mundo';
    //const marker = new mapboxgl.Marker({
    //  element: markerHtml
    //}).setLngLat(this.center).addTo(this.mapa);
    this.leerMarcadoresLocalStorage();
  }

  agregarMarcador(): void {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16)); // Color aleatorio.
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color
    }).setLngLat(this.center).addTo(this.mapa);
    this.marcadores.push({
      color: color,
      marker: nuevoMarcador
    });
    this.guardarMarcadoresLocalStorage();
    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });
  }

  irMarcador(marker: mapboxgl.Marker): void {
    this.mapa.flyTo({
      center: marker.getLngLat()
    });
  }

  guardarMarcadoresLocalStorage(): void {
    const lngLatArr: MarcadorColor[] = [];
    this.marcadores.forEach( m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();
      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      });
    });
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerMarcadoresLocalStorage(): void {
    if (!localStorage.getItem('marcadores')) { return; }
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
    lngLatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      }).setLngLat(m.centro!).addTo(this.mapa);
      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });
      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      });
    });
  }

  borrarMarcador(i: number): void {
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadoresLocalStorage();
  }

}
