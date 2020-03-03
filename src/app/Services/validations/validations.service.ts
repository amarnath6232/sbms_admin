import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  readonly permissions = {
    name_min: 1,
    name_max: 25,
    description: 200,
  }
}
