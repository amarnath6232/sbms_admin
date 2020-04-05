import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'user-management' },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'asset-management', loadChildren: () => import('./asset-management/asset-management.module').then(m => m.AssetManagementModule) },
      { path: 'user-management', loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule) },
      { path: 'site-management', loadChildren: () => import('./site-management/site-management.module').then(m => m.SiteManagementModule) },
      { path: 'battery-management', loadChildren: () => import('./battery-management/battery-management.module').then(m => m.BatteryManagementModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
