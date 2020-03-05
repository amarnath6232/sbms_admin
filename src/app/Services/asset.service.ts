import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';
import { AssetCategory } from '../share/modal/modal';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})

export class AssetService {

  private baseUrl = '/rest/v1/assetcategories';

  copyEditAssertCategory = new Subject<AssetCategory>();
  assetCategoryList = new BehaviorSubject<AssetCategory[]>([]);

  constructor(private ip: IpService,
    private http: HttpClient,
    private errHandler: ErrorHandlerService) { }

  /* create asset */
  createAssetCategory(categoty): Observable<AssetCategory> {
    console.log("categoty", categoty);
    return this.http.post(`${this.ip.ip}${this.ip.asset_Port}${this.baseUrl}`, categoty)
      .pipe(catchError(this.errHandler.handleError));
  }

  /* asset category list */
  getAssetCategoryList() {
    return this.http.get<AssetCategory[]>(`${this.ip.ip}${this.ip.asset_Port}${this.baseUrl}`)
      .pipe(map(res => {
        this.assetCategoryList.next(res);
        return res;
      }), catchError(this.errHandler.handleError));
  }

  /* Edit Category */
  editAssetCategory(categoty) {
    console.log("edit categoty", categoty);
    return this.http.put(`${this.ip.ip}${this.ip.asset_Port}${this.baseUrl}/${categoty.assetCategoryId}`, categoty)
      .pipe(catchError(this.errHandler.handleError));
  }

  /* Delete asset category */
  deleteAssetCategory(id) {
    return this.http.delete(`${this.ip.ip}${this.ip.asset_Port}${this.baseUrl}/${id}`)
      .pipe(catchError(this.errHandler.handleError));
  }
}