// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"view/CanvasView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasView = void 0;

var CanvasView =
/** @class */
function () {
  function CanvasView(canvasId) {
    this._canvas = document.querySelector(canvasId);
    this._context = this._canvas.getContext('2d');
    this._scoreDisplay = document.querySelector("#score");
    this._startButton = document.querySelector("#start");
    this._info = document.querySelector("#info");
  }

  Object.defineProperty(CanvasView.prototype, "canvas", {
    // Canvas should be visible
    get: function get() {
      return this._canvas;
    },
    enumerable: false,
    configurable: true
  }); // Clear canvas

  CanvasView.prototype.clear = function () {
    var _a;

    (_a = this._context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this._canvas.width, this._canvas.height);
  };
  /**
   * Initialization of start button
   * @param startFunction callback function that will execute on button click
   */


  CanvasView.prototype.initStartButton = function (startFunction) {
    var _this = this;

    var _a;

    (_a = this._startButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
      return startFunction(_this);
    });
  };
  /**
   * Draws given score on its div#score.
   * @param score Score to be drawn
   */


  CanvasView.prototype.drawScore = function (score) {
    if (this._scoreDisplay) {
      this._scoreDisplay.innerHTML = score.toString();
    }
  };
  /**
   * Draws given info text (game over, press play, etc.) on its div#info.
   * @param text Text to be drawn
   */


  CanvasView.prototype.drawInfo = function (text) {
    if (this._info) {
      this._info.innerHTML = text;
    }
  };
  /**
   * Draws a sprite. Sprite's information such as its dimensions, image and (x, y) coordinates belong to a sprite.
   * @param sprite sprite to draw
   */


  CanvasView.prototype.drawSprite = function (sprite) {
    var _a; // if given sprite is null or undefined


    if (!sprite) {
      return;
    }

    (_a = this._context) === null || _a === void 0 ? void 0 : _a.drawImage(sprite.image, sprite.position.x, sprite.position.y, sprite.width, sprite.height);
  };
  /**
   * Draws bricks for a level.
   * @param bricks - array of bricks to be drawn
   */


  CanvasView.prototype.drawBricks = function (bricks) {
    var _this = this;

    bricks.forEach(function (brickRow) {
      return brickRow.forEach(function (brick) {
        return _this.drawSprite(brick);
      });
    });
  };

  return CanvasView;
}();

exports.CanvasView = CanvasView;
},{}],"sprites/Ball.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;

var Ball =
/** @class */
function () {
  function Ball(size, position, image, speed) {
    this._width = size;
    this._height = size;
    this._position = position;
    this._image = new Image();
    this._image.src = image;
    this._velocity = {
      x: speed,
      y: -speed
    };
  }

  Object.defineProperty(Ball.prototype, "image", {
    get: function get() {
      return this._image;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "width", {
    get: function get() {
      return this._width;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "height", {
    get: function get() {
      return this._height;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "position", {
    get: function get() {
      return this._position;
    },
    enumerable: false,
    configurable: true
  });

  Ball.prototype.changeYDirection = function () {
    this._velocity.y = -this._velocity.y;
  };

  Ball.prototype.changeXDirection = function () {
    this._velocity.x = -this._velocity.x;
  };

  Ball.prototype.moveBall = function () {
    this._position.x += this._velocity.x;
    this._position.y += this._velocity.y;
  };

  return Ball;
}();

exports.Ball = Ball;
},{}],"sprites/Paddle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paddle = void 0;

var Paddle =
/** @class */
function () {
  function Paddle(width, height, position, image, speed) {
    var _this = this;

    this.handleKeyUp = function (ev) {
      if (ev.code === "ArrowLeft" || ev.key === "ArrowLeft") {
        _this._moveLeft = false;
      }

      if (ev.code === "ArrowRight" || ev.key === "ArrowRight") {
        _this._moveRight = false;
      }
    };

    this.handleKeyDown = function (ev) {
      if (ev.code === "ArrowLeft" || ev.key === "ArrowLeft") {
        _this._moveLeft = true;
      }

      if (ev.code === "ArrowRight" || ev.key === "ArrowRight") {
        _this._moveRight = true;
      }
    };

    this._width = width;
    this._height = height;
    this._position = position;
    this._image = new Image();
    this._image.src = image;
    this._speed = speed;
    this._moveLeft = false;
    this._moveRight = false; // Event listeners

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  Object.defineProperty(Paddle.prototype, "image", {
    get: function get() {
      return this._image;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "width", {
    get: function get() {
      return this._width;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "height", {
    get: function get() {
      return this._height;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "position", {
    get: function get() {
      return this._position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "isMovingLeft", {
    get: function get() {
      return this._moveLeft;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "isMovingRight", {
    get: function get() {
      return this._moveRight;
    },
    enumerable: false,
    configurable: true
  });

  Paddle.prototype.movePaddle = function () {
    if (this._moveLeft) {
      this._position.x -= this._speed;
    }

    if (this._moveRight) {
      this._position.x += this._speed;
    }
  };

  return Paddle;
}();

exports.Paddle = Paddle;
},{}],"CollisionPhysics.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollisionPhysics = void 0;

var CollisionPhysics =
/** @class */
function () {
  function CollisionPhysics() {} // Check ball collision with individual brick


  CollisionPhysics.prototype.isCollidingBrick = function (ball, brick) {
    if (ball.position.x < brick.position.x + brick.width && ball.position.x + ball.width > brick.position.x && ball.position.y < brick.position.y + brick.height && ball.position.y + ball.height > brick.position.y) {
      return true;
    } else {
      return false;
    }
  }; // Check ball collision with all bricks


  CollisionPhysics.prototype.isCollidingBricks = function (ball, bricks) {
    var _this = this;

    var isColliding = false;
    bricks.forEach(function (bricksRow) {
      bricksRow.forEach(function (brick, idx) {
        if (_this.isCollidingBrick(ball, brick)) {
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
  };

  CollisionPhysics.prototype.checkBallCollision = function (ball, paddle, view) {
    // Collision with paddle
    if (ball.position.x + ball.width > paddle.position.x && ball.position.x < paddle.position.x + paddle.width && ball.position.y + ball.height === paddle.position.y) {
      ball.changeYDirection();
    } // Collision with walls
    // Ball movement X constraints


    if (ball.position.x > view.canvas.width - ball.width || ball.position.x < 0) {
      ball.changeXDirection();
    } // Ball movement Y constraints


    if (ball.position.y < 0) {
      ball.changeYDirection();
    }
  };

  return CollisionPhysics;
}();

exports.CollisionPhysics = CollisionPhysics;
},{}],"images/paddle.png":[function(require,module,exports) {
module.exports = "/paddle.f48d929a.png";
},{}],"images/ball.png":[function(require,module,exports) {
module.exports = "/ball.96931fde.png";
},{}],"images/brick-red.png":[function(require,module,exports) {
module.exports = "/brick-red.c1be1822.png";
},{}],"images/brick-blue.png":[function(require,module,exports) {
module.exports = "/brick-blue.695b92f9.png";
},{}],"images/brick-green.png":[function(require,module,exports) {
module.exports = "/brick-green.e573ebf2.png";
},{}],"images/brick-yellow.png":[function(require,module,exports) {
module.exports = "/brick-yellow.eff6b86b.png";
},{}],"images/brick-purple.png":[function(require,module,exports) {
module.exports = "/brick-purple.088683b7.png";
},{}],"setup.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEVEL = exports.BRICK_HEALTH = exports.BRICK_IMAGES = exports.BALL_STARTY = exports.BALL_STARTX = exports.BALL_SIZE = exports.BALL_SPEED = exports.PADDLE_SPEED = exports.PADDLE_STARTX = exports.PADDLE_HEIGHT = exports.PADDLE_WIDTH = exports.BRICK_HEIGHT = exports.BRICK_WIDTH = exports.BRICK_PADDING = exports.STAGE_COLS = exports.STAGE_ROWS = exports.STAGE_PADDING = void 0;

var _brickRed = _interopRequireDefault(require("./images/brick-red.png"));

var _brickBlue = _interopRequireDefault(require("./images/brick-blue.png"));

var _brickGreen = _interopRequireDefault(require("./images/brick-green.png"));

var _brickYellow = _interopRequireDefault(require("./images/brick-yellow.png"));

var _brickPurple = _interopRequireDefault(require("./images/brick-purple.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Bricks
// Grab the canvas element for calculating the brick width
// depending on canvas width
var canvas = document.querySelector("#playField"); // Constants

var STAGE_PADDING = 10;
exports.STAGE_PADDING = STAGE_PADDING;
var STAGE_ROWS = 20;
exports.STAGE_ROWS = STAGE_ROWS;
var STAGE_COLS = 10;
exports.STAGE_COLS = STAGE_COLS;
var BRICK_PADDING = 5;
exports.BRICK_PADDING = BRICK_PADDING;
var BRICK_WIDTH = canvas ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING : 100;
exports.BRICK_WIDTH = BRICK_WIDTH;
var BRICK_HEIGHT = canvas ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING : 30;
exports.BRICK_HEIGHT = BRICK_HEIGHT;
var PADDLE_WIDTH = 150;
exports.PADDLE_WIDTH = PADDLE_WIDTH;
var PADDLE_HEIGHT = 25;
exports.PADDLE_HEIGHT = PADDLE_HEIGHT;
var PADDLE_STARTX = 450;
exports.PADDLE_STARTX = PADDLE_STARTX;
var PADDLE_SPEED = 10;
exports.PADDLE_SPEED = PADDLE_SPEED;
var BALL_SPEED = 5;
exports.BALL_SPEED = BALL_SPEED;
var BALL_SIZE = 20;
exports.BALL_SIZE = BALL_SIZE;
var BALL_STARTX = 500;
exports.BALL_STARTX = BALL_STARTX;
var BALL_STARTY = 400;
exports.BALL_STARTY = BALL_STARTY;
var BRICK_IMAGES = {
  1: _brickRed.default,
  2: _brickGreen.default,
  3: _brickYellow.default,
  4: _brickBlue.default,
  5: _brickPurple.default
};
exports.BRICK_IMAGES = BRICK_IMAGES;
var BRICK_HEALTH = {
  1: 1,
  2: 1,
  3: 2,
  4: 2,
  5: 3
}; // prettier-ignore

exports.BRICK_HEALTH = BRICK_HEALTH;
var LEVEL = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 0, 0], [0, 2, 2, 2, 2, 2, 2, 2, 2, 0], [0, 3, 3, 3, 3, 3, 3, 3, 3, 0], [0, 0, 4, 4, 4, 4, 4, 4, 0, 0], [0, 0, 5, 5, 0, 0, 5, 5, 0, 0]];
exports.LEVEL = LEVEL;
},{"./images/brick-red.png":"images/brick-red.png","./images/brick-blue.png":"images/brick-blue.png","./images/brick-green.png":"images/brick-green.png","./images/brick-yellow.png":"images/brick-yellow.png","./images/brick-purple.png":"images/brick-purple.png"}],"sprites/Brick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Brick = void 0;

var Brick =
/** @class */
function () {
  function Brick(width, height, position, image, health) {
    this._width = width;
    this._height = height;
    this._position = position;
    this._health = health;
    this._image = new Image();
    this._image.src = image;
  }

  Object.defineProperty(Brick.prototype, "width", {
    get: function get() {
      return this._width;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "height", {
    get: function get() {
      return this._height;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "position", {
    get: function get() {
      return this._position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "image", {
    get: function get() {
      return this._image;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "health", {
    get: function get() {
      return this._health;
    },
    set: function set(health) {
      this._health = health;
    },
    enumerable: false,
    configurable: true
  });
  return Brick;
}();

exports.Brick = Brick;
},{}],"helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBricks = createBricks;
exports.calcBricksNum = calcBricksNum;

var _Brick = require("./sprites/Brick");

var _setup = require("./setup");

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

/**
 * Creates array of bricks from values specified in setup.ts. We iterate over LEVEL
 * @returns Array of bricks
 */
function createBricks() {
  return _setup.LEVEL.reduce(function (acc, elem, idx) {
    var row = elem;
    var rowReduced = row.reduce(function (acc, elem, subIdx) {
      var rowNo = idx;
      var colNo = subIdx;
      var x = _setup.STAGE_PADDING + colNo * (_setup.BRICK_WIDTH + _setup.BRICK_PADDING);
      var y = _setup.STAGE_PADDING + rowNo * (_setup.BRICK_HEIGHT + _setup.BRICK_PADDING);

      if (elem === 0) {
        return acc;
      }

      return __spreadArrays(acc, [new _Brick.Brick(_setup.BRICK_WIDTH, _setup.BRICK_HEIGHT, {
        x: x,
        y: y
      }, _setup.BRICK_IMAGES[elem], _setup.BRICK_HEALTH[elem])]);
    }, []);
    return __spreadArrays(acc, [rowReduced]);
  }, []);
}

function calcBricksNum(bricks) {
  var count = 0;
  bricks.forEach(function (brickRow) {
    brickRow.forEach(function (brick) {
      count++;
    });
  });
  return count;
}
},{"./sprites/Brick":"sprites/Brick.ts","./setup":"setup.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var _CanvasView = require("./view/CanvasView");

var _Ball = require("./sprites/Ball");

var _Paddle = require("./sprites/Paddle");

var _CollisionPhysics = require("./CollisionPhysics");

var _paddle = _interopRequireDefault(require("./images/paddle.png"));

var _ball = _interopRequireDefault(require("./images/ball.png"));

var _setup = require("./setup");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Images
// Game configuration
// Helpers
// Initial values
var gameOver = false;
var score = 0;
var bricksLeft = -1;

function setGameOver(view) {
  view.drawInfo("Game over!");
  gameOver = true;
}

function setGameWin(view) {
  view.drawInfo("Congratulations, you won!");
  gameOver = true;
}

function gameLoop(view, bricks, paddle, ball, collisionPhysics) {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball); // Move ball

  ball.moveBall(); // Paddle constraints: keep paddle in playfield

  if (paddle.isMovingLeft && paddle.position.x > 0 || paddle.isMovingRight && paddle.position.x < view.canvas.width - paddle.width) {
    paddle.movePaddle();
  }

  collisionPhysics.checkBallCollision(ball, paddle, view);
  var collidingBrick = collisionPhysics.isCollidingBricks(ball, bricks);

  if (collidingBrick) {
    score++;
    view.drawScore(score);
  } // Game over when ball leaves playField


  if (ball.position.y > view.canvas.height) {
    setGameOver(view);
  }

  if (bricksLeft === 0) {
    setGameWin(view);
  }

  requestAnimationFrame(function () {
    return gameLoop(view, bricks, paddle, ball, collisionPhysics);
  });
}

function startGame(view) {
  // Reset displays
  view.drawInfo("");
  view.drawScore(0); // Reset values

  score = 0; // Create collision instance

  var collisionPhysics = new _CollisionPhysics.CollisionPhysics(); // Create bricks & calc number of bricks

  var bricks = (0, _helpers.createBricks)();
  bricksLeft = (0, _helpers.calcBricksNum)(bricks); // Create ball

  var ball = new _Ball.Ball(_setup.BALL_SIZE, {
    x: _setup.BALL_STARTX,
    y: _setup.BALL_STARTY
  }, _ball.default, _setup.BALL_SPEED); // Create paddle

  var paddle = new _Paddle.Paddle(_setup.PADDLE_WIDTH, _setup.PADDLE_HEIGHT, {
    x: _setup.PADDLE_STARTX,
    y: view.canvas.height - _setup.PADDLE_HEIGHT - 5
  }, _paddle.default, _setup.PADDLE_SPEED); // Change info message

  view.drawInfo(""); // Start game loop

  gameLoop(view, bricks, paddle, ball, collisionPhysics);
} // Create new view


var view = new _CanvasView.CanvasView("#playField");
view.initStartButton(startGame);
},{"./view/CanvasView":"view/CanvasView.ts","./sprites/Ball":"sprites/Ball.ts","./sprites/Paddle":"sprites/Paddle.ts","./CollisionPhysics":"CollisionPhysics.ts","./images/paddle.png":"images/paddle.png","./images/ball.png":"images/ball.png","./setup":"setup.ts","./helpers":"helpers.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38891" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map