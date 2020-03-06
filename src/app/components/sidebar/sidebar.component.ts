import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  some: any[];
  userName;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.displayUserName();
    this.some = ['Create User', 'Edit User', 'Delete User', 'Create Permission',
      'Edit Permission', 'Delete Permission', 'Create Role', 'Edit Role',
      'Delete Role', 'Create Asset', 'Edit Asset']
  }

  displayUserName() {
    this.auth.userName.subscribe(val => {
      this.userName = val;
    })
  }

}
