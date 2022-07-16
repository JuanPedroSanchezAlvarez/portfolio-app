import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    MenuComponent,
    ErrorPageComponent
  ],
  exports: [
    MenuComponent
  ],
  imports: [
  ]
})
export class SharedModule { }
