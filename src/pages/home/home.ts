
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { WeatherService } from '../../providers/weather-service'

import { GeolocationService } from '../../providers/geolocation-service'

import {SettingsPage} from '../settings/settings';

import {SettingsService} from "../../providers/settings-service";
import {ClothingDataService} from "../../providers/clothing-data-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [WeatherService, GeolocationService]
})
export class HomePage {

  weather: any;
  temp_num: number;
  temp_str: string;

  constructor(public navCtrl: NavController,
              public weatherService: WeatherService,
              public geolocationService: GeolocationService,
              public settingsService: SettingsService,
              public clothingData: ClothingDataService) {

    this.loadWeather();
    clothingData.getData()
      .then((data) => console.log(data));
  }

  loadWeather() {
    this.geolocationService.load()
      .catch( (error) => console.log("Failed to get Geolocation\n" + error.toString() + " code " + error.code))
      .then((pos: Position) => {
        this.weatherService.pos = pos;
        return this.weatherService.load();
      })
      .then(data => {
        this.weather = data;
        this.init();
        // console.log(this.weather)
      })
      .catch( (error) => console.log("Failed to load weather data to HomePage\n" + error.toString())
      )

  }

  ionViewWillEnter() {
    if (this.weather != undefined) {
      if (this.settingsService.units == "celsius") this.toCel();
      else this.toFah();
    }
  }

  pushSettingsPage() {
    this.navCtrl.push(SettingsPage)
      .catch( (error) => console.log("Failed to push to SettingsPage"));
  }

  init() {
    this.temp_num = this.weather.main.temp - 273.15;
    this.toCel();
  }

  toCel() {
    this.temp_str = this.temp_num.toFixed().toString() + "°C";
  }

  toFah(){
    let fah_temp = (this.temp_num * 1.8) + 32;
    this.temp_str = fah_temp.toFixed().toString() + "°F";
  }

  printIem(){
    // let shirt = new ClothingItem("#1","tshirt","top",{"warm":8,"cold":0,"rain":0});
    // let shorts = new ClothingItem("#2","shorts","bottom",{"warm":8,"cold":0,"rain":0});
    // let flipflops = new ClothingItem("#3","flipflops","shoe",{"warm":8,"cold":0,"rain":0});
    // let t = new Tools;
    // console.log("Start of script");
    // var type_array: ClothingItem[] = [];
    // //t.loop_attributes(type_array,shirt,{"warm":7,"cold":-1,"rain":-1});
    // var clothing_dict =  {};
    // clothing_dict["top"] = shirt;
    // clothing_dict["bottom"] = shorts;
    // clothing_dict["shoe"] = flipflops;
    // var weather_dict = {};
    // weather_dict["warm"] = 7;
    // weather_dict["cold"] = -1;
    // weather_dict["rain"] = -1;
    // t.generate(clothing_dict,weather_dict);
    // console.log("End of script");
  }

}
