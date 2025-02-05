tcBack.replaceWith(() => {
  buzzer.nav(buzzer.buzz.ok);
  if (UI.ntid) {
    clearTimeout(UI.ntid);
    UI.ntid = 0;
  }
  eval(require("Storage").read("dashKingsongAct"));
});
tcNext.replaceWith(tcBack);
face[0].page = "light";
UI.ele.ind(0, 0, 0);
UIc.start(1, 0);
let hlgt = ["none", "ON", "OFF", "AUTO"];
UI.btn.c2l("main", "_2x2", 1, hlgt[euc.dash.opt.lght.HL], "", 15, euc.dash.opt.lght.HL == 1 ? 4 : euc.dash.opt.lght.HL == 2 ? 0 : 12);
UI.btn.c2l("main", "_2x2", 2, "STRB", "", 15, euc.dash.opt.lght.strb ? 13 : 1);
UIc.end();
face[0].bar = () => {
  UI.ele.title(face[0].page.toUpperCase(), 3, 0);
  UIc.start(0, 1);
  UI.btn.c2l("bar", "_2x2", 3, "eucWatch", "CITY", 15, euc.dash.opt.lght.city ? 12 : 1);
  UI.btn.c2l("bar", "_2x2", 4, "LED", "RIDE", 15, euc.dash.opt.lght.led ? 4 : 1);

  UIc.end();
};
face[0].bar();
UIc.main._2x2 = (i) => {
  if (i == 1) {
    euc.dash.opt.lght.HL++;
    if (3 < euc.dash.opt.lght.HL) euc.dash.opt.lght.HL = 0;
    euc.dash.opt.lght.city = 0;
    buzzer.nav(buzzer.buzz.ok);
    let hlgt = ["none", "ON", "OFF", "AUTO"];
    UI.btn.c2l("main", "_2x2", 1, hlgt[euc.dash.opt.lght.HL], "", 15, euc.dash.opt.lght.HL == 1 ? 4 : euc.dash.opt.lght.HL == 2 ? 0 : 12);
    euc.wri("setLights", euc.dash.opt.lght.HL);
  } else if (i == 2) {
    euc.dash.opt.lght.city = 0;
    buzzer.nav(buzzer.buzz.ok);
    euc.wri("setLights", 3);
    eval(require("Storage").read("dashKingsongAct"));
  }
};
UIc.bar._2x2 = (i) => {
  if (i == 3) {
    euc.dash.opt.lght.city = 1 - euc.dash.opt.lght.city;
    buzzer.nav(buzzer.buzz.ok);
    UI.btn.c2l("bar", "_2x2", 3, "eucWatch", "CITY", 15, euc.dash.opt.lght.city ? 12 : 1);
    eval(require("Storage").read("dashKingsongAct"));
  } else if (i == 4) {
    euc.dash.opt.lght.city = 0;
    buzzer.nav(buzzer.buzz.ok);
    euc.wri("setLights", 2);
    eval(require("Storage").read("dashKingsongAct"));
  }
};
