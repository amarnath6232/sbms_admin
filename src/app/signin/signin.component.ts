import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../Services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup

  username: string = null;
  password: string = null;
  pwd: string = null;
  errBoolean = false;
  loading = false;
  validations = false;
  reloadonce: string = null;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private fb: FormBuilder, ) { }

  ngOnInit() {
    this.SigninValidations();
  }

  SigninValidations() {
    this.signinForm = this.fb.group({
      loginId: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    })
  }

  get f() {
    return this.signinForm.controls;
  }

  onSubmit() {
    this.loading = !this.loading;
    this.password = this.pwd;
    this.authenticationService.authenticate(this.signinForm.controls['loginId'].value, this.signinForm.controls['password'].value)
      .subscribe(
        () => {
          this.loading = !this.loading;
          this.router.navigate(['/dashboard']).then(() => {
            this.toastr.success('Login successful', 'Success');
          });
        },
        error => {
          this.loading = !this.loading;
          this.pwd = null;
          console.log(error);
          if (error.status === 404) {
            this.toastr.error('Incorrect username or password', 'Error');
          } else if (error.status > 500) {
            this.toastr.error("Internal server error please try agian after sometime", 'Error');
          } else if (error.status === 0) {
            this.toastr.error("Server is not responding", 'Error');
          } else if (error.status === 500) {
            this.toastr.error(error.error.message, 'Error');
          }
        });
  }
  
}
