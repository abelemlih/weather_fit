import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { WeatherService } from '../../providers/weather-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[WeatherService]
})
export class HomePage {

  public weather: any;

  constructor(public navCtrl: NavController, public weatherService: WeatherService) {
    this.loadWeather();
  }

  loadWeather(){
    this.weatherService.load()
      .then(data => {
        this.weather = data;
      })
  }

}
