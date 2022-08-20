import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{ path: '', component: BasicosComponent, pathMatch: 'full' },
  { path: 'numeros', component: NumerosComponent },
  { path: 'no-comunes', component: NoComunesComponent },
  { path: 'ordenar', component: OrdenarComponent },
  { path: '**', redirectTo: '' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
