import * as broker from "./broker.js";
import * as ui from "./ui.js"
import * as gamedata from "./gamedata.js"

function setupGame() {
    ui.toggleGameSetupArea();
}

$(document).ready(function() {
    ui.drawBoard();

    $('#play-form').submit(function(e) {
        broker.joinGame($('#code-i').val());
        ui.showMessageArea();
        ui.setMessageNormal();
        ui.setMessageText("conectando…");
        e.preventDefault();
    });

    broker.socket.on("game error", function(msg) {
        ui.showMessageArea();
        ui.setMessageError();
        ui.setMessageText("Error: " + msg);
    });

    broker.socket.on("joined game", function(msg) {
        setupGame();
        ui.showMessageArea();
        ui.setMessageNormal();
        ui.setMessageText("¡Bienvenido!");
        ui.showInformationArea();
        ui.setGameCode(msg.code);
        ui.setPlayerInfo(msg.player);
        gamedata.setPlayer(msg.player)
        gamedata.setCode(msg.code);
    })

    broker.socket.on("game started", function(msg) {
        ui.togglePlayArea();
        ui.setMessageNormal();
        if (msg.turn == gamedata.player()) {
            ui.setMessageText("Es tu turno.");
        } else {
            ui.setMessageText("Es turno de tu oponente.");
            ui.disableBoard();
        }
    });

    broker.socket.on("game over", function(msg) {
        ui.disableBoard();
        if (msg == "Nadie") {
            ui.setMessageText("Juego Terminado. Nadie ha ganado.");
        } else if (msg == gamedata.player()) {
            ui.setMessageSuccess();
            ui.setMessageText("Juego terminado. ¡Has ganado!");
        } else {
            ui.setMessageError();
            ui.setMessageText("Juego terminado. Tu oponente ha ganado.");
        }
    })

    ui.registerStageClickHandler(function(evt) {
        let tile = ui.translatePointToTile({x: evt.stageX, y: evt.stageY});
        broker.attemptMove(tile);
    });

    broker.socket.on("made move", function(movedata) {
        ui.drawMove(movedata);
    });
});
