import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetManagementComponent } from './asset-management.component';
import { AddAssetCategoryComponent } from './add-asset-category/add-asset-category.component';
import { CategoryListComponent } from './category-list/category-list.component';


const routes: Routes = [
  {
    path: '', component: AssetManagementComponent, children: [
      {path:'', redirectTo:'catagory-List'},
      { path: 'add-asset-category', component: AddAssetCategoryComponent },
      { path: 'catagory-List', component: CategoryListComponent },
      { path: 'asset-type', loadChildren: () => import('./asset-type/asset-type.module').then(m => m.AssetTypeModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetManagementRoutingModule { }
