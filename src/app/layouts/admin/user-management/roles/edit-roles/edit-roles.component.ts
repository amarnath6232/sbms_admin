import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { RoleService } from 'src/app/Services/roles/role.service';
import { permissionsList } from 'src/app/share/modal/modal';
import { ValidationsService } from 'src/app/Services/validations/validations.service';
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
  validations;

  constructor(private fb: FormBuilder,
    private roleService: RoleService,
    private toastr: ToastrService,
    private validate_ser: ValidationsService) {
    this.init_validations();
  }

  ngOnInit(): void {
    this.getPermissionsList();
    this.getpermissionsFromService();
    this.init_role();
    this.sub_copy_role();
    this.init_validations();
  }

  init_validations() {
    this.validations = this.validate_ser.roles;
  }

  init_role() {
    this.edit_Role = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(this.validations.name.minLength), Validators.maxLength(this.validations.name.maxLength)]],
      description: ['', [Validators.required, Validators.minLength(this.validations.description.minLength), Validators.maxLength(this.validations.description.maxLength)]],
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
    console.log("permissions list", this.permissionsList);
    if (this.permissionsList.length != 0) {
      for (let i = 0; i < this.permissionsList.length; i++) {
        for (let j = 0; j < this.edit_role_permissions.length; j++) {
          if (this.permissionsList[i].name == this.edit_role_permissions[j]) {
            permissions.value[i]['checked'] = true;
            break;
          }
        }
      }
    }
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

  get f() {
    return this.edit_Role.controls;
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
      this.toastr.success("Role updated successfully", "Success");
      $('#editRoleModal').modal('hide');
    }, err => {
      if (err.status === 400) {
        this.toastr.warning(err.error.errorMessage, "Warning");
      }
      else
        this.toastr.error(err.error.errorMessage, "Error");
    });
  }

}
