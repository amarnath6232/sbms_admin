import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User, Country, State, City, RoleName } from 'src/app/share/modal/modal';
import { UserService } from 'src/app/Services/roles/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  userData: User[] = [];
  delUser: User; // del user
  editUSer: User; //edit user
  name;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  roles: RoleName[] = [];
  extensionNumber = '';
  extensionNo: any;

  constructor(private user: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
    this.subscribe_user_List();
  }

  getUsers() {
    this.user.getUsers().subscribe(
      (res) => {
        console.log(res);
        this.userData = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  subscribe_user_List() {
    this.user.users_List.subscribe(val => {
      if (val) {
        this.userData = val;
      } else {
        this.userData = [];
      }
    })
  }
  /* 
     updateUser(userData: User) {
       this.editUSer = userData;
       console.log(userData);
       this.getCountries();
       this.Filter(this.editUSer.country);
       this.selectedState(this.editUSer.state);
       this.selectedCity(this.editUSer.city);
       this.getRoles();
       this.selectRolename(this.editUSer.roleName);
   
     } */
  updateUser(user: User) {
    this.user.copyEditUser.next(user);

  }

  getCountries() {
    this.user.getCountries().subscribe(
      (res) => {
        console.log(res);
        this.countries = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  Filter(name) {
    console.log(name);
    let number = this.countries.filter(v => v.name == name);
    console.log(number);
    if (number.length !== 0) {
      this.extensionNo = number[0].phone_code;
      this.extensionNumber = this.extensionNo;
      console.log(this.extensionNumber);

      this.getStates(number[0].id);

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
      this.toastr.warning('Please select state', 'Warning');
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
  //Cities Filter
  selectedCity(name) {
    console.log(name);
    let number = this.cities.filter(v => v.name == name);
    console.log(number);
  }

  getRoles() {
    this.user.getRole().subscribe(
      (res) => {
        console.log(res);
        this.roles = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }
  //Roles Filter
  selectRolename(name) {
    console.log(name);
    let number = this.roles.filter(v => v.roleId == name);
    console.log(number);
  }


  deleteUser(userData: User) {
    this.delUser = userData;
    this.name = userData.firstName;

  }

  delete(id) {
    this.user.deleteUsers(id).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(`User deleted with ${id} successfully`, 'Success');
        this.ngOnInit();
      },
      (err) => {
        this.toastr.error(err.error.errorMessage, "Error");
        console.log(err);
      }
    )
  }

  update(editUSer) {
    this.user.updateUsers(editUSer, editUSer.id).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('User updated successfully', 'Success');
      },
      (err) => {
        this.toastr.error(err.error.errorMessage, "Error");
        console.log(err);
      }
    )
  }

}
