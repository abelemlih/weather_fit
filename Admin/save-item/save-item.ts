import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClothingDataService} from "../../providers/clothing-data-service";
import {ClothingItem} from "../../providers/clothing-item";

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
      male: [''],
      female: ['']
    });
  }

  save() {
    let gend: string;
    if (this.clothingItemForm.value.male == this.clothingItemForm.value.female) gend = "neutral";
    else gend = this.clothingItemForm.value.male ? "male" : "female";

    let item = new ClothingItem(this.clothingItemForm.value.name,
      "../../assets/clothing/" + this.clothingItemForm.value.file_name,
      this.fahtocel(this.clothingItemForm.value.max_temp),
      this.fahtocel(this.clothingItemForm.value.min_temp),
      this.clothingItemForm.value.rain,
      this.clothingItemForm.value.snow,
      .5,
      gend,
    );
    this.storage.getData()
      .then( items => {
        items[this.clothingItemForm.value.piece].push(item);
        console.log(items);
      });
  }

  fahtocel(num) {
    return (num - 32) * 5 / 9;
  }

}
