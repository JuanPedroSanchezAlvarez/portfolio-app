import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required]
  });

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];

  constructor(private formBuilder: FormBuilder, private paisesService: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;
    /* Cuando cambia la Región */
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap(( _ ) => {
          this.miFormulario.get('pais')?.reset('');
        }),
        switchMap(region => this.paisesService.getPaisesPorRegion(region))
      ).subscribe(paises => {
        this.paises = paises;
      });
    /* Cuando cambia el País */
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap(( _ ) => {
          this.miFormulario.get('frontera')?.reset('');
        }),
        switchMap(codigo => this.paisesService.getPaisPorCodigo(codigo))
      ).subscribe(pais => {
        this.fronteras = pais?.borders || [];
      });
  }

  guardar(): void {

  }

}
