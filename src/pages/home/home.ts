
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

    this.loadCurrentLocation()
      .then(() => {
        this.loadWeather();
        this.loadRecommendation();
      });
    // this.loadRecommendation();
    // clothingData.getData()
    //   .then((data) => console.log(data));
  }

  loadCurrentLocation() {
    return this.geolocationService.load()
      .then((pos) => this.weatherService.pos = pos);
  }

  loadRecommendation() {
    this.clothingService.weatherService = this.weatherService;
    return this.clothingService.recommend()
      .then( (recom) => {
        this.recommendation = recom;
        }
      )
      .catch((error) => console.log("Failed to load clothingService\n" + error.toString()))
  }

  loadWeather() {
    return this.weatherService.load()
      .then(data => {
        this.weather = data;
        this.temp_num = this.weather.main.temp - 273.15;
        this.toCel();
        // console.log(this.weather)
      })
      .catch( (error) => console.log("Failed to load weather data\n" + error.toString())
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
