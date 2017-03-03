export class ClothingItem {
  private _name: string;
  private _url: string;

  // Key: "cold", "warm", "rain"
  private _attributes: {} = {};

  // 0 to 5 stars
  // user_grade: number;

  // hex color code
  // color: string;

  constructor(item_name: string, url: string, item_attributes: Object) {
    this._name = item_name;
    this._url = url;
    this._attributes = item_attributes;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get attributes(): {} {
    return this._attributes;
  }

  set attributes(value: {}) {
    this._attributes = value;
  }
}
