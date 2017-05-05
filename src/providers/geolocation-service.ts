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
  options: any;

  constructor() {
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  }

  load()
  /**
   * Load the current location via the Geolocation plugin
   * @returns A promise that resolves with the current location.
   */
  {
    console.log("Inside load() in geolocation service");
    console.log(this.data.toString());
    if (this.data != undefined) return this.data;

    return Geolocation.getCurrentPosition(this.options)
      .then(data => {
	      console.log("Got data from geolocation");
	      console.log(data.toString());
      })	      
      .catch(error => console.log("Failed to get current position"));
  }
}
