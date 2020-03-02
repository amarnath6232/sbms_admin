import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RoleService } from 'src/app/Services/roles/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.css']
})
export class CreateRolesComponent implements OnInit {

  createRole: FormGroup;
  permissions = [];

  loading: boolean;
  constructor(private fb: FormBuilder,
    private roleService: RoleService,
    private router:Router) {
    this.initCreateRole();
  }

  ngOnInit(): void {
    this.roleService.getPermissions().subscribe();
    this.getpermissionsFromService();
  }

  getpermissionsFromService() {
    this.roleService.permissionList.subscribe(val => {
      console.log("val",val);
      if (val.length != 0) {
        this.permissions = val;
      }
    });
  }

  initCreateRole() {
    this.createRole = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
      aliasName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
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

  loadingFalse(){
    this.loading = false;
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
      this.router.navigate(['/user-management/roles/roles-list']);
    }, complete => {
      this.loadingFalse();
    })
  }

}
