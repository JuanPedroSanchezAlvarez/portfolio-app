import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    genero: ['M', [Validators.required]],
    notificaciones: ['M', [Validators.required]],
    condiciones: [false, [Validators.requiredTrue]]
  });
  persona = {
    genero: 'F',
    notificaciones: true
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      ...this.persona,
      condiciones: true
    });
    /*this.miFormulario.valueChanges.subscribe(form => {
      delete form.condiciones;
      this.persona = form;
    });*/
    this.miFormulario.valueChanges.subscribe(({condiciones, ...restoDeArgumentos}) => {
      this.persona = restoDeArgumentos;
    });
  }

  guardar(): void {
    // Desincronizado, se actualiza al pulsar en guardar:
    //const formValue = {...this.miFormulario.value};
    //delete formValue.condiciones;
    //this.persona = formValue;
  }

}
