import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolesComponent } from './roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { CreateRolesComponent } from './create-roles/create-roles.component';

const routes: Routes = [
  {
    path: '', component: RolesComponent, children: [
      { path: '', redirectTo: 'roles-list' },
      { path: 'roles-list', component: RolesListComponent },
      { path: 'create-roles', component: CreateRolesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
