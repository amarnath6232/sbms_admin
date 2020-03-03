import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RoleService } from 'src/app/Services/roles/role.service';
import { permissionsList } from 'src/app/share/modal/modal';
declare var $;

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent implements OnInit {

  edit_Role: FormGroup;
  permissionsList: permissionsList[] = [];
  loading: boolean;
  edit_role_permissions = [];

  constructor(private fb: FormBuilder,
    private roleService: RoleService) { }

  ngOnInit(): void {
    this.getPermissionsList();
    this.getpermissionsFromService();
    this.init_role();
    this.sub_copy_role();
  }

  init_role() {
    this.edit_Role = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
      // aliasName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      permissions: this.fb.array([], [Validators.required]),
      createdBy: [''],
      createdDate: [''],
      modifiedBy: [''],
      modifiedDate: [''],
      roleId: [''],
    })
  }

  sub_copy_role() {
    this.roleService.copy_role.subscribe(val => {
      if (val) {
        this.edit_Role.controls['name'].setValue(val.name);
        // this.edit_Role.controls['aliasName'].patchValue(val.aliasName);
        this.edit_Role.controls['createdBy'].patchValue(val.createdBy);
        this.edit_Role.controls['createdDate'].patchValue(val.createdDate);
        this.edit_Role.controls['description'].patchValue(val.description);
        this.edit_Role.controls['modifiedBy'].patchValue(val.modifiedBy);
        this.edit_Role.controls['modifiedDate'].patchValue(val.modifiedDate);
        this.edit_Role.controls['roleId'].patchValue(val.roleId);
        this.edit_role_permissions = val.permissions;
        this.update_Permissions();
        this.update_checkbox();
      }
    })
  }

  update_Permissions() {
    const permissions = this.edit_Role.controls['permissions'] as FormArray;
    console.log(" before update form permissions", permissions);
    permissions.controls = [];
    if (this.permissionsList.length != 0) {
      this.permissionsList.forEach((val) => {
        if (val) {
          permissions.push(new FormControl({
            checked: false,
            name: val.name
          }
          ));
        }
      });
    }
    console.log("after form permissions", permissions);
  }

  update_checkbox() {
    const permissions = this.edit_Role.get('permissions') as FormArray;
    console.log("edit_role_permissions", this.edit_role_permissions);
    console.log("permissions", permissions.value);
    this.permissionsList.forEach((val, i) => {
      if (this.permissionsList.length != 0) {
        if (val.name == this.edit_role_permissions[i]) {
          permissions.value[i]['checked'] = true;
        } else {
          permissions.value[i]['checked'] = false;
        }
      }
    });
  }



  getPermissionsList() {
    this.roleService.getPermissions().subscribe(res => {
      if (res) {
        this.permissionsList = res;
        this.sub_copy_role();
      }
    });
  }

  getpermissionsFromService() {
    this.roleService.permissionList.subscribe(val => {
      console.log("val", val);
      if (val.length != 0) {
        this.permissionsList = val;
        // this.update_Permissions();
      }
    });
  }



  onCheckboxChange(e, index) {
    const permissions = this.edit_Role.get('permissions') as FormArray;

    if (e.target.checked) {
      permissions.value[index]['checked'] = true;
    } else {
      permissions.value[index]['checked'] = false;
    }
  }

  loadingFalse() {
    this.loading = false;
  }

  sendEditRole() {
    this.loading = true;
    console.log(this.edit_Role.value.permissions);
    if (this.edit_Role.invalid) {
      this.loadingFalse();
      return
    }
    this.loadingFalse();
    const editRole = this.edit_Role.value;
    const transform_Permission: any[] = this.edit_Role.value.permissions;
    const permission = [];
    for (let i = 0; i < transform_Permission.length; i++) {
      if (transform_Permission[i].checked == true) {
        permission.push(transform_Permission[i].name);
      }
    }
    editRole.permissions = permission;
    console.log(editRole);
    this.roleService.updateRole(editRole).subscribe(res => {
      console.log(res);
      $('#editRoleModal').modal('hide');
    });
  }

}
