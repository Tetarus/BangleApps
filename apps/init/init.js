global.save = function () {
  throw new Error("You don't need to use save() on eucWatch!");
};
global.ew = { dbg: 0, log: [], def: {}, is: {}, do: { reset: {}, update: {} }, tid: {}, temp: {}, pin: {} };

ew.pin = { BAT: D30, CHRG: D8, BUZZ: D6, BUZ0: 0, BL: D12, i2c: { SCL: 14, SDA: 15 }, touch: { RST: D39, INT: D32 }, disp: { CS: D3, DC: D47, RST: D2, BL: D12 }, acc: { INT: D16 } };
E.showMessage = print;

E.kickWatchdog();
KickWd = function () {
  if (typeof BTN1 == "undefined" || !BTN1.read()) E.kickWatchdog();
};
var wdint = setInterval(KickWd, 2000);
E.enableWatchdog(30, false);

if ((BTN1.read() || require("Storage").read("devmode")) && process.env.BOARD != "BANGLEJS2") {
  let mode = require("Storage").read("devmode");
  if (mode == "loader") {
    digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, 80);
  } else if (mode == "shutdown") {
    digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, 300);
    NRF.sleep();
  } else {
    require("Storage").write("devmode", "done");
    NRF.setAdvertising({}, { name: "Espruino-devmode", connectable: true });
    digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, 100);
    print("Welcome!\n*** DevMode ***\nShort press the side button\nto restart in WorkingMode");
  }

  setWatch(
    function () {
      require("Storage").erase("devmode");
      require("Storage").erase("devmode.info");
      NRF.setServices({}, { uart: false });
      NRF.setServices({}, { uart: true });
      NRF.disconnect();
      setTimeout(() => {
        reset();
      }, 500);
    },
    BTN1,
    { repeat: false, edge: "rising" },
  );
} else {
  var w;
  if (require("Storage").read(".display")) {
    if (require("Storage").read(".displayM") && (process.env.BOARD == "MAGIC3" || process.env.BOARD == "ROCK")) eval(require("Storage").read(".displayM"));
    else eval(require("Storage").read(".display"));
    if (!w) w = require("eucWatch");
  }
  if (require("Storage").read("handler")) eval(require("Storage").read("handler"));
  if (require("Storage").read("clock")) eval(require("Storage").read("clock"));
  if (require("Storage").read("euc")) eval(require("Storage").read("euc"));
  digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, [100, 30, 100]);
  setTimeout(function () {
    if (global.face) face.go("clock", 0);
    setTimeout(function () {
      if (global.ew && ew.do) ew.do.update.acc();
    }, 1000);
    digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, 100);
  }, 200);
}
