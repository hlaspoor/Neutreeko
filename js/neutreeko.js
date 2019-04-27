var a, b, c, d, e, f, g, h, i, j, k;
var f1, g1, h1, h2, h3;
var b4 = parseInt((25 * (25 - 1) * (25 - 2)) / 6);
var s = new Array(25);
for (a = 0; a < 25; a++) {
    s[a] = new Array(25);
    for (b = 0; b < 25; b++) {
        s[a][b] = new Array(25);
    }
}
var t = new Array(b4);
for (a = 0; a < b4; a++) {
    t[a] = new Array(4);
}
var u = new Array(b4);
var v = new Array(b4);
var x = new Array(b4);
for (a = 0; a < b4; a++) {
    x[a] = new Array(b4);
}
var y = new Array(25);
for (a = 0; a < 25; a++) {
    y[a] = new Array(6);
}
var p = new Array(25);
var q = new Array(25);
for (a = 0; a < 25; a++) {
    q[a] = new Array(8);
    b = a % 5;
    c = parseInt(a / 5);
    q[a][0] = a;
    q[a][1] = (5 - 1 - b) + 5 * c;
    q[a][2] = b + 5 * (5 - 1 - c);
    q[a][3] = (5 - 1 - b) + 5 * (5 - 1 - c);
    q[a][4] = c + 5 * b;
    q[a][5] = (5 - 1 - c) + 5 * b;
    q[a][6] = c + 5 * (5 - 1 - b);
    q[a][7] = (5 - 1 - c) + 5 * (5 - 1 - b);
}
var w = new Array(5);
for (a = 0; a < 5; a++) {
    w[a] = new Array(5);
}

var piece = new Array(3);
piece[0] = "o";
piece[1] = " ";
piece[2] = "x";
var letter = new Array(7);
letter[0] = "A";
letter[1] = "B";
letter[2] = "C";
letter[3] = "D";
letter[4] = "E";
letter[5] = "F";
letter[6] = "G";
var choice = new Array(25);

function init() {
    setTimeout(function () {
            console.log("init start...");
            d = -1;
            for (a = 0; a < 25 - 2; a++) {
                for (b = a + 1; b < 25 - 1; b++) {
                    for (c = b + 1; c < 25; c++) {
                        d++;
                        u[d] = new Array(5);
                        for (e = 0; e < 5; e++) {
                            u[d][e] = new Array(5);
                            for (f = 0; f < 5; f++) {
                                u[d][e][f] = 0;
                            }
                        }
                        u[d][a % 5][parseInt(a / 5)] = 1;
                        u[d][b % 5][parseInt(b / 5)] = 1;
                        u[d][c % 5][parseInt(c / 5)] = 1;
                        v[d] = 0;
                        if ((a % 5) + (c % 5) === 2 * (b % 5) &&
                            parseInt(a / 5) + parseInt(c / 5) === 2 * parseInt(b / 5)) {
                            if ((a % 5) - (c % 5) <= 2 &&
                                (c % 5) - (a % 5) <= 2 &&
                                parseInt(a / 5) - parseInt(c / 5) <= 2 &&
                                parseInt(c / 5) - parseInt(a / 5) <= 2) {
                                v[d] = 1;
                            }
                        }
                        s[a][b][c] = d;
                        s[a][c][b] = d;
                        s[b][a][c] = d;
                        s[b][c][a] = d;
                        s[c][a][b] = d;
                        s[c][b][a] = d;
                        t[d][0] = a;
                        t[d][1] = b;
                        t[d][2] = c;
                        t[d][3] = 2;
                    }
                }
            }
            for (a = 0; a < b4; a++) {
                for (b = 1; b < 8; b++) {
                    if (t[a][3] === 1) {
                        t[a][3] = 2;
                    }
                    c = 0;
                    while (c < 25 && t[a][3] === 2) {
                        if (u[a][c % 5][parseInt(c / 5)] !== u[a][q[c][b] % 5][parseInt(q[c][b] / 5)]) {
                            if (u[a][parseInt(c % 5)][parseInt(c / 5)] === 1) {
                                t[a][3] = 1;
                            } else {
                                t[a][3] = 0;
                            }
                        }
                        c++;
                    }
                    if (t[a][3] === 2) {
                        t[a][3] = 1;
                    }
                }
            }
            j = 0;
            for (a = 0; a < b4; a++) {
                for (b = 0; b < b4; b++) {
                    x[a][b] = 124;
                    if (v[b] === 1) {
                        x[a][b] = -120;
                    }
                    if (v[a] === 1) {
                        x[a][b] = 126;
                    }
                    if (u[a][t[b][0] % 5][parseInt(t[b][0] / 5)] === 1 ||
                        u[a][t[b][1] % 5][parseInt(t[b][1] / 5)] === 1 ||
                        u[a][t[b][2] % 5][parseInt(t[b][2] / 5)] === 1) {
                        x[a][b] = 126;
                    }
                    if (x[a][b] === -120) {
                        j++;
                    }
                }
            }
            //console.log("0\t" + j);
            c = -119;
            do {
                j = 0;
                for (a = 0; a < b4; a++)
                    if (t[a][3] === 1)
                        for (b = 0; b < b4; b++) {
                            if (x[a][b] === 124) {
                                stop: {
                                    for (k = 0; k < 3; k++) {
                                        d = t[a][k] % 5;
                                        e = parseInt(t[a][k] / 5);
                                        for (f = -1; f <= 1; f++)
                                            for (g = -1; g <= 1; g++)
                                                if (f * f + g * g > 0)
                                                    if (d + f >= 0 && d + f < 5 && e + g >= 0 && e + g < 5)
                                                        if (u[a][d + f][e + g] === 0 && u[b][d + f][e + g] === 0) {
                                                            f1 = f;
                                                            g1 = g;
                                                            while (d + f1 + f >= 0 &&
                                                                d + f1 + f < 5 &&
                                                                e + g1 + g >= 0 &&
                                                                e + g1 + g < 5 &&
                                                                u[a][d + f1 + f][e + g1 + g] === 0 &&
                                                                u[b][d + f1 + f][e + g1 + g] === 0) {
                                                                f1 += f;
                                                                g1 += g;
                                                            }
                                                            for (h = 0; h < 3; h++)
                                                                p[h] = t[a][h];
                                                            p[k] = d + f1 + 5 * (e + g1);
                                                            h = s[p[0]][p[1]][p[2]];
                                                            if (c % 2 === 0) {
                                                                if (x[b][h] < c)
                                                                    x[a][b] = c;
                                                                else {
                                                                    x[a][b] = 124;
                                                                    break stop;
                                                                }
                                                            } else {
                                                                if (x[b][h] === c - 1) {
                                                                    x[a][b] = c;
                                                                    break stop;
                                                                }
                                                            }
                                                        }
                                    }
                                }
                                if (x[a][b] === c) {
                                    j++;
                                    for (d = 1; d < 8; d++) {
                                        e = s[q[t[a][0]][d]][q[t[a][1]][d]][q[t[a][2]][d]];
                                        f = s[q[t[b][0]][d]][q[t[b][1]][d]][q[t[b][2]][d]];
                                        if (x[e][f] !== c) {
                                            x[e][f] = c;
                                            j++;
                                        }
                                    }
                                }
                            }
                        }
                //console.log((c + 120) + "\t" + j);
                c++;
            } while (j > 0)
            a = s[1][3][17];
            b = s[7][21][23];
            for (c = 0; c < 5; c++) {
                for (d = 0; d < 5; d++) {
                    w[c][d] = u[a][c][d] - u[b][c][d];
                }
            }
            console.log("init end");
            think("0101000200000000010002020");
        },
        0);
}

function think(bb) {
    for (e = 0; e < 5; e++) {
        for (f = 0; f < 5; f++) {
            w[e][f] = 0;
            if (bb.charAt(f * 5 + e) === "1") {
                w[e][f] = 1;
            }else if (bb.charAt(f * 5 + e) === "2") {
                w[e][f] = -1;
            }
        }
    }
    h1 = 0;
    while (w[h1 % 5][parseInt(h1 / 5)] <= 0) {
        h1++;
    }
    h2 = h1 + 1;
    while (w[h2 % 5][parseInt(h2 / 5)] <= 0) {
        h2++;
    }
    h3 = h2 + 1;
    while (w[h3 % 5][parseInt(h3 / 5)] <= 0) {
        h3++;
    }
    a = s[h1][h2][h3];
    h1 = 0;
    while (w[h1 % 5][parseInt(h1 / 5)] >= 0) {
        h1++;
    }
    h2 = h1 + 1;
    while (w[h2 % 5][parseInt(h2 / 5)] >= 0) {
        h2++;
    }
    h3 = h2 + 1;
    while (w[h3 % 5][parseInt(h3 / 5)] >= 0) {
        h3++;
    }
    b = s[h1][h2][h3];
    if (x[a][b] > -120) {
        j = 0;
        if (x[a][b] === 126) {

        } else {
            for (k = 0; k < 3; k++) {
                d = t[a][k] % 5;
                e = parseInt(t[a][k] / 5);
                for (f = -1; f <= 1; f++) {
                    for (g = -1; g <= 1; g++) {
                        if (f * f + g * g > 0) {
                            if (d + f >= 0 && d + f < 5 && e + g >= 0 && e + g < 5) {
                                if (w[d + f][e + g] === 0) {
                                    f1 = f;
                                    g1 = g;
                                    while (d + f1 + f >= 0 &&
                                        d + f1 + f < 5 &&
                                        e + g1 + g >= 0 &&
                                        e + g1 + g < 5 &&
                                        w[d + f1 + f][e + g1 + g] === 0) {
                                        f1 += f;
                                        g1 += g;
                                    }
                                    for (h = 0; h < 3; h++) {
                                        p[h] = t[a][h];
                                    }
                                    p[k] = d + f1 + 5 * (e + g1);
                                    h = s[p[0]][p[1]][p[2]];
                                    j++;
                                    choice[j] = ".\t" +
                                        letter[d] +
                                        (e + 1) +
                                        "-" +
                                        letter[d + f1] +
                                        (e + g1 + 1) +
                                        " : ";
                                    if (x[b][h] === 124) {
                                        choice[j] += "Draw";
                                    } else {
                                        if (x[b][h] % 2 === 0) {
                                            choice[j] += "Win";
                                        } else {
                                            choice[j] += "Loss";
                                        }
                                        if (x[b][h] > -120) {
                                            choice[j] += " in " + (x[b][h] + 121) + " moves";
                                        }
                                    }
                                    y[j][0] = d;
                                    y[j][1] = e;
                                    y[j][2] = d + f1;
                                    y[j][3] = e + g1;
                                    y[j][4] = h;
                                    y[j][5] = 120 + x[b][h];
                                    if (y[j][5] % 2 === 0) {
                                        y[j][5] = y[j][5] - 244;
                                    } else {
                                        y[j][5] = 244 - y[j][5];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for (c = 1; c <= j; c++) {
                p[c] = c;
            }
            for (c = 1; c < j; c++) {
                for (d = c + 1; d <= j; d++) {
                    if (y[p[c]][5] > y[p[d]][5]) {
                        e = p[c];
                        p[c] = p[d];
                        p[d] = e;
                    }
                }
            }
            for (c = 1; c <= j; c++) {
                console.log(c + choice[p[c]]);
            }
        }
    }
    console.log(w);
}

init();

