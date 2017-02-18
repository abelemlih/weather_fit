import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from 'ionic-native';

/*
  Generated class for the WeatherService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class WeatherService {

  data: any;

  constructor(public http: Http) {}

  getLocation(){
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition()
        .then((resp) => {
            let url = "http://api.openweathermap.org/data/2.5/weather?";
            let lat = Math.round(resp.coords.latitude);
            let long = Math.round(resp.coords.longitude);
            url += "lat=" + lat + "&lon=" + long;
            url += "&APPID=6a24316a673761513e82c0ee0315bdea";
            resolve(url);
          }
        )
        .catch((error) => {
          console.log("Error getting location.");
          reject(error);
        })
    })
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data)
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.getLocation().then((url: string) => {
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          })
      })
    })
  }
}
