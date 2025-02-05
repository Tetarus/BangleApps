tcNext.replaceWith(() => {
  buzzer.nav(buzzer.buzz.ok);
  if (UI.ntid) {
    clearTimeout(UI.ntid);
    UI.ntid = 0;
  }
  eval(require("Storage").read("dashKingsongOpt"));
});
tcBack.replaceWith(() => {
  buzzer.nav(buzzer.buzz.ok);
  if (UI.ntid) {
    clearTimeout(UI.ntid);
    UI.ntid = 0;
  }
  face.go(ew.is.dash[ew.def.dash.face], 0);
});
face[0].page = "Quick Actions";
UI.ele.ind(1, 4, 0);
UIc.start(1, 0);
let val = ["CITY", "ON", "OFF", "AUTO"];
UI.btn.c2l("main", "_2x2", 1, "LIGHTS", val[euc.dash.opt.lght.HL], 15, euc.dash.opt.lght.city ? 12 : euc.dash.opt.lght.HL != 2 ? 4 : 0);
UI.btn.c2l("main", "_2x2", 2, "STRB", "", 15, euc.dash.opt.lght.strb ? 13 : 1);
UIc.end();

face[0].bar = () => {
  UI.ele.title(face[0].page.toUpperCase(), 3, 0);
  UIc.start(0, 1);
  UI.btn.c2l("bar", "_2x2", 3, "EXIT", "", 15, 6);
  UI.btn.c2l("bar", "_2x2", 4, "LOCK", "", 15, euc.dash.opt.lock.en ? 13 : 1);
  UIc.end();
};
face[0].bar();

UIc.main._2x2 = (i) => {
  if (i == 1) {
    buzzer.nav(buzzer.buzz.ok);
    eval(require("Storage").read("dashKingsongLight"));
  } else if (i == 2) {
    buzzer.nav(buzzer.buzz.ok);
    euc.wri("setStrobeOnOff", 1 - euc.dash.opt.lght.strb);
  }
};

UIc.bar._2x2 = (i) => {
  if (i == 3) {
    euc.tgl();
  } else if (i == 4) {
    buzzer.nav(buzzer.buzz.ok);
    if (euc.dash.opt.lock.en) {
      if (euc.dbg) console.log("EUC dash: starting unlock, lock key:", euc.temp.lockKey);
      euc.wri("doUnlock", euc.temp.lockKey);
    } else euc.wri("doLock");
  }
};
