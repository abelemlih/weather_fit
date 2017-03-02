import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';

import { SettingsService } from '../providers/settings-service';


@Component({
  templateUrl: 'app.html',
  providers: [SettingsService]
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, private settingsService: SettingsService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
