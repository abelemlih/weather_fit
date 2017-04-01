
import { Component } from '@angular/core';

import {NavController, Slides} from 'ionic-angular';

import { WeatherService } from '../../providers/weather-service'

import { GeolocationService } from '../../providers/geolocation-service'

import {SettingsPage} from '../settings/settings';

import {SettingsService} from "../../providers/settings-service";

import {ClothingService} from "../../providers/clothing-service";
import {Storage} from "@ionic/storage";

import {ViewChild} from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [WeatherService, GeolocationService, ClothingService],
})
export class HomePage {

  @ViewChild('slideOne') slideOne: Slides;
  @ViewChild('slideTwo') slideTwo: Slides;
  @ViewChild('slideThree') slideThree: Slides;

  weather: any;
  temp_num: number;
  temp_str: string;
  color: Array<string> = ["transparent", "transparent", "transparent"];
  picked: Array<boolean> = [false, false, false];
  option: any;

  recommendation: any;

  constructor(public navCtrl: NavController,
              public weatherService: WeatherService,
              public geolocationService: GeolocationService,
              public settingsService: SettingsService,
              public clothingService: ClothingService,
              public storage: Storage) {
    this.option = {
      loop: true
    };
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
        this.updateUnits();
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
        this.updateUnits();
      })
      .catch(error => console.log("loadWeatherTest fails"))
  }

  updateUnits() {
    if (this.settingsService.units == "celsius")
      this.temp_str = this.temp_num.toFixed().toString() + "°C";
    else {
        let fah_temp = (this.temp_num * 1.8) + 32;
        this.temp_str = fah_temp.toFixed().toString() + "°F";
    }
  }

  ionViewWillEnter() {
    if (this.temp_num != undefined) this.updateUnits();
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


  //Changes the color, locking slides after user taps the slides
  slideTapped(index)
  {
    console.log(this.slideOne);
    this.slideThree.lockSwipes(true);
    console.log("Slide tapped");
    this.picked[index] = !this.picked[index];
    // console.log(this.slide_list);
    if (this.picked[index])
    {
      this.color[index] = "#B1FEB1";
      // this.slide_list[index].lockSwipes(true);
    }
    else
    {
      this.color[index] = "transparent";
      // this.slides.lockSwipes(false);
      // this.slide_list[index].lockSwipes(false);
    }
  }
}
