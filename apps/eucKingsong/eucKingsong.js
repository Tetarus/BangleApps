euc.cmd = function (no, val) {
  switch (no) {
    case "manual":
      return val;
    case "getModel":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 20, 90, 90];
    case "getSerial":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 20, 90, 90];
    case "getAlarms":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 152, 20, 90, 90];
    case "doHorn":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 136, 20, 90, 90];
    case "doBeep":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 20, 90, 90];
    case "setLiftOnOff":
      return [170, 85, val ? 1 : 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 126, 20, 90, 90];
    case "getPowerOff":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 20, 90, 90];
    case "setPowerOff":
      return [170, 85, 1, 0, val & 255, (val >> 8) & 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 20, 90, 90];
    case "doPowerOff":
      return [170, 85, 0, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 20, 90, 90];
    case "setLights":
      if (!val) val = euc.is.night ? 3 : 2;
      return [170, 85, 17 + val, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 115, 20, 90, 90];
    case "getStrobe":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 84, 20, 90, 90];
    case "setStrobeOnOff":
      return [170, 85, val ? 1 : 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 20, 90, 90];
    case "getLedMagic":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 20, 90, 90];
    case "setLedMagicOnOff":
      return [170, 85, val ? 1 : 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 20, 90, 90];
    case "getLedRide":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 20, 90, 90];
    case "setLedRideOnOff":
      return [170, 85, val ? 1 : 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 108, 20, 90, 90];
    case "getSpectrum":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 20, 90, 90];
    case "setSpectrumOnOff":
      return [170, 85, val ? 1 : 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 125, 20, 90, 90];
    case "getSpectrumMode":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 150, 20, 90, 90];
    case "setSpectrumMode":
      return [170, 85, val ? val : 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151, 20, 90, 90];
    case "getBTMusic":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 20, 90, 90];
    case "setBTMusicOnOff":
      return [170, 85, val ? 1 : 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 20, 90, 90];
    case "getVoice":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 74, 20, 90, 90];
    case "setVoiceOnOff":
      return [170, 85, val ? val : 0, val ? 0 : 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 115, 20, 90, 90];
    case "setVoiceVolUp":
      return [170, 85, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 20, 90, 90];
    case "setVoiceVolDn":
      return [170, 85, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 20, 90, 90];
    case "doCalibrate":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 137, 20, 90, 90];
    case "getCalibrateTilt":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 138, 20, 90, 90];
    case "setCalibrateTilt":
      return [170, 85, 1, 0, val & 255, (val >> 8) & 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 138, 20, 90, 90];
    case "setRideMode":
      return [170, 85, val ? val : 0, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 20, 90, 90];
    case "getRideParamA":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 20, 90, 90];
    case "getRideParamB":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 147, 20, 90, 90];
    case "getRideParamC":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 148, 20, 90, 90];
    case "doUnlock":
      return val;
    case "doLockOnce":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 71, 20, 90, 90];
    case "getLockOnce":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 20, 90, 90];
    case "doLock":
      return [170, 85, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 20, 90, 90];
    case "getLock":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 94, 20, 90, 90];
    case "getPass":
      return [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 20, 90, 90];
    case "setPass":
      return [170, 85, 48 + Number(euc.dash.opt.lock.pass[0]), 48 + Number(euc.dash.opt.lock.pass[1]), 48 + Number(euc.dash.opt.lock.pass[2]), 48 + Number(euc.dash.opt.lock.pass[3]), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 20, 90, 90];
    case "setPassClear":
      return [170, 85, 48 + Number(euc.dash.opt.lock.pass[0]), 48 + Number(euc.dash.opt.lock.pass[1]), 48 + Number(euc.dash.opt.lock.pass[2]), 48 + Number(euc.dash.opt.lock.pass[3]), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 20, 90, 90];
    case "setPassSend":
      return [170, 85, 48 + Number(euc.dash.opt.lock.pass[0]), 48 + Number(euc.dash.opt.lock.pass[1]), 48 + Number(euc.dash.opt.lock.pass[2]), 48 + Number(euc.dash.opt.lock.pass[3]), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 68, 20, 90, 90];
    case "setPassChange":
      return [170, 85, 48 + Number(euc.dash.opt.lock.pass[0]), 48 + Number(euc.dash.opt.lock.pass[1]), 48 + Number(euc.dash.opt.lock.pass[2]), 48 + Number(euc.dash.opt.lock.pass[3]), 48 + Number(euc.dash.opt.lock.passOld[0]), 48 + Number(euc.dash.opt.lock.passOld[1]), 48 + Number(euc.dash.opt.lock.passOld[2]), 48 + Number(euc.dash.opt.lock.passOld[3]), 0, 0, 0, 0, 0, 0, 65, 20, 90, 90];
    case "setSpeedLimits":
      return [170, 85, euc.dash.alrt.spd.one.en ? euc.dash.alrt.spd.one.val : 0, 0, euc.dash.alrt.spd.two.en ? euc.dash.alrt.spd.two.val : 0, 0, euc.dash.alrt.spd.thre.val, 0, euc.dash.alrt.spd.tilt.val, 0, 49, 50, 51, 52, 53, 54, 133, 20, 90, 90];
    default:
      return [];
  }
};

euc.temp.city = function () {
  if (euc.dash.live.amp < -1 && euc.dash.opt.lght.HL === 1) {
    euc.wri("setLights", 3);
    euc.dash.opt.lght.HL = 3;
  } else if (euc.is.night && euc.dash.live.amp >= 0) {
    if (euc.dash.live.spd > 15 && euc.dash.opt.lght.HL !== 1) {
      euc.wri("setLights", 1);
      euc.dash.opt.lght.HL = 1;
    } else if (euc.dash.live.spd < 10 && euc.dash.opt.lght.HL !== 3) {
      euc.wri("setLights", 3);
      euc.dash.opt.lght.HL = 3;
    }
  } else if (euc.dash.live.amp >= 0) {
    if (euc.dash.live.spd > 35 && !euc.dash.opt.lght.strb) {
      euc.wri("setStrobeOnOff", 1);
      euc.dash.opt.lght.strb = 1;
    } else if (euc.dash.live.spd < 30 && euc.dash.opt.lght.strb) {
      euc.wri("setStrobeOnOff", 0);
      euc.dash.opt.lght.strb = 0;
    } else if (euc.dash.live.spd > 15 && euc.dash.opt.lght.HL !== 1) {
      euc.wri("setLights", 1);
      euc.dash.opt.lght.HL = 1;
    } else if (euc.dash.live.spd < 10 && euc.dash.opt.lght.HL !== 3) {
      euc.wri("setLights", 3);
      euc.dash.opt.lght.HL = 3;
    }
  }
};

euc.temp.faultAlarms = function (code) {
  if (code === 105) {
    return "VOLTAGE CALIB";
  } else if (code === 202) {
    return "OVERCURRENT ERROR";
  } else if (code === 203) {
    return "MOTOR BLOCKED";
  } else if (code === 205) {
    return "DRIVE CIRCUIT ERR";
  } else if (code === 206) {
    return "MOTHERBOARD SHORT";
  } else if (code === 207) {
    return "GYROSCOPE FAILURE";
  } else if (code === 208) {
    return "BATVOL COEF ERR";
  } else if (code === 217) {
    return "HALL SENSOR ERROR";
  } else if (code === 218) {
    return "OVERPOWER WARNING";
  } else if (code === 219) {
    return "DEVICE AT MAX";
  } else if (code === 220) {
    return "MB OVERVOLTAGE";
  } else if (code === 221) {
    return "HIGH MOTOR TEMP";
  } else if (code === 222) {
    return "HIGH MOS TEMP";
  } else if (code === 223) {
    return "OVERVOLTAGE CHARGE";
  } else if (code === 224) {
    return "PRESET CHARGE";
  } else if (code === 226) {
    return "BMS WARNING";
  } else if (code === 227) {
    return "BMS NO DATA";
  } else if (code === 228) {
    return "SERIAL NUMBER ERR";
  } else if (code === 229) {
    return "LOW VOLTAGE";
  } else if (code === 230) {
    return "RESERVE POWER";
  } else if (code === 231) {
    return "OVERVOLTAGE";
  } else if (code === 232) {
    return "LIFT SWITCH ERR";
  } else if (code === 1208) {
    return "MTTOOL VOL ERR";
  } else if (code === 1209) {
    return "MTTOOL OVER TIME";
  } else if (code === 1210) {
    return "MTTOOL BLOCK ERR";
  } else if (code === 1211) {
    return "MTTOOL SPEED ERR";
  } else if (code === 2235) {
    return "SENSOR DATA REV";
  } else if (code === 2236) {
    return "SENSOR B DAMAGED";
  } else if (code === 2237) {
    return "SENSOR DATA REV";
  } else if (code === 2238) {
    return "SENSOR A DAMAGED";
  } else if (code === 2239) {
    return "HIGH VOLTAGE";
  } else if (code === 2240) {
    return "REMOVE CHARGER";
  } else if (code === 2241) {
    return "LOW BATTERY";
  } else if (code === 2242) {
    return "GYRO ERROR";
  } else if (code === 2243) {
    return "MAIN BOARD CURR";
  } else if (code === 2244) {
    return "MOTOR HALL ERR";
  } else if (code === 2245) {
    return "SERIAL NUMBER";
  } else if (code === 2246) {
    return "HIGH MOTOR TEMP";
  } else if (code === 2247) {
    return "HIGH BOARD TEMP";
  } else if (code === 2248) {
    return "MAX OUTPUT CURR";
  } else {
    return code;
  }
};

function voltToPercent(volt) {
  const percentTable = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0];
  const voltTable = [83.13, 82.17, 81.65, 81.18, 80.46, 79.48, 78.56, 77.68, 76.7, 75.74, 74.87, 74.01, 73.25, 72.66, 72.07, 71.38, 70.35, 69.55, 68.59, 66.23, 63];

  // Handle edge cases
  if (volt >= voltTable[0]) return percentTable[0];
  if (volt <= voltTable[voltTable.length - 1]) return percentTable[percentTable.length - 1];

  // Binary search for the correct interval
  let low = 0,
    high = voltTable.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (voltTable[mid] < volt) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  // Interpolation
  const i = high;
  return Math.round(percentTable[i] + ((volt - voltTable[i]) * (percentTable[i + 1] - percentTable[i])) / (voltTable[i + 1] - voltTable[i]));
}

euc.temp.inpk = function (event) {
  let inpk = JSON.parse(E.toJS(event.target.value.buffer));
  if (ew.is.bt == 5) {
    NRF.updateServices({ 0xffe0: { 0xffe1: { value: inpk, notify: true } } });
  }
  if (inpk.length < 20 || inpk[0] != 170 || inpk[1] != 85) return;
  euc.is.alert = 0;
  if (inpk[16] == 169) {
    euc.temp.one(inpk);
  } else if (inpk[16] == 185) {
    euc.temp.two(inpk);
  } else if (inpk[16] == 245) {
    euc.dash.info.mtrL = inpk[6];
    euc.dash.info.gyro = inpk[7];
    euc.dash.info.mtrH = inpk[8];
    euc.dash.info.cpuR = inpk[14];
    euc.dash.live.pwm = inpk[15];
    if (euc.dash.trip.pwm < euc.dash.live.pwm) euc.dash.trip.pwm = euc.dash.live.pwm;
  } else if (inpk[16] == 246) {
    euc.temp.thre(inpk);
  } else euc.temp.resp(inpk);
  if (euc.dash.alrt.pwm.hapt.en && (euc.dash.alrt.pwr || euc.dash.alrt.pwm.hapt.hi <= euc.dash.live.pwm)) {
    buzzer.sys(60);
    euc.is.alert = 0;
  } else if (!euc.is.buzz && euc.is.alert) {
    if (!w.gfx.isOn && (euc.dash.alrt.spd.cc || euc.dash.alrt.amp.cc || euc.dash.alrt.pwr)) face.go(ew.is.dash[ew.def.dash.face], 0);
    euc.is.buzz = 1;
    if (euc.is.alert >= 20) euc.is.alert = 20;
    var a = [100];
    while (euc.is.alert >= 5) {
      a.push(200, 500);
      euc.is.alert = euc.is.alert - 5;
    }
    for (let i = 0; i < euc.is.alert; i++) a.push(200, 150);
    buzzer.euc(a);
    setTimeout(() => {
      euc.is.buzz = 0;
    }, 3000);
  }
};

euc.temp.one = function (inpk) {
  euc.dash.live.spd = ((inpk[5] << 8) | inpk[4]) / 100;
  euc.dash.alrt.spd.cc = euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd ? 2 : euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd ? 1 : 0;
  if (euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2) euc.is.alert = 1 + Math.round((euc.dash.live.spd - euc.dash.alrt.spd.two.val) / euc.dash.alrt.spd.hapt.step);
  this.amp = (inpk[11] << 8) | inpk[10];
  if (this.amp > 32767) this.amp = this.amp - 65536;
  euc.dash.live.amp = this.amp / 100;
  euc.log.ampL.unshift(Math.round(euc.dash.live.amp));
  if (euc.log.ampL.length > 20) euc.log.ampL.pop();
  euc.dash.alrt.amp.cc = euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low ? 2 : euc.dash.live.amp <= -0.5 || euc.dash.live.amp >= 15 ? 1 : 0;
  if (euc.dash.alrt.amp.hapt.en && euc.dash.alrt.amp.cc == 2) {
    if (euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp) euc.is.alert = euc.is.alert + 1 + Math.round((euc.dash.live.amp - euc.dash.alrt.amp.hapt.hi) / euc.dash.alrt.amp.hapt.step);
    else euc.is.alert = euc.is.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.alrt.amp.hapt.low) / euc.dash.alrt.amp.hapt.step);
  }
  euc.dash.live.volt = ((inpk[3] << 8) | inpk[2]) / 100;
  if (euc.dash.opt.bat.pack === 20) {
    euc.dash.live.bat = voltToPercent(euc.dash.live.volt);
    // if (euc.dash.live.volt > 83.5) {
    //   euc.dash.live.bat = 100;
    // } else if (euc.dash.live.volt > 68) {
    //   euc.dash.live.bat = Math.round((euc.dash.live.volt - 66.5) / 0.17);
    // } else if (euc.dash.live.volt > 64) {
    //   euc.dash.live.bat = Math.round((euc.dash.live.volt - 64) / 0.45);
    // } else {
    //   euc.dash.live.bat = 0;
    // }
  } else euc.dash.live.bat = Math.round((100 * (euc.dash.live.volt * (100 / euc.dash.opt.bat.pack) - euc.dash.opt.bat.low)) / (euc.dash.opt.bat.hi - euc.dash.opt.bat.low));
  euc.log.batL.unshift(euc.dash.live.bat);
  if (euc.log.batL.length > 20) euc.log.batL.pop();
  euc.dash.alrt.bat.cc = euc.dash.live.bat >= 50 ? 0 : euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low ? 2 : 1;
  if (euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc == 2) euc.is.alert++;
  euc.dash.live.tmp = ((inpk[13] << 8) | inpk[12]) / 100;
  euc.dash.alrt.tmp.cc = euc.dash.alrt.tmp.hapt.hi - 5 <= euc.dash.live.tmp ? (euc.dash.alrt.tmp.hapt.hi <= euc.dash.live.tmp ? 2 : 1) : 0;
  if (euc.dash.alrt.tmp.hapt.en && euc.dash.alrt.tmp.cc == 2) euc.is.alert++;
  euc.dash.trip.totl = ((inpk[6] << 16) + (inpk[7] << 24) + inpk[8] + (inpk[9] << 8)) / 1000;
  euc.log.trip.forEach(function (val, pos) {
    if (!val) euc.log.trip[pos] = euc.dash.trip.totl;
  });
  euc.dash.opt.ride.mode = inpk[14];
  if (euc.dash.opt.lght.city && euc.dash.live.spd) {
    euc.temp.city();
  }
};

euc.temp.two = function (inpk) {
  euc.dash.trip.last = ((inpk[2] << 16) + (inpk[3] << 24) + inpk[4] + (inpk[5] << 8)) / 1000;
  euc.dash.trip.time = Math.round(((inpk[7] << 8) | inpk[6]) / 60);
  euc.dash.trip.topS = Math.round(((inpk[9] << 8) | inpk[8]) / 100);
  euc.dash.opt.lght.HL = inpk[10] - 17;
  euc.dash.info.on = inpk[11];
  euc.dash.opt.snsr.fan = inpk[12];
  euc.dash.opt.snsr.chrg = inpk[13];
  euc.charge = euc.dash.opt.snsr.chrg ? 1 : 0;
  euc.dash.live.tmpM = Math.round(((inpk[15] << 8) | inpk[14]) / 100);
};
euc.temp.thre = function (inpk) {
  euc.dash.alrt.spd.max = ((inpk[3] << 8) | inpk[2]) / 100;
  euc.dash.info.tRdT = (inpk[13] << 8) | inpk[12];
  euc.dash.alrt.warn.code = (inpk[15] << 8) | inpk[14];
  if (euc.dash.alrt.warn.code) euc.dash.alrt.warn.txt = euc.temp.faultAlarms(euc.dash.alrt.warn.code);
  euc.dash.alrt.pwr = euc.dash.live.spd > euc.dash.alrt.spd.max - 2 ? 1 : 0;
  euc.log.almL.unshift(euc.dash.alrt.pwr);
  if (euc.log.almL.length > 20) euc.log.almL.pop();
  if (euc.dash.alrt.pwr == 1) euc.is.alert++;
};

euc.temp.resp = function (inpk) {
  if (inpk[16] == 63) euc.dash.auto.offT = (inpk[5] << 8) | inpk[4];
  else if (inpk[16] == 67) {
    if (inpk[6] == 1) {
      if (inpk[2] == 255) euc.dash.opt.lock.pass = "";
      else euc.dash.opt.lock.pass = "" + (inpk[2] - 48) + (inpk[3] - 48) + (inpk[4] - 48) + (inpk[5] - 48);
    }
  } else if (inpk[16] == 70) {
    euc.temp.pass = inpk[2];
  } else if (inpk[16] == 72) euc.dash.info.oldM = inpk[2];
  else if (inpk[16] == 74) euc.dash.opt.lght.sprm = inpk[2];
  else if (inpk[16] == 76) euc.dash.opt.snsr.lift = inpk[2];
  else if (inpk[16] == 77) euc.dash.opt.lght.sprM = inpk[2];
  else if (inpk[16] == 82) euc.dash.info.mdId = inpk[2];
  else if (inpk[16] == 85) euc.dash.opt.lght.strb = inpk[2];
  else if (inpk[16] == 88) euc.dash.opt.snd.BTMc = inpk[2];
  else if (inpk[16] == 107) euc.dash.opt.lang = inpk[2];
  else if (inpk[16] == 110) euc.dash.opt.lght.led = 1 - inpk[2];
  else if (inpk[16] == 138 && inpk[2] == 0) {
    euc.dash.opt.ride.pTlt = ((inpk[5] & 0xff) << 8) | (inpk[4] & 0xff);
    if (euc.dash.opt.ride.pTlt > 32767) euc.dash.opt.ride.pTlt = euc.dash.opt.ride.pTlt - 65536;
  } else if (inpk[16] == 162) {
    euc.dash.opt.ride.mode = inpk[4];
  } else if (inpk[16] == 179) {
    let model = {
      "16X": [20, 330],
    };
    euc.dash.info.get.serl = E.toString(inpk.slice(2, 16), inpk.slice(17, 20));
    euc.dash.info.get.manD = E.toString(inpk[11], inpk[12], "-", inpk[13], inpk[14], "-20", inpk[9], inpk[10]);
    euc.dash.info.get.modl = E.toString(inpk.slice(4, 7));
    euc.dash.opt.bat.pack = model[euc.dash.info.get.modl][0];
    euc.dash.opt.bat.hi = 420;
    euc.dash.opt.bat.low = model[euc.dash.info.get.modl][1];
    model = 0;
  } else if (inpk[16] == 181) {
    if (inpk[4] == 0 || inpk[4] == 255) euc.dash.alrt.spd.one.en = 0;
    else {
      euc.dash.alrt.spd.one.val = inpk[4];
      euc.dash.alrt.spd.one.en = 1;
    }
    if (inpk[6] == 0) euc.dash.alrt.spd.two.en = 0;
    else {
      euc.dash.alrt.spd.two.val = inpk[6];
      euc.dash.alrt.spd.two.en = 1;
    }
    euc.dash.alrt.spd.thre.val = inpk[8];
    euc.dash.alrt.spd.tilt.val = inpk[10];
  } else if (inpk[16] == 187) {
    if (!euc.dash.info.get.name) {
      euc.dash.info.get.id = E.toString(inpk.slice(2, inpk.indexOf(0)));
      if (euc.dash.info.get.id.split("-")) {
        euc.dash.info.get.firm = euc.dash.info.get.id.split("-")[2];
        euc.dash.info.get.name = euc.dash.info.get.id.split("-")[1];
        ew.do.fileWrite("dash", "slot" + require("Storage").readJSON("dash.json", 1).slot + "Model", euc.dash.info.get.name);
      }
    }
  } else if (inpk[16] == 95) {
    if (inpk[2] == 1) {
      let r1 = (Math.random() * 10) | 0;
      let r2 = (Math.random() * 10) | 0;
      let r3 = (Math.random() * 10) | 0;
      let i1 = inpk[8] == 0 ? 5 : inpk[8] - 48;
      let i2 = inpk[4] == 0 ? 1 : inpk[4] - 48;
      let i3 = inpk[6] == 0 ? 4 : inpk[6] - 48;
      let i4 = r1 + r2 + r3;
      let i5 = (i2 + i4 + i3 + i1) % 10;
      let i6 = i4 + i5;
      let i7 = (i3 + i6 + i1) % 10;
      euc.temp.lockKey = [170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 48 + i5, 48 + r1, 48 + i7, 48 + r2, 48 + ((i6 + i7 + i1) % 10), 48 + r3, 93, 20, 90, 90];
    } else euc.temp.lockKey = 0;
    euc.dash.opt.lock.en = inpk[2];
  }
  if (ew.dbg && ew.log) {
    ew.log.unshift("Proxy from wheel: " + Date() + " " + E.toJS(inpk));
    if (ew.log.length > 100) ew.log.pop();
  }
};

euc.wri = function (i) {
  if (euc.dbg) console.log("not connected yet");
  if (i == "end") euc.off();
  return;
};

euc.conn = function (mac) {
  if (euc.gatt && euc.gatt.connected) {
    if (euc.dbg) console.log("BLE already connected");
    euc.gatt.disconnect();
    return;
  }
  euc.dash.trip.pwm = 0;
  NRF.connect(mac, { minInterval: 7.5, maxInterval: 15 })
    .then(function (g) {
      euc.gatt = g;
      return euc.gatt.getPrimaryService(0xffe0);
    })
    .then(function (s) {
      return s.getCharacteristic(0xffe1);
    })
    .then(function (c) {
      c.on("characteristicvaluechanged", euc.temp.inpk);
      euc.gatt.device.on("gattserverdisconnected", euc.off);
      return c;
    })
    .then(function (c) {
      if (euc.dbg) console.log("EUC module Kingsong connected");
      euc.wri = function (cmd, value) {
        if (euc.tout.busy) {
          clearTimeout(euc.tout.busy);
          euc.tout.busy = setTimeout(() => {
            euc.tout.busy = 0;
          }, 70);
          return;
        }
        euc.tout.busy = setTimeout(() => {
          euc.tout.busy = 0;
        }, 100);
        if (cmd === "proxy") {
          c.writeValue(value)
            .then(function () {})
            .catch(euc.off);
        } else if (cmd == "hornOn") {
          euc.is.horn = 1;
          if (euc.tout.horn) {
            clearTimeout(euc.tout.horn);
            euc.tout.horn = 0;
          }
          c.writeValue(euc.cmd(euc.dash.auto.onC.talk ? "doHorn" : "doBeep"))
            .then(function () {
              return c.writeValue(euc.cmd("setStrobeOnOff", 1));
            })
            .then(function () {
              if (euc.ntid.horn) clearInterval(euc.ntid.horn);
              euc.ntid.horn = setInterval(() => {
                if (!BTN1.read()) {
                  clearInterval(euc.ntid.horn);
                  euc.ntid.horn = 0;
                  euc.is.horn = 0;
                  c.writeValue(euc.cmd("setStrobeOnOff", 0));
                }
              }, 200);
            });
        } else if (cmd == "hornOff") {
          euc.is.horn = 0;
          return;
        } else if (cmd === "start") {
          euc.state = "READY";
          c.startNotifications()
            .then(function () {
              return c.writeValue(euc.cmd("getModel"));
            })
            .then(function () {
              if (euc.dash.auto.onC.pass) return c.writeValue(euc.cmd("setPassSend"));
            })
            .then(function () {
              if (euc.dash.auto.onC.unlk) return c.writeValue(euc.cmd("getLock"));
            })
            .then(function () {
              if (euc.dash.auto.onC.led) return c.writeValue(euc.cmd("setLedRideOnOff", euc.dash.auto.onC.led - 1));
            })
            .then(function () {
              if (euc.dash.auto.onC.HL) return c.writeValue(euc.cmd("setLights", euc.dash.auto.onC.HL));
            })
            .then(function () {
              return c.writeValue(euc.cmd("getAlarms"));
            })
            .then(function () {
              if (euc.dash.auto.onC.lift) return c.writeValue(euc.cmd("setLiftOnOff", 2 - euc.dash.auto.onC.lift));
            })
            .then(function () {
              if (euc.dash.auto.onC.talk) return c.writeValue(euc.cmd("setVoiceOnOff", 2 - euc.dash.auto.onC.talk));
            })
            .then(function () {
              if (euc.dash.opt.lock.en && euc.dash.auto.onC.unlk && euc.temp.lockKey) {
                let onceUL = euc.temp.lockKey;
                onceUL[16] = 71;
                return c.writeValue(euc.cmd("doUnlock", onceUL));
              }
            })
            .then(function () {
              euc.is.run = 1;
              if (euc.temp.pass) {
                euc.dash.opt.lock.pass2 = euc.dash.opt.lock.pass;
                euc.dash.opt.lock.pass = "";
                face.go("dashKingsong", 0);
                return;
              }
            })
            .then(function () {
              if (!euc.dash.info.get.serl) return c.writeValue(euc.cmd("getSerial"));
            })
            .catch(euc.off);
        } else if (euc.state == "OFF" || cmd == "end") {
          if (euc.gatt && euc.gatt.connected) {
            if (euc.tout.loopEnd) {
              clearTimeout(euc.tout.loopEnd);
              euc.tout.loopEnd = 0;
            }
            euc.tout.loopEnd = setTimeout(function () {
              euc.tout.loopEnd = 0;
              if (euc.gatt && !euc.gatt.connected) {
                euc.off("not connected");
                return;
              }
              euc.gatt.disconnect().catch(euc.off);
            }, 500);
            euc.state = "OFF";
            euc.off("end");
          } else {
            euc.state = "OFF";
            euc.off("not connected");
            euc.is.horn = 0;
            return;
          }
        } else {
          if (euc.dbg) console.log("EUC module wri:", euc.cmd(cmd, value));
          c.writeValue(euc.cmd(cmd, value))
            .then(function () {})
            .catch(euc.off);
        }
      };
      if (!ew.do.fileRead("dash", "slot" + ew.do.fileRead("dash", "slot") + "Mac")) {
        euc.dash.info.get.mac = euc.mac;
        euc.updateDash(require("Storage").readJSON("dash.json", 1).slot);
        ew.do.fileWrite("dash", "slot" + ew.do.fileRead("dash", "slot") + "Mac", euc.mac);
      }
      buzzer.nav([90, 40, 150]);
      euc.wri("start");
    })
    .catch(euc.off);
};
