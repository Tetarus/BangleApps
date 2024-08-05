global.save = function () {
  throw new Error("You don't need to use save() on eucWatch!");
};
global.ew = { dbg: 0, log: [], def: {}, is: {}, do: { reset: {}, update: {} }, tid: {}, temp: {}, pin: {} };
ew.pin = { BAT: D30, CHRG: D8, BUZZ: D6, BUZ0: 0, BL: D12, i2c: { SCL: 14, SDA: 15 }, touch: { RST: D39, INT: D32 }, disp: { CS: D3, DC: D47, RST: D2, BL: D12 }, acc: { INT: D16 } };

if (process.env.BOARD == "MAGIC3") D7.write(1); // turns off HR red led + power up i2c chips
E.kickWatchdog();
KickWd = function () {
  "ram";
  if (typeof BTN1 == "undefined" || !BTN1.read()) E.kickWatchdog();
};
var wdint = setInterval(KickWd, 2000);
E.enableWatchdog(30, false);
E.showMessage = print;

const STOR = require("Storage");
if ((BTN1.read() || STOR.read("devmode")) && process.env.BOARD != "BANGLEJS2") {
  let mode = STOR.read("devmode");
  if (mode == "loader") {
    digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, 80);
  } else if (mode == "shutdown") {
    digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, 300);
    NRF.sleep();
  } else {
    STOR.write("devmode", "done");
    NRF.setAdvertising({}, { name: "Espruino-devmode", connectable: true });
    digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, 100);
    print("Welcome!\n*** DevMode ***\nShort press the side button\nto restart in WorkingMode");
  }

  setWatch(
    function () {
      "ram";
      STOR.erase("devmode");
      STOR.erase("devmode.info");
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
  if (STOR.read(".display")) {
    if (STOR.read(".displayM") && (process.env.BOARD == "MAGIC3" || process.env.BOARD == "ROCK")) eval(STOR.read(".displayM"));
    else eval(STOR.read(".display"));
    if (!w) w = require("eucWatch");
  }
  if (STOR.read("handler")) eval(STOR.read("handler"));
  if (STOR.read("clock")) eval(STOR.read("clock"));
  if (STOR.read("euc")) eval(STOR.read("euc"));
  digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, [100, 30, 100]);
  setTimeout(function () {
    if (global.face) face.go("clock", 0);
    setTimeout(function () {
      if (global.ew && ew.do) ew.do.update.acc();
    }, 1000);
    digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, 100);
  }, 200);
}
