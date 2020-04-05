import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGaurdService } from './Services/auth-guard.service';


const routes: Routes = [
  { path: 'signIn', loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) },
  { path: '', loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGaurdService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
