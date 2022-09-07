// Etc
import { Vector } from "~/types";

export interface Sprite {
  get image(): HTMLImageElement;
  get width(): number;
  get height(): number;
  get position(): Vector;
}
