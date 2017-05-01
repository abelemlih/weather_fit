# weatherFit: for the weather confused!

weatherFit is an [Ionic](https://ionicframework.com/) application that help users choose their attire for the day. The app generates choices for tops, bottoms, and accessories that match the weather of the day.

### Getting started

To run weatherFit, you first need to install Ionic. Steps to install Ionic: http://ionicframework.com/docs/v1/guide/installation.html 

To install all the dependencies of the weatherFit app, run this command on your terminal: 

```
$ npm install
```

To run weatherFit, run this command on your terminal:

```
$ ionic serve
```

### User Manual

There are two pages within the weatherFit app: __Home__ and __Settings__.

__Home__

Home is the main page within the app and contains both the day's weather information and the clothing suggestions. 

The upper section of the app contains the current temperature, maximum and minimum temperature, wind speed, and the location of the user. By default, the app accesses the current location of the user. Therefore, the app always needs to be authorized to access the current location from the device. #Add screenshots from the app

The lower section of the app displays the clothing suggestions through the three sliders. The first sliders displays tops, the second bottoms, and the third shoes. #Add screenshts from the app

To change the temperature units or the gender of the clothing, or display/hide the avatar, the user can click on the wrench logo in the upper right corner of the Home page.

__Settings__

Settings is the page where the user can change the temperature units or the gender of the clothing, or display/hide the avatar. When the user is done changing the options, they can click the Back button in the upper left corner of the page and the app will reload to display the weather or clothing suggestions based on the new user preferences.

### Developer Documentation

__Pages__

Location: /src/pages

Pages in the app: __Home__ and __Settings__


|  File |  Content |
|---|---|
|__home.ts__|Contains the methods that load the homepage and respond to user interactions|
|__home.scss__|Contains the stylesheets of the homepage|
|__home.html__|Contains the markup of the elements of the homepage|
|__settings.ts__|Contains the methods that load the settings page and respond to user interactions|
|__settings.scss__|Contains the stylesheets of the settings page|
|__settings.html__|Contains the markup of the elements of the settings page|

__Providers__

Location: /src/providers

|  File |  Content |
|---|---|
|__clothing-data-service.ts__|Contains methods to initialize, save, and retrieve clothing data|
|__clothing-item.ts__|Class that represents a clothing item within the application. Contains getters, setters, and methods to check whether a clothing item matches weather, precipitation, and gender|
|__clothing-service.ts__|Contains methods to filter clothing recommendations with respect to weather, and user preferences|
|__geolocation-service.ts__|Contains a method to retrieve the current location of the user|
|__settings-service.ts__|Class that represents the settings of the app. Contains getters and setters for the settings parameters|
|__weather-service.ts__|Contains methods to retrieve weather data using the OpenWeatherMap API|

__Assets__

Location: /src/assets

|  File |  Content |
|---|---|
|__avatar__||
|__clothing__||
|__icon__||
|__tools__||
|__weather__||
|__weather_animated__||


__Resources__

* OpenWeatherMap API: https://openweathermap.org/current#parameter

* OpenWeatherMap Weather Condition Codes: https://openweathermap.org/weather-conditions

* Ionic Geolocation: https://ionicframework.com/docs/native/geolocation/

* Ionic Storage: https://ionicframework.com/docs/storage/


