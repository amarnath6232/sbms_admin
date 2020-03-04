import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetTypeRoutingModule } from './asset-type-routing.module';
import { AssetTypeComponent } from './asset-type.component';
import { AssetTypeListComponent } from './asset-type-list/asset-type-list.component';
import { CreateAssettypeComponent } from './create-assettype/create-assettype.component';


@NgModule({
  declarations: [AssetTypeComponent, AssetTypeListComponent, CreateAssettypeComponent],
  imports: [
    CommonModule,
    AssetTypeRoutingModule
  ]
})
export class AssetTypeModule { }
