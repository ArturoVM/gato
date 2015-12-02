let stage;

export function initializeUI() {
    stage = new createjs.Stage("gameCanvas");
    console.log("created stage");
}

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
