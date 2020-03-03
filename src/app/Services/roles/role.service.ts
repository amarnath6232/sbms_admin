import { Injectable } from '@angular/core';
import { IpService } from '../ip.service';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../error-handler.service';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { permissionsList, RoleList } from 'src/app/share/modal/modal';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private Ip = "http://192.168.10.57:";
  private port = this.ip.usermanagement_port;
  private roles = '/rest/v1/roles';
  private permissions = "/rest/v1/permissions";

  roleList = new BehaviorSubject<RoleList[]>([]);
  permissionList = new BehaviorSubject<permissionsList[]>([]);
  edit_Permission_Value = new BehaviorSubject<permissionsList>(null);
  copy_role = new BehaviorSubject<RoleList>(null);


  constructor(private ip: IpService,
    private http: HttpClient,
    private errHandler: ErrorHandlerService) { }

  /* create permissions */
  createPermission(permission) {
    return this.http.post(`${this.ip.ip}${this.port}${this.permissions}/create`, permission)
      .pipe(map((res) => {
        return res;
      }), catchError(this.errHandler.handleError));
  }

  /* get permissions */
  getPermissions() {
    return this.http.get<permissionsList[]>(`${this.ip.ip}${this.port}${this.permissions}`)
      .pipe(map(res => {
        if (res != null) {
          this.permissionList.next(res);
          console.log("permissions", res);
        }
        return res;
      }), catchError(this.errHandler.handleError));
  }

  /* edit permissions */
  editPermissions(permission: permissionsList) {
    console.log("edit pers service", permission);
    return this.http.put(`${this.ip.ip}${this.port}${this.permissions}/${permission.permissionId}`, permission)
      .pipe(map(res => {
        this.getPermissions().subscribe();
        return res;
      }), catchError(this.errHandler.handleError));
  }

  /* delete permissions */
  deletePermissions(id) {
    return this.http.delete(`${this.ip.ip}${this.port}${this.permissions}/${id}`)
      .pipe(map(res => {
        this.getPermissions().subscribe();
      }), catchError(this.errHandler.handleError));
  }

  /* create role */
  createRole(role) {
    console.log("role", role);
    return this.http.post(`${this.ip.ip}${this.port}${this.roles}/create`, role)
      .pipe(catchError(this.errHandler.handleError));
  }

  /* role list */
  getRoleList() {
    return this.http.get<any[]>(`${this.ip.ip}${this.port}${this.roles}/`)
      .pipe(map(res => {
        this.roleList.next(res);
        return res;
      }), catchError(this.errHandler.handleError));
  }

  /* role update */
  updateRole(roles) {
    return this.http.put(`${this.ip.ip}${this.port}${this.roles}/${roles.roleId}`, roles)
      .pipe(map(res => {
        this.getRoleList().subscribe();
        return res;
      }), catchError(this.errHandler.handleError));
  }

  /* role update */
  deleteRole(id) {
    return this.http.delete(`${this.ip.ip}${this.port}${this.roles}/${id}`)
      .pipe(map(() => {
        this.getRoleList().subscribe();
      }), catchError(this.errHandler.handleError));
  }

}
