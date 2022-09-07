// Types
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Ball } from "./sprites/Ball";
import { CanvasView } from "./view/CanvasView";

export class CollisionPhysics {
  // Check ball collision with individual brick
  isCollidingBrick(ball: Ball, brick: Brick): boolean {
    if (
      ball.position.x < brick.position.x + brick.width &&
      ball.position.x + ball.width > brick.position.x &&
      ball.position.y < brick.position.y + brick.height &&
      ball.position.y + ball.height > brick.position.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Check ball collision with all bricks
  isCollidingBricks(ball: Ball, bricks: Brick[][]): boolean {
    let isColliding = false;

    bricks.forEach((bricksRow) => {
      bricksRow.forEach((brick, idx) => {
        if (this.isCollidingBrick(ball, brick)) {
          ball.changeYDirection();

          if (brick.health === 1) {
            bricksRow.splice(idx, 1);
          } else {
            brick.health--;
          }

          isColliding = true;
        }
      });
    });
    return isColliding;
  }

  checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
    // Collision with paddle
    if (
      ball.position.x + ball.width > paddle.position.x &&
      ball.position.x < paddle.position.x + paddle.width &&
      ball.position.y + ball.height === paddle.position.y
    ) {
      ball.changeYDirection();
    }

    // Collision with walls
    // Ball movement X constraints
    if (
      ball.position.x > view.canvas.width - ball.width ||
      ball.position.x < 0
    ) {
      ball.changeXDirection();
    }

    // Ball movement Y constraints
    if (ball.position.y < 0) {
      ball.changeYDirection();
    }
  }
}
