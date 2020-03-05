import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SiteService } from 'src/app/Services/site.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-site-requirement',
  templateUrl: './site-requirement.component.html',
  styleUrls: ['./site-requirement.component.css']
})
export class SiteRequirementComponent implements OnInit {

  siteReqForm: FormGroup
  loading = false;
  constructor(private fb: FormBuilder,
    private site: SiteService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.siteReqValidations();
  }

  siteReqValidations() {
    this.siteReqForm = this.fb.group({
      power: ['', [Validators.required]],
      voltage: ['', [Validators.required]],
    })
  }

  get f() {
    return this.siteReqForm.controls;
  }

  onSubmit() {
    this.loading = true;
    console.log(this.siteReqForm.value);
    this.site.siteReq(this.siteReqForm.value).subscribe(
      (res) => {
        console.log(res);
        this.loading = false
        this.toastr.success('SiteRequriment Created Successfully', 'Success');
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
