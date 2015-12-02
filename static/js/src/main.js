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
    })

    broker.socket.on("game started", function(msg) {
        let m = JSON.parse(msg)
        ui.togglePlayArea();
        ui.setMessageNormal();
        if (m.turn == gamedata.player()) {
            ui.setMessageText("Es tu turno.");
        } else {
            ui.setMessageText("Es turno de tu oponente.");
        }
    });
});
