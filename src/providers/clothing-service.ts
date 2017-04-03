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
        //TODO: replace "neutral" with user_gender that we get from settings
        return this.generate(clothing_items, extract_weather_data(weather_data), "neutral");
      })
  }
  
  private generate(clothing_dict: Object, weather_data: {min_temp:number, max_temp:number, rain:boolean, snow:boolean}, user_gender: string) {
    
    function capFilter(clothing_array: ClothingItem[], cap: number) {
      // This function is defined, but not used anywhere
      function randomCheck(clothing: ClothingItem) {
        let random = Math.random()
        console.log("Clothing item: " + clothing.name + ", Random number: " + random.toString() + ", User grade: " + clothing.grade.toString())
        return (random < clothing.grade)
      }
      
      function randomFilter(clothing_array: ClothingItem[]) {
        let return_array = [], cap_lim = 0, i = 0, l = clothing_array.length
        while (cap_lim < l-cap && i<=l-1) {
          randomCheck(clothing_array[i]) ? return_array.push(clothing_array[i]) : cap_lim++ 
          i++
        }
        return return_array.concat(clothing_array.slice(i,l))
      }
      
      return (clothing_array.length <= cap ? clothing_array : randomFilter(clothing_array))
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
      result[attr] = clothing_dict[attr].filter(isSuitable)
      result[attr] = capFilter(clothing_dict[attr], 2)
    }
    return result;
  }
  

  initializeDB() {
    this.clothingData.initialize();
  }

}
