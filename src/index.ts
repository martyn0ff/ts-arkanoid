import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { CollisionPhysics as CollisionPhysics } from "./CollisionPhysics";

// Images
import PADDLE_IMAGE from "./images/paddle.png";
import BALL_IMAGE from "./images/ball.png";

// Game configuration
import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY,
} from "./setup";

// Helpers
import { calcBricksNum, createBricks } from "./helpers";

// Initial values
let gameOver = false;
let score = 0;
let bricksLeft = -1;

function setGameOver(view: CanvasView) {
  view.drawInfo("Game over!");
  gameOver = true;
}

function setGameWin(view: CanvasView) {
  view.drawInfo("Congratulations, you won!");
  gameOver = true;
}

function gameLoop(
  view: CanvasView,
  bricks: Brick[][],
  paddle: Paddle,
  ball: Ball,
  collisionPhysics: CollisionPhysics
) {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);

  // Move ball
  ball.moveBall();

  // Paddle constraints: keep paddle in playfield
  if (
    (paddle.isMovingLeft && paddle.position.x > 0) ||
    (paddle.isMovingRight &&
      paddle.position.x < view.canvas.width - paddle.width)
  ) {
    paddle.movePaddle();
  }

  collisionPhysics.checkBallCollision(ball, paddle, view);
  const collidingBrick: boolean = collisionPhysics.isCollidingBricks(ball, bricks);

  if (collidingBrick) {
    score++;
    view.drawScore(score);
  }

  // Game over when ball leaves playField
  if (ball.position.y > view.canvas.height) {
    setGameOver(view);
  }

  if (bricksLeft === 0) {
    setGameWin(view);
  }

  requestAnimationFrame(() =>
    gameLoop(view, bricks, paddle, ball, collisionPhysics)
  );
}

function startGame(view: CanvasView) {
  // Reset displays
  view.drawInfo("");
  view.drawScore(0);

  // Reset values
  score = 0;

  // Create collision instance
  const collisionPhysics = new CollisionPhysics();

  // Create bricks & calc number of bricks
  const bricks = createBricks();
  bricksLeft = calcBricksNum(bricks);

  // Create ball
  const ball = new Ball(
    BALL_SIZE,
    {
      x: BALL_STARTX,
      y: BALL_STARTY,
    },
    BALL_IMAGE,
    BALL_SPEED
  );

  // Create paddle
  const paddle = new Paddle(
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 5,
    },
    PADDLE_IMAGE,
    PADDLE_SPEED
  );

  // Change info message
  view.drawInfo("");

  // Start game loop
  gameLoop(view, bricks, paddle, ball, collisionPhysics);
}

// Create new view
const view = new CanvasView("#playField");
view.initStartButton(startGame);
