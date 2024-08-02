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
  spd: [],
  init: function () {
    if (!this.run && face.appPrev !== "dash_digital") {
      // UIc.clear();
      this.g.clear();
    }
    this.buff = { spd: euc.dash.live.spd - 1, spdL: -1, spdM: -1, amp: -10, tmp: -1, bat: -1, volt: -1, buzz: -1, alrm: -1, conn: -1, lock: 2, trpL: -1, bar: 0 };
    if (euc.is.day[0] < Date().getHours() && Date().getHours() < euc.is.day[1]) euc.is.night = 0;
    else euc.is.night = 1;
    this.spdC = [0, 14, 13, 13];
    this.ampC = [1, 0, 13, 13];
    this.tmpC = [1, 0, 13, 13];
    this.batC = [4, 1, 13, 13];
    this.fact = euc.dash.opt.unit.fact.spd * (ew.def.dash.mph ? 0.625 : 1);
    this.trpF = euc.dash.opt.unit.fact.dist * (ew.def.dash.mph ? 0.625 : 1);
    this.pos = {
      topl: [0, 20, 119, 70],
      topr: [122, 20, 239, 70],
      pwm: [0, 196, 239, 217],
      spd: [43, 72, 197, 190],
      alrm: [0, 196, 239, 217],
      btn1: [0, 72, 40, 132],
      btn2: [0, 135, 40, 193],
      btn3: [200, 72, 239, 132],
      btn4: [200, 135, 239, 193],
      btm: [0, 196, 239, 217],
      bar: [0, 240, 239, 280],
    };
    this.indP = 1;
    this.indD = 1;
    this.run = true;
  },
  show: function () {
    if (!this.run) return;
    if (euc.state == "READY") {
      if (this.buff.spd != Math.round(euc.dash.live.spd)) this.spdF();
      if (this.buff.spd >= 5) this.alF();
      if (this.buff.spd >= 5 && !euc.buzz) this.pwrF();
      else if (!this.buff.bar) {
        this.buff.bar = 1;
        this.barF();
      }
      if (!ew.def.dash.amp || ew.def.dash.amp == 2) {
        if (this.buff.amp != Math.round(euc.dash.live.amp)) this.ampF();
      } else if (this.buff.tmp != Math.round(euc.dash.live.tmp)) this.tmpF();
      if (this.buff.buzz != euc.buzz) this.buzF();
      if (this.buff.spdM != euc.dash.trip.topS.toFixed(1)) this.spMF();
      if (euc.dash.info.get.makr == "Kingsong") {
        if (this.buff.spdL != euc.dash.alrt.spd.max) this.spLF();
      } else if (this.buff.alrm != euc.dash.live.alrm) this.alrF();

      if (ew.def.dash.amp) this.amLF();
      else if (this.buff.tmp != euc.dash.live.tmp.toFixed(1)) this.tmFF();
      if (!ew.def.dash.bat) {
        if (this.buff.volt != euc.dash.live.volt.toFixed(2)) this.vltF();
      } else if (ew.def.dash.bat == 1) {
        if (euc.dash.live.bat != this.bat) this.batF();
      } else this.baLF();
      if (this.buff.trpL != euc.dash.trip.last.toFixed(2)) this.mileage();
    } else if (euc.state != this.buff.conn) {
      this.buff = { spd: euc.dash.live.spd - 1, spdL: -1, spdM: -1, amp: -10, tmp: -1, bat: -1, volt: -1, buzz: -1, alrm: -1, conn: -1, lock: 2, trpL: -1, bar: 0 };
      if (euc.state == "OFF") {
        face.go("dashGarage", 0);
        return;
      }
      this.buff.conn = euc.state;
      this.g.setColor(0, 0);
      this.g.fillRect(0, 0, 239, 279);
      this.g.setColor(1, 15);
      this.g.setFont("Vector", 50);
      this.g.drawString(euc.state, 125 - this.g.stringWidth(euc.state) / 2, 95);
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
        if (ew.dbg) console.log("digital dash, time in loop", getTime() - tm);
      },
      100,
      this,
    );
  },
  spdF: function () {
    if (Math.abs(euc.dash.live.spd - this.buff.spd) < 2) this.buff.spd = Math.round(euc.dash.live.spd);
    else if (euc.dash.live.spd < this.buff.spd) this.buff.spd = Math.round(this.buff.spd - (this.buff.spd - euc.dash.live.spd) / 2);
    else this.buff.spd = Math.round(this.buff.spd + (euc.dash.live.spd - this.buff.spd) / 2);
    this.g.setColor(0, euc.dash.alrt.spd.cc == 1 ? 0 : this.spdC[euc.dash.alrt.spd.cc]);

    this.g.fillRect(this.pos.spd[0], this.pos.spd[1], this.pos.spd[2], this.pos.spd[3]);
    this.g.setColor(1, euc.dash.alrt.spd.cc == 1 ? 13 : 15);
    if (this.buff.spd >= 100) {
      if (this.buff.spd > 150) this.buff.spd = 150;
      this.g.setFontVector(80);
    } else this.g.setFontVector(130);
    this.g.drawString(Math.round(this.buff.spd * this.fact), 129 - this.g.stringWidth(Math.round(this.buff.spd * this.fact)) / 2, this.pos.spd[1]);
    if (this.buff.spd == 0) {
      this.buff.bar = 1;
      this.barF();
    }
  },
  alF: function () {
    this.g.setColor(0, 1);
    this.g.clearRect(this.pos.alrm[0], this.pos.alrm[1], this.pos.alrm[2], this.pos.alrm[3]);
    this.g.setColor(1, 15);
    for (let i in euc.log.almL) {
      w.gfx.fillRect(237 - i * 12, euc.log.almL[i] ? 181 : 191, 237 - (i * 12 + 8), this.pos.alrm[1]);
    }
  },
  ampF: function () {
    this.buff.amp = Math.round(euc.dash.live.amp);
    this.g.setColor(0, this.ampC[euc.dash.alrt.amp.cc]);
    this.g.fillRect(this.pos.btn1[0], this.pos.btn1[1], this.pos.btn1[2], this.pos.btn1[3]);
    this.g.setColor(1, 15);
    this.g.setFontVector(12);
    this.g.drawString("AMP", 8, this.pos.btn1[1] + 5);
    this.g.setFontVector(32);
    this.g.drawString(this.buff.amp | 0, 22 - this.g.stringWidth(this.buff.amp | 0) / 2, this.pos.btn1[1] + 20);
  },
  tmpF: function () {
    this.buff.tmp = Math.round(euc.dash.live.tmp);
    this.g.setColor(0, this.tmpC[euc.dash.alrt.tmp.cc]);
    this.g.fillRect(this.pos.btn1[0], this.pos.btn1[1], this.pos.btn1[2], this.pos.btn1[3]);
    this.g.setColor(1, 15);
    this.g.setFontVector(11);
    this.g.drawString("TEMP", 6, this.pos.btn1[1] + 5);
    let temp = ew.def.dash.farn ? Math.round(this.buff.tmp * 1.8 + 32) : Math.round(this.buff.tmp);
    this.g.setFontVector(temp > 100 ? 20 : 32);
    this.g.drawString(temp, 22 - this.g.stringWidth(temp) / 2, this.pos.btn1[1] + 20);
  },
  buzF: function () {
    this.buff.buzz = euc.buzz;
    this.g.setFontVector(35);
    this.g.setColor(0, this.buff.buzz ? 7 : 1);
    this.g.fillRect(this.pos.btn2[0], this.pos.btn2[1], this.pos.btn2[2], this.pos.btn2[3]);
    this.g.setColor(1, this.buff.buzz ? 15 : 0);
    this.g.drawString("!", 19, this.pos.btn2[1]);
  },
  spMF: function () {
    this.buff.spdM = euc.dash.trip.topS.toFixed(1);
    this.g.setColor(0, 1);
    this.g.fillRect(this.pos.btn3[0], this.pos.btn3[1], this.pos.btn3[2], this.pos.btn3[3]);
    this.g.setColor(1, 15);
    this.g.setFontVector(12);
    this.g.drawString("TOP", 208, this.pos.btn3[1] + 5);
    this.g.setFontVector(32);
    this.g.drawString(Math.round(this.buff.spdM * this.fact), 222 - this.g.stringWidth(Math.round(this.buff.spdM * this.fact)) / 2, this.pos.btn3[1] + 20);
  },
  spLF: function () {
    this.buff.spdL = euc.dash.alrt.spd.max;
    this.g.setColor(0, euc.dash.alrt.spd.tilt.val <= this.buff.spdL ? 1 : 7);
    this.g.fillRect(this.pos.btn4[0], this.pos.btn4[1], this.pos.btn4[2], this.pos.btn4[3]);
    this.g.setColor(1, 15);
    this.g.setFontVector(11);
    this.g.drawString("LIMIT", 205, this.pos.btn4[1] + 5);
    this.g.setFontVector(32);
    this.g.drawString(Math.round(this.buff.spdL * this.fact), 202, this.pos.btn4[1] + 20);
  },
  alrF: function () {
    this.buff.alrm = euc.dash.live.alrm;
    this.g.setColor(0, 1);
    this.g.fillRect(this.pos.btn4[0], this.pos.btn4[1], this.pos.btn4[2], this.pos.btn4[3]);
    this.g.setColor(1, 0);
    this.g.setFontVector(35);
    this.g.drawString("B", 212, this.pos.btn4[1]);
  },
  tmFF: function () {
    this.buff.tmp = euc.dash.live.tmp.toFixed(1);
    this.g.setColor(0, this.tmpC[euc.dash.alrt.tmp.cc]);
    this.g.fillRect(this.pos.topl[0], this.pos.topl[1], this.pos.topl[2], this.pos.topl[3]);
    this.g.setColor(1, 15);
    this.g.setFontVector(50);
    let temp = ew.def.dash.farn ? this.buff.tmp * 1.8 + 32 : this.buff.tmp;
    temp = temp < 100 ? Number(temp).toFixed(1) : Math.round(temp);
    let size = this.g.stringWidth(temp);
    this.g.drawString(temp, 0, this.pos.topl[1] + 3);

    this.g.setFontVector(16);
    this.g.drawString(ew.def.dash.farn ? "°F" : "°C", size - 1, this.pos.topl[1] + 5);
  },
  amLF: function () {
    this.g.setColor(1, euc.dash.alrt.amp.cc > 1 ? 7 : 1);
    this.g.fillRect(this.pos.topl[0], this.pos.topl[1], this.pos.topl[2], this.pos.topl[3]);
    this.g.setColor(0, 15);
    for (let i in euc.log.ampL) {
      w.gfx.fillRect(118 - i * 6, euc.log.ampL[i] < 200 ? this.pos.topl[1] + 50 - euc.log.ampL[i] * 1.2 : this.pos.topl[1] + 1, 118 - i * 6 - 1, euc.log.ampL[i] < 200 ? this.pos.topl[1] + 50 : (this.pos.topl[1] + 255 - euc.log.ampL[i]) * 2);
    }
  },
  pwrF: function () {
    this.buff.pwm = Math.round(euc.dash.live.pwm);
    this.g.setColor(0, 1);
    this.g.fillRect(this.pos.pwm[0], this.pos.pwm[1], this.pos.pwm[2], this.pos.pwm[3]);
    this.g.setColor(1, this.buff.pwm >= 50 ? (this.buff.pwm >= 80 ? 7 : 13) : 15);
    this.g.setFontVector(25);
    this.g.drawString(this.buff.pwm, 3, this.pos.pwm[1]);
    this.g.fillRect(80, 182, 80 + this.buff.pwm * 1.6, 192);
  },
  vltF: function () {
    this.buff.volt = euc.dash.live.volt.toFixed(2);
    this.g.setColor(0, this.batC[euc.dash.alrt.bat.cc]);
    this.g.fillRect(this.pos.topr[0], this.pos.topr[1], this.pos.topr[2], this.pos.topr[3]);
    this.g.setColor(1, 15);
    this.g.setFontVector(this.buff.volt < 100 ? 40 : 35);
    this.g.drawString(this.buff.volt, this.buff.volt < 100 ? 135 : 125, this.pos.topr[1]);
    this.g.setFontVector(13);
    this.g.drawString("VOLT", 202, this.pos.topr[1] + 38);
  },
  batF: function () {
    this.buff.bat = euc.dash.live.bat;
    this.g.setColor(0, this.batC[euc.dash.alrt.bat.cc]);
    this.g.fillRect(this.pos.topr[0], this.pos.topr[1], this.pos.topr[2], this.pos.topr[3]);
    this.g.setColor(1, 15);
    this.g.setFontVector(50);
    this.g.drawString(this.buff.bat, 225 - this.g.stringWidth(this.buff.bat), this.pos.topr[1] + 3);
    this.g.setFontVector(20);
    this.g.drawString("%", 227, this.pos.topr[1] + 8);
  },
  baLF: function () {
    this.g.setColor(0, this.batC[euc.dash.alrt.bat.cc]);
    this.g.fillRect(this.pos.topr[0], this.pos.topr[1], this.pos.topr[2], this.pos.topr[3]);
    this.g.setColor(1, 15);
    for (let i in euc.log.batL) {
      w.gfx.fillRect(238 - i * 6, this.pos.topr[3] - euc.log.batL[i] / 2, 238 - i * 6 - 1, this.pos.topr[3]);
    }
  },
  mileage: function () {
    this.buff.trpL = euc.dash.trip.last.toFixed(2);
    this.g.setColor(0, 0);
    this.g.fillRect(this.pos.bar[0], this.pos.bar[1], this.pos.bar[2], this.pos.bar[3]);
    this.g.setColor(1, 11);
    this.g.setFontVector(35);
    this.g.drawString((this.buff.trpL * this.trpF).toFixed(2), 0, this.pos.bar[1]);
    if (!ew.def.dash.clck) {
      let d = Date().toString().split(" ");
      let t = d[4].toString().split(":");
      this.time = t[0] + ":" + t[1];
      this.g.drawString(this.time, this.pos.bar[2] - this.g.stringWidth(this.time), this.pos.bar[1]);
    } else this.g.drawString(Math.round(euc.dash.trip.totl * this.trpF), 240 - this.g.stringWidth(Math.round(euc.dash.trip.totl * this.trpF)), this.pos.bar[1]);
  },
  barF: function () {
    this.g.setColor(1, 1);
    this.g.fillRect(this.pos.btm[0], this.pos.btm[1], this.pos.btm[2], this.pos.btm[3]);
    this.g.setColor(0, 15);
    this.g.setFontVector(16);
    this.g.drawString("TRIP", 2, this.pos.btm[1]);
    this.g.drawString(ew.def.dash.mph ? "MPH" : "KPH", 105, this.pos.btm[1]);
    this.g.drawString(!ew.def.dash.clck ? "CLOCK" : "TOTAL", 181, this.pos.btm[1]);
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

UIc.clear();

UIc.start(1, 0);
UI.ele.coord("main", "_main", 1);
UI.ele.coord("main", "_main", 2);
UIc.end();

UIc.main._main = (i) => {
  if (i == 2) {
    if (ew.def.dash.bat == undefined || ew.def.dash.bat > 1) ew.def.dash.bat = 0;
    else ew.def.dash.bat++;
    face[0].buff.bat = -1;
    face[0].buff.volt = -1;
    buzzer.nav(buzzer.buzz.ok);
  } else if (i == 1) {
    if (ew.def.dash.amp == undefined) ew.def.dash.amp = 0;
    if (ew.def.dash.amp < 2) ew.def.dash.amp++;
    else ew.def.dash.amp = 0;
    face[0].buff.tmp = -1;
    face[0].buff.amp = -1;
    buzzer.nav(buzzer.buzz.ok);
  }
};
UIc.main._bar = (i) => {
  UIc.start(0, 1);
  UI.ele.coord("main", "_bar", 6);
  UIc.end();
  if (ew.def.dash.clck == undefined) ew.def.dash.clck = 0;
  ew.def.dash.clck = 1 - ew.def.dash.clck;
  face[0].buff.trpL = -1;
  face[0].barF();
  buzzer.nav(buzzer.buzz.ok);
};
