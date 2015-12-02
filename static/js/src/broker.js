export const socket = io();

export function joinGame(code) {
    socket.emit('join game', code);
}
