import { Vector } from "../types";
import { Sprite } from "./Sprite";

export class Brick implements Sprite {
  private _image: HTMLImageElement;
  private _width: number;
  private _height: number;
  private _position: Vector;
  private _health: number;

  constructor(
    width: number,
    height: number,
    position: Vector,
    image: string,
    health: number
  ) {
    this._width = width;
    this._height = height;
    this._position = position;
    this._health = health;

    this._image = new Image();
    this._image.src = image;
  }

  get width(): number {
    return this._width;
  }
  
  get height(): number {
    return this._height;
  }

  get position(): Vector {
    return this._position;
  }

  get image(): HTMLImageElement {
    return this._image;
  }

  get health(): number {
    return this._health;
  }
  set health(health: number) {
    this._health = health;
  }
}