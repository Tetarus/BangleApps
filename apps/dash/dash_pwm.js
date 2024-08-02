tcBack.replaceWith(() => {
  buzzer.nav(buzzer.buzz.ok);
  face.go("clock", 0);
});

tcNext.replaceWith(() => {
  if (euc.state !== "OFF") {
    if (euc.state !== "READY") {
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
  init() {
    if (!this.run && face.appPrev !== "dash_pwm") {
      UIc.clear();
      this.g.clear();
    }
    this.buff = { spd: -1, pwm: -1, conn: -1, tmp: -1, bat: -1 };
    this.spdC = [15, 15, 14, 14];
    this.spdCB = [0, 0, 0, 13];
    this.pwmC = [7, 7, 14, 13];
    this.gui = {
      topl: [0, 15, 80, 45],
      topm: [80, 15, 160, 45],
      topr: [160, 15, 240, 45],
      spd: [0, 45, 240, 190],
      spdm: 130,
      center: 120,
      pwmTop: [0, 190, 240, 200],
      pwm: [15, 205, 225, 225],
      pwmOut: [10, 200, 230, 230],
      botm: [10, 240, 230, 280],
      txt: 150,
      txt1: 30,
    };
    this.indP = 1;
    this.indD = 1;
    this.run = true;
  },
  show() {
    if (!this.run) return;

    if (euc.state === "READY") {
      if (this.buff.conn !== euc.state) {
        this.buff.conn = euc.state;
        this.bar();
      }
      if (this.buff.tmp !== Math.round(euc.dash.live.tmp)) this.updateTemperature();
      if (this.buff.bat !== euc.dash.live.bat) this.updateBattery();
      if (this.buff.spd !== Math.round(euc.dash.live.spd)) this.updateSpeed();
      if (this.buff.pwm !== Math.round(euc.dash.live.pwm) && !UI.ntid) this.updatePwm();
    } else if (euc.state !== this.buff.conn) {
      this.buff = { spd: -1, pwm: -1, conn: -1, tmp: -1, bat: -1 };
      if (euc.state === "OFF") {
        face.go("dashGarage", 0);
        return;
      }
      this.buff.conn = euc.state;
      this.bar();
      UI.btn.c2l("main", "_lcd", 2, euc.state, 0, 15, 0, 0.7);
    }
    this.g.flip();
    this.tid = setTimeout(
      (t) => {
        const tm = getTime();
        t.indP += t.indD;
        UI.ele.ind(t.indP, 6, 0, euc.state === "READY" ? 11 : 14);
        if (t.indP > 5) t.indD = -1;
        else if (t.indP < 2) t.indD = 1;
        t.tid = 0;
        t.show();
        if (ew.dbg) console.log("pwm dash, time in loop", getTime() - tm);
      },
      50,
      this,
    );
  },
  updateTemperature() {
    this.buff.tmp = Math.round(euc.dash.live.tmp);
    this.g.setColor(0, 0);
    this.g.fillRect(this.gui.topl[0], this.gui.topl[1], this.gui.topl[2], this.gui.topl[3]);
    this.g.setColor(1, 15);
    this.g.setFontVector(this.gui.txt1);
    this.g.drawString(this.buff.tmp, 7, this.gui.topl[1] + 3);
    this.g.setFontVector(this.gui.txt1 / 2);
    this.g.drawString("°C", 28 + this.g.stringWidth(this.buff.tmp), this.gui.topl[1] + 5);
  },
  updateBattery() {
    this.buff.bat = euc.dash.live.bat;
    this.g.setColor(0, 0);
    this.g.fillRect(this.gui.topr[0], this.gui.topr[1], this.gui.topr[2], this.gui.topr[3]);
    this.g.setColor(1, 15);
    this.g.setFontVector(this.gui.txt1);
    this.g.drawString(this.buff.bat, 223 - this.g.stringWidth(this.buff.bat), this.gui.topr[1] + 3);
    this.g.setFontVector(this.gui.txt1 / 2);
    this.g.drawString("%", 225, this.gui.topr[1] + 5);
  },
  updateSpeed() {
    this.buff.spd = Math.round(euc.dash.live.spd);
    this.g.setColor(1, this.spdCB[euc.dash.alrt.pwm.cc]);
    this.g.fillRect(this.gui.spd[0], this.gui.spd[1], this.gui.spd[2], this.gui.spd[3]);
    this.g.setColor(0, this.spdC[euc.dash.alrt.pwm.cc]);
    if (this.buff.spd >= 100) {
      this.buff.spd = Math.min(this.buff.spd, 120);
      this.g.setFontVector(this.gui.txt - 30);
    } else {
      this.g.setFontVector(this.gui.txt);
    }
    this.g.drawString(this.buff.spd, this.gui.center + 10 - this.g.stringWidth(this.buff.spd) / 2, this.gui.spdm - this.gui.txt / 2);
  },
  updatePwm() {
    this.buff.pwm = Math.round(euc.dash.live.pwm);
    this.g.setColor(0, 0);
    this.g.fillRect(this.gui.pwmTop[0], this.gui.pwmTop[1], this.gui.pwmTop[2], this.gui.pwmTop[3]);
    this.g.fillRect(this.gui.botm[0], this.gui.botm[1], this.gui.botm[2], this.gui.botm[3]);
    this.g.setColor(0, this.pwmC[euc.dash.alrt.pwm.cc]);
    this.g.fillRect({
      x: this.gui.pwmOut[0],
      y: this.gui.pwmOut[1],
      x2: this.gui.pwmOut[2],
      y2: this.gui.pwmOut[3],
      r: 17,
    });

    const rel = (this.gui.pwm[2] - this.gui.pwm[0]) / 100;
    this.g.setColor(1, 1);
    this.g.fillRect({
      x: this.gui.pwm[0],
      y: this.gui.pwm[1],
      x2: this.gui.pwm[2],
      y2: this.gui.pwm[3],
      r: 10,
    });
    this.g.setColor(0, 15);
    this.g.fillRect({
      x: this.gui.pwm[0] + 3,
      y: this.gui.pwm[1] + 2,
      x2: this.gui.pwm[0] + this.buff.pwm * rel - 3,
      y2: this.gui.pwm[3] - 2,
      r: 10,
    });

    this.g.setColor(0, 15);
    this.g.setFontVector(40);
    this.g.drawString(this.buff.pwm, this.gui.center - this.g.stringWidth(this.buff.pwm) / 2, this.gui.botm[1] + 2);
    this.g.setFontVector(20);
    this.g.drawString("%", 2 + this.gui.center + this.g.stringWidth(this.buff.pwm), this.gui.botm[1] + 2);
  },
  bar() {
    UI.ele.fill("_bar", 6, 0);
    if (euc.state !== "READY") {
      if (euc.state === "ON") {
        UI.ele.fill("_bar", 6, 0);
      } else {
        UIc.start(0, 1);
        UI.btn.c2l("bar", "_bar", 6, "CANCEL", 0, 15, 13, 1.2);
        UIc.end();
        UIc.bar._bar = () => {
          buzzer.nav(buzzer.buzz.ok);
          euc.tgl();
        };
      }
      return;
    }
    this.updatePwm();
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
