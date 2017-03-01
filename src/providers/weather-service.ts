import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the WeatherService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class WeatherService {

  data: any;
  private _pos: Position;

  constructor(public http: Http) {}

  load() {
    if (this.data) {
      return Promise.resolve(this.data)
    }

    return new Promise( (resolve) => {
      let url = "http://api.openweathermap.org/data/2.5/weather?";
      let coords = "lat=" + Math.round(this._pos.coords.latitude) + "&lon=" + Math.round(this._pos.coords.longitude);
      const key = "6a24316a673761513e82c0ee0315bdea";
      let appID = "&APPID=" + key;

      this.http
        .get(url + coords + appID)
        .map(response => response.json())
        .subscribe(data => {
          this.data = data;
          resolve(data);
        })
    })
  }


  get pos(): Position {
    return this._pos;
  }

  set pos(value: Position) {
    this._pos = value;
  }
}
