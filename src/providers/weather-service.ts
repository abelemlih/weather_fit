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

  constructor(public http: Http) {
    console.log('Hello WeatherService Provider');
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data)
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get("http://api.openweathermap.org/data/2.5/weather?id=5045360&APPID=6a24316a673761513e82c0ee0315bdea")
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(this.data);
          resolve(this.data);
        })
    })
  }
}
