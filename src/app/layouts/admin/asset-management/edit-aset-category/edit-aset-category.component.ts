import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AssetService } from 'src/app/Services/asset.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-aset-category',
  templateUrl: './edit-aset-category.component.html',
  styleUrls: ['./edit-aset-category.component.css']
})
export class EditAsetCategoryComponent implements OnInit {

  maxLen = {
    categoryName: 16,
    description: 200
  }

  addAssetCategory = this.fb.group({
    assetCategoryId: ['', [Validators.required]],
    categoryName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(this.maxLen.categoryName)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(this.maxLen.description)]],
  });

  loadind: boolean;

  constructor(private fb: FormBuilder,
    private assetService: AssetService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.assetService.copyEditAssertCategory.subscribe(result => {
      this.addAssetCategory.controls['categoryName'].setValue(result.categoryName);
      this.addAssetCategory.controls['description'].setValue(result.description);
      this.addAssetCategory.controls['assetCategoryId'].setValue(result.assetCategoryId);
    })
  }

  get f() {
    return this.addAssetCategory.controls;
  }


  editAssetCategory() {
    console.log(this.addAssetCategory.value);
    if (this.addAssetCategory.invalid) {
      this.toastr.warning("Please fill all fields.", "Warning");
      return
    }
    this.assetService.editAssetCategory(this.addAssetCategory.value).subscribe(res => {
      console.log(res);
      this.toastr.success("Edit asset category successfully.", "Success");
      this.addAssetCategory.reset();
      this.assetService.getAssetCategoryList().subscribe();
      $(document).ready(function () {
        $(".close").click();
      });
    }, err => {
      console.log(err);
      this.toastr.error("Some thing went worng.", "Error");
    });
  }

}
