import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { IpService } from './ip.service';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authenticatedUser: any;
  rolebase: string = null;
  islogin: boolean = false;
  userName = new BehaviorSubject<string>(null);
  token: string = localStorage.getItem('token') || null;
  refresh_Token = null;
  decoded: any;

  constructor(private http: HttpClient,
    private errHandler: ErrorHandlerService,
    private ip: IpService) {
    this.decodeToken();
  }

  getJwtToken(): string {
    return this.token;
  }

  refreshToken(): Observable<any> {
    return this.http.get<any>(`${this.ip.ip}${this.ip.login_Port}/rest/v1/login/generateToken/${this.decoded.sub}`).pipe(take(1), tap(res => {
      // console.log(res);
      if (res) {
        this.refresh_Token = res['jwtToken'];
        // console.log("refresh token",this.refresh_Token);
        if (this.refresh_Token) {
          localStorage.setItem('token', this.refresh_Token);
          this.token = this.refresh_Token;
        }
      }
    }));
  }

  decodeToken(): boolean {
    if (this.token != null && this.token != undefined && this.token.length != 0) {
      this.decoded = jwt_decode(this.token);
      this.userName.next(this.decoded.sub);
      // console.log(this.userName);
      console.log(this.decoded);
      return true;
    }
    else
      return false;
  }


  authenticate(loginId: string, password: string) {
    return this.http.post(`${this.ip.ip}${this.ip.login_Port}/rest/v1/login/signin`, { loginId, password }).pipe(map(res => {
      if (res) {
        // console.log(res);
        this.token = res['jwtToken'];
        localStorage.setItem('token', this.token);
        this.decodeToken();
        return true;
      }
      else
        return false;
    }), catchError(this.errHandler.handleError));
  }


  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.token = null;
    this.rolebase = null;
    this.islogin = false;
  }
}
