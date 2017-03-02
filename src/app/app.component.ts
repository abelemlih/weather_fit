import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';

import { SettingsService } from '../providers/settings-service';
import { SettingsPage } from "../pages/settings/settings";


@Component({
  templateUrl: 'app.html',
  providers: [SettingsService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;

  pages: Object;

  constructor(public platform: Platform, private settingsService: SettingsService) {
    this.initializeApp();

    this.pages = {
      "Home": HomePage,
      "Settings": SettingsPage
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component)
      .catch( (error) => console.log("Failed to load " + page.title));
  }
}
