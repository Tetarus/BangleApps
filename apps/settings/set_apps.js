tcNext.replaceWith(() => {
  buzzer.nav(buzzer.buzz.ok);
  eval(require("Storage").read("set_dash"));
  face[0].bar();
});
tcBack.replaceWith(() => {
  buzzer.nav(buzzer.buzz.ok);
  eval(require("Storage").read("set_set"));
});
face[0].page = "app";

UI.ele.ind(3, 5, 0);
let img;
UI.ele.fill("_main", 9, 0);
UIc.start(1, 0);
if (require("Storage").read("calc", 1)) {
  img = `E.toArrayBuffer(atob("MDCBAAAAAAAAAAAAAAAAAAAAAAAAAA//+B//8B///D//+B///n//+B///n//+B///n//+B///n//+B///n//+B///n//+BwADn//+BwADn//+BwADn//+B///n//+B///n//+B///n//+B///nAAOB///nAAOB///nAAOB///n//+A///H//+Af/8H//+AAAAH//+AAAAH//+Af/8HAAOA///HAAOB///nAAOB/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+BwADn//+BwADn//+BwADn//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B///n//+B///D//+A//+B//8AAAAAAAAAAAAAAAAAAAAAAAAA=="))`;
  UI.btn.img("main", "_2x3", 1, img, "Calc", 15, 1);
}
if (require("Storage").read("repellent", 1)) {
  img = `E.toArrayBuffer(atob("MDCBAAAAAAAAAAAB//gAAAAH//8AAABH///AAAPP///wAAPP///4AAeOAAf8AAeAAAH+AAeADgB/AAcB/+A/gAwP//wfwAA///4PwAB///8H4AD/4f/D8AH+AD/D8AP8AA/h8APwAAfx+Afgf4Pw+AfB/+H4+A/D//D4/A+H//j4fA+H8/j4fB8PwPj4fB8PgPj4fB8PgPj4fB8fg/j4fB8fA/j4fB8fAfD4fB8fgeH4fB8PgIHw+B8PgAPw+B8PwAfx+B+H4A/h+A+H+D/D8A/D//+D4AfB//8H4Afg//4PwAPwP/gfwAP4B8B/gAH+AAD/AAD/gAf+AAB//P/8AAA////wAAAP///AAAAD//8AAAAA//gAAAAAAAAAAAAAAAAAAA=="))`;
  UI.btn.img("main", "_2x3", 2, img, "Repel", 15, 1);
}
UI.btn.img("main", "_2x3", 3, "tpms", "TPMS", 15, 12);
if (require("Storage").read("hid", 1)) {
  UI.btn.img("main", "_2x3", 4, "hid", "HID", 15, ew.def.hid ? 4 : 12);
}
img = 0;
UIc.end();
UIc.main._2x3 = (i) => {
  if (i == 1) {
    buzzer.nav(buzzer.buzz.ok);
    face.go("calc", 0);
  } else if (i == 2) {
    buzzer.nav(buzzer.buzz.ok);
    face.go("repellent", 0);
  } else if (i == 3) {
    buzzer.nav(buzzer.buzz.na);
    UI.btn.ntfy(1, 1.5, 0, "_bar", 6, "NOT", "AVAILABLE", 15, 13);
    w.gfx.flip();
  } else if (i == 4) {
    if (ew.is.bt != 6) {
      buzzer.nav(buzzer.buzz.na);
      if (!ew.def.hid) {
        UI.btn.ntfy(1, 1.5, 0, "_bar", 6, "ENABLE HID", "ON BT MENU", 15, 13);
        w.gfx.flip();
      } else {
        UI.btn.ntfy(1, 1.5, 0, "_bar", 6, "PHONE IS NOT", "CONNECTED", 15, 13);
        w.gfx.flip();
      }
      return;
    }
    buzzer.nav(buzzer.buzz.ok);
    face.go("hid", 0);
  } else if (i == 5) {
    buzzer.nav(buzzer.buzz.na);
  } else if (i == 6) {
    buzzer.nav(buzzer.buzz.na);
  }
};
