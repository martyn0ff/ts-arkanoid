import { Vector } from "../types";
import { Sprite } from "./Sprite";

export class Paddle implements Sprite {
  private _image: HTMLImageElement;
  private _width: number;
  private _height: number;
  private _position: Vector;
  private _speed: number;
  private _moveLeft: boolean;
  private _moveRight: boolean;

  constructor(
    width: number,
    height: number,
    position: Vector,
    image: string,
    speed: number
  ) {
    this._width = width;
    this._height = height;
    this._position = position;
    this._image = new Image();
    this._image.src = image;

    this._speed = speed;
    this._moveLeft = false;
    this._moveRight = false;

    // Event listeners
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
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
  get isMovingLeft(): boolean {
    return this._moveLeft;
  }
  get isMovingRight(): boolean {
    return this._moveRight;
  }

  movePaddle(): void {
    if (this._moveLeft) {
      this._position.x -= this._speed;
    }
    if (this._moveRight) {
      this._position.x += this._speed;
    }
  }

  handleKeyUp = (ev: KeyboardEvent): void => {
    if (ev.code === "ArrowLeft" || ev.key === "ArrowLeft") {
      this._moveLeft = false;
    }
    if (ev.code === "ArrowRight" || ev.key === "ArrowRight") {
      this._moveRight = false;
    }
  };

  handleKeyDown = (ev: KeyboardEvent): void => {
    if (ev.code === "ArrowLeft" || ev.key === "ArrowLeft") {
      this._moveLeft = true;
    }
    if (ev.code === "ArrowRight" || ev.key === "ArrowRight") {
      this._moveRight = true;
    }
  };
}
