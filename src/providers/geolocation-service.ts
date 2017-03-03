import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Geolocation } from 'ionic-native';

/*
  Generated class for the GeolocationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GeolocationService {

  data: any;

  constructor() {}

  load() {
    if (this.data != undefined) return this.data;

    return Geolocation.getCurrentPosition()
      .catch(error => console.log("Failed to get current position"));
  }
}
