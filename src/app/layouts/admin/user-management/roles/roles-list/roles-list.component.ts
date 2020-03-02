import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/Services/roles/role.service';
import { RoleList } from 'src/app/share/modal/modal';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

  roleList: RoleList[];

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.getrolesList();
    this.subRoleListFromService();
  }

  getrolesList() {
    this.roleService.getRoleList().subscribe();
    this.roleList = this.roleService.roleList.value;
    console.log(this.roleList);
  }

  subRoleListFromService() {
    this.roleService.roleList.subscribe(val => {
      if (val.length != 0) {
        this.roleList = val
      }
    });
  }

}
