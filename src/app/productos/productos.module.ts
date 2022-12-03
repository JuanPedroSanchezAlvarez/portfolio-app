import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductosRoutingModule } from './productos-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';


@NgModule({
  declarations: [
    AgregarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
