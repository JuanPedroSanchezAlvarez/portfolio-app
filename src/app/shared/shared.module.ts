import { NgModule } from '@angular/core';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    SideMenuComponent
  ],
  exports: [
    ErrorPageComponent,
    SideMenuComponent
  ],
  imports: [
  ]
})
export class SharedModule { }
