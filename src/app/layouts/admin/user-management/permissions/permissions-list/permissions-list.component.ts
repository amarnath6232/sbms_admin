import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/Services/roles/role.service';
import { permissionsList } from 'src/app/share/modal/modal';

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.css']
})
export class PermissionsListComponent implements OnInit {

  permissionsList: permissionsList[];

  constructor(private roleService: RoleService) {
    this.subscribePermissionsList();
  }

  ngOnInit(): void {
    this.getPermisiionsList();
  }

  getPermisiionsList() {
    this.roleService.getPermissions().subscribe(res => {
      console.log(res);
      console.log("res per", res);
      if (res != null) {
        this.permissionsList = res;
      }
    });
    this.permissionsList = this.roleService.permissionList.value;
  }

  subscribePermissionsList() {
    this.roleService.permissionList.subscribe(val => {
      if (val != null)
        this.permissionsList = val;
    });
    console.log(this.permissionsList);
  }

}
