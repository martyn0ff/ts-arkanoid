import { Vector } from "../types";
import { Sprite } from "./Sprite";

export class Ball implements Sprite {
  private _image: HTMLImageElement;
  private _width: number;
  private _height: number;
  private _position: Vector;
  private _velocity: Vector;

  constructor(
    size: number,
    position: Vector,
    image: string,
    speed: number
  ) {
    this._width = size;
    this._height = size;
    this._position = position;
    this._image = new Image();
    this._image.src = image;

    this._velocity = {
      x: speed,
      y: -speed
    }
    
  }

  get image(): HTMLImageElement {
    return this._image;
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

  changeYDirection(): void {
    this._velocity.y = -this._velocity.y;
  }

  changeXDirection(): void {
    this._velocity.x = -this._velocity.x;
  }

  moveBall(): void {
    this._position.x += this._velocity.x;
    this._position.y += this._velocity.y;
  }
  
}