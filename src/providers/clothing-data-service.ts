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

  data: any;
  /**
   * Get data of the clothing items from the storage
   */
  getData() {
    if (this.data) return Promise.resolve(this.data);

    return this.storage.get("ClothingData")
        .then((data) => {
        this.data = this.transform(data);
        return this.data;
      })
  }

  transform(data: Object) {
    let res = {};
    // Turn the raw json strings into clothing item objects
    for (let attr of ["top", "bottom", "accessories"]) {
      res[attr] = data[attr].map(item => {
        let newItem = new ClothingItem();
        for (let i in item) newItem[i] = item[i];
        return newItem;
      })
    }
    return res;
  }

  saveData() {
    let data = {};

    this.storage.set("ClothingData", this.data)
      .catch((error) => console.log("Failed to save data to storage\n" + error.toString()));
  }

  initialize() {
    return new Promise((resolve) => {
      this.http.get("assets/clothing/seed.json")
        .map(res => res.json())
        .subscribe(res => {
          this.storage.set("ClothingData", res)
            .then(() => resolve(true))
        });
    });
    }
}
