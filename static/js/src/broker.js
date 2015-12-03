import * as gamedata from "./gamedata.js"

export const socket = io();

export function joinGame(code) {
    socket.emit('join game', code);
}

export function attemptMove(tile) {
    let data = { tile: tile, game: gamedata.code() };
    socket.emit('try move', data);
}
