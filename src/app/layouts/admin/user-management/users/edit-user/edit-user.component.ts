import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/Services/roles/user.service';
import { State, City, RoleName, Country, User, permissionsList } from 'src/app/share/modal/modal';
import { RoleService } from 'src/app/Services/roles/role.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  maxLen = {
    firstName: 16,
    lastName: 16,
    phoneNumber: 10,

  }
  selectedUser: User;
  id;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  roles: RoleName[] = [];
  selectedCountry: User = null;
  extensionNumber = '';
  extensionNo: any;
  permissions = [];
  permissionsList: permissionsList[] = [];
  generatedPermissionsList = [];
  /*  country: null;
   state: null;
   city: null; */
  userForm = this.fb.group({
    id: ['', [Validators.required]],
    firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(this.maxLen.firstName)]],
    lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(this.maxLen.lastName)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(this.maxLen.phoneNumber)]],
    country: ['', [Validators.required]],
    state: ['', [Validators.required]],
    city: ['', [Validators.required]],
    role: ['', [Validators.required]],
    permissions: this.fb.array([], [Validators.required]),
  });
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.getCountries();
    this.getRoles();
    this.getPermissionsList();
    this.subRolelistById();
    this.sub_copy_edit_User();
  }

  sub_copy_edit_User() {
    this.userService.copyEditUser.subscribe(res => {
      this.userForm.controls['id'].setValue(res.id);
      this.userForm.controls['firstName'].setValue(res.firstName);
      this.userForm.controls['lastName'].setValue(res.lastName);
      this.userForm.controls['phoneNumber'].setValue(res.phoneNumber);
      this.userForm.controls['country'].setValue(res.country);
      this.userForm.controls['state'].setValue(res.state);
      this.userForm.controls['city'].setValue(res.city);
      this.userForm.controls['role'].setValue(res.role);
      this.selectedUser = res;
      console.log(this.selectedUser);
      /* call countires states cities on change */
      this.init_country_state_city();
      this.selectedRolename(this.userForm.controls['role'].value);
      /*   this.userForm.controls['permissions'].patchValue(res.permissions); */
    })
  }

  init_country_state_city() {
    console.log("init_country_state_city -------- country", this.selectedUser.country);
    this.Filter(this.selectedUser.country);
    console.log("init_country_state_city -------- state", this.selectedUser.state);
    setTimeout(() => { this.selectedState(this.selectedUser.state); }, 300);
  }

  get f() {
    return this.userForm.controls;
  }

  getCountries() {
    this.userService.getCountries().subscribe(
      (res) => {
        console.log(res);
        this.countries = res;
        this.states = [];
        this.cities = [];
      },
      (err) => {
        console.error(err);
      }
    )
  }

  Filter(name) {
    console.log(name);
    let number = this.countries.filter(v => v.name == name);
    console.log(number);
    if (number.length !== 0) {
      this.getStates(number[0].country_id);
    }
  }

  getStates(country_id: number) {
    console.log(country_id);
    this.userService.getStates(country_id).subscribe(
      (res) => {
        console.log(res);
        this.states = res;
        this.cities = [];
      },
      (err) => {
        console.log(err);
      })
  }

  selectedState(name) {
    console.log(name);
    let number = this.states.filter(v => v.name == name);
    console.log(number);
    if (number.length != 0) {
      this.getCities(+number[0].state_id);
    }
  }

  getCities(state_id: number) {
    console.log(state_id);
    this.userService.getCities(state_id).subscribe(
      (res) => {
        console.log(res);
        this.cities = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  //Get roles
  getRoles() {
    this.userService.getRole().subscribe(
      (res) => {
        console.log(res);
        this.roles = res;
        console.log(this.roles);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  //role filter
  selectedRolename(name) {
    console.log("role:", name);
    let number = this.roles.filter(x => x.name == name);
    console.log(number);
    if (number.length !== 0) {
      this.id = number[0].roleId;
      console.log(this.id);
      this.getRolesById(number[0].roleId);
    } /* else {
      this.toastr.warning('Please select role', 'Warning');
    } */
  }

  //role by id permissions
  getRolesById(roleId: string) {
    this.userService.getRoleById(roleId).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      })
  }

  subRolelistById() {
    this.userService.roleListById.subscribe(val => {
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

  //permissions evevt
  onCheckboxChange(e, index) {
    console.log(index);
    const permissions: FormArray = this.userForm.get('permissions') as FormArray;
    if (e.target.checked) {
      permissions.value[index]['checked'] = true;
    } else {
      permissions.value[index]['checked'] = false;
    }
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

  //Update user
  editUser() {
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      this.toastr.error("Please fill all fields.", "Error");
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
    console.log("id:", this.userForm.controls['id'].value);
    this.userService.updateUsers(this.userForm.value, this.userForm.controls['id'].value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('User updated successfully', 'Success');
        /*  const permissions = this.userForm.get('permissions') as FormArray;
         permissions.controls = [];
         this.userForm.reset(); */
        $(document).ready(function () {
          $(".close").click();
        });
      }, (err) => {
        console.log(err);
        this.toastr.error(err.error.errorMessage, "Error");
      }, () => {
        this.userService.getUsers().subscribe();
      }
    )
  }

}
