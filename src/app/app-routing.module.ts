import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  /*{ path: '', component: BasicosComponent, pathMatch: 'full' },
  { path: 'numeros', component: NumerosComponent },
  { path: 'no-comunes', component: NoComunesComponent },
  { path: 'ordenar', component: OrdenarComponent },
  { path: '**', redirectTo: '' }*/
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'heroes', loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule), canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
