import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Load the settings
 */
@Injectable()
export class SettingsService
{

  private data: any;

  constructor(public storage: Storage) {

    storage.get("settings")
      .then((res) => {
      if (!res) {
        this.data = {"units": "celsius", "gender": "female", "avatar": false };
        storage.set("settings", this.data);
      }
      else {
        this.data = res;
      }
      })
      .catch((error) => console.log("Failed to get settings data from storage\n" + error.toString()));
  }

  get avatar(): boolean{
    return this.data["avatar"];
  }

  get units(): string {
    return this.data["units"];
  }

  get gender(): string {
    return this.data["gender"];
  }

  save(gender: String, units: String, avatar: boolean) {
    this.data["avatar"] = avatar;
    this.data["units"] = units;
    this.data["gender"] = gender;
    this.storage.set("settings", this.data);
  }

}
