function Engine() {
    let b;
    let a;
    this._initialized = false;
    this.b4 = Math.floor((25 * (25 - 1) * (25 - 2)) / 6);
    this.s = new Array(25);
    for (a = 0; a < 25; a++) {
        this.s[a] = new Array(25);
        for (b = 0; b < 25; b++) {
            this.s[a][b] = new Array(25);
        }
    }
    this.t = new Array(this.b4);
    for (a = 0; a < this.b4; a++) {
        this.t[a] = new Array(4);
    }
    this.u = new Array(this.b4);
    this.v = new Array(this.b4);
    this.x = new Array(this.b4);
    for (a = 0; a < this.b4; a++) {
        this.x[a] = new Array(this.b4);
    }
    this.y = new Array(25);
    for (a = 0; a < 25; a++) {
        this.y[a] = new Array(6);
    }
    this.p = new Array(25);
    this.q = new Array(25);
    for (a = 0; a < 25; a++) {
        this.q[a] = new Array(8);
        b = a % 5;
        let c = Math.floor(a / 5);
        this.q[a][0] = a;
        this.q[a][1] = (5 - 1 - b) + 5 * c;
        this.q[a][2] = b + 5 * (5 - 1 - c);
        this.q[a][3] = (5 - 1 - b) + 5 * (5 - 1 - c);
        this.q[a][4] = c + 5 * b;
        this.q[a][5] = (5 - 1 - c) + 5 * b;
        this.q[a][6] = c + 5 * (5 - 1 - b);
        this.q[a][7] = (5 - 1 - c) + 5 * (5 - 1 - b);
    }
    this.w = new Array(5);
    for (a = 0; a < 5; a++) {
        this.w[a] = new Array(5);
    }
    this.letter = ["a", "b", "c", "d", "e", "f", "g"];
    this.choice = new Array(25);
}

Engine.prototype.init = function () {
    let f;
    let e;
    let c;
    let b;
    let a;
    let d = -1;
    for (a = 0; a < 25 - 2; a++) {
        for (b = a + 1; b < 25 - 1; b++) {
            for (c = b + 1; c < 25; c++) {
                d++;
                this.u[d] = new Array(5);
                for (e = 0; e < 5; e++) {
                    this.u[d][e] = new Array(5);
                    for (f = 0; f < 5; f++) {
                        this.u[d][e][f] = 0;
                    }
                }
                this.u[d][a % 5][Math.floor(a / 5)] = 1;
                this.u[d][b % 5][Math.floor(b / 5)] = 1;
                this.u[d][c % 5][Math.floor(c / 5)] = 1;
                this.v[d] = 0;
                if ((a % 5) + (c % 5) === 2 * (b % 5) &&
                    Math.floor(a / 5) + Math.floor(c / 5) === 2 * Math.floor(b / 5)) {
                    if ((a % 5) - (c % 5) <= 2 &&
                        (c % 5) - (a % 5) <= 2 &&
                        Math.floor(a / 5) - Math.floor(c / 5) <= 2 &&
                        Math.floor(c / 5) - Math.floor(a / 5) <= 2) {
                        this.v[d] = 1;
                    }
                }
                this.s[a][b][c] = d;
                this.s[a][c][b] = d;
                this.s[b][a][c] = d;
                this.s[b][c][a] = d;
                this.s[c][a][b] = d;
                this.s[c][b][a] = d;
                this.t[d][0] = a;
                this.t[d][1] = b;
                this.t[d][2] = c;
                this.t[d][3] = 2;
            }
        }
    }
    for (a = 0; a < this.b4; a++) {
        for (b = 1; b < 8; b++) {
            if (this.t[a][3] === 1) {
                this.t[a][3] = 2;
            }
            c = 0;
            while (c < 25 && this.t[a][3] === 2) {
                if (this.u[a][c % 5][Math.floor(c / 5)] !== this.u[a][this.q[c][b] % 5][Math.floor(this.q[c][b] / 5)]) {
                    if (this.u[a][Math.floor(c % 5)][Math.floor(c / 5)] === 1) {
                        this.t[a][3] = 1;
                    } else {
                        this.t[a][3] = 0;
                    }
                }
                c++;
            }
            if (this.t[a][3] === 2) {
                this.t[a][3] = 1;
            }
        }
    }
    let j = 0;
    for (a = 0; a < this.b4; a++) {
        for (b = 0; b < this.b4; b++) {
            this.x[a][b] = 124;
            if (this.v[b] === 1) {
                this.x[a][b] = -120;
            }
            if (this.v[a] === 1) {
                this.x[a][b] = 126;
            }
            if (this.u[a][this.t[b][0] % 5][Math.floor(this.t[b][0] / 5)] === 1 ||
                this.u[a][this.t[b][1] % 5][Math.floor(this.t[b][1] / 5)] === 1 ||
                this.u[a][this.t[b][2] % 5][Math.floor(this.t[b][2] / 5)] === 1) {
                this.x[a][b] = 126;
            }
            if (this.x[a][b] === -120) {
                j++;
            }
        }
    }
    c = -119;
    do {
        j = 0;
        for (a = 0; a < this.b4; a++) {
            if (this.t[a][3] === 1) {
                for (b = 0; b < this.b4; b++) {
                    if (this.x[a][b] === 124) {
                        stop: {
                            for (let k = 0; k < 3; k++) {
                                d = this.t[a][k] % 5;
                                e = Math.floor(this.t[a][k] / 5);
                                for (f = -1; f <= 1; f++) {
                                    for (let g = -1; g <= 1; g++) {
                                        if (f * f + g * g > 0) {
                                            if (d + f >= 0 && d + f < 5 && e + g >= 0 && e + g < 5) {
                                                if (this.u[a][d + f][e + g] === 0 && this.u[b][d + f][e + g] === 0) {
                                                    let h;
                                                    let f1 = f;
                                                    let g1 = g;
                                                    while (d + f1 + f >= 0 &&
                                                        d + f1 + f < 5 &&
                                                        e + g1 + g >= 0 &&
                                                        e + g1 + g < 5 &&
                                                        this.u[a][d + f1 + f][e + g1 + g] === 0 &&
                                                        this.u[b][d + f1 + f][e + g1 + g] === 0) {
                                                        f1 += f;
                                                        g1 += g;
                                                    }
                                                    for (h = 0; h < 3; h++) {
                                                        this.p[h] = this.t[a][h];
                                                    }
                                                    this.p[k] = d + f1 + 5 * (e + g1);
                                                    h = this.s[this.p[0]][this.p[1]][this.p[2]];
                                                    if (c % 2 === 0) {
                                                        if (this.x[b][h] < c)
                                                            this.x[a][b] = c;
                                                        else {
                                                            this.x[a][b] = 124;
                                                            break stop;
                                                        }
                                                    } else {
                                                        if (this.x[b][h] === c - 1) {
                                                            this.x[a][b] = c;
                                                            break stop;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (this.x[a][b] === c) {
                            j++;
                            for (d = 1; d < 8; d++) {
                                e = this.s[this.q[this.t[a][0]][d]][this.q[this.t[a][1]][d]][this.q[this.t[a][2]][d]];
                                f = this.s[this.q[this.t[b][0]][d]][this.q[this.t[b][1]][d]][this.q[this.t[b][2]][d]];
                                if (this.x[e][f] !== c) {
                                    this.x[e][f] = c;
                                    j++;
                                }
                            }
                        }
                    }
                }
            }
        }
        c++;
    } while (j > 0);
    a = this.s[1][3][17];
    b = this.s[7][21][23];
    for (c = 0; c < 5; c++) {
        for (d = 0; d < 5; d++) {
            this.w[c][d] = this.u[a][c][d] - this.u[b][c][d];
        }
    }
    this._initialized = true;
};

Engine.prototype.think = function (bb) {
    let d;
    let f;
    let e;
    let out = [];
    if (!this._initialized) {
        return out;
    }
    for (e = 0; e < 5; e++) {
        for (f = 0; f < 5; f++) {
            this.w[f][4 - e] = 0;
            if (bb.charAt((f) + 5 * (e)) === "1") {
                this.w[f][4 - e] = 1;
            } else if (bb.charAt((f) + 5 * (e)) === "2") {
                this.w[f][4 - e] = -1;
            }
        }
    }
    let h1 = 0;
    while (this.w[h1 % 5][Math.floor(h1 / 5)] <= 0) {
        h1++;
    }
    let h2 = h1 + 1;
    while (this.w[h2 % 5][Math.floor(h2 / 5)] <= 0) {
        h2++;
    }
    let h3 = h2 + 1;
    while (this.w[h3 % 5][Math.floor(h3 / 5)] <= 0) {
        h3++;
    }
    let a = this.s[h1][h2][h3];
    h1 = 0;
    while (this.w[h1 % 5][Math.floor(h1 / 5)] >= 0) {
        h1++;
    }
    h2 = h1 + 1;
    while (this.w[h2 % 5][Math.floor(h2 / 5)] >= 0) {
        h2++;
    }
    h3 = h2 + 1;
    while (this.w[h3 % 5][Math.floor(h3 / 5)] >= 0) {
        h3++;
    }
    let b = this.s[h1][h2][h3];
    if (this.x[a][b] > -120) {
        let j = 0;
        if (this.x[a][b] === 126) {

        } else {
            let c;
            for (let k = 0; k < 3; k++) {
                d = this.t[a][k] % 5;
                e = Math.floor(this.t[a][k] / 5);
                for (let f = -1; f <= 1; f++) {
                    for (let g = -1; g <= 1; g++) {
                        if (f * f + g * g > 0) {
                            if (d + f >= 0 && d + f < 5 && e + g >= 0 && e + g < 5) {
                                if (this.w[d + f][e + g] === 0) {
                                    let h;
                                    let f1 = f;
                                    let g1 = g;
                                    while (d + f1 + f >= 0 &&
                                        d + f1 + f < 5 &&
                                        e + g1 + g >= 0 &&
                                        e + g1 + g < 5 &&
                                        this.w[d + f1 + f][e + g1 + g] === 0) {
                                        f1 += f;
                                        g1 += g;
                                    }
                                    for (h = 0; h < 3; h++) {
                                        this.p[h] = this.t[a][h];
                                    }
                                    this.p[k] = d + f1 + 5 * (e + g1);
                                    h = this.s[this.p[0]][this.p[1]][this.p[2]];
                                    j++;
                                    this.choice[j] = {
                                        from: this.letter[d] + (e + 1),
                                        to: this.letter[d + f1] + (e + g1 + 1),
                                        desc: ""
                                    };
                                    if (this.x[b][h] === 124) {
                                        this.choice[j].desc = "Draw";
                                    } else {
                                        if (this.x[b][h] % 2 === 0) {
                                            this.choice[j].desc = "Win";
                                        } else {
                                            this.choice[j].desc = "Loss";
                                        }
                                        if (this.x[b][h] > -120) {
                                            this.choice[j].desc += " in " + (this.x[b][h] + 121) + " moves";
                                        }
                                    }
                                    this.y[j][0] = d;
                                    this.y[j][1] = e;
                                    this.y[j][2] = d + f1;
                                    this.y[j][3] = e + g1;
                                    this.y[j][4] = h;
                                    this.y[j][5] = 120 + this.x[b][h];
                                    if (this.y[j][5] % 2 === 0) {
                                        this.y[j][5] = this.y[j][5] - 244;
                                    } else {
                                        this.y[j][5] = 244 - this.y[j][5];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for (c = 1; c <= j; c++) {
                this.p[c] = c;
            }
            for (c = 1; c < j; c++) {
                for (d = c + 1; d <= j; d++) {
                    if (this.y[this.p[c]][5] > this.y[this.p[d]][5]) {
                        e = this.p[c];
                        this.p[c] = this.p[d];
                        this.p[d] = e;
                    }
                }
            }
            for (c = 1; c <= j; c++) {
                out.push(this.choice[this.p[c]]);
            }
        }
    }
    return out;
};
