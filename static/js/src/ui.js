const stage = new createjs.Stage("gameCanvas");

export function drawBoard() {
    let lineA = new createjs.Shape();
    lineA.graphics.ss(2).s("#101010").mt(110, 0).lt(110, 330).es();
    stage.addChild(lineA);

    let lineB = new createjs.Shape();
    lineA.graphics.ss(2).s("#101010").mt(220, 0).lt(220, 330).es();
    stage.addChild(lineB);

    let lineC = new createjs.Shape();
    lineA.graphics.ss(2).s("#101010").mt(0, 110).lt(330, 110).es();
    stage.addChild(lineC);

    let lineD = new createjs.Shape();
    lineA.graphics.ss(2).s("#101010").mt(0, 220).lt(330, 220).es();
    stage.addChild(lineD);

    stage.update();
}

export function disableBoard() {
    stage.mouseEnabled = false;
}

export function enableBoard() {
    stage.mouseEnabled = true;
}

export function drawO(x, y) {
    let c = new createjs.Shape();
    c.graphics.ss(3).s("#101010").drawCircle(x, y, 44);
    stage.addChild(c);

    stage.update();
}

export function drawX(x, y) {
    let l1 = new createjs.Shape();
    l1.graphics.ss(3).s("#101010").mt(x - 44, y - 44).lt(x + 44, y + 44);
    stage.addChild(l1);

    let l2 = new createjs.Shape();
    l2.graphics.ss(3).s("#101010").mt(x + 44, y - 44).lt(x - 44, y + 44);
    stage.addChild(l2);

    stage.update();
}

export function registerStageClickHandler(handler) {
    stage.on("stagemouseup", handler);
}

export function translatePointToTile(point) {
    let y = point.y;
    let x = point.x;

    let tile = "";

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
    let point = {
        x: 0,
        y: 0
    }

    let rowLetter = tile.charAt(0)
    let row = 0;
    let column = Number(tile.charAt(1)) + 1;

    if (rowLetter == 'A') {
        row = 1;
    }
    if (rowLetter == 'B') {
        row = 2;
    }
    if (rowLetter == 'C') {
        row = 3;
    }

    point.x = (110 * column) - 55;
    point.y = (110 * row) - 55;

    return point;
}

export function drawMove(movedata) {
    let point = translateTileToPoint(movedata.move);
    if (movedata.player == "X") {
        drawX(point.x, point.y);
    }
    if (movedata.player == "O") {
        drawO(point.x, point.y);
    }
}

export function togglePlayArea() {
    $('#board-dimmer').toggleClass("active disabled");
}

export function toggleGameSetupArea() {
    $('#game-setup-area').fadeToggle();
}

export function showMessageArea() {
    $('#message-area').fadeIn();
}

export function setMessageText(text) {
    $('#message-text').empty();
    $('#message-text').append(text);
}

export function setMessageNormal() {
    $('#message-element').removeClass();
    $('#message-element').addClass("ui message");
}

export function setMessageSuccess() {
    $('#message-element').removeClass();
    $('#message-element').addClass("ui success message");
}

export function setMessageError() {
    $('#message-element').removeClass();
    $('#message-element').addClass("ui error message");
}

export function showInformationArea() {
    $('#information-area').fadeIn();
}

export function setGameCode(code) {
    $('#game-code').empty();
    $('#game-code').append(code);
}

export function setPlayerInfo(letter) {
    $('#player-info').empty();
    $('#player-info').append(letter);
}
