import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IpService } from '../ip.service';
import { ErrorHandlerService } from '../error-handler.service';
import { User, RoleList } from 'src/app/share/modal/modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private site_port = this.ip.site_port;

  roleListById = new BehaviorSubject<RoleList>(null);
  copyEditUser = new Subject<User>();

  /* used in edit user edit */
  userList = new BehaviorSubject<User>(null);

  users_List = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient,
    private ip: IpService,
    private errHandler: ErrorHandlerService) { }

  createByUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.ip.ip}${this.ip.usermanagement_port}/rest/v1/users/create`, user).pipe(catchError(this.errHandler.handleError));
  }

  //Get all Countries
  getCountries(): Observable<any> {
    return this.http.get<any>(`${this.ip.ip}${this.site_port}/rest/v1/location/getCountries`).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  //Get states based on country id
  getStates(id: number): Observable<any> {
    return this.http.get<any>(`${this.ip.ip}${this.site_port}/rest/v1/location/getStates/${id}`).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  //Get cities based on state id
  getCities(id: number): Observable<any> {
    return this.http.get<any>(`${this.ip.ip}${this.site_port}/rest/v1/location/getCities/${id}`).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  //Get Roles
  getRole(): Observable<any> {
    return this.http.get<any>(`${this.ip.ip}${this.ip.usermanagement_port}/rest/v1/roles`).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  //Get USers
  getUsers() {
    return this.http.get<User[]>(`${this.ip.ip}${this.ip.usermanagement_port}/rest/v1/users`).pipe(
      map(res => {
        this.users_List.next(res);
        return res;
      }),
      (catchError(this.errHandler.handleError))
    );
  }

  //Edit user
  updateUsers(user: User, id: number): Observable<User> {
    return this.http.put<User>(`${this.ip.ip}${this.ip.usermanagement_port}/rest/v1/users/${id}`, user).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  //Delete user
  deleteUsers(id: number) {
    return this.http.delete(`${this.ip.ip}${this.ip.usermanagement_port}/rest/v1/users/${id}`).pipe(
      map((res) => { this.getUsers().subscribe(); return res }),
      (catchError(this.errHandler.handleError))
    );
  }

  // Get roles based on id
  getRoleById(roleId: string) {
    return this.http.get<RoleList>(`${this.ip.ip}${this.ip.usermanagement_port}/rest/v1/roles/${roleId}`)
      .pipe(map(res => {
        this.roleListById.next(res);
        return res
      }), (catchError(this.errHandler.handleError)));
  }

}
