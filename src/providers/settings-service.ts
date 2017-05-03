import { Injectable } from '@angular/core';
import {GeolocationService} from "./geolocation-service";

/*
  Load the settings
 */
@Injectable()
export class SettingsService
{

  // Not units = fahrenheit
  private _units: string;
  private _gender: string;
  private _location: Position;
  private _avatar: boolean;

  constructor() {
    this._units = "celsius";
    this._gender = "female";
    this._avatar = true;
    this.setCurrentLocation();
  }

  setAvatar(avatar: boolean){
    this._avatar = avatar;
  }

  setUnits(units: string) {
    this._units = units;
  }

  setGender(gender: string) {
    this._gender = gender;
  }

  setLocation(pos: Position) {
    this._location = pos;
  }

  setCurrentLocation() {
    let geolocation = new GeolocationService();
    geolocation.load()
      .then(data => this._location = data)
  }

  get avatar(): boolean{
    return this._avatar;
  }

  get units(): string {
    return this._units;
  }

  get gender(): string {
    return this._gender;
  }

  get location(): Position {
    return this._location;
  }
}
