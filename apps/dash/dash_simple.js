tcBack.replaceWith(() => {
  buzzer.nav(buzzer.buzz.ok);
  face.go("clock", 0);
});

tcNext.replaceWith(() => {
  if (euc.state != "OFF") {
    if (euc.state != "READY") {
      buzzer.nav(buzzer.buzz.na);
      return;
    }
    buzzer.nav(buzzer.buzz.ok);
    face.go("dash" + require("Storage").readJSON("dash.json", 1)["slot" + require("Storage").readJSON("dash.json", 1).slot + "Maker"], 0);
  } else buzzer.nav(buzzer.buzz.na);
});

face[0] = {
  offms: ew.def.off[face.appCurr] ? ew.def.off[face.appCurr] : 10000,
  g: w.gfx,
  run: false,
  init: function () {
    if (!this.run && face.appPrev !== "dash_simple") {
      UIc.clear();
      this.g.clear();
    }
    this.spdC = [15, 14, 15, 14];
    this.spdCB = [0, 0, 13, 14];
    this.ampC = [1, 0, 13, 13];
    this.tmpC = [11, 14, 13, 13];
    this.batC = [4, 9, 13, 13];
    this.indP = 1;
    this.indD = 1;
    this.gui = {
      spd: [0, 20, 240, 190],
      spdm: 120,
      center: 120,
      batTop: [0, 190, 240, 200],
      bat: [15, 205, 225, 225],
      batOut: [10, 200, 230, 230],
      tmp: [30, 260, 210, 275],
      clock: [10, 240, 230, 280],
      txt: 200 * UI.size.txt,
      txt1: 40 * UI.size.txt,
      txtBat: 20,
      topr: [122, 20, 239, 70],
    };
    this.spd = euc.dash.live.spd - 1;
    this.spdF = euc.dash.opt.unit.fact.spd * (ew.def.dash.mph ? 0.625 : 1);
    this.trpF = euc.dash.opt.unit.fact.dist * (ew.def.dash.mph ? 0.625 : 1);
    this.run = true;
  },
  show: function () {
    if (!this.run) return;
    if (euc.state == "READY") {
      if (face[0].conn != euc.state) {
        face[0].conn = euc.state;
        this.bar();
      }
      if (face[0].spd != Math.round(euc.dash.live.spd)) face[0].spdf();
      else if (face[0].bat != euc.dash.live.bat && !UI.ntid) {
        face[0].barBat();
      } else if (getTime() - face[0].time > 60) this.barClock();
    } else if (euc.state != face[0].conn) {
      if (euc.state == "OFF") {
        face.go("dashGarage", 0);
        return;
      }
      this.bar();
      UI.btn.c2l("main", "_lcd", 2, euc.state, 0, 15, 0, 0.7);
      face[0].conn = euc.state;
      face[0].spd = -1;
      face[0].time = 0;
      face[0].amp = -1;
      face[0].tmp = -1;
      face[0].volt = -1;
      face[0].bat = -1;
      face[0].trpL = -1;
      face[0].lock = 2;
      face[0].run = true;
    }
    this.g.flip();
    this.tid = setTimeout(
      function (t) {
        const tm = getTime();
        t.indP += t.indD;
        UI.ele.ind(t.indP, 6, 0, euc.state === "READY" ? 11 : 14);
        if (t.indP > 5) t.indD = -1;
        else if (t.indP < 2) t.indD = 1;
        t.tid = 0;
        t.show();
        if (ew.dbg) console.log("simple dash, time in loop", getTime() - tm);
      },
      100,
      this,
    );
  },
  spdf: function () {
    if (Math.abs(euc.dash.live.spd - this.spd) < 3) this.spd = Math.round(euc.dash.live.spd);
    else if (euc.dash.live.spd < this.spd) this.spd = Math.round(this.spd - (this.spd - euc.dash.live.spd) / 2);
    else this.spd = Math.round(this.spd + (euc.dash.live.spd - this.spd) / 2);
    this.g.setColor(1, this.spdCB[euc.dash.alrt.spd.cc]);
    this.g.fillRect(this.gui.spd[0], this.gui.spd[1], this.gui.spd[2], this.gui.spd[3]);
    this.g.setColor(0, this.spdC[euc.dash.alrt.spd.cc]);
    if (this.spd >= 100) {
      if (this.spd > 120) this.spd = 120;
      this.g.setFontVector(this.gui.txt - 30);
    } else this.g.setFontVector(this.gui.txt);
    this.g.drawString(Math.round(this.spd * this.spdF), this.gui.center + 5 - this.g.stringWidth(Math.round(this.spd * this.spdF)) / 2, this.gui.spdm - this.gui.txt / 2);
  },
  barBat: function () {
    this.bat = euc.dash.live.bat;
    this.g.setColor(0, 0);
    this.g.fillRect({ x: this.gui.batTop[0], y: this.gui.batTop[1], x2: this.gui.batTop[2], y2: this.gui.batTop[3], r: 0 });
    this.g.setColor(0, this.batC[euc.dash.alrt.bat.cc]);
    this.g.fillRect({ x: this.gui.batOut[0], y: this.gui.batOut[1], x2: this.gui.batOut[2], y2: this.gui.batOut[3], r: 17 });

    let rel = (this.gui.bat[2] - this.gui.bat[0]) / 100;
    this.g.setColor(1, 1);
    this.g.fillRect({ x: this.gui.bat[0], y: this.gui.bat[1], x2: this.gui.bat[2], y2: this.gui.bat[3], r: 10 });

    this.g.setColor(0, 15);
    this.g.fillRect({ x: this.gui.bat[0] + 3, y: this.gui.bat[1] + 2, x2: this.gui.bat[0] + this.bat * rel - 3, y2: this.gui.bat[3] - 2, r: 10 });

    this.g.setFontVector(this.gui.txtBat);
    this.g.setColor(0, 2);
    this.g.drawString("|    |    |    |", this.gui.center - this.g.stringWidth("|    |    |    |") / 2, this.gui.bat[1]);
  },
  barTemp: function () {
    this.tmp = euc.dash.live.tmp.toFixed(1);
    this.g.setColor(0, 10);
    let rel = (this.gui.tmp[2] - this.gui.tmp[0]) / 100;
    this.g.fillRect({ x: this.gui.tmp[0], y: this.gui.tmp[1], x2: this.gui.tmp[0] + this.tmp * rel, y2: this.gui.tmp[3], r: 10 });
    this.g.setColor(1, 6);
    this.g.fillRect({ x: this.gui.tmp[0] + this.tmp * rel, y: this.gui.tmp[1], x2: this.gui.tmp[2], y2: this.gui.tmp[3], r: 10 });
  },
  barClock: function () {
    this.time = getTime();
    this.g.setColor(0, 0);
    this.g.fillRect(this.gui.clock[0], this.gui.clock[1], this.gui.clock[2], this.gui.clock[3]);
    this.g.setColor(1, 11);
    this.g.setFontVector(this.gui.txt1);
    let d = Date().toString().split(" ");
    let t = d[4].toString().split(":");
    if (!ew.def.hr24) {
      t[0] = t[0] < 10 ? (t[0] == "00" ? 12 : t[0][1]) : t[0] < 13 ? t[0] : t[0] - 12;
    }
    this.g.drawString(t[0] + ":" + t[1], this.gui.center - this.g.stringWidth(t[0] + ":" + t[1]) / 2, this.gui.clock[1] + 5);
  },
  bar: function () {
    UI.ele.fill("_bar", 6, 0);
    if (euc.state != "READY") {
      if (euc.state == "ON") {
        UI.ele.fill("_bar", 6, 0);
      } else {
        UIc.start(0, 1);
        UI.btn.c2l("bar", "_bar", 6, "CANCEL", 0, 15, 13, 1.2);
        UIc.end();
        UIc.bar._bar = (i) => {
          buzzer.nav(buzzer.buzz.ok);
          euc.tgl();
        };
      }
      return;
    }
    face[0].barBat();
    face[0].barClock();
  },
  clear() {
    this.run = false;
    ew.temp.bar = 0;
    if (this.tid) clearTimeout(this.tid);
    this.tid = 0;
    return true;
  },
  off() {
    this.g.off();
    this.clear();
  },
};

face[1] = {
  offms: 1000,
  init() {
    return true;
  },
  show() {
    face.pageCurr = 0;
    if (euc.state === "OFF") {
      face.go("clock", 0);
    } else {
      face.go(ew.is.dash[ew.def.dash.face], -1);
    }
    return true;
  },
  clear() {
    return true;
  },
  off() {
    return true;
  },
};
