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

  private data: any;
  private _pos: Position;


  future_data: any;

  constructor(public http: Http) {}

  loadFutureData()
  /**
   * Load future weather data from the API.
   * @returns {Promise<>} Resolve with future weather data from Open Weather Map API.
   */
  {
    if (this.future_data) {
      return Promise.resolve(this.future_data);
    }

    return new Promise( (resolve) => {
      let url = "http://api.openweathermap.org/data/2.5/forecast?"
      let coordinates = "lat=" + Math.round(this._pos.coords.latitude) + "&lon=" + Math.round(this._pos.coords.longitude);
      // let coordinates = "lat=45&lon=-93";
      const key = "8d8c3c27de32631513a46a6cbc70ea96";
      let appID = "&APPID=" + key;

      this.http
        .get(url + coordinates + appID)
        .map(res => res.json())
        .subscribe(data => {
          this.future_data = data;
          resolve(data);
        })
    })
  }

  load()
  /**
   * Load the weather from the API.
   * @returns {Promise<>} Resolve with current weather data from the API.
   */
  {
    if (this.data) {
      return Promise.resolve(this.data)
    }

    return new Promise( (resolve) => {

      let url = "http://api.openweathermap.org/data/2.5/weather?";
      let coordinates = "lat=" + Math.round(this._pos.coords.latitude) + "&lon=" + Math.round(this._pos.coords.longitude);
      // let coordinates = "lat=45&lon=-93";
      const key = "8d8c3c27de32631513a46a6cbc70ea96";
      let appID = "&APPID=" + key;
      // console.log(url + coordinates + appID);

      this.http
        // Send the HTTP request
        .get(url + coordinates + appID)
        // Turn the response into json format
        .map(response => response.json())
        // Resolve when the data arrives
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
