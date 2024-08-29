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
    this.centerX = 120;
    this.pwmRel = 2.1;
    this.indP = 1;
    this.indD = 1;
    this.run = true;
  },
  show() {
    if (!this.run) return;

    const state = euc.state;
    if (state === "READY") {
      if (this.buff.conn !== state) {
        this.buff.conn = state;
        this.bar();
      }
      const live = euc.dash.live;
      const roundedTmp = Math.round(live.tmp);
      const roundedBat = Math.round(live.bat);
      const roundedSpd = Math.round(live.spd);
      const roundedPwm = Math.round(live.pwm);

      if (this.buff.tmp !== roundedTmp) this.updateTemperature(roundedTmp);
      if (this.buff.bat !== roundedBat) this.updateBattery(roundedBat);
      if (this.buff.spd !== roundedSpd) this.updateSpeed(roundedSpd);
      if (this.buff.pwm !== roundedPwm && !UI.ntid) this.updatePwm(roundedPwm);
    } else if (state !== this.buff.conn) {
      this.buff = { spd: -1, pwm: -1, conn: -1, tmp: -1, bat: -1 };
      if (state === "OFF") {
        face.go("dashGarage", 0);
        return;
      }
      this.buff.conn = state;
      this.bar();
      UI.btn.c2l("main", "_lcd", 2, state, 0, 15, 0, 0.7);
    }
    this.g.flip();
    this.scheduleNextUpdate();
  },
  scheduleNextUpdate() {
    if (this.tid) clearTimeout(this.tid);
    this.tid = setTimeout(() => {
      const tm = getTime();
      this.indP += this.indD;
      UI.ele.ind(this.indP, 6, 0, euc.state === "READY" ? 11 : 14);
      if (this.indP > 5) this.indD = -1;
      else if (this.indP < 2) this.indD = 1;
      this.tid = 0;
      this.show();
      if (ew.dbg) console.log("pwm dash, time in loop", getTime() - tm);
    }, 50);
  },
  updateTemperature(temp) {
    this.buff.tmp = temp;
    this.g.setColor(0, 0);
    this.g.fillRect(0, 15, 80, 45);
    this.g.setColor(1, 15);
    this.g.setFontVector(30);
    this.g.drawString(temp, 7, 18);
    this.g.setFontVector(15);
    this.g.drawString("°C", 28 + this.g.stringWidth(temp), 20);
  },
  updateBattery(bat) {
    this.buff.bat = bat;
    this.g.setColor(0, 0);
    this.g.fillRect(160, 15, 240, 45);
    this.g.setColor(1, 15);
    this.g.setFontVector(30);
    this.g.drawString(bat, 223 - this.g.stringWidth(bat), 18);
    this.g.setFontVector(15);
    this.g.drawString("%", 225, 20);
  },
  updateSpeed(spd) {
    this.buff.spd = spd;
    const alertLevel = euc.dash.alrt.pwm.cc;
    this.g.setColor(1, this.spdCB[alertLevel]);
    this.g.fillRect(0, 45, 240, 190);
    this.g.setColor(0, this.spdC[alertLevel]);
    this.g.setFontVector(spd >= 100 ? 120 : 150);
    this.g.drawString(spd, this.centerX + 10 - this.g.stringWidth(spd) / 2, 55);
  },
  updatePwm(pwm) {
    this.buff.pwm = pwm;
    this.g.setColor(0, 0);
    this.g.fillRect(0, 190, 240, 200);
    this.g.fillRect(10, 240, 230, 280);
    this.g.setColor(0, this.pwmC[euc.dash.alrt.pwm.cc]);
    this.g.fillRect({ x: 10, y: 200, x2: 230, y2: 230, r: 17 });

    this.g.setColor(1, 1);
    this.g.fillRect({ x: 15, y: 205, x2: 225, y2: 225, r: 10 });
    this.g.setColor(0, 15);
    const pwmWidth = pwm * this.pwmRel - 3;
    this.g.fillRect({ x: 18, y: 207, x2: 18 + pwmWidth, y2: 223, r: 10 });

    this.g.setFontVector(40);
    this.g.drawString(pwm, this.centerX - this.g.stringWidth(pwm) / 2, 242);
    this.g.setFontVector(20);
    this.g.drawString("%", 2 + this.centerX + this.g.stringWidth(pwm), 242);
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
    // this.updatePwm(Math.round(euc.dash.live.pwm));
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
