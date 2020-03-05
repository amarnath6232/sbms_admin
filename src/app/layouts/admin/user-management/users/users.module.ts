import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserlistComponent } from './userlist/userlist.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [UsersComponent,
    UserlistComponent,
    CreateUsersComponent,
    EditUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})

export class UsersModule { }