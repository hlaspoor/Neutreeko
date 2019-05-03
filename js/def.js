var CELL_NUM = 49;
var STONE = {
    "EMPTY": 0,
    "BLACK": 1,
    "WHITE": 2
};
var SIDE = {
    "NONE": 0,
    "BLACK": 1,
    "WHITE": 2
};
var RESULT = {
    "NONE": 0,
    "BLACK": 1,
    "WHITE": 2,
    "DRAW": 3,
    "ERROR": 4
};
var COORD_X_CHAR = " abcde ";
var COORD_Y_CHAR = " 54321 ";
var DIR = {
    "RIGHT": 1,
    "LEFT": -1,
    "UP": -7,
    "DOWN": 7,
    "LEFT_DOWN": 6,
    "RIGHT_DOWN": 8,
    "LEFT_UP": -8,
    "RIGHT_UP": -6
};
var INFO_TEXT = {
    "BLACK_TURN": "Black's turn to move.",
    "WHITE_TURN": "White's turn to move.",
    "BLACK_WINS": "Game Over, Black Wins!",
    "WHITE_WINS": "Game Over, White Wins!",
    "DRAW": "Game Over, Draw!"
};

function XY_TO_IDX(x, y) {
    return x * 7 + y;
}
function IDX_TO_X(idx) {
    return parseInt(idx % 7);
}
function IDX_TO_Y(idx) {
    return parseInt(idx / 7);
}
function MOVE(stone, fromIdx, toIdx) {
    return {
        side: stone,
        fromIdx: fromIdx,
        toIdx: toIdx,
    };
}
function MOVE_IDX(m) {
    return m.charCodeAt(0) - 65;
}
function MOVE_FROM_IDX(m) {
    return parseInt(m >> 7);
}
function MOVE_TO_IDX(m) {
    return parseInt((m >> 2) & 0x1F);
}
function MOVE_STONE(m) {
    return parseInt(m & 0x3);
}
function GET_MOVE_NAME(m) {
    var from = MOVE_FROM_IDX(m);
    var to = MOVE_TO_IDX(m);
    return COORD_X_CHAR[IDX_TO_X(from)] + COORD_Y_CHAR[IDX_TO_Y(from)] + "&minus;" +
        COORD_X_CHAR[IDX_TO_X(to)] + COORD_Y_CHAR[IDX_TO_Y(to)];
}