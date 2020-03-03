import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionsComponent } from './permissions.component';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';
import { CreatePermissionsComponent } from './create-permissions/create-permissions.component';

const routes: Routes = [
  {
    path: '', component: PermissionsComponent, children: [
      { path: '', redirectTo: 'permissions-list' },
      { path: 'permissions-list', component: PermissionsListComponent },
      { path: 'create-permissions', component: CreatePermissionsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PermissionsRoutingModule { }
