euc.cmd = function (no) {
  const cmd = {
    beep: "OLDCMDb",
    rideSoft: "SETs",
    rideMed: "SETm",
    rideStrong: "SETh",
    setLightOn: "SetLightON",
    setLightOff: "SetLightOFF",
    clearMeter: "CLEARMETER",
  };
  return cmd[no] || [];
};

euc.temp.checksum = function (packet) {
  const FWVer = (packet[28] << 8) | packet[29];

  if (FWVer < 3012) return 1;

  const packetLength = packet.length;
  const receivedCRC32 = (packet[packetLength - 4] << 24) | (packet[packetLength - 3] << 16) | (packet[packetLength - 2] << 8) | packet[packetLength - 1];
  const calculatedCRC32 = E.CRC32(new Uint8Array(packet, 0, packetLength - 4));

  return calculatedCRC32 === receivedCRC32 ? 1 : 0;
};

euc.temp.voltToPercent = function (voltage) {
  // Voltage to SoC mapping
  const volToSoc = [
    88, 89.25, 90.38, 91.39, 92.29, 93.09, 93.82,
    94.5, 95.14, 95.75, 96.34, 96.93, 97.51, 98.1, 98.69, 99.29, 99.89,
    100.49, 101.09, 101.69, 102.28, 102.82, 103.31, 103.71, 104.04, 104.31, 104.53,
    104.72, 104.95, 105.26, 105.68, 106.09, 106.47, 106.8, 107.11, 107.4, 107.67,
    107.94, 108.21, 108.48, 108.74, 109.01, 109.27, 109.53, 109.79, 110.05, 110.31,
    110.57, 110.83, 111.08, 111.34, 111.59, 111.84, 112.09, 112.33, 112.57, 112.81,
    113.05, 113.28, 113.52, 113.74, 113.97, 114.2, 114.43, 114.67, 114.91, 115.15,
    115.4, 115.66, 115.92, 116.18, 116.45, 116.71, 116.97, 117.23, 117.48, 117.74,
    118, 118.29, 118.6, 118.93, 119.29, 119.66, 120.02, 120.37, 120.68, 120.95,
    121.18, 121.37, 121.52, 121.64, 121.74, 121.81, 121.86, 121.9, 121.93, 121.97,
    122.02, 122.09, 122.18, 122.29, 122.42, 122.58, 122.77, 123.03, 123.4, 123.91
  ];

  // Handle edge cases for out-of-bound values
  if (voltage <= volToSoc[0]) {
    return -7; // Return -7 if voltage is less than or equal to the first element
  }
  if (voltage >= volToSoc[volToSoc.length - 1]) {
    return 100; // Return 100 if voltage is greater than or equal to the last element
  }

  // Find the appropriate index
  for (let i = 0; i < volToSoc.length - 1; i++) {
    if (voltage > volToSoc[i]) {
      if (voltage <= volToSoc[i + 1]) {
        return i + 1 - 7; // Return the next index
      }
    }
  }

  return 100; // Fallback return value, should not reach here if voltage is valid
};

euc.temp.liveParse = function (inc) {
  const dv = new DataView(inc);
  euc.is.alert = 0;

  // Volt + Battery
  euc.dash.live.volt = dv.getUint16(4) / 100;
  euc.dash.live.bat = euc.dash.opt.bat.pack === 30 ? euc.temp.voltToPercent(euc.dash.live.volt) : euc.dash.opt.bat.pack === 36 ? (euc.dash.live.volt > 150.3 ? 100 : euc.dash.live.volt > 122.4 ? (euc.dash.live.volt - 119.7) / 0.306 : euc.dash.live.volt > 115.2 ? (euc.dash.live.volt - 115.2) / 0.81 : 0) : euc.dash.live.volt > 100.2 ? 100 : euc.dash.live.volt > 81.6 ? (euc.dash.live.volt - 80.7) / 0.195 : euc.dash.live.volt > 79.35 ? (euc.dash.live.volt - 79.35) / 0.4875 : 0;
  euc.log.batL.unshift(euc.dash.live.bat);
  if (euc.log.batL.length > 20) euc.log.batL.pop();
  euc.dash.alrt.bat.cc = euc.dash.live.bat >= 50 ? 0 : euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low ? 2 : 1;
  if (euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc === 2) euc.is.alert++;

  // Speed
  euc.dash.live.spd = dv.getInt16(6) / 10;
  euc.dash.trip.topS = Math.max(euc.dash.trip.topS, euc.dash.live.spd);
  euc.dash.alrt.spd.cc = euc.dash.live.spd >= euc.dash.alrt.spd.hapt.hi ? 2 : euc.dash.live.spd >= euc.dash.alrt.spd.hapt.low ? 1 : 0;
  if (euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc === 2) euc.is.alert = 1 + Math.round((euc.dash.live.spd - euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step);

  // Distance
  euc.dash.trip.last = ((dv.getUint16(10) << 16) | dv.getUint16(8)) / 1000;
  euc.dash.trip.totl = ((dv.getUint16(14) << 16) | dv.getUint16(12)) / 1000;
  euc.log.trip.forEach((v, i) => {
    if (!v) euc.log.trip[i] = euc.dash.trip.totl;
  });

  // Amp
  euc.dash.live.amp = ((euc.dash.opt.unit.ampR ? -1 : 1) * dv.getInt16(16)) / 100;
  euc.log.ampL.unshift(euc.dash.live.amp);
  if (euc.log.ampL.length > 20) euc.log.ampL.pop();
  euc.dash.alrt.amp.cc = euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low ? 2 : euc.dash.live.amp <= -0.5 || euc.dash.live.amp >= 15 ? 1 : 0;
  if (euc.dash.alrt.amp.hapt.en && euc.dash.alrt.amp.cc === 2) {
    euc.is.alert += 1 + Math.round(Math.abs(euc.dash.live.amp - (euc.dash.live.amp > euc.dash.alrt.amp.hapt.hi ? euc.dash.alrt.amp.hapt.hi : euc.dash.alrt.amp.hapt.low)) / euc.dash.alrt.amp.hapt.step);
  }

  // Temperature
  euc.dash.live.tmp = dv.getInt16(18) / 100;
  euc.dash.alrt.tmp.cc = euc.dash.live.tmp >= euc.dash.alrt.tmp.hapt.hi ? 2 : euc.dash.live.tmp >= euc.dash.alrt.tmp.hapt.hi - 5 ? 1 : 0;
  if (euc.dash.alrt.tmp.hapt.en && euc.dash.alrt.tmp.cc === 2) euc.is.alert++;

  // Misc.
  euc.dash.auto.offT = dv.getUint16(20);
  euc.dash.opt.snsr.chrg = dv.getUint16(22);
  euc.charge = euc.dash.opt.snsr.chrg ? 1 : 0;
  euc.dash.alrt.spd.max = dv.getUint16(24) / 10;
  euc.dash.alrt.spd.tilt.val = dv.getUint16(26) / 10;
  const ver = dv.getUint16(28);
  const mVer = Math.floor(ver / 1000);
  euc.dash.info.get.firm = `${mVer}.${Math.floor((ver % 1000) / 100)}.${ver % 100}`;
  if (!euc.dash.info.get.modl) {
    euc.dash.info.get.modl = mVer === 4 ? "Patton" : mVer === 5 ? "Lynx" : "SM";
    euc.dash.opt.bat.pack = mVer === 4 ? 30 : mVer === 5 ? 36 : 24;
    euc.dash.alrt.spd.hapt.hi = euc.dash.alrt.spd.hapt.low = 200;
    euc.dash.opt.bat.hi = 420;
    euc.dash.opt.bat.low = 320;
    ew.do.fileWrite("dash", "slot" + require("Storage").readJSON("dash.json", 1).slot + "Model", euc.dash.info.get.modl);
  }
  euc.dash.opt.ride.mode = dv.getUint16(30);
  euc.dash.opt.ride.pTlt = dv.getInt16(32);

  // PWM
  euc.dash.live.pwm = dv.getUint16(34) / 100;
  euc.dash.trip.pwm = Math.max(euc.dash.trip.pwm, euc.dash.live.pwm);
  euc.dash.alrt.pwm.cc = euc.dash.live.pwm >= 88 ? 3 : euc.dash.live.pwm >= 84 ? 2 : euc.dash.live.pwm >= 80 ? 1 : 0;
  euc.dash.alrt.pwr = euc.dash.live.pwm >= 84 ? 1 : 0;
  euc.log.almL.unshift(euc.dash.alrt.pwr);
  if (euc.log.almL.length > 20) euc.log.almL.pop();
  if (euc.dash.alrt.pwr === 1) euc.is.alert++;

  // Alerts
  if (euc.dash.alrt.pwm.hapt.en && (euc.dash.alrt.pwr || euc.dash.alrt.pwm.hapt.hi <= euc.dash.live.pwm)) {
    buzzer.sys(60);
    euc.is.alert = 0;
  } else if (!euc.is.buzz && euc.is.alert) {
    if (!w.gfx.isOn && (euc.dash.alrt.spd.cc || euc.dash.alrt.amp.cc || euc.dash.alrt.pwr)) face.go(ew.is.dash[ew.def.dash.face], 0);
    euc.is.buzz = 1;
    euc.is.alert = Math.min(euc.is.alert, 20);
    const a = [100];
    for (let i = 0; i < Math.floor(euc.is.alert / 5); i++) a.push(150, 500);
    for (let i = 0; i < euc.is.alert % 5; i++) a.push(150, 150);
    buzzer.euc(a);
    setTimeout(() => {
      euc.is.buzz = 0;
    }, 3000);
  }
};

euc.temp.inpk = function (event) {
  if (euc.is.horn) {
    euc.temp.tot = E.toUint8Array([0]);
    euc.temp.last = E.toUint8Array(euc.temp.tot.buffer);
    return;
  }

  const inc = event.target.value.buffer;
  if (ew.is.bt === 5) euc.proxy.w(inc);

  if (inc.length > 4 && inc[0] === 0xdc && inc[1] === 0x5a && inc[2] === 0x5c) euc.temp.tot = E.toUint8Array(inc);
  else if (euc.temp.tot.buffer.length > 1) euc.temp.tot = E.toUint8Array(euc.temp.last, inc);
  else return;
  euc.temp.last = E.toUint8Array(euc.temp.tot.buffer);

  const expectedLen = euc.temp.tot.buffer[3] + 4;
  if (euc.temp.tot.buffer.length < expectedLen) return;

  if (euc.temp.tot.buffer.length === expectedLen) {
    if (ew.is.bt === 2) console.log("Veteran: in: length:", euc.temp.tot.buffer.length, " data :", [].map.call(euc.temp.tot, (x) => x.toString(16)).toString());
    if (euc.temp.checksum(euc.temp.tot.buffer)) {
      euc.temp.liveParse(euc.temp.tot.buffer);
    } else {
      if (ew.is.bt === 2) console.log("Packet checksum error. Dropped.");
    }
  } else if (ew.is.bt === 2) console.log("Packet size error. Dropped.");

  euc.temp.tot = E.toUint8Array([0]);
  euc.temp.last = E.toUint8Array(euc.temp.tot.buffer);
};

euc.wri = function (i) {
  if (euc.dbg) console.log("not connected yet");
  if (i === "end") euc.off();
  return;
};

euc.conn = function (mac) {
  if (euc.gatt && euc.gatt.connected) {
    if (euc.dbg) console.log("BLE already connected");
    euc.gatt.disconnect();
    return;
  }

  if (mac.includes("private-resolvable") && !euc.proxy) {
    const name = require("Storage").readJSON("dash.json", 1)["slot" + require("Storage").readJSON("dash.json", 1).slot + "Name"];

    NRF.requestDevice({ timeout: 2000, filters: [{ namePrefix: name }] })
      .then((device) => {
        euc.proxy = 1;
        euc.conn(device.id);
      })
      .catch((err) => {
        if (euc.dbg) console.log("Error:", err);
        euc.conn(euc.mac);
      });
    return;
  }

  euc.proxy = 0;

  NRF.connect(mac, { minInterval: 7.5, maxInterval: 15 })
    .then((g) => {
      euc.gatt = g;
      return g.getPrimaryService(0xffe0);
    })
    .then((s) => s.getCharacteristic(0xffe1))
    .then((c) => {
      c.on("characteristicvaluechanged", euc.temp.inpk);
      euc.gatt.device.on("gattserverdisconnected", euc.off);

      euc.wri = function (cmd, value) {
        switch (cmd) {
          case "proxy":
            c.writeValue(value).catch(euc.off);
            break;

          case "hornOn":
            if (euc.tout.horn) return;
            euc.is.horn = 1;
            euc.tout.horn = setInterval(() => {
              c.writeValue(euc.cmd("beep"));
            }, 150);
            break;

          case "hornOff":
            if (euc.tout.horn) {
              clearInterval(euc.tout.horn);
              euc.tout.horn = 0;
            }
            euc.is.horn = 0;
            break;

          case "start":
            c.startNotifications()
              .then(() => {
                if (euc.dash.auto.onC.HL) {
                  return c.writeValue(euc.cmd(euc.dash.auto.onC.HL === 1 ? "setLightOn" : "setLightOff"));
                }
              })
              .then(() => {
                if (euc.dash.auto.onC.clrM) {
                  return c.writeValue(euc.cmd("clearMeter"));
                }
              })
              .then(() => {
                if (euc.dash.auto.onC.beep) {
                  return c.writeValue(euc.cmd("beep"));
                }
              })
              .then(() => {
                euc.state = "READY";
                euc.is.run = 1;
              })
              .catch(euc.off);
            break;

          case "end":
            Promise.resolve()
              .then(() => {
                if (euc.dash.auto.onD.HL) {
                  return c.writeValue(euc.cmd(euc.dash.auto.onD.HL === 1 ? "setLightOn" : "setLightOff"));
                }
              })
              .then(() => {
                if (euc.dash.auto.onD.beep) {
                  return c.writeValue(euc.cmd("beep"));
                }
              })
              .then(() => {
                euc.is.run = 0;
                euc.gatt.disconnect();
              })
              .catch(euc.off);
            break;

          default:
            if (euc.cmd(cmd)) {
              if (euc.dbg) console.log("EUC module wri:", euc.cmd(cmd));
              c.writeValue(euc.cmd(cmd)).catch(euc.off);
            }
            break;
        }
      };

      if (!ew.do.fileRead("dash", "slot" + ew.do.fileRead("dash", "slot") + "Mac")) {
        euc.dash.info.get.mac = euc.mac;
        euc.updateDash(require("Storage").readJSON("dash.json", 1).slot);
        ew.do.fileWrite("dash", "slot" + ew.do.fileRead("dash", "slot") + "Mac", euc.mac);
      }

      buzzer.nav([100, 100, 150]);
      euc.wri("start");
    })
    .catch(euc.off);
};
