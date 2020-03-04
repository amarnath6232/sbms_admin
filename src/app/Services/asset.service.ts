import { Injectable } from '@angular/core';
import { IpService } from './ip.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { AssetCategory } from '../share/modal/modal';

@Injectable({
  providedIn: 'root'
})

export class AssetService {

  private Ip = "http://192.168.10.81:";
  private baseUrl = '/rest/v1';

  copyEditAssertCategory = new Subject<AssetCategory>();
  assetCategoryList = new BehaviorSubject<AssetCategory[]>(null);

  constructor(private ip: IpService,
    private http: HttpClient,
    private errHandler: ErrorHandlerService) { }

  /* create asset */
  createAssetCategory(categoty): Observable<AssetCategory> {
    console.log("categoty", categoty);
    return this.http.post(`${this.ip.ip}${this.ip.asset_Port}${this.baseUrl}/assetCategories`, categoty)
      .pipe(catchError(this.errHandler.handleError));
  }

  /* asset category list */
  getAssetCategoryList() {
    return this.http.get<AssetCategory[]>(`${this.ip.ip}${this.ip.asset_Port}${this.baseUrl}/getAllAssetCategories`)
      .pipe(map(res => {
        this.assetCategoryList.next(res);
      }), catchError(this.errHandler.handleError));
  }

  /* Edit Category */
  editAssetCategory(categoty) {
    console.log("edit categoty", categoty);
    return this.http.put(`${this.ip.ip}${this.ip.asset_Port}${this.baseUrl}/updateAssetCategory`, categoty)
      .pipe(catchError(this.errHandler.handleError));
  }

  /* Delete asset category */
  deleteAssetCategory(id){
    return this.http.delete(`${this.ip.ip}${this.ip.asset_Port}${this.baseUrl}/assetCategories/${id}`)
      .pipe(catchError(this.errHandler.handleError));
  }
}