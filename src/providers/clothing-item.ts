/*
  A class to hold a clothing item data
 */

export class ClothingItem {
  public name: string;
  public url: string;
  public max_temp: number;
  public min_temp: number;
  public rain: boolean;
  public snow: boolean;
  public grade: number;
  public gender: string;

  constructor() {}

  suits_weather(weather_data: any) {
    return (weather_data.max_temp < this.max_temp && weather_data.min_temp > this.min_temp)
  }

  suits_precipitation(weather_data: any) {
    if ((weather_data.rain==true && this.rain==false) || (weather_data.snow==true && this.snow==false)) { return false }
    return true
  }

  suits_gender(user_gender: string) {
    if ((user_gender=="male" && this.gender=="female") || (user_gender=="female" && this.gender=="male")) { return false }
    return true
  }

  increase_grade() {
    this.grade = ((1-this.grade)*(0.05)) + this.grade;
  }

}
