import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';

/*
  Generated class for the ClothingDataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ClothingDataService {

  constructor(public storage: Storage, public http: Http) {}

  getData() {
    return this.storage.get("ClothingData");
  }

  save(data: Object) {
    this.storage.set("ClothingData", data)
      .catch((error) => "Failed to store data");
  }

  initialize() {
    this.http.get("../../assets/clothing/seed.json")
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.save(data);
      });
  }
}
