import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SiteService } from 'src/app/Services/site.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-site-architecture',
  templateUrl: './site-architecture.component.html',
  styleUrls: ['./site-architecture.component.css']
})
export class SiteArchitectureComponent implements OnInit {

  siteArcForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder,
    private site: SiteService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.siteArcValidations();
  }

  siteArcValidations() {
    this.siteArcForm = this.fb.group({
      noOfModules: ['', [Validators.required]],
      noOfPacks: ['', [Validators.required]],
    })
  }
  get f() {
    return this.siteArcForm.controls;
  }

  onSubmit() {
    this.loading = true;
    console.log(this.siteArcForm.value);
    this.site.createSiteArc(this.siteArcForm.value).subscribe(
      (res) => {
        console.log(res);
        this.loading = false
        this.toastr.success('Site Architecture Created Successfully', 'Success');
      },
      (err) => {
        console.log(err);
      }
    )
  }


}
