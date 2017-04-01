import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {ClothingItem} from "./clothing-item";
import {ClothingDataService} from "./clothing-data-service";
import {WeatherService} from "./weather-service";
import * as unitConversion from "../assets/tools/unit_conversions"

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
    function extract_weather_data(api_weather: any) {
      let min_temp = unitConversion.kelvin_to_celsius(api_weather.main.temp_max) 
      let max_temp = unitConversion.kelvin_to_celsius(api_weather.main.temp_min)
      let rain = false, snow = false
      if ("rain" in api_weather) { rain = true}
      if ("snow" in api_weather) { snow = true}
      return {min_temp: min_temp, max_temp: max_temp, rain: rain, snow: snow}
    }
    
    return Promise.all([this.clothingData.getData(), this._weatherService.load()])
      .then( (values) => {
        let clothing_items = values[0];
        let weather_data = values[1];
        return this.generate(clothing_items, extract_weather_data(weather_data));
      })
  }
  
  private generate(clothing_dict: Object, weather_data: {min_temp:number, max_temp:number, rain:boolean, snow:boolean}) {
    function isSuitable(clothing: ClothingItem) {
      // weather data format can be found at https://openweathermap.org/current#parameter
      if (weather_data.max_temp > clothing.max_temp || weather_data.min_temp < clothing.min_temp) {return false }
      if ((weather_data.rain==true && clothing.rain==false) || (weather_data.snow==true && clothing.snow==false)) { return false }
      return true
    }
    
    let result = {};
    for (let attr of ["top", "bottom", "accessories"]) { result[attr] = clothing_dict[attr].filter(isSuitable) }
    return result;
  }
  

  initializeDB() {
    this.clothingData.initialize();
  }

}
