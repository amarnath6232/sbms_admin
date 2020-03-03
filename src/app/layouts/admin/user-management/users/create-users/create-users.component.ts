import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Country, State, City, RoleName, permissionsList } from 'src/app/share/modal/modal';
import { UserService } from 'src/app/Services/roles/user.service';
import { RoleService } from 'src/app/Services/roles/role.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})

export class CreateUsersComponent implements OnInit {
  userForm: FormGroup;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  roles: RoleName[] = []
  extensionNumber = '';
  extensionNo: any;
  spin = false;
  id;
  permissions = [];
  permissionsList: permissionsList[] = [];
  generatedPermissionsList = [];

  constructor(private fb: FormBuilder,
    private user: UserService,
    private roleService: RoleService,
    private toastr: ToastrService,
    private router: Router) {
    this.userFormValidations();
  }

  ngOnInit(): void {
    this.getPermissionsList();
    this.getCountries();
    this.getRoles();
    this.subRolelistById();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userForm.setControl('permissions', this.fb.array([]));
  }

  userFormValidations() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
      userName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      emailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      role: ['', [Validators.required]],
      permissions: this.fb.array([], [Validators.required]),
    })
  }

  getPermissionsList() {
    this.roleService.getPermissions().subscribe();
    this.roleService.permissionList.subscribe(val => {
      if (val.length !== 0) {
        this.permissionsList = val;
        console.log("pr list in com", this.permissionsList);
        this.addPermissionsListToForm();
      }
    });
  }

  addPermissionsListToForm() {
    const permissions = this.userForm.get('permissions') as FormArray;
    console.log("per add per", permissions);
    permissions.controls = [];
    for (let i = 0; i < this.permissionsList.length; i++) {
      permissions.push(new FormControl({
        "createdBy": this.permissionsList[i].createdBy,
        "createdDate": this.permissionsList[i].createdDate,
        "description": this.permissionsList[i].description,
        "modifiedBy": this.permissionsList[i].modifiedBy,
        "name": this.permissionsList[i].name,
        "permissionId": this.permissionsList[i].permissionId,
        "checked": false
      }));
    }
    return this.generatedPermissionsList;
  }

  subRolelistById() {
    this.user.roleListById.subscribe(val => {
      if (val != null) {
        this.permissions = val.permissions;
      }
      console.log("roleListById ", this.permissions);
      this.selectCheckBox();
    })
  }

  selectCheckBox() {
    const permission = this.userForm.get('permissions') as FormArray;
    for (let i = 0; i < this.permissionsList.length; i++) {
      if (permission.value[i]['name'] == this.permissions[i]) {
        permission.value[i]['checked'] = true;
      } else {
        permission.value[i]['checked'] = false;
      }
    }
    console.log(permission);
  }

  onCheckboxChange(e, index) {
    console.log(index);
    const permissions: FormArray = this.userForm.get('permissions') as FormArray;

    if (e.target.checked) {
      permissions.value[index]['checked'] = true;
    } else {
      permissions.value[index]['checked'] = false;
    }
  }

  get f() {
    return this.userForm.controls;
  }

  getCountries() {
    this.user.getCountries().subscribe(
      (res) => {
        console.log(res);
        this.countries = res;
      })
  }

  Filter(name) {
    console.log(name);
    let number = this.countries.filter(v => v.name == name);
    console.log(number);
    if (number.length !== 0) {
      this.extensionNo = number[0].phone_code;
      this.extensionNumber = this.extensionNo;
      console.log(this.extensionNumber);
      /*   this.id = number[0].id;
        console.log(this.id); */
      this.getStates(number[0].id);
      /*  console.log(this.getStates(this.id)); */
    } else {
      this.toastr.warning('Please select country', 'Warning');
    }
  }

  getStates(id: number) {
    console.log(id);
    this.user.getStates(id).subscribe(
      (res) => {
        console.log(res);
        this.states = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  selectedState(name) {
    console.log(name);
    let number = this.states.filter(v => v.name == name);
    console.log(number);
    if (number.length != 0) {
      this.getCities(+number[0].id);
    } else {
      this.toastr.warning('Please select state', 'warning');
    }
  }

  getCities(id: number) {
    console.log(id);
    this.user.getCities(id).subscribe(
      (res) => {
        console.log(res);
        this.cities = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getRoles() {
    this.roleService.getRoleList().subscribe(
      (res) => {
        console.log(res);
        this.roles = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getRolesById(roleId: string) {
    this.user.getRoleById(roleId).subscribe()
  }

  selectRolename(name) {
    console.log(name);
    let number = this.roles.filter(v => v.name == name);
    console.log(number);
    if (number.length !== 0) {
      this.id = number[0].roleId;
      console.log(this.id);
      this.getRolesById(number[0].roleId);
    } else {
      this.toastr.warning('Please select role', 'Warning');
    }
  }

  onSubmit() {
    this.spin = true;
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      this.spin = false;
      this.toastr.warning('Please fill all mandetory fields.');
      return
    }
    console.log(this.userForm.value.permissions);

    let per = [];
    for (let i = 0; i < this.userForm.value.permissions.length; i++) {
      if (this.userForm.value.permissions[i]['checked'] == true) {
        per.push(this.userForm.value.permissions[i]['name']);
      }
    }

    console.log(per);
    this.userForm.value.permissions = per;
    console.log("this.userForm.value", this.userForm.value);
    this.user.createByUser(this.userForm.value).subscribe(
      (res) => {
        console.log(res);
        this.spin = false;
        this.user.roleListById.next(null);
        this.userForm.reset();
        this.toastr.success('User created successfully', 'Success');
        this.router.navigate(['user-management/users/users-list']);
      },
      (err) => {
        console.log(err);
        this.spin = false;
      })
  }

}
