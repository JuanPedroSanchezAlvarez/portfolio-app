import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  noPuedeSerStrider(control: FormControl): ValidationErrors | null {
    const valor: string = control.value?.trim().toLowerCase();
    if (valor === 'strider') {
      return {
        noStrider: true
      }
    }
    return null;
  }

  camposIguales(campo1: string, campo2: string): ValidationErrors | null {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const field1 = formGroup.get(campo1)?.value;
      const field2 = formGroup.get(campo2)?.value;
      if (field1 !== field2) {
        formGroup.get(campo2)?.setErrors({
          noIguales: true
        });
        return {
          noIguales: true
        }
      }
      formGroup.get(campo2)?.setErrors(null);
      return null;
    }
  }

}
