
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { WeatherService } from '../../providers/weather-service'

import { GeolocationService } from '../../providers/geolocation-service'

import {SettingsPage} from '../settings/settings';

import {SettingsService} from "../../providers/settings-service";

import {ClothingService} from "../../providers/clothing-service";
import {Storage} from "@ionic/storage";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [WeatherService, GeolocationService, ClothingService]
})
export class HomePage {

  weather: any;
  temp_num: number;
  temp_str: string;

  recommendation: any;

  constructor(public navCtrl: NavController,
              public weatherService: WeatherService,
              public geolocationService: GeolocationService,
              public settingsService: SettingsService,
              public clothingService: ClothingService,
              public storage: Storage) {

    this.loadWeatherTest();
    this.loadRecommendation();
    // clothingData.getData()
    //   .then((data) => console.log(data));
    // this.printItem2();
  }

  loadRecommendation() {
    this.clothingService.recommend()
      .then( (recom) => {
        this.recommendation = recom;
        }
      )
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
        this.temp_num = this.weather.main.temp - 273.15;
        this.toCel();
        // console.log(this.weather)
      })
      .catch( (error) => console.log("Failed to load weather data to HomePage\n" + error.toString())
      )
  }

  loadWeatherTest() {
    this.weatherService.load()
      .catch(error => console.log("weatherService fails"))
      .then(data =>{
        this.weather = data;
        this.temp_num = this.weather.main.temp - 273.15;
        this.toCel();
      })
      .catch(error => console.log("loadWeatherTest fails"))
  }

  ionViewWillEnter() {
    if (this.weather != undefined) {
      if (this.settingsService.units == "celsius") this.toCel();
      else this.toFah();
    }
  }

  ionViewDidLoad() {
    this.storage.get('first-login')
      .then(done => {
        if (!done) {
          this.storage.set('first-login', true);
          this.clothingService.initializeDB();
        }
      })
  }

  pushSettingsPage() {
    this.navCtrl.push(SettingsPage)
      .catch( (error) => console.log("Failed to push to SettingsPage"));
  }

  toCel() {
    this.temp_str = this.temp_num.toFixed().toString() + "°C";
  }

  toFah(){
    let fah_temp = (this.temp_num * 1.8) + 32;
    this.temp_str = fah_temp.toFixed().toString() + "°F";
  }

}
