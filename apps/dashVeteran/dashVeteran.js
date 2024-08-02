tcNext.replaceWith((x, y) => {
  buzzer.nav(buzzer.buzz.ok);
  return;
});

tcBack.replaceWith((x, y) => {
  buzzer.nav(buzzer.buzz.ok);
  if (UI.ntid) {
    clearTimeout(UI.ntid);
    UI.ntid = 0;
    face[0].bar();
  }
  face.go(ew.is.dash[ew.def.dash.face], 0);
  return;
});

face[0] = {
  offms: ew.def.off[face.appCurr] ? ew.def.off[face.appCurr] : 5000,
  g: w.gfx,
  page: euc.dash.info.get.makr + " " + euc.dash.info.get.name,
  run: false,
  init: function () {
    if (euc.state !== "READY") {
      face.go(ew.is.dash[ew.def.dash.face], 0);
      return;
    }
    // eval(require("Storage").read("dashVeteranAct"));
    this.run = 1;
  },
  show: function () {
    if (euc.state !== "READY") {
      face.go(ew.is.dash[ew.def.dash.face], 0);
      return;
    }
    if (!this.run) return;
    this.tid = setTimeout(
      function (t) {
        t.tid = 0;
        t.show();
      },
      200,
      this,
    );
  },
  clear: function () {
    this.run = false;
    ew.temp.bar = 0;
    if (this.tid) clearTimeout(this.tid);
    this.tid = 0;
    return true;
  },
  off: function () {
    this.g.off();
    this.clear();
  },
};
