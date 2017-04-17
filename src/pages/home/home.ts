
import { Component } from '@angular/core';

import {NavController, Slides} from 'ionic-angular';

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

  @ViewChild('slideOne') slideOne: Slides;
  @ViewChild('slideTwo') slideTwo: Slides;
  @ViewChild('slideThree') slideThree: Slides;

  weather: any;
  temp_num: number;
  temp_str: string;
  color: Array<string> = ["transparent", "transparent", "transparent"];
  picked: Array<boolean> = [false, false, false];
  option: any;
  _recommendation: any;
  _clothing_data: any;
  
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

    this.loadCurrentLocation()
      .then(() => {
        this.loadWeather();
        this.loadClothing();
        this.loadRecommendation();
      });
    // clothingData.getData()
    //   .then((data) => console.log(data));
  }
  
  get recommendation() {
    return this._recommendation
  }
  
  set recommendation(recom: any) {
    this._recommendation = recom
  }
  
  
  get clothing_data() {
    return this._clothing_data
  }
  
  set clothing_data(data: any) {
    this._clothing_data = data
  }
  
  //-----------------------------------------------------
  
  loadCurrentLocation() {
    return this.geolocationService.load()
      .then((pos) => this.weatherService.pos = pos);
  }

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

  // This will make it repopulate the database every login, which is good for testing purposes.
  // Correctly it should only be run on the first log-in.
  ionViewDidLoad() {

    // This will make it repopulate the database every login, which is good for testing purposes.
    // Correctly it should be inside the then() method so that it only runs once.
    this.clothingService.initializeDB();
  }

  pushSettingsPage() {
    this.navCtrl.push(SettingsPage)
      .catch( (error) => console.log("Failed to push to SettingsPage"));
  }

  //Changes the color of the slide, locks slides when the slide is green
  slideTapped(index)
  {
    this.picked[index] = !this.picked[index];
    if (this.picked[index])
    {
      this.color[index] = "#EDFAFD";
      this.convertIndexToSlide(index).lockSwipes(true);
    }
    else
    {
      this.color[index] = "transparent";
      this.convertIndexToSlide(index).lockSwipes(false);
    }
  }
  
  allTapped() {
    function findIndex (element: ClothingItem, array: Array<ClothingItem>): any {
      for (let i in array) { 
        if (array[i].name === element.name) { 
          return i 
        } 
      }
      return `Error: Cannot find element ${element} within ${array}`
    }
    
    function newItemGrade(item: ClothingItem) {
      return ((1-item.grade)*(0.05)) + item.grade
    }
    
    
    if (this.picked.every(Boolean)) {
      //Updating top
      let updated_clothing_data = this.clothing_data
      let clothing_types = ["top","bottom","accessories"]
      for (let i in clothing_types) {
        let chosen_clothing_array = this.recommendation[clothing_types[i]]
        let chosen_item
        
        Promise.resolve('Success')
        .then((res) => {
          let item = chosen_clothing_array[this.convertIndexToSlide(i).getActiveIndex()]
          while(typeof item === "undefined") {
            item = chosen_clothing_array[this.convertIndexToSlide(i).getActiveIndex()]
          }
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
  
  

  //Converts indices to the correct slide variable
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
