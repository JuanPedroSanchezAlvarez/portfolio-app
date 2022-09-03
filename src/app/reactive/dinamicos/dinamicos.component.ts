import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.formBuilder.array([
      ['Metal Gear'],
      ['Death Stranding']
    ], Validators.required)
  });
  nuevoFavorito: FormControl = this.formBuilder.control('', Validators.required);

  get favoritosArray() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  campoEsValido(campo: string): boolean | null {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  agregarFavorito(): void {
    if (this.nuevoFavorito.invalid) {
      return;
    }
    this.favoritosArray.push(this.formBuilder.control(this.nuevoFavorito.value, Validators.required));
    this.nuevoFavorito.reset();
  }

  borrar(i: number): void {
    this.favoritosArray.removeAt(i);
  }

  guardar(): void {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    this.miFormulario.reset();
  }

}
