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

    function isSuitable(clothing: ClothingItem) {
      // TODO: rewrite this function to filter clothing items according to weather data
      // data format can be found at https://openweathermap.org/current#parameter

      // for (let attr in weather_data) {
      //   if (clothing._attributes[attr] < weather_data[attr]) return false;
      // }
      return true
    }

    let result = {};
    console.log(clothing_dict);
    for (let attr in clothing_dict) result[attr] = clothing_dict[attr].filter(isSuitable);

    return result;
  }

  initializeDB() {
    this.clothingData.initialize();
  }


  testClothingService(){
    let shirt = new ClothingItem("tshirt","/top",{"warm":8,"cold":0,"rain":0});
    let puffyJacket = new ClothingItem("puffy jacket","/top",{"warm":2,"cold":0,"rain":0});
    let shorts = new ClothingItem("shorts","/bottom",{"warm":8,"cold":0,"rain":0});
    let hawaian_shorts = new ClothingItem("hawaian shorts","/bottom",{"warm":8,"cold":0,"rain":0});
    let flipflops = new ClothingItem("flipflops","/shoe",{"warm":8,"cold":0,"rain":0});
    console.log("Start of script");
    let clothing_dict =  {};
    clothing_dict["top"] = [shirt,puffyJacket];
    clothing_dict["bottom"] = [shorts,hawaian_shorts];
    clothing_dict["shoe"] = [flipflops];
    let weather_dict = {};
    weather_dict["warm"] = 7;
    weather_dict["cold"] = -1;
    weather_dict["rain"] = -1;
    console.log("End of script");
  }
}
