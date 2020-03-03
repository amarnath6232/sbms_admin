import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'assert-management', loadChildren: () => import('./asset-management/asset-management.module').then(m => m.AssetManagementModule) },
  { path: 'user-management', loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
