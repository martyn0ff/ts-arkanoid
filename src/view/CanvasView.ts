// Types
import { Brick } from "../sprites/Brick";
import { Paddle } from "../sprites/Paddle";
import { Ball } from "../sprites/Ball";
import { Sprite } from "~/sprites/Sprite";

export class CanvasView {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D | null;
  private _scoreDisplay: HTMLObjectElement | null;
  private _startButton: HTMLOListElement | null;
  private _info: HTMLObjectElement | null;

  constructor(canvasId: string) {
    this._canvas = document.querySelector(canvasId) as HTMLCanvasElement;
    this._context = this._canvas.getContext('2d');
    this._scoreDisplay = document.querySelector("#score");
    this._startButton = document.querySelector("#start");
    this._info = document.querySelector("#info");
  }

  // Canvas should be visible
  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  // Clear canvas
  clear(): void {
    this._context?.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  /**
   * Initialization of start button
   * @param startFunction callback function that will execute on button click
   */
  initStartButton(startFunction: (view: CanvasView) => void): void {
    this._startButton?.addEventListener("click", () => startFunction(this))
  }

  /**
   * Draws given score on its div#score.
   * @param score Score to be drawn
   */
  drawScore(score: number): void {
    if (this._scoreDisplay) {
      this._scoreDisplay.innerHTML = score.toString();
    }
  }

  /**
   * Draws given info text (game over, press play, etc.) on its div#info.
   * @param text Text to be drawn
   */
  drawInfo(text: string): void {
    if (this._info) {
      this._info.innerHTML = text;
    }
  }

  /**
   * Draws a sprite. Sprite's information such as its dimensions, image and (x, y) coordinates belong to a sprite.
   * @param sprite sprite to draw
   */
  drawSprite(sprite: Sprite): void {
    // if given sprite is null or undefined
    if (!sprite) {
      return;
    }
    
      this._context?.drawImage(
        sprite.image,
        sprite.position.x,
        sprite.position.y,
        sprite.width,
        sprite.height
      );
  }


  /**
   * Draws bricks for a level.
   * @param bricks - array of bricks to be drawn
   */
  drawBricks(bricks: Brick[][]): void {
    bricks.forEach(brickRow => brickRow.forEach(brick => this.drawSprite(brick)));
  }

}