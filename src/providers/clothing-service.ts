import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import {ClothingItem} from "./clothing-item";
import {ClothingDataService} from "./clothing-data-service";
import {WeatherService} from "./weather-service";

/*
  Generated class for the ClothingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ClothingService {

  private _weatherService: WeatherService;

  set weatherService(value: WeatherService) {
    this._weatherService = value;
  }

  constructor(public clothingData: ClothingDataService) {}

  recommend() {
    return Promise.all([this.clothingData.getData(), this._weatherService.load()])
      .then( (values) => {
        let clothing_items = values[0];
        let weather_data = values[1];
        return this.generate(clothing_items, weather_data);
      })
  }

  private generate(clothing_dict: Object, weather_data: Object ) {
    function isSuitable(clothing) {
      // TODO: rewrite this function to filter clothing items according to weather data
      // weather data format can be found at https://openweathermap.org/current#parameter

      // for (let attr in weather_data) {
      //   if (clothing._attributes[attr] < weather_data[attr]) return false;
      // }
      return true
    }

    let result = {};
    for (let attr of ["top", "bottom", "accessories"]) {
      result[attr] = clothing_dict[attr].filter(isSuitable);
    }

    return result;
  }
  

  initializeDB() {
    this.clothingData.initialize();
  }

}
