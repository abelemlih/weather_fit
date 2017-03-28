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
        let weather_attr = this.processWeather(values[1]);
        return this.generate(values[0], weather_attr);
      })
  }

  private processWeather(data) {
    let warm = 3 + Math.round((data.main.temp - 273.15 - 20) / 10);
    let cold = 3 - Math.round((data.main.temp - 273.15 - 20) / 10);
    let rain = data.weather.main == "Rain" ? 5 : 0;
    return {"warm": warm, "cold": cold, "rain": rain};
  }

//   "max_temp": 10,
// +      "min_temp": -15,
// +      "rain": true,
// +      "grade": 0.5
  private generate(clothing_dict: Object, weather_attributes: Object) {

    function isSuitable(clothing: ClothingItem) {
      if (clothing.min_temp < weather_attributes["min_temp"] 
      || clothing.max_temp > weather_attributes["max_temp"] 
      || clothing.rain!=weather_attributes["rain"]) {
        return false
      }
      return true
    }

    let result = {};
    for (let attr in clothing_dict) result[attr] = clothing_dict[attr].filter(isSuitable);

    return result;
  }
  

  initializeDB() {
    this.clothingData.initialize();
  }

  

  testClothingService(){
    let shirt = new ClothingItem("tshirt","/top",20,30,false,0.4);
    let puffyJacket = new ClothingItem("puffy jacket","/top",5,10,true,0.5);
    let shorts = new ClothingItem("shorts","/bottom",20,40,false,0.5);
    let hawaian_shorts = new ClothingItem("hawaian shorts","/bottom",20,40,false,0.6);
    let flipflops = new ClothingItem("flipflops","/shoe",20,40,false,0.5);
    console.log("Start of script");
    let clothing_dict =  {};
    clothing_dict["top"] = [shirt,puffyJacket];
    clothing_dict["bottom"] = [shorts,hawaian_shorts];
    clothing_dict["shoe"] = [flipflops];
    let weather_dict = {};
    weather_dict["min_temp"] = 3;
    weather_dict["max_temp"] = 11;
    weather_dict["rain"] = true;
    console.log("End of script");
  }
}
