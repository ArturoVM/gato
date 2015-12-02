import * as broker from "./broker.js";
import * as ui from "./ui.js"

$(document).ready(function() {
    ui.drawBoard();

    $('#play-form').submit(function(e) {
        ui.togglePlayArea();
        ui.toggleGameSetupArea();
        broker.joinGame($('#code-i').val());
        e.preventDefault();
    });
});
