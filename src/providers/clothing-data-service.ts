import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';
import {ClothingItem} from "./clothing-item";

/*
  Generated class for the ClothingDataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ClothingDataService {

  constructor(public storage: Storage, public http: Http) {}

  /**
   * Get data of the clothing items from the storage
   */
  getData() {
    return this.storage.get("ClothingData")
      .then(data => {
        let res = {};
        // Turn the raw json strings into clothing item objects
        for (let attr of ["top", "bottom", "accessories"]) {
          res[attr] = data[attr].map(item => {
            return new ClothingItem(item.name, item.url, item.max_temp, item.min_temp, item.rain, item.snow, item.grade, item.gender);
          })
        }
        return res;
      });
  }

  save(data: Object) {
    this.storage.set("ClothingData", data)
      .catch((error) => "Failed to store data");
  }

  initialize() {
    this.http.get("assets/clothing/seed.json")
      .map(res => res.json())
      .subscribe(data => {
        this.save(data);
      });
  }
}
