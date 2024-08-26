euc.cmd = function (no) {
  switch (no) {
    case "beep":
      return new Uint8Array([0x4c, 0x6b, 0x41, 0x70, 0x0e, 0x00, 0x80, 0x80, 0x80, 0x01, 0xca, 0x87, 0xe6, 0x6f]);
    case "rideSoft":
      return "SETs";
    case "rideMed":
      return "SETm";
    case "rideStrong":
      return "SETh";
    case "setLightOn":
      return "SetLightON";
    case "setLightOff":
      return "SetLightOFF";
    case "clearMeter":
      return "CLEARMETER";
    default:
      return [];
  }
};

function checksum(packet) {
  const FWVer = (packet[28] << 8) | packet[29];

  if (FWVer < 3012) {
    if (ew.is.bt === 2 && euc.dbg) {
      console.log("Firmware does not support checksum. FWVer:", FWVer);
    }
    return 1;
  }

  if (ew.is.bt === 2 && euc.dbg) {
    console.log("Checksum verification");
  }

  // Extract the CRC32 checksum from the packet
  const packetView = new DataView(packet);
  const receivedCRC32 = packetView.getUint32(packet.length - 4, false);

  // Calculate the CRC32 for the packet data excluding the checksum
  const dataToCheck = new Uint8Array(packet, 0, packet.length - 4);
  const calculatedCRC32 = E.CRC32(dataToCheck);

  // Compare the calculated checksum with the received checksum
  return calculatedCRC32 === receivedCRC32 ? 1 : 0;
}

function voltToPercent(volt) {
  const percentTable = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0, -5, -8];
  const voltTable = [124.45, 122.63, 122.08, 121.87, 121.22, 119.75, 118.07, 116.77, 115.46, 114.29, 113.12, 111.92, 110.63, 109.36, 107.95, 106.37, 104.74, 103.3, 100.47, 97.49, 94.5, 90.31, 87];

  if (volt >= voltTable[0]) return percentTable[0];
  if (volt <= voltTable[voltTable.length - 1]) return percentTable[percentTable.length - 1];

  let low = 0;
  let high = voltTable.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (voltTable[mid] < volt) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return Math.round(percentTable[high] + ((volt - voltTable[high]) * (percentTable[high + 1] - percentTable[high])) / (voltTable[high + 1] - voltTable[high]));
}

euc.temp.liveParse = function (inc) {
  const dataView = new DataView(inc);
  euc.is.alert = 0;

  // Volt + Battery
  euc.dash.live.volt = dataView.getUint16(4) / 100;

  switch (euc.dash.opt.bat.pack) {
    case 24: // not Patton
      if (euc.dash.live.volt > 100.2) {
        euc.dash.live.bat = 100;
      } else if (euc.dash.live.volt > 81.6) {
        euc.dash.live.bat = Math.round((euc.dash.live.volt - 80.7) / 0.195);
      } else if (euc.dash.live.volt > 79.35) {
        euc.dash.live.bat = Math.round((euc.dash.live.volt - 79.35) / 0.4875);
      } else {
        euc.dash.live.bat = 0;
      }
      break;
    case 30: // Patton
      euc.dash.live.bat = voltToPercent(euc.dash.live.volt);
      // if (euc.dash.live.volt > 125.25) {
      //     euc.dash.live.bat = 100;
      // } else if (euc.dash.live.volt > 102.00) {
      //     euc.dash.live.bat = Math.round((euc.dash.live.volt - 99.75) / 0.255);
      // } else if (euc.dash.live.volt > 96.00) {
      //     euc.dash.live.bat = Math.round((euc.dash.live.volt - 96.00) / 0.675);
      // } else {
      //     euc.dash.live.bat = 0;
      // }
      break;
    case 36: // Lynx
      if (euc.dash.live.volt > 150.3) {
        euc.dash.live.bat = 100;
      } else if (euc.dash.live.volt > 122.4) {
        euc.dash.live.bat = Math.round((euc.dash.live.volt - 119.7) / 0.306);
      } else if (euc.dash.live.volt > 115.2) {
        euc.dash.live.bat = Math.round((euc.dash.live.volt - 115.2) / 0.81);
      } else {
        euc.dash.live.bat = 0;
      }
      break;
    default:
      euc.dash.live.bat = 1; // for new wheels, set 1% by default
      break;
  }
  euc.log.batL.unshift(euc.dash.live.bat);
  if (euc.log.batL.length > 20) euc.log.batL.pop();
  euc.dash.alrt.bat.cc = euc.dash.live.bat >= 50 ? 0 : euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low ? 2 : 1;
  if (euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc === 2) euc.is.alert++;

  // Speed
  euc.dash.live.spd = dataView.getInt16(6) / 10;
  if (euc.dash.trip.topS < euc.dash.live.spd) euc.dash.trip.topS = euc.dash.live.spd;
  euc.dash.alrt.spd.cc = euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd ? 2 : euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd ? 1 : 0;
  if (euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc === 2) euc.is.alert = 1 + Math.round((euc.dash.live.spd - euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step);

  // Distance
  euc.dash.trip.last = ((dataView.getUint16(10) << 16) | dataView.getUint16(8)) / 1000;
  euc.dash.trip.totl = ((dataView.getUint16(14) << 16) | dataView.getUint16(12)) / 1000;
  euc.log.trip.forEach(function (val, pos) {
    if (!val) euc.log.trip[pos] = euc.dash.trip.totl;
  });

  // Amp
  euc.dash.live.amp = dataView.getInt16(16) / 100;
  if (euc.dash.opt.unit.ampR) euc.dash.live.amp = -euc.dash.live.amp;
  euc.log.ampL.unshift(euc.dash.live.amp);
  if (euc.log.ampL.length > 20) euc.log.ampL.pop();
  euc.dash.alrt.amp.cc = euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low ? 2 : euc.dash.live.amp <= -0.5 || euc.dash.live.amp >= 15 ? 1 : 0;
  if (euc.dash.alrt.amp.hapt.en && euc.dash.alrt.amp.cc === 2) {
    if (euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp) euc.is.alert = euc.is.alert + 1 + Math.round((euc.dash.live.amp - euc.dash.alrt.amp.hapt.hi) / euc.dash.alrt.amp.hapt.step);
    else euc.is.alert = euc.is.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.alrt.amp.hapt.low) / euc.dash.alrt.amp.hapt.step);
  }

  // Temperature
  euc.dash.live.tmp = dataView.getInt16(18) / 100;
  euc.dash.alrt.tmp.cc = euc.dash.alrt.tmp.hapt.hi - 5 <= euc.dash.live.tmp ? (euc.dash.alrt.tmp.hapt.hi <= euc.dash.live.tmp ? 2 : 1) : 0;
  if (euc.dash.alrt.tmp.hapt.en && euc.dash.alrt.tmp.cc === 2) euc.is.alert++;

  // Misc.
  euc.dash.auto.offT = dataView.getUint16(20);
  euc.dash.opt.snsr.chrg = dataView.getUint16(22);
  euc.charge = euc.dash.opt.snsr.chrg ? 1 : 0;
  euc.dash.alrt.spd.max = dataView.getUint16(24) / 10;
  euc.dash.alrt.spd.tilt.val = dataView.getUint16(26) / 10;
  const ver = dataView.getUint16(28);
  const mVer = Math.floor(ver / 1000);
  euc.dash.info.get.firm = `${Math.floor(ver / 1000)}.${Math.floor((ver % 1000) / 100)}.${ver % 100}`;
  if (!euc.dash.info.get.modl) {
    switch (mVer) {
      case 4:
        // Patton
        euc.dash.info.get.modl = "Patton";
        euc.dash.opt.bat.pack = 30;
        break;
      case 5:
        // Lynx
        euc.dash.info.get.modl = "Lynx";
        euc.dash.opt.bat.pack = 36;
        break;
      default:
        // not Patton
        euc.dash.info.get.modl = "SM";
        euc.dash.opt.bat.pack = 24;
        break;
    }
    euc.dash.alrt.spd.hapt.hi = 200;
    euc.dash.alrt.spd.hapt.low = 200;
    euc.dash.opt.bat.hi = 420;
    euc.dash.opt.bat.low = 320;
    ew.do.fileWrite("dash", "slot" + require("Storage").readJSON("dash.json", 1).slot + "Model", euc.dash.info.get.modl);
  }
  euc.dash.opt.ride.mode = dataView.getUint16(30);
  euc.dash.opt.ride.pTlt = dataView.getInt16(32);

  // PWM
  euc.dash.live.pwm = Math.round(dataView.getUint16(34) / 100);
  if (euc.dash.trip.pwm < euc.dash.live.pwm) euc.dash.trip.pwm = euc.dash.live.pwm;
  euc.dash.alrt.pwm.cc = euc.dash.live.pwm >= 88 ? 3 : euc.dash.live.pwm >= 84 ? 2 : euc.dash.live.pwm >= 80 ? 1 : 0;
  euc.dash.alrt.pwr = euc.dash.live.pwm >= 84 ? 1 : 0;
  euc.log.almL.unshift(euc.dash.alrt.pwr);
  if (euc.log.almL.length > 20) euc.log.almL.pop();
  if (euc.dash.alrt.pwr === 1) euc.is.alert += 1;

  // Alerts
  if (euc.dash.alrt.pwm.hapt.en && (euc.dash.alrt.pwr || euc.dash.alrt.pwm.hapt.hi <= euc.dash.live.pwm)) {
    buzzer.sys(60);
    euc.is.alert = 0;
  } else if (!euc.is.buzz && euc.is.alert) {
    if (!w.gfx.isOn && (euc.dash.alrt.spd.cc || euc.dash.alrt.amp.cc || euc.dash.alrt.pwr)) face.go(ew.is.dash[ew.def.dash.face], 0);
    euc.is.buzz = 1;
    if (euc.is.alert > 20) euc.is.alert = 20;
    const a = [100];
    while (euc.is.alert >= 5) {
      a.push(150, 500);
      euc.is.alert = euc.is.alert - 5;
    }
    for (let i = 0; i < euc.is.alert; i++) a.push(150, 150);
    buzzer.euc(a);
    setTimeout(() => {
      euc.is.buzz = 0;
    }, 3000);
  }
};

function resetTempBuffers() {
  euc.temp.tot = E.toUint8Array([0]);
  euc.temp.last = E.toUint8Array(euc.temp.tot.buffer);
}

function isValidStartPacket(buffer) {
  return buffer.length > 4 && buffer[0] === 0xdc && buffer[1] === 0x5a && buffer[2] === 0x5c;
}

function processPacket(buffer) {
  if (ew.is.bt === 2) {
    console.log("Veteran: in: length:", buffer.length, " data :", [].map.call(buffer, (x) => x.toString(16)).toString());
  }

  if (checksum(buffer)) {
    euc.temp.liveParse(buffer);
  } else if (ew.is.bt === 2) {
    console.log("Packet checksum error. Dropped.");
  }
}

euc.temp.inpk = function (event) {
  if (euc.is.horn) {
    resetTempBuffers();
    return;
  }

  const inc = event.target.value.buffer;

  // Handle proxy if ew.is.bt is 5
  if (ew.is.bt === 5) {
    euc.proxy.w(inc);
  }

  // Check for the specific packet identifier and handle accordingly
  if (isValidStartPacket(inc)) {
    euc.temp.tot = E.toUint8Array(inc);
  } else if (euc.temp.tot.buffer.length > 1) {
    euc.temp.tot = E.toUint8Array(euc.temp.last, inc);
  } else {
    return;
  }

  euc.temp.last = E.toUint8Array(euc.temp.tot.buffer);

  const expectedLength = euc.temp.tot.buffer[3] + 4;
  if (euc.temp.tot.buffer.length < expectedLength) {
    return;
  }

  if (euc.temp.tot.buffer.length === expectedLength) {
    processPacket(euc.temp.tot.buffer);
  } else if (ew.is.bt === 2) {
    console.log("Packet size error. Dropped.");
  }

  resetTempBuffers();
};

euc.wri = function (i) {
  if (euc.dbg) console.log("not connected yet");
  if (i === "end") euc.off();
  return;
};

euc.conn = function (mac) {
  // Disconnect if already connected
  if (euc.gatt && euc.gatt.connected) {
    if (euc.dbg) console.log("BLE already connected");
    euc.gatt.disconnect();
    return;
  }

  // Handle private resolvable addresses
  if (mac.includes("private-resolvable") && !euc.proxy) {
    const dashConfig = require("Storage").readJSON("dash.json", 1);
    const name = dashConfig["slot" + dashConfig.slot + "Name"];

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
  euc.dash.trip.pwm = 0;
  euc.dash.trip.topS = 0;

  // Start the BLE connection
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

      // Update dash information
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
