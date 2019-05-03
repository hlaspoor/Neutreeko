function Board() {
    this._mask = [
        0, 0, 0, 0, 0, 0, 0,
        0, 3, 3, 3, 3, 3, 0,
        0, 3, 3, 3, 3, 3, 0,
        0, 3, 3, 3, 3, 3, 0,
        0, 3, 3, 3, 3, 3, 0,
        0, 3, 3, 3, 3, 3, 0,
        0, 0, 0, 0, 0, 0, 0
    ];
    this._stones = [
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 2, 0, 2, 0, 0,
        0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 2, 0, 0, 0,
        0, 0, 1, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0
    ];
    this._curSide = SIDE.BLACK;
    this._moveHistory = [];
    this._gameResult = RESULT.NONE;
}
Board.prototype.clear = function () {
    for (let idx = 0; idx < CELL_NUM; idx++) {
        this._stones[idx] = STONE.EMPTY;
    }
};
Board.prototype.reset = function () {
    this._stones = [
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 2, 0, 2, 0, 0,
        0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 2, 0, 0, 0,
        0, 0, 1, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0
    ];
    this._curSide = SIDE.BLACK;
    this._gameResult = RESULT.NONE;
};
Board.prototype.swap = function () {
    for (let idx = 0; idx < CELL_NUM; idx++) {
        if (this._stones[idx] == STONE.WHITE) {
            this._stones[idx] = STONE.BLACK;
        } else if (this._stones[idx] == STONE.BLACK) {
            this._stones[idx] = STONE.WHITE;
        }
    }
};
Board.prototype.getPoscode = function() {
    var code = "";
    for (let idx = 0; idx < CELL_NUM; idx++) {
        if(this._mask[idx] == 3) {
            if (this._stones[idx] !== STONE.EMPTY) {
                code += (this._stones[idx] == this._curSide ? 1 : 2);
            }else {
                code += "0";
            }
        }
    }
    return code;
};
Board.prototype.makeMove = function (move) {
    this._stones[move.fromIdx] = STONE.EMPTY;
    this._stones[move.toIdx] = move.side;
    this._moveHistory.push(move);
    this._curSide = this._curSide == SIDE.BLACK ? SIDE.WHITE : SIDE.BLACK;
    this.checkGameOver();
    console.log("RESULT" + this._gameResult);
};
Board.prototype.unmakeMove = function (move) {
    this._stones[move.toIdx] = MOVE_STONE(move);
    this._stones[move.fromIdx] = move.side;
    this._curSide = this._curSide == SIDE.BLACK ? SIDE.WHITE : SIDE.BLACK;
};
Board.prototype.checkGameOver = function () {
    var result;
    var whites = [];
    var blacks = [];
    for (var idx = 0; idx < CELL_NUM; idx++) {
        if (this._stones[idx] == STONE.WHITE) {
            whites.push(idx);
        } else if (this._stones[idx] == STONE.BLACK) {
            blacks.push(idx);
        }
    }
    result = this.checkFormation(this._stones, whites, STONE.WHITE);
    if (result != RESULT.NONE) {
        this._gameResult = result;
        return;
    }
    result = this.checkFormation(this._stones, blacks, STONE.BLACK);
    if (result != RESULT.NONE) {
        this._gameResult = result;
        return;
    }
}
Board.prototype.checkFormation = function (stones, array, side) {
    if (array[1] === array[0] + DIR.RIGHT &&
        array[2] === array[1] + DIR.RIGHT) {
        return side;
    }
    if (array[1] === array[0] + DIR.DOWN &&
        array[2] === array[1] + DIR.DOWN) {
        return side;
    }
    if (array[1] === array[0] + DIR.LEFT_DOWN &&
        array[2] === array[1] + DIR.LEFT_DOWN) {
        return side;
    }
    if (array[1] === array[0] + DIR.RIGHT_DOWN &&
        array[2] === array[1] + DIR.RIGHT_DOWN) {
        return side;
    }
    return RESULT.NONE;
}
Board.prototype.generateMoves = function (idx, side) {
    var moves = [];
    var dirs = [DIR.UP, DIR.DOWN, DIR.LEFT, DIR.RIGHT, DIR.LEFT_UP, DIR.LEFT_DOWN, DIR.RIGHT_UP, DIR.RIGHT_DOWN];
    var fromIdx = idx;
    var toIdx;
    var board = this;
    $.each(dirs, function (i, val) {
        toIdx = board.checkDir(fromIdx, val);
        if (toIdx != fromIdx) {
            moves.push(MOVE(side, fromIdx, toIdx));
        }
    });
    return moves;
}
Board.prototype.generateAllMoves = function (side) {
    var moves = [];
    for (var i = 0; i < CELL_NUM; i++) {
        if (this._stones[i] == side) {
            var ms = this.generateMoves(i, side);
            if (ms.length > 0) {
                moves = $.merge(moves, ms);
            }
        }
    }
    return moves;
};
Board.prototype.checkDir = function (idx, dir) {
    var curIdx = idx;
    while (this._mask[curIdx + dir] == 3) {
        if (this._stones[curIdx + dir] == STONE.EMPTY) {
            curIdx += dir;
        } else {
            break;
        }
    }
    return curIdx;
};
