export class ClothingItem {
  private _name: string;
  private _url: string;
  private _max_temp: number;
  private _min_temp: number;
  private _rain: boolean;
  private _grade: number;


  constructor(name: string, url: string, max_temp: number, min_temp: number, rain: boolean, grade: number) {
    this._name = name;
    this._url = url;
    this._max_temp = max_temp;
    this._min_temp = min_temp;
    this._rain = rain;
    this._grade = grade;
  }


  get name(): string {
    return this._name;
  }

  get url(): string {
    return this._url;
  }

  get max_temp(): number {
    return this._max_temp;
  }

  get min_temp(): number {
    return this._min_temp;
  }

  get rain(): boolean {
    return this._rain;
  }

  get grade(): number {
    return this._grade;
  }


  set grade(value: number) {
    this._grade = value;
  }
}
