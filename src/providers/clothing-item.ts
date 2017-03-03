export class ClothingItem {
  private _name: string;
  private _url: string;

// Key: "cold", "warm", "rain"
  public _attributes: {};

// 0 to 5 stars
  // user_grade: number;

  // hex color code
  // color: string;

  constructor(public item_name: string, url: string, item_attributes: Object) {
    this._name = item_name;
    this._url = url;
    this._attributes = item_attributes;
  }
}
