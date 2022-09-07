# Preparation

1. First we prepare our development server. In this case, `package.json` and `tsconfig.json` are already provided for us. A TSConfig file mostly includes defaults. 
2. Now we have to install all Node dependencies with `npm install`.
3. After installation is complete, we can run our development server with `npm start`.

<br>

# Code

## `src/images/` (Model)
In this folder we have all necessary images for the background, ball, bricks and paddle. It also contains [declaration file](https://en.wikipedia.org/wiki/TypeScript#Declaration_files) `index.d.ts`:
```ts
declare module '*.png' {
  const value: string;
  export = value;
}
```
In it, we use [wildcard module declarations](https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations). By using `*`, `value` now refers to content of a particular PNG file [needs proof]. In `setup.ts` placed in project folder, we make use of such module in a following way:
```ts
import RED_BRICK_IMAGE from './images/brick-red.png';
import BLUE_BRICK_IMAGE from './images/brick-blue.png';
import GREEN_BRICK_IMAGE from './images/brick-green.png';
import YELLOW_BRICK_IMAGE from './images/brick-yellow.png';
import PURPLE_BRICK_IMAGE from './images/brick-purple.png';

// more stuff...

// map number to an image that would be used later
export const BRICK_IMAGES: { [key: number]: string } = {
  1: RED_BRICK_IMAGE,
  2: GREEN_BRICK_IMAGE,
  3: YELLOW_BRICK_IMAGE,
  4: BLUE_BRICK_IMAGE,
  5: PURPLE_BRICK_IMAGE
};
```

## `src/sprites/` (Model)
Here we have three models: `Ball.ts`, `Brick.ts` and `Paddle.ts`. Each contain classes for an object, which gets exported to be used in `index.ts.`.
```ts
import { Vector } from "../types";

export class Ball {
  // ball
}
```

## `src/view/` (View)
Here we have `CanvasView.ts`, an interface that will be used to represent game visually.

## `src/` (Controller)
In project folder we have `index.ts` (controller), `setup.ts` (configuration) and `types.ts` (custom types).