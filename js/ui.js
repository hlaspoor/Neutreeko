function UI(board, eng) {
    this._inAnimation = false;
    this._curIdx = STONE.EMPTY;
    this._board = board;
    this._eng = eng;
    this._hintMoves = [];

    this.init();
    this.initButtons();
    this.reload();
}
UI.prototype.init = function () {
    var ui = this;
    $(".touch_cell[id^='c']").mousedown(function () {
        var idx = parseInt(this.id.slice(1));
        if (ui._inAnimation) {
            return;
        }
        if (!ui._eng._initialized) {
            return;
        }
        if (ui._board._gameResult == RESULT.WHITE ||
            ui._board._gameResult == RESULT.BLACK ||
            ui._board._gameResult == RESULT.DRAW) {
            return;
        }
        if (ui._curIdx == STONE.EMPTY) {
            if (ui._board._stones[idx] == STONE.EMPTY) {
                return;
            }
            if(ui._board._stones[idx] != ui._board._curSide) {
                return;
            }
            $(".cell[id^='d']").removeClass("show selected");
            ui._curIdx = idx;
            $(".cell[id='d" + idx + "']").addClass("selected");
            ui._hintMoves = ui._board.generateMoves(ui._curIdx, ui._board._stones[ui._curIdx]);
            $.each(ui._hintMoves, function (i, val) {
                $(".cell[id^='d" + val.toIdx + "']").addClass("show");
            })
        } else if (ui._curIdx == idx) {
            $(".cell[id^='d']").removeClass("show selected");
            ui._curIdx = STONE.EMPTY;
        } else {
            // 切换选择为其他的棋子。
            if (ui._board._stones[idx] != STONE.EMPTY) {
                if(ui._board._stones[idx] != ui._board._curSide) {
                    return;
                }
                $(".cell[id^='d']").removeClass("show selected");
                ui._curIdx = idx;
                $(".cell[id='d" + idx + "']").addClass("selected");
                ui._hintMoves = ui._board.generateMoves(ui._curIdx, ui._board._stones[ui._curIdx]);
                $.each(ui._hintMoves, function (i, val) {
                    $(".cell[id^='d" + val.toIdx + "']").addClass("show");
                })
                return;
            }
            // 不在提示走法数组中的走法,视为无效走法。
            var hasMove = false;
            $.each(ui._hintMoves, function (i, val) {
                if (val.toIdx == idx) {
                    hasMove = true;
                    return false;
                }
            });
            if (!hasMove) {
                return;
            }
            ui._board.makeMove(MOVE(ui._board._stones[ui._curIdx], ui._curIdx, idx));
            var stone = $(".stone[data-idx='" + ui._curIdx + "']");
            var x = IDX_TO_X(idx) - 1;
            var y = IDX_TO_Y(idx) - 1;
            stone.attr("data-idx", idx);
            stone.css("z-index", 19);
            $(".cell[id^='d']").removeClass("show selected");
            ui._inAnimation = true;
            ui.setArrowMove(ui._curIdx, idx);
            TweenLite.to(stone, 0.6, {
                left: x * 71 + 11,
                top: y * 71 + 11,
                ease: Strong.easeInOut,
                onComplete: function () {
                    stone.css("z-index", 9);
                    ui.showArrowMove();
                    ui._inAnimation = false;
                    ui._curIdx = STONE.EMPTY;
                    ui.setInfoText(ui._board._curSide == SIDE.BLACK ? INFO_TEXT.BLACK_TURN : INFO_TEXT.WHITE_TURN);
                    // 如果轮到AI就开始执行
                    if(g_curSide != ui._board._curSide) {
                        var moves = g_eng.think(g_board.getPoscode());
                        if (moves.length > 0) {
                            var m = moves[0];
                            console.log(m);
                            var fromPos = (MOVE_IDX(m.from + 8)-32 + 1)+(5-parseInt(m.from.substring(1)) + 1) * 7;
                            var toPos = (MOVE_IDX(m.to + 8)-32 + 1)+(5-parseInt(m.to.substring(1)) + 1) * 7;
                            // ui.makeMove(ui._board._curSide, fx,fy);
                            // console.log(fromPos + "_" + toPos);
                            ui.makeMove(ui._board._curSide, fromPos, toPos);
                        }
                    }
                }
            });
            TweenLite.to($("#svg_arrow"), 0.6, {
                opacity: 1,
                ease: Strong.linear,
            }).delay(0.6);
        }
    });
};

UI.prototype.makeMove = function(side, fromIdx, toIdx) {
    var ui = this;
    ui._board.makeMove(MOVE(side, fromIdx, toIdx));
    var stone = $(".stone[data-idx='" + fromIdx + "']");
    var x = IDX_TO_X(toIdx) - 1;
    var y = IDX_TO_Y(toIdx) - 1;
    stone.attr("data-idx", toIdx);
    stone.css("z-index", 19);
    // $(".cell[id^='d']").removeClass("show selected");
    ui._inAnimation = true;
    ui.setArrowMove(fromIdx, toIdx);
    TweenLite.to(stone, 0.6, {
        left: x * 71 + 11,
        top: y * 71 + 11,
        ease: Strong.easeInOut,
        onComplete: function () {
            stone.css("z-index", 9);
            ui.showArrowMove();
            ui._inAnimation = false;
            ui._curIdx = STONE.EMPTY;
            ui.setInfoText(ui._board._curSide == SIDE.BLACK ? INFO_TEXT.BLACK_TURN : INFO_TEXT.WHITE_TURN);
            ui.showGameResult(ui._board._gameResult);
        }
    });
    TweenLite.to($("#svg_arrow"), 0.6, {
        opacity: 1,
        ease: Strong.linear,
    }).delay(0.3);
};

UI.prototype.showGameResult = function(result) {
    var divResult = $("#game_result");
    var r = "";
    console.log(result);
    if (result !== RESULT.NONE) {
        if (result === RESULT.WHITE) {
            r = "Game Over, White Wins!";
        } else if (result === RESULT.BLACK) {
            r = "Game Over, Black Wins!";
        } else if (result === RESULT.DRAW){
            r = "Game Over, Draw!";
        }
        divResult.html(r);
        TweenLite.to(divResult, 0.6, {
            top: 0,
            ease: Strong.linear,
        });
    } else {
        TweenLite.to(divResult, 0.6, {
            top: -99,
            ease: Strong.linear,
        });
    }
};

UI.prototype.setArrowMove = function(fromIdx, toIdx) {
    var orthX = IDX_TO_X(fromIdx) == IDX_TO_X(toIdx);
    var orthY = IDX_TO_Y(fromIdx) == IDX_TO_Y(toIdx);
    var offsetX = IDX_TO_X(fromIdx) > IDX_TO_X(toIdx) ? 1 : 0;
    var offsetY = IDX_TO_Y(fromIdx) > IDX_TO_Y(toIdx) ? 1 : 0;
    var offsetX2 = orthY && !orthX ? 0 : 37;
    var offsetY2 = orthX && !orthY ? 0 : 37;
    if(orthX && orthY) {
        offsetX = 0;
        offsetY = 0;
    }
    if(!orthX && !orthY) {
        offsetX2 = 0;
        offsetY2 = 0;
    }
    $("#svg_arrow").css("opacity", "0");
    $("#arrow_line").attr("x1", (IDX_TO_X(fromIdx) - 1) * 72 + 37);
    $("#arrow_line").attr("y1", (IDX_TO_Y(fromIdx) - 1) * 72 + 37);
    $("#arrow_line").attr("x2", (IDX_TO_X(toIdx) - 1 + offsetX) * 72 + offsetX2);
    $("#arrow_line").attr("y2", (IDX_TO_Y(toIdx) - 1 + offsetY) * 72 + offsetY2);
};

UI.prototype.showArrowMove = function() {
    $("#svg_arrow").css("display", "block");
};

UI.prototype.reload = function () {
    var ui = this;
    // $(".touch_cell[id^='c']").each(function () {
    //     var idx = parseInt(this.id.slice(1));
    //     $(this).css("cursor", g._board._stones[idx] != STONE.EMPTY ? "default" : "pointer");
    // });
    var count = 1;
    $(".cell[id^='d']").removeClass("show selected");
    ui._curIdx = STONE.EMPTY;
    for (var idx = 0; idx < CELL_NUM; idx++) {
        if (this._board._stones[idx] != STONE.EMPTY) {
            var stone = $(".stone[id='s" + count + "']");
            var x = IDX_TO_X(idx) - 1;
            var y = IDX_TO_Y(idx) - 1;
            stone.attr("data-idx", idx);
            stone.removeClass("white black");
            stone.addClass(this._board._stones[idx] == STONE.WHITE ? "white" : "black");
            stone.css("left", x * 71 + 11);
            stone.css("top", y * 71 + 11);
            stone.css("display", "block");
            count++;
        }
    }
    $("#arrow_line").attr("x1", -999);
    $("#arrow_line").attr("y1", -999);
    $("#arrow_line").attr("x2", -999);
    $("#arrow_line").attr("y2", -999);

    ui.showGameResult(ui._board._gameResult);
};
UI.prototype.initButtons = function () {
    // $('#chk_show_coordinates').change(function () {
    //     $(".cell_coord_v").css("display", (this.checked ? "block" : "none"));
    //     $(".cell_coord_h").css("display", (this.checked ? "block" : "none"));
    // });
    // $('#chk_show_last_move').change(function () {
    //     g_showLastMove = this.checked;
    //     // $(".dot").css("display", (this.checked ? "block" : "none"));
    // });
    // $('#chk_show_suggestion').change(function () {
    //     g_enabledSuggestion = this.checked;
    //     $(".genius_container").css("display", (this.checked ? "block" : "none"));
    // });
    var ui = this;
    $('#play_white').click(function () {
        if(ui._eng._initialized) {
            play(SIDE.WHITE);
        }
    });
    $('#play_black').click(function () {
        if(ui._eng._initialized) {
            play(SIDE.BLACK);
        }
    });
};
UI.prototype.setInfoText = function (text) {
    $('#info_container').html(text);
};
// UI.prototype.setGoodMoves = function (moves) {
//     var strMoves = "";
//     for(var i = 0; i < moves.length; i++) {
//         strMoves += GET_MOVE_NAME(moves[i]);
//         if(i < moves.length - 1) {
//             strMoves += ", ";
//         }
//     }
//     $('#good_moves').html(strMoves);
//     $('#good_counter').html("(" + moves.length + ")");
// };
// UI.prototype.setWinMoves = function (moves) {
//     var strMoves = "";
//     for(var i = 0; i < moves.length; i++) {
//         strMoves += GET_MOVE_NAME(moves[i]);
//         if(i < moves.length - 1) {
//             strMoves += ", ";
//         }
//     }
//     $('#win_moves').html(strMoves);
//     $('#win_counter').html("(" + moves.length + ")");
// };
// UI.prototype.setLoseMoves = function (moves) {
//     var strMoves = "";
//     for(var i = 0; i < moves.length; i++) {
//         strMoves += GET_MOVE_NAME(moves[i]);
//         if(i < moves.length - 1) {
//             strMoves += ", ";
//         }
//     }
//     $('#lose_moves').html(strMoves);
//     $('#lose_counter').html("(" + moves.length + ")");
// };