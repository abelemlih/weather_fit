import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {ClothingItem} from "./clothing-item";
import {ClothingDataService} from "./clothing-data-service";
import {WeatherService} from "./weather-service";
import {SettingsService} from "./settings-service";
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
    
    function between(id,min,max) { return id >= min && id <= max}
    
    function extract_condition(api_weather: any, min_id: number, max_id: number) {
      for (let code of api_weather.weather) { if (between(code.id, min_id, max_id)) { return true } }
      return false
    }
    
    function extract_weather_data(api_weather: any) {
      let min_temp = unitConversion.kelvin_to_celsius(api_weather.main.temp_max) 
      let max_temp = unitConversion.kelvin_to_celsius(api_weather.main.temp_min)
      //Refer to https://openweathermap.org/weather-conditions for weather codes
      let rain = extract_condition(api_weather,500,531), snow = extract_condition(api_weather,600,622)
      return {min_temp: min_temp, max_temp: max_temp, rain: rain, snow: snow}
    }
    
    return Promise.all([this.clothingData.getData(), this._weatherService.load()])
      .then( (values) => {
        let clothing_items = values[0];
        let weather_data = values[1];
        //TODO: replace "neutral" with user_gender that we get from settings
        return this.generate(clothing_items, extract_weather_data(weather_data), "neutral");
      })
  }
  
  private generate(clothing_dict: any, weather_data: any , user_gender: string) {
    
    function capFilter(clothing_array: ClothingItem[], cap: number) {
      let random_clothing_array = [], not_picked = 0
      for (let item of clothing_array) {
        if (Math.random() < item.grade || not_picked >= clothing_array.length - cap) {
          random_clothing_array.push(item)
          if (random_clothing_array.length==cap) { break }
        }
        else { not_picked = not_picked + 1 } 
      }
      if (clothing_array.length <= cap) { return clothing_array }
      else { return random_clothing_array }   
  }
    
    function isSuitable(clothing: ClothingItem) {
      // weather data format can be found at https://openweathermap.org/current#parameter
      if (weather_data.max_temp > clothing.max_temp || weather_data.min_temp < clothing.min_temp) {return false }
      if ((weather_data.rain==true && clothing.rain==false) || (weather_data.snow==true && clothing.snow==false)) { return false }
      if ((user_gender=="male" && clothing.gender=="female") || (user_gender=="female" && clothing.gender=="male")) { return false }
      return true 
    }
    
    let result = {};
    for (let attr of ["top", "bottom", "accessories"]) { 
      //Phase 1: Suitable for weather and gender
      result[attr] = clothing_dict[attr].filter(isSuitable)
      //Phase 2: Filtering by cap
      result[attr] = capFilter(result[attr], 15)
    }
    return result;
  }
  

  initializeDB() {
    this.clothingData.initialize();
  }
}
