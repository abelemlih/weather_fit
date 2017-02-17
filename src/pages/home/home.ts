import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { WeatherService } from '../../providers/weather-service'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [WeatherService]
})
export class HomePage {

  weather: any;
  temp_num: number;
  temp_str: string;

  constructor(public navCtrl: NavController,
              public weatherService: WeatherService) {
    this.loadWeather();
  }

  loadWeather() {
    this.weatherService.load()
      .then(data => {
        this.weather = data;
        this.init();
      })
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

}
