let _data = {
    player: "",
    code: "",
    playersTurn: false
}

export function setPlayer(player) {
    _data.player = player;
}

export function player() {
    return _data.player;
}

export function setCode(code) {
    _data.code = code;
}

export function code() {
    return _data.code;
}

export function setPlayersTurn(turn) {
    _data.playersTurn = turn;
}

export function playersTurn() {
    return _data.playersTurn;
}
