const STOR = require("Storage");

if (STOR.read("UI")) eval(STOR.read("UI"));
if (STOR.read("handler_fonts")) eval(STOR.read("handler_fonts"));
if (STOR.read("handler_notify")) eval(STOR.read("handler_notify"));
if (STOR.read("handler_set")) eval(STOR.read("handler_set"));
if (STOR.read("handler_buzz")) eval(STOR.read("handler_buzz"));
if (STOR.read("handler_conn")) eval(STOR.read("handler_conn"));
if (STOR.read("handler_face")) eval(STOR.read("handler_face"));
if (STOR.read("handler_charge")) eval(STOR.read("handler_charge"));
var touchHandler = {
  go: function (e, x, y) {
    touchHandler[face.pageCurr](e, x, y);
  },
  timeout: (x) => {
    setTimeout(() => {
      face.off();
    }, 0);
  },
};
if (STOR.read("handler_btn")) eval(STOR.read("handler_btn"));
var i2c = new I2C();
i2c.setup({ scl: ew.pin.i2c.SCL, sda: ew.pin.i2c.SDA, bitrate: 100000 });

if (process.env.BOARD == "P8" || process.env.BOARD == "P22" || process.env.BOARD == "PINETIME") {
  if (ew.def.touchtype != "716" && ew.def.touchtype != "816" && ew.def.touchtype != "816s") eval(STOR.read("handler_touch"));
  else if (ew.def.touchtype == "816") eval(STOR.read("handler_touch_816"));
  else if (ew.def.touchtype == "816s") eval(STOR.read("handler_touch_816s"));
  else if (ew.def.touchtype == "716") eval(STOR.read("handler_touch_716"));
} else {
  eval(STOR.read("handler_touch"));
}

if (process.env.BOARD == "P8" || process.env.BOARD == "P22") {
  if (ew.def.acctype != "SC7A20" && ew.def.acctype != "BMA421") {
    i2c.writeTo(0x18, 0x0f);
    ew.def.acctype = i2c.readFrom(0x18, 1) == 17 ? "SC7A20" : "BMA421";
  } else if (ew.def.acctype === "BMA421") eval(STOR.read("handler_acc_BMA421"));
  else if (ew.def.acctype === "SC7A20") eval(STOR.read("handler_acc_SC7A20"));
} else {
  if (process.env.BOARD != "BANGLEJS2") eval(STOR.read("handler_acc_SC7A20"));
  else acc = { on: function () {}, off: function () {} };

  themeD = {
    btn: { onT: 15, onB: 4, offT: 11, offB: 2 },
    menu: { onT: 15, onB: 4, offT: 15, offB: 2 },
    slide: { onT: 15, onB: 4, offT: 15, offB: 2 },
    ntfy: { text: 0, back: 15 },
    clock: { minF: 15, minB: 1, hrF: 11, hrB: 1, secF: 15, secB: 1, dateF: 11, dateB: 0, batF: 11, batB: 0, back: 0, top: 0 },
  };
  themeN = {
    btn: { onT: 15, onB: 4, offT: 11, offB: 2 },
    menu: { onT: 15, onB: 4, offT: 15, offB: 2 },
    slide: { onT: 15, onB: 4, offT: 15, offB: 2 },
    ntfy: { text: 0, back: 15 },
    clock: { minF: 0, minB: 15, hrF: 10, hrB: 15, secF: 10, secB: 15, dateF: 11, dateB: 0, batF: 11, batB: 0, back: 0, top: 0 },
  };
  theme = themeD;
}
if (STOR.read("handler_cron")) eval(STOR.read("handler_cron"));
