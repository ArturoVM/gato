let _data = {
    player: "",
    code: ""
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
