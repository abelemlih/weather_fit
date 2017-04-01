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
      male: [''],
      female: ['']
    });
  }

  save() {
    let gend: string;
    if (this.clothingItemForm.value.male == this.clothingItemForm.value.female) gend = "neutral";
    else gend = this.clothingItemForm.value.male ? "male" : "female";

    let item = {
      name: this.clothingItemForm.value.name,
      url: "../../assets/clothing/" + this.clothingItemForm.value.file_name,
      max_temp: this.fahtocel(this.clothingItemForm.value.max_temp),
      min_temp: this.fahtocel(this.clothingItemForm.value.min_temp),
      rain: this.clothingItemForm.value.rain,
      snow: this.clothingItemForm.value.snow,
      grade: .5,
      gender: gend,
    };

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
