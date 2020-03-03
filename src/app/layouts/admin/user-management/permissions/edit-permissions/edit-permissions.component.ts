import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { RoleService } from 'src/app/Services/roles/role.service';
import { ValidationsService } from 'src/app/Services/validations/validations.service';
declare var $;

@Component({
  selector: 'app-edit-permissions',
  templateUrl: './edit-permissions.component.html',
  styleUrls: ['./edit-permissions.component.css']
})

export class EditPermissionsComponent implements OnInit {
  validations;
  permissionEdit: FormGroup;
  loading: boolean;

  constructor(private fb: FormBuilder,
    private roleService: RoleService,
    private toastr: ToastrService,
    private validation_ser: ValidationsService) { }

  ngOnInit(): void {
    this.init_validations();
    this.initData();
    this.subcribe_edit();
  }

  init_validations() {
    this.validations = this.validation_ser.permissions;
  }

  subcribe_edit() {
    this.roleService.edit_Permission_Value.subscribe(val => {
      this.permissionEdit.controls['name'].patchValue(val.name);
      this.permissionEdit.controls['description'].patchValue(val.description);
      this.permissionEdit.controls['createdBy'].patchValue(val.createdBy);
      this.permissionEdit.controls['createdDate'].patchValue(val.createdDate);
      this.permissionEdit.controls['modifiedBy'].patchValue(val.modifiedBy);
      this.permissionEdit.controls['permissionId'].patchValue(val.permissionId);
    })
  }

  initData() {
    this.permissionEdit = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(this.validations.name_min), Validators.maxLength(this.validations.name_max)]],
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(this.validations.description)]],
      createdBy: [''],
      createdDate: [''],
      modifiedBy: [''],
      permissionId: [''],
    });
  }

  editPermissions() {
    this.loading = true;
    console.log(this.permissionEdit.value);
    if (this.permissionEdit.invalid) {
      this.toastr.warning("Please fill all fields", "Warning");
      this.loading = false;
      return
    }
    this.roleService.editPermissions(this.permissionEdit.value).subscribe(res => {
      this.loading = false;
      this.toastr.success("Permission updated successfully", "Success");
      $('#editPermissionModal').modal('hide');
    }, err => {
      if (err.status === 400) {
        this.toastr.warning(err.error.errorMessage, "Warning");
      }
      else {
        this.toastr.error(err.error.errorMessage, "Error")
      }
      this.loading = false;
    });
  }

}
