/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _broker = __webpack_require__(1);

	var broker = _interopRequireWildcard(_broker);

	var _ui = __webpack_require__(3);

	var ui = _interopRequireWildcard(_ui);

	var _gamedata = __webpack_require__(2);

	var gamedata = _interopRequireWildcard(_gamedata);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function setupGame() {
	    ui.toggleGameSetupArea();
	}

	$(document).ready(function () {
	    ui.drawBoard();

	    $('#play-form').submit(function (e) {
	        broker.joinGame($('#code-i').val());
	        ui.showMessageArea();
	        ui.setMessageNormal();
	        ui.setMessageText("conectando…");
	        e.preventDefault();
	    });

	    broker.socket.on("game error", function (msg) {
	        ui.showMessageArea();
	        ui.setMessageError();
	        ui.setMessageText("Error: " + msg);
	    });

	    broker.socket.on("joined game", function (msg) {
	        setupGame();
	        ui.showMessageArea();
	        ui.setMessageNormal();
	        ui.setMessageText("¡Bienvenido!");
	        ui.showInformationArea();
	        ui.setGameCode(msg.code);
	        ui.setPlayerInfo(msg.player);
	        gamedata.setPlayer(msg.player);
	        gamedata.setCode(msg.code);
	    });

	    broker.socket.on("game started", function (msg) {
	        ui.togglePlayArea();
	        ui.setMessageNormal();
	        if (msg.turn == gamedata.player()) {
	            gamedata.setPlayersTurn(true);
	            ui.setMessageText("Es tu turno.");
	        } else {
	            gamedata.setPlayersTurn(false);
	            ui.setMessageText("Es turno de tu oponente.");
	        }
	    });

	    broker.socket.on("game over", function (msg) {
	        gamedata.setPlayersTurn(false);
	        if (msg == "Nadie") {
	            ui.setMessageText("Juego Terminado. Nadie ha ganado.");
	        } else if (msg == gamedata.player()) {
	            ui.setMessageSuccess();
	            ui.setMessageText("Juego terminado. ¡Has ganado!");
	        } else {
	            ui.setMessageError();
	            ui.setMessageText("Juego terminado. Tu oponente ha ganado.");
	        }
	    });

	    ui.registerStageClickHandler(function (evt) {
	        if (!gamedata.playersTurn()) {
	            return;
	        }
	        var tile = ui.translatePointToTile({ x: evt.stageX, y: evt.stageY });
	        broker.attemptMove(tile);
	    });

	    broker.socket.on("made move", function (movedata) {
	        ui.setMessageNormal();
	        if (movedata.player != gamedata.player()) {
	            gamedata.setPlayersTurn(true);
	            ui.setMessageText("Es tu turno.");
	        } else {
	            gamedata.setPlayersTurn(false);
	            ui.setMessageText("Es turno de tu oponente.");
	        }
	        ui.drawMove(movedata);
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.socket = undefined;
	exports.joinGame = joinGame;
	exports.attemptMove = attemptMove;

	var _gamedata = __webpack_require__(2);

	var gamedata = _interopRequireWildcard(_gamedata);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var socket = exports.socket = io();

	function joinGame(code) {
	    socket.emit('join game', code);
	}

	function attemptMove(tile) {
	    var data = { tile: tile, game: gamedata.code() };
	    socket.emit('try move', data);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setPlayer = setPlayer;
	exports.player = player;
	exports.setCode = setCode;
	exports.code = code;
	exports.setPlayersTurn = setPlayersTurn;
	exports.playersTurn = playersTurn;
	var _data = {
	    player: "",
	    code: "",
	    playersTurn: false
	};

	function setPlayer(player) {
	    _data.player = player;
	}

	function player() {
	    return _data.player;
	}

	function setCode(code) {
	    _data.code = code;
	}

	function code() {
	    return _data.code;
	}

	function setPlayersTurn(turn) {
	    _data.playersTurn = turn;
	}

	function playersTurn() {
	    return _data.playersTurn;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.drawBoard = drawBoard;
	exports.disableBoard = disableBoard;
	exports.enableBoard = enableBoard;
	exports.drawO = drawO;
	exports.drawX = drawX;
	exports.registerStageClickHandler = registerStageClickHandler;
	exports.translatePointToTile = translatePointToTile;
	exports.drawMove = drawMove;
	exports.togglePlayArea = togglePlayArea;
	exports.toggleGameSetupArea = toggleGameSetupArea;
	exports.showMessageArea = showMessageArea;
	exports.setMessageText = setMessageText;
	exports.setMessageNormal = setMessageNormal;
	exports.setMessageSuccess = setMessageSuccess;
	exports.setMessageError = setMessageError;
	exports.showInformationArea = showInformationArea;
	exports.setGameCode = setGameCode;
	exports.setPlayerInfo = setPlayerInfo;
	var stage = new createjs.Stage("gameCanvas");

	function drawBoard() {
	    var lineA = new createjs.Shape();
	    lineA.graphics.ss(2).s("#101010").mt(110, 0).lt(110, 330).es();
	    stage.addChild(lineA);

	    var lineB = new createjs.Shape();
	    lineA.graphics.ss(2).s("#101010").mt(220, 0).lt(220, 330).es();
	    stage.addChild(lineB);

	    var lineC = new createjs.Shape();
	    lineA.graphics.ss(2).s("#101010").mt(0, 110).lt(330, 110).es();
	    stage.addChild(lineC);

	    var lineD = new createjs.Shape();
	    lineA.graphics.ss(2).s("#101010").mt(0, 220).lt(330, 220).es();
	    stage.addChild(lineD);

	    stage.update();
	}

	function disableBoard() {
	    stage.mouseEnabled = false;
	}

	function enableBoard() {
	    stage.mouseEnabled = true;
	}

	function drawO(x, y) {
	    var c = new createjs.Shape();
	    c.graphics.ss(3).s("#101010").drawCircle(x, y, 44);
	    stage.addChild(c);

	    stage.update();
	}

	function drawX(x, y) {
	    var l1 = new createjs.Shape();
	    l1.graphics.ss(3).s("#101010").mt(x - 44, y - 44).lt(x + 44, y + 44);
	    stage.addChild(l1);

	    var l2 = new createjs.Shape();
	    l2.graphics.ss(3).s("#101010").mt(x + 44, y - 44).lt(x - 44, y + 44);
	    stage.addChild(l2);

	    stage.update();
	}

	function registerStageClickHandler(handler) {
	    stage.on("stagemouseup", handler);
	}

	function translatePointToTile(point) {
	    var y = point.y;
	    var x = point.x;

	    var tile = "";

	    if (y > 0 && y <= 110) {
	        tile += "A";
	    }
	    if (y > 110 && y <= 220) {
	        tile += "B";
	    }
	    if (y > 220 && y < 330) {
	        tile += "C";
	    }

	    if (x > 0 && x <= 110) {
	        tile += "0";
	    }
	    if (x > 110 && x <= 220) {
	        tile += "1";
	    }
	    if (x > 220 && x < 330) {
	        tile += "2";
	    }

	    return tile;
	}

	function translateTileToPoint(tile) {
	    var point = {
	        x: 0,
	        y: 0
	    };

	    var rowLetter = tile.charAt(0);
	    var row = 0;
	    var column = Number(tile.charAt(1)) + 1;

	    if (rowLetter == 'A') {
	        row = 1;
	    }
	    if (rowLetter == 'B') {
	        row = 2;
	    }
	    if (rowLetter == 'C') {
	        row = 3;
	    }

	    point.x = 110 * column - 55;
	    point.y = 110 * row - 55;

	    return point;
	}

	function drawMove(movedata) {
	    var point = translateTileToPoint(movedata.move);
	    if (movedata.player == "X") {
	        drawX(point.x, point.y);
	    }
	    if (movedata.player == "O") {
	        drawO(point.x, point.y);
	    }
	}

	function togglePlayArea() {
	    $('#board-dimmer').toggleClass("active disabled");
	}

	function toggleGameSetupArea() {
	    $('#game-setup-area').fadeToggle();
	}

	function showMessageArea() {
	    $('#message-area').fadeIn();
	}

	function setMessageText(text) {
	    $('#message-text').empty();
	    $('#message-text').append(text);
	}

	function setMessageNormal() {
	    $('#message-element').removeClass();
	    $('#message-element').addClass("ui message");
	}

	function setMessageSuccess() {
	    $('#message-element').removeClass();
	    $('#message-element').addClass("ui success message");
	}

	function setMessageError() {
	    $('#message-element').removeClass();
	    $('#message-element').addClass("ui error message");
	}

	function showInformationArea() {
	    $('#information-area').fadeIn();
	}

	function setGameCode(code) {
	    $('#game-code').empty();
	    $('#game-code').append(code);
	}

	function setPlayerInfo(letter) {
	    $('#player-info').empty();
	    $('#player-info').append(letter);
	}

/***/ }
/******/ ]);