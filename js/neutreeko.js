var g_board;
var g_ui;
var g_curSide;
var g_eng;

$(function () {
    g_board = new Board();
    g_eng = new Engine();
    g_ui = new UI(g_board, g_eng);
    g_ui.setInfoText(INFO_TEXT.BLACK_TURN);
    g_curSide = SIDE.BLACK;

    setTimeout(function () {
        g_eng.init();
        g_ui.showGameResult(g_ui._board._gameResult);
    }, 0);
});

function play(side) {
    g_curSide = side;
    g_board.reset();
    g_ui.reload();
    if (g_curSide == SIDE.WHITE) {
        var moves = g_eng.think(g_board.getPoscode());
        if (moves.length > 0) {
            var m = moves[0];
            var fromPos = (MOVE_IDX(m.from + 8) - 32 + 1) + (5 - parseInt(m.from.substring(1)) + 1) * 7;
            var toPos = (MOVE_IDX(m.to + 8) - 32 + 1) + (5 - parseInt(m.to.substring(1)) + 1) * 7;
            g_ui.makeMove(g_board._curSide, fromPos, toPos);
        }
    }
}
