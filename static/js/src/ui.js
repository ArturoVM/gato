const stage = new createjs.Stage("gameCanvas");

export function drawBoard() {
    let lineA = new createjs.Shape();
    lineA.graphics.ss(2).s("#101010").mt(110, 0).lt(110, 330);
    stage.addChild(lineA);

    let lineB = new createjs.Shape();
    lineA.graphics.ss(2).s("#101010").mt(220, 0).lt(220, 330);
    stage.addChild(lineB);

    let lineC = new createjs.Shape();
    lineA.graphics.ss(2).s("#101010").mt(0, 110).lt(330, 110);
    stage.addChild(lineC);

    let lineD = new createjs.Shape();
    lineA.graphics.ss(2).s("#101010").mt(0, 220).lt(330, 220);
    stage.addChild(lineD);

    stage.update();
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

    stage.update;
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
