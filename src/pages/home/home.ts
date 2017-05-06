
import {ElementRef, Component} from '@angular/core';

import {NavController} from 'ionic-angular';

import {Slides} from 'ionic-angular';

import { WeatherService } from '../../providers/weather-service'

import { GeolocationService } from '../../providers/geolocation-service'

import {SettingsPage} from '../settings/settings';

import {SettingsService} from "../../providers/settings-service";

import {ClothingService} from "../../providers/clothing-service";

import {ClothingDataService} from "../../providers/clothing-data-service";

import {ViewChild} from '@angular/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [WeatherService, GeolocationService, ClothingService],
})
export class HomePage {

  //Variables associated with slide functions
  @ViewChild('slideOne') slideOne: Slides;
  @ViewChild('slideTwo') slideTwo: Slides;
  @ViewChild('slideThree') slideThree: Slides;
  color: Array<string> = ["transparent", "transparent", "transparent"];
  picked: Array<boolean> = [false, false, false];

  // Control for the avatar
  @ViewChild('clothing') clothingDiv : ElementRef;

  // The weather data
  weather: any;

  // Temperature in different formats
  temp_num: number;
  temp_str: string;

  // The range of temperature for the day
  temperature_range: string;

  // Minimum and maximum temperature for the current weather
  min_temp: number;
  max_temp: number;

  // Current time to display
  current_time: Date;

  // Future weather data from the API
  future_weather: any;

  option: any;

  // Recommendation array of clothing items from the clothing services
  recommendation: any;

  /**
   * Construct the home page and load everything.
   */
  constructor(public navCtrl: NavController,
              private weatherService: WeatherService,
              public geolocationService: GeolocationService,
              public settingsService: SettingsService,
              public clothingService: ClothingService,
              public clothingDataService: ClothingDataService) {

    this.option = {
      loop: true
    };

    console.log("HomePage constructor");
    console.log("Load weather promise");
    this.loadTime();
    this.loadFutureWeather();
    this.loadWeather()
    .then(() => {
      console.log("Load recommendation promise");
      return this.loadRecommendation();
    })
    .catch((error) => console.log("Failed chain promise in Homepage\n" + error.toString()));
  }


  /**
   * Update the avatar on/off based on the settings
   */
  updateAvatar() {
    if (this.settingsService.avatar) {
      this.clothingDiv.nativeElement.style.backgroundImage = "url(assets/avatar/true.png)";
    }
    else {
      this.clothingDiv.nativeElement.style.backgroundImage = "url(assets/avatar/false.png)";
    }
  }

  loadRecommendation() {
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
      })
      .catch( (error) => console.log("Failed to load weather data\n" + error.toString())
      )
  }

  /**
   *
   */
  loadTime(){
    this.weatherService.loadFutureData()
      .then(data => {
        this.future_weather = data;

        this.current_time =  new Date(this.future_weather.list[0].dt_txt);
        // this.current_time.setUTCSeconds(utcSeconds);
        // this.threeHour_time = this.future_weather.list[1].dt;
        // this.sixHour_time = this.future_weather.list[2].dt;
        // this.nineHour_time = this.future_weather.list[3].dt;
        // this.twelveHour_time = this.future_weather.list[4].dt;
        })

      .catch( (error) => console.log("Failed to load time data\n" + error.toString())
      )
  }

  /**
   * Update units of the temperature according to the settings
   */
  updateUnits() {
    if (this.settingsService.units == "celsius"){
      this.temp_str = this.temp_num.toFixed().toString() + "°C";
      this.temperature_range = this.min_temp.toFixed().toString() + " ~ " + this.max_temp.toFixed().toString() + "°C";
    }

    else {
        let fah_temp = (this.temp_num * 1.8) + 32;
        let fah_mintemp = (this.min_temp * 1.8) +32;
        let fah_maxtemp = (this.max_temp * 1.8) +32;
        this.temp_str = fah_temp.toFixed().toString() + "°F";
        this.temperature_range = fah_mintemp.toFixed().toString() + " ~ " + fah_maxtemp.toFixed().toString() + "°F";
    }
  }

  /**
   * Re-update the units and the avatar each time the home page is loaded
   */
  ionViewWillEnter() {
    if (this.recommendation != undefined) {
      this.updateAvatar();
      this.updateUnits();
      this.loadRecommendation()
        .catch((error) => console.log("Failed to reload recommendation\n" + error.toString()));
    }
  }

  /**
   * Go to settings page
   */
  pushSettingsPage() {
    this.navCtrl.push(SettingsPage)
      .catch( (error) => console.log("Failed to push to SettingsPage"));
  }

  /**
   * When the slideTapped event occurs, lock the slide
   * @param index a number representative of the slides in array form
   */
  slideTapped(index)
  {
    this.picked[index] = !this.picked[index];
    if (this.picked[index])
    {
      this.convertIndexToSlide(index).lockSwipes(true);
    }
    else
    {
      this.convertIndexToSlide(index).lockSwipes(false);
    }
  }

  /**
   * Update the grade of the items chosen by the user when the three sliders are clicked
   */
  allTapped() {
    if (this.picked.every(Boolean)) {
      let clothing_types = ["top","bottom","accessories"];

      for (let i in [0, 1, 2]) {
        // the index of the slide that is being selected/shown on screen
        let activeIndex = this.convertIndexToSlide(i).getActiveIndex();

        // the corresponding item
        let item = this.recommendation[clothing_types[i]][activeIndex];
        console.log(item);
        item.increase_grade();
      }

      return this.clothingDataService.saveData();
    }
  }

  /**
   * Converts indices in reference to slides to the correct slide variable
   * @param index a number representative of the slides in array form
   * @returns {Slides} a specific slide variable that corresponds to the index in question
   */
  convertIndexToSlide(index)
  {
    if (index == 0)
    {
      return this.slideOne;
    }
    else if (index == 1)
    {
      return this.slideTwo;
    }
    else if (index == 2)
    {
      return this.slideThree;
    }
  }
}
