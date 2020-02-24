import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor() { }
  ip: string = "http://192.168.10.108:";
  login_Port: string = "8081";
}
