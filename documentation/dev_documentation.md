# Weather Fit: for the weather confused!

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
and then access the app on your browser through http://localhost:8100/ (preferably Google Chrome or Mozilla Firefox)

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
|__clothing-service.ts__|Contains methods to filter clothing recommendations with respect to weather and user preferences|
|__geolocation-service.ts__|Contains a method to retrieve the current location of the user|
|__settings-service.ts__|Class that represents the settings of the app. Contains getters and setters for the settings parameters|
|__weather-service.ts__|Contains methods to retrieve weather data using the OpenWeatherMap API|

__Assets__

Location: /src/assets

|  File |  Content |
|---|---|
|__avatar__| Folder that contains the avatar related pictures|
|__clothing__| Folder that contains pictures of clothing displayed on the app|
|__weather animated__| Folder that contains weather animations|


__Resources__

* OpenWeatherMap API: https://openweathermap.org/current#parameter

* OpenWeatherMap Weather Condition Codes: https://openweathermap.org/weather-conditions

* Ionic Geolocation: https://ionicframework.com/docs/native/geolocation/

* Ionic Storage: https://ionicframework.com/docs/storage/


