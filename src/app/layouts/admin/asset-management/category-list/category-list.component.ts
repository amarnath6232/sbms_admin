import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/Services/asset.service';
import { AssetCategory } from 'src/app/share/modal/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  assetCategoryList: AssetCategory[];
  copyDeleteItem: AssetCategory;

  constructor(private assetService: AssetService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategoryList();
    this.subcribe();
  }

  subcribe() {
    this.assetService.assetCategoryList.subscribe(res => {
      this.assetCategoryList = res;
    });
  }

  getCategoryList() {
    this.assetService.getAssetCategoryList().subscribe(res => {
      this.assetCategoryList = this.assetService.assetCategoryList.value;
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  Edit(item: AssetCategory) {
    this.assetService.copyEditAssertCategory.next(item);
  }

  copyDelete(item: AssetCategory) {
    this.copyDeleteItem = item;
  }

  deleteAssetCategory() {
    this.assetService.deleteAssetCategory(this.copyDeleteItem.assetCategoryId).subscribe(res => {
      this.toastr.success(`${this.copyDeleteItem.categoryName} deleted successfull`, "Success");
      this.getCategoryList();
    })
  }

}
