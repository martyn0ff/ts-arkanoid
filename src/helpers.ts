import { Brick } from './sprites/Brick';

import { BRICK_IMAGES, LEVEL, STAGE_PADDING, BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING, BRICK_HEALTH } from './setup';

/**
 * Creates array of bricks from values specified in setup.ts. We iterate over LEVEL
 * @returns Array of bricks
 */

export function createBricks(): Brick[][] {
  return LEVEL.reduce((acc, elem, idx) => {
    const row: number[] = elem;
    const rowReduced: Brick[] = row.reduce((acc, elem, subIdx) => {
      const rowNo = idx;
      const colNo = subIdx;

      const x = STAGE_PADDING + colNo * (BRICK_WIDTH + BRICK_PADDING);
      const y = STAGE_PADDING + rowNo * (BRICK_HEIGHT + BRICK_PADDING);

      if (elem === 0) {
        return acc;
      }

      return [...acc, new Brick(BRICK_WIDTH, BRICK_HEIGHT, { x, y }, BRICK_IMAGES[elem], BRICK_HEALTH[elem])];
    }, [] as Brick[]);

    return [...acc, rowReduced];
  }, [] as Brick[][]);
}

export function calcBricksNum(bricks: Brick[][]): number {
  let count = 0;
  bricks.forEach((brickRow) => {
    brickRow.forEach((brick) => {
      count++;
    });
  });
  return count;
}
