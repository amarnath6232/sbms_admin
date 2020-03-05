import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RoleService } from 'src/app/Services/roles/role.service';
import { ValidationsService } from 'src/app/Services/validations/validations.service';

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.css']
})

export class CreateRolesComponent implements OnInit {

  createRole: FormGroup;
  permissions = [];
  validations;
  loading: boolean;

  constructor(private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private toastr: ToastrService,
    private validate_ser: ValidationsService) {
    this.init_validations();
  }

  ngOnInit(): void {
    this.roleService.getPermissions().subscribe();
    this.getpermissionsFromService();
    this.init_validations();
    this.initCreateRole();
  }

  init_validations() {
    this.validations = this.validate_ser.roles;
  }

  getpermissionsFromService() {
    this.roleService.permissionList.subscribe(val => {
      console.log("val", val);
      if (val.length != 0) {
        this.permissions = val;
      }
    });
  }

  initCreateRole() {
    this.createRole = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(this.validations.name.minLength), Validators.maxLength(this.validations.name.maxLength)]],
      description: ['', [Validators.required, Validators.minLength(this.validations.description.minLength), Validators.maxLength(this.validations.description.maxLength)]],
      permissions: this.fb.array(this.permissions, [Validators.required]),
    })
  }

  onCheckboxChange(e) {
    const permissions: FormArray = this.createRole.get('permissions') as FormArray;

    if (e.target.checked) {
      permissions.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      permissions.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          permissions.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  loadingFalse() {
    this.loading = false;
  }

  get f() {
    return this.createRole.controls;
  }

  sendCreateRole() {
    this.loading = true;
    console.log(this.createRole.value);
    if (this.createRole.invalid) {
      this.loading = false;
      return
    }
    this.roleService.createRole(this.createRole.value).subscribe(res => {
      console.log(res);
      this.toastr.success("Role created successfully", "Success");
      this.router.navigate(['/user-management/roles/roles-list']);
    }, err => {
      if (err.status === 400) {
        this.toastr.warning(err.error.errorMessage, "Warning");
      }
      else
        this.toastr.error(err.error.errorMessage, "Error");
    });
    this.loadingFalse();
  }

}
