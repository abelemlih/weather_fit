import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../../providers/settings-service';


/*
 Generated class for the Settings page.
 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  units;
  gender;
  location;
  avatar;

  /**
   *
   * @param navCtrl
   * @param navParams
   * @param settingsService
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public settingsService: SettingsService) {
    this.units = settingsService.units;
    this.gender = settingsService.gender;
    this.avatar = settingsService.avatar;

  }

  /**
   * Save the settings on leaving the settings page
   */
  ionViewWillLeave() {
    this.settingsService.save(this.gender, this.units, this.avatar);
  }
}
