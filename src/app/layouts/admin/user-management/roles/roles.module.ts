import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { CreateRolesComponent } from './create-roles/create-roles.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RolesComponent, RolesListComponent, CreateRolesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
