import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { RoleService } from 'src/app/Services/roles/role.service';
import { RoleList } from 'src/app/share/modal/modal';
declare var $;

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})

export class RolesListComponent implements OnInit {

  roleList: RoleList[];
  copy_role: RoleList;

  constructor(private roleService: RoleService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getrolesList();
    this.subRoleListFromService();
    this.sub_Copy_role();
  }

  getrolesList() {
    this.roleService.getRoleList().subscribe();
    this.roleList = this.roleService.roleList.value;
    console.log(this.roleList);
  }

  copy_role_from_table(role) {
    this.roleService.copy_role.next(role);
    console.log("copy role", this.roleService.copy_role.value);
  }

  subRoleListFromService() {
    this.roleService.roleList.subscribe(val => {
      if (val.length != 0) {
        this.roleList = val
      } else {
        this.roleList = [];
      }
    });
  }

  sub_Copy_role() {
    this.roleService.copy_role.subscribe(val => {
      if (val) {
        this.copy_role = val;
      }
    })
  }

  deleteRole() {
    this.roleService.deleteRole(this.copy_role.roleId).subscribe(res => {
      $('#deleteRoleModal').modal('hide');
      this.toastr.success(`${this.copy_role.name} deleted successfully`, "Success");
    }, err => {
      this.toastr.error(`${err.error.errorMessage}`, "Error");
    });
  }

}
