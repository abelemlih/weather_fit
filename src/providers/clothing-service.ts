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

  constructor(public clothingData: ClothingDataService, public weatherService: WeatherService) {}

  recommend() {
    return Promise.all([this.clothingData.getData(), this.weatherService.load()])
      .then( (values) => {
        let weather_attr = this.processWeather(values[1]);
        return this.generate_alternate(values[0], weather_attr);
      })
  }

  private processWeather(data) {
    let warm = 3 + Math.round((data.main.temp - 273.15 - 20) / 10);
    let cold = 3 - Math.round((data.main.temp - 273.15 - 20) / 10);
    let rain = data.weather.main == "Rain" ? 5 : 0;
    return {"warm": warm, "cold": cold, "rain": rain};
  }

  private generate_alternate(clothing_dict: Object, weather_attributes: Object ) {

    function isSuitable(clothing: ClothingItem) {
      for (let attr in weather_attributes) {
        if (clothing._attributes[attr] < weather_attributes[attr]) return false;
      }
      return true
    }

    let result = {};
    for (let attr in clothing_dict) {
      result[attr] = clothing_dict[attr].filter(isSuitable);
    }

    return result;
  }

  generate(clothing_dict: {}, attributes: {}) {
    function loop_attributes (item: ClothingItem, attributes: {}) {
      let item_include = true;
      for (let a in attributes) {
        let item_attributes = item._attributes;
        if (attributes[a] <= item_attributes[a]) {
          item_include = item_include && true;
        }
        else {
          item_include = item_include && false;
          break;
        }
      }
      return item_include;
    }

    let matching_weather_dict = {};
    for (let type in clothing_dict) {
      let matching_type_array: ClothingItem[] = [];
      let type_items = clothing_dict[type];
      for (let item of type_items) {
        if (loop_attributes(item,attributes)) {
          matching_type_array.push(item);
        }
      }
      matching_weather_dict[type] = matching_type_array;

    }

    return matching_weather_dict;
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
