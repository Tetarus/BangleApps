tcBack.replaceWith(() => {
  buzzer.nav(buzzer.buzz.na);
});

tcNext.replaceWith(() => {
  buzzer.nav(buzzer.buzz.ok);
  if (UI.ntid) {
    clearTimeout(UI.ntid);
    UI.ntid = 0;
  }
  if (euc.state != "OFF") face.go(ew.is.dash[ew.def.dash.face], 0);
  else {
    face.go("dashGarage", 0);
  }
});

if (ew.def.bri < 3) theme = themeN;
else theme = themeD;

face[0] = {
  offms: ew.def.off[face.appCurr] ? ew.def.off[face.appCurr] : 10000,
  g: w.gfx,
  run: false,
  init: function () {
    this.startTime = getTime();
    this.v = w.batt(1);
    UIc.start(1, 1);
    UIc.end();
    this.gui = {
      top: [0, 20, 240, 54],
      note: [0, 55, 240, 90],
      sec: [202, 75, 240, 185],
      hour: [0, 75, 100, 185],
      min: [99, 75, 202, 185],
      btm: [0, 176, 240, 200],
      bat: [145, 30, 225, 55],
      batN: [140, 55, 230, 65],
      date: [0, 30, 145, 55],
      dateN: [10, 55, 125, 65],
      dots: [100, 133],
      time: [89, 111, 105],
      secY: [108, 138],
      txt: 25 * UI.size.txt,
      txtS: 18 * UI.size.txt,
      txtM: 32 * UI.size.txt,
      txtL: 85 * UI.size.txt,
    };
    this.g.setColor(1, theme.clock.top);
    this.g.fillRect(this.gui.top[0], this.gui.top[1], this.gui.top[2], this.gui.top[3]);
    this.g.setColor(1, theme.clock.back);
    this.g.fillRect({ x: this.gui.note[0], y: this.gui.note[1], x2: this.gui.note[2], y2: this.gui.note[3], r: 0 });
    this.g.fillRect({ x: this.gui.btm[0], y: this.gui.btm[1], x2: this.gui.btm[2], y2: this.gui.btm[3], r: 0 });
    this.g.setColor(0, 0);
    this.hour = -1;
    this.min = -1;
    this.sec = -1;
    this.batt = -1;
    this.bt = -1;
    this.vol = 50;
    this.time();
    this.bat();
    this.date();
    this.bar();
    this.g.setFont("Vector", this.gui.txtL);
    if (ew.is.bt == 6 || ew.is.bt == 3) this.hid();
    else {
      UI.btn.ntfy(0, 3, 1);
      UI.btn.c2l("bar", "_bar", 6, "eucWatch", ew.def.name, 15, 0, 0);
    }
    this.run = true;
  },
  show: function () {
    if (ew.def.bri < 3) theme = themeN;
    else theme = themeD;
    if (!this.run) return;
    if (this.batt != ew.is.ondc) {
      this.bat();
    }
    if (this.bt != ew.is.bt) {
      this.date();
    }
    this.time();
    this.g.flip();
    this.tid = setTimeout(
      function (t) {
        t.tid = 0;
        t.show();
      },
      250,
      this,
    );
  },
  bar: function () {
    if (ew.is.bt == 6 || ew.is.bt == 3) {
      this.hid();
      return;
    }
    UI.ele.ind(0, 0, 0, 0);
    UI.ele.fill("_bar", 6, 0);
    UIc.start(1, 1);
    if (ew.def.hid) {
      UI.ele.coord("main", "_main", 3);
      UIc.main._main = (i) => {
        buzzer.nav(buzzer.buzz.ok);
        if (i == 3) {
          this.hid();
        }
      };
    }
    UIc.end();
  },
  date: function () {
    this.bt = ew.is.bt;
    this.ring = 0;
    var colbt = theme.clock.dateB;
    if (this.bt == 1) colbt = 14;
    else if (this.bt == 2) colbt = 9;
    else if (this.bt == 3) colbt = 11;
    else if (this.bt == 5) colbt = 15;
    else if (this.bt == 6) colbt = 4;
    this.g.setColor(0, colbt);
    this.g.fillRect(this.gui.dateN[0], this.gui.dateN[1], this.gui.dateN[2], this.gui.dateN[3]);
    this.g.setColor(0, theme.clock.top);
    this.g.fillRect(this.gui.date[0], this.gui.date[1], this.gui.date[2], this.gui.date[3]);
    this.g.setColor(1, theme.clock.dateF);
    w.gfx.setFont("LECO1976Regular22", 1.5);
    this.g.drawString(this.d[2] + " " + this.d[0].toUpperCase(), (this.gui.date[2] - this.gui.date[0]) / 2 - this.g.stringWidth(this.d[2] + " " + this.d[0].toUpperCase()) / 2, this.gui.date[1]);
  },
  bat: function () {
    this.batt = ew.is.ondc;
    this.v = w.batt(1);
    if (this.batt == 1) this.g.setColor(0, 9);
    else if (this.v <= 20) this.g.setColor(0, 13);
    else this.g.setColor(0, theme.clock.batB);
    this.g.fillRect(this.gui.batN[0], this.gui.batN[1], this.gui.batN[2], this.gui.batN[3]);

    this.g.setColor(0, theme.clock.top);
    this.g.fillRect(this.gui.bat[0], this.gui.bat[1], this.gui.bat[2], this.gui.bat[3]);

    this.g.setColor(1, theme.clock.batF);
    if (this.v <= 0) {
      this.g.setFont("Vector", this.gui.txt);
      this.g.drawString("EMPTY", this.gui.bat[2] - 5 - this.g.stringWidth("EMPTY"), this.gui.bat[1]);
    } else if (this.v < 100) {
      this.g.setFont("Vector", this.gui.txtM);
      this.g.drawString(this.v, this.gui.bat[2] - this.g.stringWidth(this.v), this.gui.bat[1]);
      this.g.drawImage(this.batt == 1 ? require("heatshrink").decompress(atob("jEYwIKHiACEnACHvACEv/AgH/AQcB/+AAQsAh4UBAQUOAQ8EAQgAEA==")) : require("heatshrink").decompress(atob("jEYwIEBngCDg//4EGgFgggCZgv/ASUEAQQaBHYPgJYQ=")), this.gui.bat[0], this.gui.bat[1]);
    } else {
      this.g.setFont("Vector", this.gui.txt);
      this.g.drawString("FULL", this.gui.bat[2] - this.g.stringWidth("FULL"), this.gui.bat[1]);
    }
  },
  hid: function () {
    UI.btn.ntfy(0, 3, 1);
    UIc.start(0, 1);
    UI.btn.img("bar", "_bar", 1, "volDn", "", 0, 4);
    UI.btn.img("bar", "_bar", 2, "playPause", "", 0, 15);
    UI.btn.img("bar", "_bar", 3, "volUp", "", 0, 4);
    UI.ele.coord("bar", "_bar", 3);
    UIc.end();
    UIc.bar._bar = (i, l) => {
      buzzer.nav(buzzer.buzz.ok);
      if (i == 1) {
        if (l) {
          UI.btn.ntfy(1, 1, 0, "_bar", 6, "LONG HOLD:", "PREV", 0, 15);
          this.g.flip();
          if (ew.is.bt == 6) ew.is.hidM.do("prev");
          else gb.send({ t: "music", n: "previous" });
        } else {
          UI.btn.img("bar", "_bar", 1, "volDn", "", 11, 4);
          UI.btn.ntfy(0, 0.5, 1);
          if (ew.is.bt == 6) ew.is.hidM.do("volumeDown");
          else gb.send({ t: "music", n: "volumedown" });
        }
      } else if (i == 2) {
        if (l) {
          UI.btn.ntfy(1, 1, 0, "_bar", 6, "LONG HOLD:", "MUTE", 0, 15);
          this.g.flip();
          if (ew.is.bt == 6) ew.is.hidM.do("mute");
          else gb.send({ t: "music", n: "pause" });
        } else {
          if (ew.is.bt == 6) ew.is.hidM.do("playpause");
          else {
            UI.btn.img("bar", "_bar", 2, gb.is.state == "play" ? "pause" : "play", "", 11, 0);
            UI.btn.ntfy(0, 1, 1);
            if (gb.is.state != "play") {
              gb.is.state = "play";
              gb.send({ t: "music", n: "play" });
            } else {
              gb.is.state = "pause";
              gb.send({ t: "music", n: "pause" });
            }
          }
        }
      } else if (i == 3) {
        if (l) {
          UI.btn.ntfy(1, 1, 0, "_bar", 6, "LONG HOLD:", "NEXT", 0, 15, 0);
          this.g.flip();
          if (ew.is.bt == 6) ew.is.hidM.do("next");
          else gb.send({ t: "music", n: "next" });
        } else {
          UI.btn.img("bar", "_bar", 3, "volUp", "", 11, 4);
          UI.btn.ntfy(0, 0.5, 1);
          if (ew.is.bt == 6) ew.is.hidM.do("volumeUp");
          else gb.send({ t: "music", n: "volumeup" });
        }
      }
    };
  },
  time: function () {
    this.d = Date().toString().split(" ");
    this.t = this.d[4].toString().split(":");
    this.s = this.t[2].toString().split("");
    this.fmin = theme.clock.minF;
    this.fhr = theme.clock.hrF;
    this.bmin = theme.clock.minB;
    this.fsec = theme.clock.secF;
    this.bsec = theme.clock.secB;
    if (this.t[1] != this.min) {
      this.min = this.t[1];
      this.g.setFont("LECO1976Regular22", 3);
      if (global.alrm) {
        if (alrm.buzz != -1) {
          this.bmin = 1;
          this.fmin = 13;
          this.fsec = 13;
          this.bsec = 1;
        } else if (alrm[1].tmr !== -1 || alrm[2].tmr !== -1 || alrm[3].tmr !== -1) {
          this.bmin = 5;
          this.fsec = 15;
          this.bsec = 0;
        } else {
          this.bmin = 1;
          this.fsec = 15;
          this.bsec = 1;
        }
      }
      this.g.setColor(0, this.bmin);
      this.g.fillRect({ x: this.gui.min[0], y: this.gui.min[1], x2: this.gui.min[2], y2: this.gui.min[3], r: 0 });
      this.g.setColor(1, this.fmin);
      this.g.drawString(this.t[1], this.gui.time[1], this.gui.time[2]);
    }
    if (process.env.BOARD != "BANGLEJS2") {
      this.g.setColor(0, this.bsec);
      this.g.fillRect({ x: this.gui.sec[0], y: this.gui.sec[1], x2: this.gui.sec[2], y2: this.gui.sec[3], r: 10 });
      this.g.setColor(1, this.fsec);
      this.g.setFontLECO1976Regular22();
      let sec = ew.def.hr24 ? "24" : this.t[0] < 12 ? "AM" : "PM";
      this.g.drawString(sec, this.gui.sec[2] - 5 - this.g.stringWidth(sec), this.gui.secY[0]);
      this.g.setFontLECO1976Regular22();
      this.g.drawString(this.s[0] + this.s[1], this.gui.sec[2] - 5 - this.g.stringWidth(this.s[0] + this.s[1]), this.gui.secY[1]);
    }
    this.g.setColor(1, this.s[1] % 2 == 0 ? this.fsec : this.bsec);
    this.g.fillRect(this.gui.dots[0] - 3, this.gui.dots[1] - 10, this.gui.dots[0] + 3, this.gui.dots[1] - 5);
    this.g.fillRect(this.gui.dots[0] - 3, this.gui.dots[1] + 5, this.gui.dots[0] + 3, this.gui.dots[1] + 10);
    if (this.t[0] != this.hour) {
      this.hour = this.t[0];
      this.g.setColor(0, this.bmin);
      this.g.fillRect({ x: this.gui.hour[0], y: this.gui.hour[1], x2: this.gui.hour[2], y2: this.gui.hour[3], r: 10 });
      this.g.setColor(1, this.fhr);
      this.g.setFont("LECO1976Regular22", 3);
      if (ew.def.hr24) {
        this.g.drawString(this.hour, this.gui.time[0] - this.g.stringWidth(this.hour), this.gui.time[2]);
      } else {
        this.hour = this.hour < 10 ? (this.hour == "00" ? 12 : this.hour[1]) : this.hour < 13 ? this.hour : this.hour - 12;
        this.g.drawString(this.hour, this.gui.time[0] - this.g.stringWidth(this.hour), this.gui.time[2]);
      }
    }
  },
  clear: function () {
    this.run = false;
    if (this.tid) clearTimeout(this.tid);
    this.tid = 0;
    return true;
  },
  off: function () {
    this.g.off();
    this.clear();
  },
};
