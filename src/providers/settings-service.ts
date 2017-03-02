import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GeolocationService} from "./geolocation-service";

/*
  Generated class for the SettingsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SettingsService {

  // Not units = fahrenheit
  private _units: string;
  private _gender: string;
  private _location: Position;

  constructor(public http: Http) {
    this._units = "celsius";
    this._gender = "female";
    this.setCurrentLocation();
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
