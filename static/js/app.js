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

	var _ui = __webpack_require__(2);

	var ui = _interopRequireWildcard(_ui);

	var _gamedata = __webpack_require__(3);

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
	    });

	    broker.socket.on("game started", function (msg) {
	        var m = JSON.parse(msg);
	        ui.togglePlayArea();
	        ui.setMessageNormal();
	        console.log(m.turn);
	        if (m.turn == gamedata.player()) {
	            ui.setMessageText("Es tu turno.");
	        } else {
	            ui.setMessageText("Es turno de tu oponente.");
	        }
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.joinGame = joinGame;
	var socket = exports.socket = io();

	function joinGame(code) {
	    socket.emit('join game', code);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.drawBoard = drawBoard;
	exports.drawO = drawO;
	exports.drawX = drawX;
	exports.togglePlayArea = togglePlayArea;
	exports.toggleGameSetupArea = toggleGameSetupArea;
	exports.showMessageArea = showMessageArea;
	exports.setMessageText = setMessageText;
	exports.setMessageNormal = setMessageNormal;
	exports.setMessageError = setMessageError;
	exports.showInformationArea = showInformationArea;
	exports.setGameCode = setGameCode;
	exports.setPlayerInfo = setPlayerInfo;
	var stage = new createjs.Stage("gameCanvas");

	function drawBoard() {
	    var lineA = new createjs.Shape();
	    lineA.graphics.ss(2).s("#101010").mt(110, 0).lt(110, 330);
	    stage.addChild(lineA);

	    var lineB = new createjs.Shape();
	    lineA.graphics.ss(2).s("#101010").mt(220, 0).lt(220, 330);
	    stage.addChild(lineB);

	    var lineC = new createjs.Shape();
	    lineA.graphics.ss(2).s("#101010").mt(0, 110).lt(330, 110);
	    stage.addChild(lineC);

	    var lineD = new createjs.Shape();
	    lineA.graphics.ss(2).s("#101010").mt(0, 220).lt(330, 220);
	    stage.addChild(lineD);

	    stage.update();
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

	    stage.update;
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setPlayer = setPlayer;
	exports.player = player;
	var _player = undefined;

	function setPlayer(player) {
	    _player = player;
	}

	function player() {
	    return _player;
	}

/***/ }
/******/ ]);