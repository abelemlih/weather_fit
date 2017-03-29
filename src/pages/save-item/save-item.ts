import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClothingDataService} from "../../providers/clothing-data-service";

/*
  Generated class for the SaveItem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-save-item',
  templateUrl: 'save-item.html'
})
export class SaveItemPage {

  clothingItemForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public storage: ClothingDataService) {

    this.clothingItemForm = formBuilder.group({
      file_name: [''],
      piece: [''],
      name: [''],
      max_temp: [''],
      min_temp: [''],
      rain: [''],
      snow: [''],
    });
  }

  save() {
    let item = {
      name: this.clothingItemForm.value.name,
      url: "../../assets/clothing/" + this.clothingItemForm.value.file_name,
      max_temp: this.clothingItemForm.value.max_temp,
      min_temp: this.clothingItemForm.value.min_temp,
      rain: this.clothingItemForm.value.rain,
      snow: this.clothingItemForm.value.snow,
      grade: .5
    };
    this.storage.getData()
      .then( items => {
        items[this.clothingItemForm.value.piece].push(item);
        console.log(items);
      });
  }

}
