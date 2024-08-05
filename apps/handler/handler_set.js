const STOR = require("Storage");

ew.is = {
  bt: 0,
  tor: 0,
  ondc: 0,
  btsl: 0,
  gIsB: 0,
  fmp: 0,
  boot: getTime(),
  dash: [],
  hidM: undefined,
  clin: 0,
};
ew.do.update.acc = function () {
  if (!ew.def.dash.accE) {
    if (ew.def.acc) acc.on();
    else acc.off();
  }
};
ew.do.update.settings = function () {
  STOR.write("ew.json", ew.def);
};
ew.do.reset.settings = function () {
  ew.def = { off: { clock: 5000 }, dash: { tot: "0", mph: 0, amp: 0, bat: 0, batS: 0, face: 0, accE: 0, clck: 0, clkS: 0, farn: 0, rtr: 5 }, name: "eucWatch", touchtype: "0", acctype: "0", hr24: 1, prxy: 0, timezone: "2", woe: 1, wob: 1, rfTX: -4, cli: 1, hid: 0, gb: 0, atc: 0, acc: 0, hidT: "media", bri: 2, buzz: 1, bpp: 4, info: 1, txt: 1 };
  ew.do.update.settings();
};
ew.do.update.bluetooth = function () {
  try {
    NRF.setAdvertising({}, { name: ew.def.name, connectable: true });
    NRF.setAddress(NRF.getAddress(), +" random");
    if (ew.def.hid == 1 && !STOR.read("hid")) {
      ew.def.hid = 0;
      return;
    }
    if (ew.def.hid == 1) {
      ew.def.cli = 0;
      ew.def.gb = 0;
      NRF.setAdvertising({}, { name: ew.def.name + "-HiD", connectable: true });
      NRF.setAddress(NRF.getAddress().substr(0, 15) + "bb random");
      if (ew.is.hidM == undefined) {
        Modules.addCached("ble_hid_controls", function () {
          function b(a, b) {
            NRF.sendHIDReport(a, function () {
              NRF.sendHIDReport(0, b);
            });
          }
          exports.report = new Uint8Array([5, 12, 9, 1, 161, 1, 21, 0, 37, 1, 117, 1, 149, 5, 9, 181, 9, 182, 9, 183, 9, 205, 9, 226, 129, 6, 149, 2, 9, 233, 9, 234, 129, 2, 149, 1, 129, 1, 192]);
          exports.next = function (a) {
            b(1, a);
          };
          exports.prev = function (a) {
            b(2, a);
          };
          exports.stop = function (a) {
            b(4, a);
          };
          exports.playpause = function (a) {
            b(8, a);
          };
          exports.mute = function (a) {
            b(16, a);
          };
          exports.volumeUp = function (a) {
            b(32, a);
          };
          exports.volumeDown = function (a) {
            b(64, a);
          };
        });
        ew.is.hidM = require("ble_hid_controls");
        ew.is.hidM.do = function (i) {
          try {
            ew.is.hidM[i]();
          } catch (e) {
            if (ew.dbg) handleInfoEvent({ src: "DBG", title: "HID:", body: "YOUAREFAST" }, 1);
          }
        };
      }
    } else if (ew.def.hid == 0 && ew.is.hidM != undefined) {
      ew.is.hidM = undefined;
      if (global["\xFF"].modules.ble_hid_controls) Modules.removeCached("ble_hid_controls");
    }
    NRF.setServices(undefined, { uart: ew.def.cli || ew.def.gb ? true : false, hid: ew.def.hid && ew.is.hidM ? ew.is.hidM.report : undefined });

    if (ew.def.gb && STOR.read("m_gb")) eval(STOR.read("m_gb"));
    else {
      global.GB = 0;
    }
    if (!ew.def.cli && !ew.def.gb && !ew.def.prxy && !ew.def.hid) {
      if (ew.is.bt) NRF.disconnect();
      NRF.sleep();
      ew.is.btsl = 1;
    } else if (ew.is.bt) NRF.disconnect();
    else if (ew.is.btsl == 1) {
      NRF.restart();
      ew.is.btsl = 0;
    }
  } catch (e) {}
};
ew.do.fileRead = function (file, name) {
  let got = STOR.readJSON([file + ".json"], 1);
  if (got == undefined) return false;
  if (name || name == 0) {
    if (STOR.readJSON([file + ".json"], 1)[name]) return STOR.readJSON([file + ".json"], 1)[name];
    else return false;
  } else return STOR.readJSON([file + ".json"], 1);
};
ew.do.fileWrite = function (file, name, value, value2, value3) {
  let got = STOR.readJSON([file + ".json"], 1);
  if (got == undefined) got = {};
  if (!value && value != 0) delete got[name];
  else {
    if ((value2 || value2 == 0) && got[name])
      if (value3 || value3 == 0) got[name][value][value2] = value3;
      else got[name][value] = value2;
    else got[name] = value;
  }
  STOR.writeJSON([file + ".json"], got);
  return true;
};
ew.do.setGattState = function () {
  if (ew.is.gIsB) {
    ew.is.gIsB = 2;
    if (euc.gatt) {
      if (euc.gatt.connected)
        euc.gatt.disconnect().then(function (c) {
          ew.is.gIsB = 0;
        });
    } else ew.is.gIsB = 0;
  }
};
ew.def = STOR.readJSON("ew.json", 1);
if (!ew.def) ew.do.reset.settings();
if (!ew.def.rstP) ew.def.rstP = E.toJS(ew.pin.touch.RST);
if (!ew.def.rstR) ew.def.rstR = 0xa5;
if (!ew.def.addr) ew.def.addr = NRF.getAddress();
if (!ew.def.off) ew.def.off = {};

STOR
  .list("dash_")
  .forEach((dashfile) => {
    ew.is.dash.push(dashfile);
  });
if (!STOR.read("dash.json")) {
  let dash = { slot: 1 };
  STOR.write("dash.json", dash);
}
E.setTimeZone(ew.def.timezone);
