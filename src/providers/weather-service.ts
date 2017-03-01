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

  load() {
    if (this.data) {
      return Promise.resolve(this.data)
    }

    return new Promise( (resolve) => {
      Geolocation.getCurrentPosition()
        .then((pos: Position) => {
          let url = "http://api.openweathermap.org/data/2.5/weather?";
          let coords = "lat=" + Math.round(pos.coords.latitude) + "&lon=" + Math.round(pos.coords.longitude);
          const key = "6a24316a673761513e82c0ee0315bdea";
          let appID = "&APPID=" + key;
          return url + coords + appID;
        })
        .then((url: string) => this.http
            .get(url)
            .map(response => response.json())
            .subscribe(data => {
              this.data = data;
              resolve(data);
            })
        )
    })
  }
}
