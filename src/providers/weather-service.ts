import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GeolocationService} from "./geolocation-service";


/*
  Generated class for the WeatherService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class WeatherService {

  private data: any;
  public pos: any;


  future_data: any;

  constructor(public http: Http, public geolocationService: GeolocationService) {}

  loadFutureData()
  /**
   * Load future weather data from the API.
   * @returns {Promise<>} Resolve with future weather data from Open Weather Map API.
   */
  {
    if (this.future_data) {
      return Promise.resolve(this.future_data);
    }

    return this.geolocationService.load()
      .then((pos) => {
      let url = "http://api.openweathermap.org/data/2.5/forecast?";

      // Default to North Saint Paul
      if (!this.pos) this.pos = {"longitude": -93, "latitude": 45};

      let coordinates = "lat=" + Math.round(this.pos.latitude) + "&lon=" + Math.round(this.pos.longitude);
      const key = "8d8c3c27de32631513a46a6cbc70ea96";
      let appID = "&APPID=" + key;
      return new Promise((resolve) => {
        this.http
        .get(url + coordinates + appID)
        .map(res => res.json())
        .subscribe(data => {
          this.future_data = data;
        })
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

    return this.geolocationService.load()
      .then((pos) => {
      let url = "http://api.openweathermap.org/data/2.5/weather?";

      // Default to North Saint Paul
      if (!this.pos) this.pos = {"longitude": -93, "latitude": 45};

      let coordinates = "lat=" + Math.round(this.pos.latitude) + "&lon=" + Math.round(this.pos.longitude);
      const key = "8d8c3c27de32631513a46a6cbc70ea96";
      let appID = "&APPID=" + key;
      // console.log(url + coordinates + appID);
      return new Promise((resolve) => {
        this.http
        // Send the HTTP request
        .get(url + coordinates + appID)
        // Turn the response into json format
        .map(response => response.json())
        // Resolve when the data arrives
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
      })
    })
  }
}
