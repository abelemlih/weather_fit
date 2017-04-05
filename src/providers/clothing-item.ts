export class ClothingItem {
  private _name: string;
  private _url: string;
  private _max_temp: number;
  private _min_temp: number;
  private _rain: boolean;
  private _snow: boolean;
  private _grade: number;
  private _gender: string;


  constructor(name: string, url: string, max_temp: number, min_temp: number,
              rain: boolean, snow: boolean, grade: number, gender: string) {
    this._name = name;
    this._url = url;
    this._max_temp = max_temp;
    this._min_temp = min_temp;
    this._rain = rain;
    this._snow = snow;
    this._grade = grade;
    this._gender = gender;
  }


  get gender(): string {
    return this._gender;
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

  get snow(): boolean {
    return this._snow;
  }


  set grade(value: number) {
    this._grade = value;
  }
}
