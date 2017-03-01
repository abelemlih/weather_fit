import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { WeatherService } from '../../providers/weather-service'

import { ClothingItem } from '../../providers/clothing-service'

import { ClothingCombination } from '../../providers/clothing-service'

import { Tools } from '../../providers/clothing-service'

import {SettingsPage} from '../settings/settings';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [WeatherService]
})
export class HomePage {

  weather: any;
  temp_num: number;
  temp_str: string;
  tools: Tools;

  constructor(public navCtrl: NavController, public weatherService: WeatherService, public storage: Storage) {
    this.loadWeather();
    this.printIem();

  }

  loadWeather() {
    this.weatherService.load()
      .then(data => {
        this.weather = data;
        // console.log(this.weather);
        this.init();
      })
  }

  showSettingsPage() {
    this.navCtrl.push(SettingsPage);
}

  init() {
    this.temp_num = this.weather.main.temp - 273.15;
    this.temp_str = this.temp_num.toFixed(2);
  }

  toCel() {
    this.temp_str = this.temp_num.toFixed(2);
  }

  toFah(){
    let fah_temp = (this.temp_num * 1.8) + 32;
    this.temp_str = fah_temp.toFixed(2);
  }

  printIem(){
    let shirt = new ClothingItem("#1","tshirt","top",{"warm":7});
    console.log("Start of script");
    console.log(shirt.get_name());
    console.log("End of script");
  }



}
