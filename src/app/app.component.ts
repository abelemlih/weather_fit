import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from "../pages/settings/settings";

import { SettingsService } from '../providers/settings-service';
import {WeatherService} from "../providers/weather-service";

import {Storage} from '@ionic/storage';
import {ClothingService} from "../providers/clothing-service";
import {GeolocationService} from "../providers/geolocation-service";
import {ClothingDataService} from "../providers/clothing-data-service";


@Component({
  templateUrl: 'app.html',
  providers: [SettingsService, WeatherService, ClothingService, GeolocationService, ClothingDataService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any, icon : string}>;

  constructor(public platform: Platform, public storage: Storage,
              public clothingDataService: ClothingDataService, public settingService: SettingsService) {
    this.pages = [
      { title: 'Home', component: HomePage, icon : "home" },
      { title: 'Settings', component: SettingsPage, icon : "settings" }
    ];

    this.initializeApp()
      .then(() => this.rootPage = HomePage);
  }

  initializeApp() {
    return this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // this.clothingDataService.initialize();
      // console.log("Initializing");

      return this.storage.ready()
        .then(() => {
	      return this.storage.get('first-login');
	      })
        // return this.clearStorage()
        //   .then(() => {
        //   return this.storage.get('first-login')
        //   })
        .then(res => {
          console.log("Value of first-login:");
          console.log(res.toString());
          if (!res) {
            console.log("First login");
            this.storage.set('first-login', true);
            return Promise.all([this.clothingDataService.initialize(), this.settingService.initialize()]);
          }
          else return this.settingService.update();
        });
    })
  }

  clearStorage() {
    return this.storage.clear();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component)
      .catch( (error) => console.log("Failed to load " + page.title));
  }
}
