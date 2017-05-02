import {Component} from '@angular/core';

import {ElementRef} from '@angular/core';

import {NavController} from 'ionic-angular';

import {Slides} from 'ionic-angular';

import { WeatherService } from '../../providers/weather-service'

import { GeolocationService } from '../../providers/geolocation-service'

import {SettingsPage} from '../settings/settings';

import {SettingsService} from "../../providers/settings-service";

import {ClothingService} from "../../providers/clothing-service";

import {ClothingItem} from "../../providers/clothing-item";

import {ClothingDataService} from "../../providers/clothing-data-service";

import {Storage} from "@ionic/storage";

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

  mintemp_str: string;
  maxtemp_str: string;

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
  _recommendation: any;
  _clothing_data: any;

  /**
   *
   * @param navCtrl
   * @param weatherService
   * @param geolocationService
   * @param settingsService
   * @param clothingService
   * @param clothingDataService
   * @param storage
   */
  constructor(public navCtrl: NavController,
              private weatherService: WeatherService,
              public geolocationService: GeolocationService,
              public settingsService: SettingsService,
              public clothingService: ClothingService,
              public clothingDataService: ClothingDataService,
              public storage: Storage) {
    this.option = {
      loop: true
    };

    // Load the current location before loading everything else
    this.loadCurrentLocation()
      .then(() => {
        this.loadWeather();
        this.loadTime();
        this.loadClothing();
        this.loadRecommendation();
      });
    // clothingData.getData()
    //   .then((data) => console.log(data));
  }

  /**
   *
   * @returns {any}
   */
  get recommendation() {
    return this._recommendation
  }

  /**
   *
   * @param recom
   */
  set recommendation(recom: any) {
    this._recommendation = recom
  }

  /**
   *
   * @returns {any}
   */
  get clothing_data() {
    return this._clothing_data
  }

  /**
   *
   * @param data
   */
  set clothing_data(data: any) {
    this._clothing_data = data
  }

  /**
   * Update the avatar on/off based on the settings
   */
  updateAvatar() {
    if (this.settingsService.avatar)
      this.clothingDiv.nativeElement.style.backgroundImage = "url(../../assets/avatar/true.png)";
    else {
      this.clothingDiv.nativeElement.style.backgroundImage = "url(../../assets/avatar/false.png)";
    }
  }

  /**
   *
   * @returns {PromiseLike<TResult>|Promise<R>|Promise<TResult>|Promise<T>|Promise<TResult2|TResult1>}
   */
  loadCurrentLocation() {
    return this.geolocationService.load()
      .then((pos) => this.weatherService.pos = pos);
  }

  /**
   * Load all the clothing data from the storage. Returns a promise that resolves with the data.
   */
  loadClothing() {
    return this.clothingDataService.getData()
    .then( (data) => {
      this._clothing_data = data;
      }
    )
    .catch((error) => console.log("Failed to load clothingDataService\n" + error.toString()))
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

  // For testing purposes
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
    if (this.temp_num != undefined) {
      this.updateUnits();
      this.updateAvatar();
    }
  }

  /**
   *
   */
  ionViewDidLoad() {

    // This will make it repopulate the database every login, which is good for testing purposes.
    this.clothingService.initializeDB();

    // This will make it popilates the database on first login
    // this.storage.get('first-login')
    //   .then(done => {
    //     if (!done) {
    //       this.storage.set('first-login', true)
    //         .catch((error) => console.log("Can not set first login\n" + error.toString()));
    //       this.clothingService.initializeDB();
    //     }
    //   })
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
    
    /**
    * Find index of a clothing item within an array of clothing items
    * @return number which represents the index of the item searched
    */
    function findIndex (element: ClothingItem, array: Array<ClothingItem>): any {
      for (let i in array) {
        if (array[i].name === element.name) {
          return i
        }
      }
      return `Error: Cannot find element ${element} within ${array}`
    }

    /**
    * Generate new grade for a clothing item
    * @return number that represents the new grade of the clothing item
    */
    function newItemGrade(item: ClothingItem) {
      return ((1-item.grade)*(0.05)) + item.grade
    }


    if (this.picked.every(Boolean)) {
      let updated_clothing_data = this.clothing_data
      let clothing_types = ["top","bottom","accessories"]
      for (let i in clothing_types) {
        let chosen_clothing_array = this.recommendation[clothing_types[i]]
        let chosen_item

        Promise.resolve('Success')
        .then((res) => {
          let item = chosen_clothing_array[this.convertIndexToSlide(i).getActiveIndex()]
          return item
        })
        .catch((error) => console.log("Failed to load current chosen item\n" + error.toString()))

        .then((_chosen_item) => {
          chosen_item = _chosen_item
          chosen_item.grade = newItemGrade(chosen_item)
          return 1
        })
        .catch((error) => console.log("Failed to update chosen item grade\n" + error.toString()))

        .then((res) => {
          return findIndex(chosen_item, updated_clothing_data["top"])
        })
        .catch((error) => console.log("Failed to find index of chosen item\n" + error.toString()))

        .then((_chosen_item_index) => {
          console.log(`Type: ${clothing_types[i]} ; Item: ${chosen_item.name} ; new grade: ${chosen_item.grade}`)
          updated_clothing_data[clothing_types[i]] = updated_clothing_data[clothing_types[i]].splice(_chosen_item_index,1).concat([chosen_item])
          this.clothing_data = updated_clothing_data
          return 'Success';
        })
        .catch((error) => console.log("Failed to update clothing data\n" + error.toString()))
      }
      this.storage.set("ClothingData", updated_clothing_data)
        .catch((error) => "Failed to store data");
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
