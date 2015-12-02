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

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	$(document).ready(function () {
	    ui.initializeUI();
	    ui.drawBoard();
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
	exports.initializeUI = initializeUI;
	exports.drawBoard = drawBoard;
	var stage = undefined;

	function initializeUI() {
	    stage = new createjs.Stage("gameCanvas");
	    console.log("created stage");
	}

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

/***/ }
/******/ ]);