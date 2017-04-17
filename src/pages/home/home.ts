
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
  mintemp_str: string;
  maxtemp_str: string;
  min_temp: number;
  max_temp: number;
  current_time: Date;
  threeHour_time: Date;
  sixHour_time: Date;
  nineHour_time: Date;
  twelveHour_time: Date;

  recommendation: any;
  future_weather: any;

  constructor(public navCtrl: NavController,
              public weatherService: WeatherService,
              public geolocationService: GeolocationService,
              public settingsService: SettingsService,
              public clothingService: ClothingService,
              public storage: Storage) {

    this.loadCurrentLocation()
      .then(() => {
        this.loadWeather();
        this.loadFutureWeather();
        this.loadTime();
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

  loadFutureWeather() {
    return this.weatherService.loadFutureData()
      .then(data => {
        this.future_weather = data;
      })
  }

  loadWeather() {
    return this.weatherService.load()
      .then(data => {
        this.weather = data;
        this.temp_num = this.weather.main.temp - 273.15;
        this.min_temp = this.weather.main.temp_min  - 273.15;
        this.max_temp = this.weather.main.temp_max - 273.15;

        this.updateUnits();
        // console.log(this.weather)
      })
      .catch( (error) => console.log("Failed to load weather data\n" + error.toString())
      )
  }

  loadTime(){
    this.weatherService.loadFutureData()
      .then(data => {
        this.future_weather = data;

        this.current_time =  new Date(this.future_weather.list[0].dt);
        // this.current_time.setUTCSeconds(utcSeconds);
        // this.threeHour_time = this.future_weather.list[1].dt;
        // this.sixHour_time = this.future_weather.list[2].dt;
        // this.nineHour_time = this.future_weather.list[3].dt;
        // this.twelveHour_time = this.future_weather.list[4].dt;
        })

      .catch( (error) => console.log("Failed to load time data\n" + error.toString())
      )
  }


  loadWeatherTest() {
    this.weatherService.load()
      .catch(error => console.log("weatherService fails"))
      .then(data =>{
        this.weather = data;
        this.temp_num = this.weather.main.temp - 273.15;
        this.updateUnits();
      })
      .catch(error => console.log("loadWeatherTest fails"))
  }

  updateUnits() {
    if (this.settingsService.units == "celsius"){
      this.temp_str = this.temp_num.toFixed().toString() + "°C";
      this.mintemp_str = this.min_temp.toFixed().toString();
      this.maxtemp_str = this.max_temp.toFixed().toString() + "°C";
    }

    else {
        let fah_temp = (this.temp_num * 1.8) + 32;
        let fah_mintemp = (this.min_temp * 1.8) +32;
        let fah_maxtemp = (this.max_temp * 1.8) +32;
        this.temp_str = fah_temp.toFixed().toString() + "°F";
        this.mintemp_str = fah_mintemp.toFixed().toString();
        this.maxtemp_str = fah_maxtemp.toFixed().toString() + "°F";

    }
  }

  ionViewWillEnter() {
    if (this.temp_num != undefined) this.updateUnits();
    if (this.min_temp != undefined) this.updateUnits();
    if (this.max_temp != undefined) this.updateUnits();
  }

  ionViewDidLoad() {
    // This will make it repopulate the database every login, which is good for testing purposes.
    // Correctly it should be inside the then() method so that it only runs once.
    this.clothingService.initializeDB();

    this.storage.get('first-login')
      .then(done => {
        if (!done) {
          this.storage.set('first-login', true);
          // this.clothingService.initializeDB();
        }
      })
  }

  pushSettingsPage() {
    this.navCtrl.push(SettingsPage)
      .catch( (error) => console.log("Failed to push to SettingsPage"));
  }
}
