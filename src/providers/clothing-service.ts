import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the ClothingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ClothingService {

  constructor(public http: Http) {
    console.log('Hello ClothingService Provider');
  }

}

export class ClothingItem {
  private _name: string;
  private _url: string;

  // Key: "cold", "warm", "rain", "sunny"
  private _attributes: {} = {};

  user_grade: number; // 0 to 5 stars

  // hex color code
  // color: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get attributes(): {} {
    return this._attributes;
  }

  set attributes(value: {}) {
    this._attributes = value;
  }

  constructor(item_name: string, url: string, item_attributes: Object) {
    this._name = item_name;
    this._url = url;
    this._attributes = item_attributes;
  }
}

export class ClothingCombination {
  id: string;
  attributes: {[attribute: string]: number;} = {}; //Key: attribute ; Value: int 0-10 that represents the rate of the attribute within the clothingCombination
  items: {[item_type: string]: ClothingItem;} = {}; //Key: item type ; Value: item object
  user_grade: number; //0 to 5 stars
  prv_shown: number; //0 for not shown and 1 for already shown
  algorithm_grade: number;

  constructor(comb_id: string, comb_items: {}) {
    this.id = comb_id;
    this.items = comb_items;
  }

  get_id() {
    return this.id;
  }

  get_attributes() {
    return this.attributes;
  }

  get_items() {
    return this.items;
  }


  get_user_grade() {
    return this.user_grade;
  }

  get_prv_shown() {
    return this.prv_shown;
  }

  get_algorithm_grade() {
    return this.algorithm_grade;
}

  edit_attributes(new_attributes: {}) {
    this.attributes = new_attributes;
  }

  edit_items(new_items: {}) {
    this.items = new_items;
  }


  edit_user_grade(new_user_grade: number) {
    this.user_grade = new_user_grade;
  }

  to_json() {
    return JSON.stringify(this);
  }

  store(storage: Storage) {
    storage.set(this.get_id(),this.to_json());
  }



}

export class Tools {

  // order_clothing_combinations(combinations: Array<ClothingCombination>) {
  //   return combinations.sort(function(comb_a,comb_b) {
  //     if (comb_a.get_algorithm_grade() < comb_b.get_algorithm_grade()) {
  //       return -1;
  //     }
  //     if (comb_a.get_algorithm_grade() > comb_b.get_algorithm_grade()) {
  //       return 1;
  //     }
  //     return 0;
  //   })
  // }

  constructor() {};

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
      console.log(item_include);
      return item_include;
    }


    let t = new Tools;
    let matching_clothing_dict: {};
    for (let type in clothing_dict) {
      let type_array = [];
      for (let item of clothing_dict[type]) {
        if (loop_attributes(item,attributes)) {
          type_array.push(item);
        }
        console.log(item);
      }
      //matching_clothing_dict[type] = type_array;
      console.log(type_array);
    }
    return matching_clothing_dict;
  }

  generates(clothing_dict: Object, weather_attributes: Object ) {
    function isSuitable(clothing: ClothingItem) {
      for (let attr in weather_attributes) {
        if (clothing.attributes[attr] <= weather_attributes[attr]) return false
      }
      return true
    }

    let result = {};
    for (let attr in weather_attributes) {
      console.log(attr);
      console.log(clothing_dict[attr])
      // result[attr] = clothing_dict[attr].filter(isSuitable)
    }
    return result;
  }

}
