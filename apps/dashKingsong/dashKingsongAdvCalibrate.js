tcBack.replaceWith(() => {
  buzzer.nav(buzzer.buzz.ok);
  if (UI.ntid) {
    clearTimeout(UI.ntid);
    UI.ntid = 0;
    euc.wri("setCalibrateTilt", euc.dash.opt.ride.pTlt);
    eval(require("Storage").read("dashKingsongAdv"));
  } else eval(require("Storage").read("dashKingsongAdv"));
});
tcNext.replaceWith(tcBack);
face[0].page = "calibrate";
UI.ele.ind(1, 1, 12);
UIc.start(1, 1);
UI.btn.c2l("main", "_main", 3, "CALIBRATE", "", 15, 12);
UIc.end();
face[0].bar = () => {
  UI.ele.title(face[0].page.toUpperCase(), 3, 0);
  UI.btn.c2l("main", "_lcd", 1, euc.dash.opt.ride.pTlt, "", 15, 0);
  UI.btn.ntfy(1, 40, 0, "_bar", 6, "ADJUST", "TILT", 15, 6, 1);
  ew.temp.bar = 1;
  TC.val = { cur: euc.dash.opt.ride.pTlt, dn: -99, up: 99, tmp: 0 };
  UIc.tcBar = (a, b) => {
    euc.dash.opt.ride.pTlt = b;
    UI.btn.c1l("main", "_lcd", 1, euc.dash.opt.ride.pTlt, "", 15, 0);
  };
};
face[0].bar();
UIc.main._main = (i) => {
  if (i == 3) {
    buzzer.nav(buzzer.buzz.ok);
    UI.txt.block("_main", 9, "1. Press START\n\n2. Level Wheel\n3. Turn Wheel ON\n4. Wheel Beeps->OFF\n5. Turn Wheel ON\n\n6. Done !", 30, 15, 0);
    face[0].bar = () => {
      UIc.start(0, 1);
      UI.btn.c2l("bar", "_bar", 6, "START", "CALIBRATION", 15, 4);
      UIc.end();
    };
    face[0].bar();
    UIc.bar._bar_6 = () => {
      buzzer.nav(buzzer.buzz.ok);
      euc.wri("doCalibrate");
      buzzer.nav(buzzer.buzz.ok);
    };
  }
};
