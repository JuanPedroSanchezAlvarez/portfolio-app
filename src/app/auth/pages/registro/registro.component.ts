import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    // email: [, [Validators.required, Validators.email]]
    email: [, [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidatorService]],
    username: [, [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: [, [Validators.required, Validators.minLength(6)]],
    password2: [, [Validators.required]]
  }, {
    validators: [this.validatorService.camposIguales('password', 'password2')]
  });
  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']) {
      return 'Campo obligatorio.';
    } else if (errors?.['pattern']) {
      return 'Debe tener un formato de email válido.';
    } else if (errors?.['emailTomado']) {
      return 'Este email ya está registrado.';
    }
    return '';
  }

  constructor(private formBuilder: FormBuilder, private validatorService: ValidatorService, private emailValidatorService: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fernando Herrera',
      email: 'email@gmail.com',
      username: 'Fernando_her85'
    });
  }

  campoNoValido(campo: string): boolean | undefined {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  emailRequired(): boolean | undefined {
    return this.miFormulario.get('email')?.errors?.['required'] && this.miFormulario.get('email')?.touched;
  }

  emailFormato(): boolean | undefined {
    return this.miFormulario.get('email')?.errors?.['pattern'] && this.miFormulario.get('email')?.touched;
  }

  emailTomado(): boolean | undefined {
    return this.miFormulario.get('email')?.errors?.['emailTomado'] && this.miFormulario.get('email')?.touched;
  }

  submitFormulario(): void {
    this.miFormulario.markAllAsTouched();
  }

}
