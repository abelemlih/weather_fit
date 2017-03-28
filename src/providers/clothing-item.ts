export class ClothingItem {
  private _name: string;
  private _url: string;
  public _min_temp: number;
  public _max_temp: number;
  public _rain: boolean;
  public _grade: number;
  

  constructor(public name: string, url: string, min_temp: number, max_temp: number, rain: boolean , grade: number) {
    this._name = name;
    this._url = url;
    this._min_temp = min_temp;
    this._max_temp = max_temp;
    this._rain = rain;
    this._grade = grade;
  }
  
  get min_temp():number {
    return this._min_temp;
  }
  
  get max_temp():number {
    return this._max_temp;
  }
  
  get rain():boolean {
    return this._rain;
  }
  
  get grade():number {
    return this._grade;
  }
}
