import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  /* miFormulario: FormGroup = new FormGroup({
    'nombre': new FormControl('RTX'),
    'precio': new FormControl(1500),
    'existencias': new FormControl(5)
  }); */
  miFormulario: FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'RTX',
      precio: 1600,
      existencias: 10
    });
  }

  campoEsValido(campo: string): boolean | null {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    this.miFormulario.reset();
  }

}
