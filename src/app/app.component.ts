import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from "../pages/settings/settings";

import { SettingsService } from '../providers/settings-service';
import {WeatherService} from "../providers/weather-service";

import {Storage} from '@ionic/storage';


@Component({
  templateUrl: 'app.html',
  providers: [SettingsService, WeatherService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;

  pages: Array<{title: string, component: any, icon : string}>;

  constructor(public platform: Platform, public storage: Storage) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon : "home" },
      { title: 'Settings', component: SettingsPage, icon : "settings" }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.storage.get('first-login')
        .then(done => {
          if (!done) {
            console.log("First login");
            this.storage.set('first-login', true);
            // this.clothingService.initializeDB();
          }
        })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component)
      .catch( (error) => console.log("Failed to load " + page.title));
  }
}
