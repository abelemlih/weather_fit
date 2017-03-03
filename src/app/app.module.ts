import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SettingsPage } from '../pages/settings/settings';
import { Storage } from '@ionic/storage';
import {ClothingDataService} from "../providers/clothing-data-service";
import {SaveItemPage} from "../pages/save-item/save-item";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    SaveItemPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    SaveItemPage
  ],

  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, ClothingDataService]

})
export class AppModule {}
