import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RoleService } from 'src/app/Services/roles/role.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationsService } from 'src/app/Services/validations/validations.service';

@Component({
  selector: 'app-create-permissions',
  templateUrl: './create-permissions.component.html',
  styleUrls: ['./create-permissions.component.css']
})
export class CreatePermissionsComponent implements OnInit {

  loading: boolean;
  validations;
  permission: FormGroup;


  constructor(private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private toastr: ToastrService,
    private validate_ser: ValidationsService) {
    this.init_validations();
  }

  ngOnInit(): void {
    this.init_validations();
    this.init_form();
  }

  init_validations() {
    this.validations = this.validate_ser.permissions;
  }

  init_form() {
    this.permission = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(this.validations.name_min), Validators.maxLength(this.validations.name_max)]],
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(this.validations.description)]],
    });
  }

  loadingfalse() {
    this.loading = false;
  }

  createPermissions() {
    this.loading = true;
    if (this.permission.invalid){
      this.toastr.warning("please fill all fields");
      return
    } 
    this.roleService.createPermission(this.permission.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['/user-management/permissions/permissions-list']);
    }, err => {
      this.toastr.error(err.error.errorMessage);
    });
    this.loadingfalse();
  }

}
