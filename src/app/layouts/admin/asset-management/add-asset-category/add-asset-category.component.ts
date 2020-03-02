import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AssetService } from 'src/app/Services/asset.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-asset-category',
  templateUrl: './add-asset-category.component.html',
  styleUrls: ['./add-asset-category.component.css']
})
export class AddAssetCategoryComponent implements OnInit {

  maxLen = {
    categoryName: 16,
    description: 200
  }

  addAssetCategory = this.fb.group({
    categoryName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(this.maxLen.categoryName)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(this.maxLen.description)]],
  });

  loadind: boolean;

  constructor(private fb: FormBuilder,
    private assetService: AssetService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  get f() {
    return this.addAssetCategory.controls;
  }


  createAssetCategory() {
    console.log(this.addAssetCategory.value);
    if (this.addAssetCategory.invalid) {
      this.toastr.error("Please fill all mandatory fields.", "Error");
      return
    }
    this.assetService.createAssetCategory(this.addAssetCategory.value).subscribe(res => {
      console.log(res);
      this.toastr.success("Create asset successfull.", "Success");
      this.addAssetCategory.reset();
      this.router.navigate(['/assert-management/catagory-List']);
    }, err => {
      console.log(err);
      this.toastr.error("Some thing went worng.", "Error");
    });
  }

}
