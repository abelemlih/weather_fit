
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { WeatherService } from '../../providers/weather-service'

import { GeolocationService } from '../../providers/geolocation-service'

import {SettingsPage} from '../settings/settings';

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
              public geolocationService: GeolocationService) {
    this.loadWeather();
  }

  loadWeather() {
    this.geolocationService.load()
      .catch( (error) => console.log("Failed to get Geolocation\n" + error.toString()))
      .then((pos: Position) => {
        this.weatherService.pos = pos;
        return this.weatherService.load();
      })
      .then(data => {
        this.weather = data;
        this.init();
      })
      .catch( (error) => console.log("Failed to load weather data to HomePage\n" + error.toString())
      )
  }

  showSettingsPage() {
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

}
