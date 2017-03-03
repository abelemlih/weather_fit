import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import {ClothingItem} from "./clothing-item";

/*
  Generated class for the ClothingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ClothingService {

  constructor() {}

  generate_alternate(clothing_dict: Object, weather_attributes: Object ) {
    function isSuitable(clothing: ClothingItem) {
      for (let attr in weather_attributes) {
        if (clothing.attributes[attr] <= weather_attributes[attr]) return false
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
        let item_attributes = item.attributes;
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
}
