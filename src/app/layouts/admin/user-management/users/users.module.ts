import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserlistComponent } from './userlist/userlist.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersComponent, UserlistComponent, CreateUsersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
