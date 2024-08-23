function btn1(s) {
  if (this.t1) { clearTimeout(this.t1); this.t1 = 0; }

  if (face.offid) { clearTimeout(face.offid); face.offid = 0; }

  if (s.state) {
    this.press = true;
    if (global.euc && euc.state == "READY" && euc.dash.live.spd >= 2 && euc.dash.opt.horn.en) {
      euc.wri("hornOn");
      return;
    }

    this.t1 = setTimeout(
      () => {
        this.t1 = 0;
        if (global.euc) {
          euc.tgl();
          this.press = false;
        }
      },
      500,
    );
  } else if (this.press && !s.state) {
    this.press = false;
    if (global.euc && euc.state == "READY" && euc.is.horn && euc.dash.opt.horn.en) {
      euc.wri("hornOff");
      return;
    }
    if (face.pageCurr == -1) {
      buzzer.nav(buzzer.buzz.on);
      face.go(global.euc && euc.state != "OFF" ? ew.is.dash[ew.def.dash.face] : face.appCurr, 0);
    } else if (euc.state != "OFF") {
      if (face.appCurr.startsWith("dash_")) {
        acc.isUp = 1;
        if (ew.tid.acc) changeInterval(ew.tid.acc, 500);
        face.go(face.appCurr, -1);
        buzzer.nav(buzzer.buzz.off);
      } else face.go(ew.is.dash[ew.def.dash.face], 0);
    } else {
      if (face.appCurr == "clock") {
        face.go("clock", -1);
        buzzer.nav(buzzer.buzz.off);
      } else face.go("clock", 0);
    }
  } else if (this.press && global.euc && euc.state === "READY" && euc.is.horn && euc.dash.opt.horn.en) {
    euc.wri("hornOff");
    return;
  } else face.off();
}

ew.tid.btn1 = setWatch(btn1, BTN1, {
  repeat: true,
  edge: "both",
  debounce: 25
});

if (process.env.BOARD == "ROCK") {
  D46.mode("input_pulldown");
  btn2 = btn1.bind();
  ew.tid.btn2 = setWatch(btn2, D46, {
    repeat: true,
    edge: "both",
    debounce: 25
  });
}
