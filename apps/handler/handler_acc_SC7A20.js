ew.def.acctype = "SC7A20";
acc = {
  isUp: 0,
  tid: 0,
  tmr: 100,
  mode: 0,
  loop: 0,
  chk1:
    process.env.BOARD == "P8" || process.env.BOARD == "P22"
      ? () => {
          if (i2c.readFrom(0x18, 1)[0] > 192) return true;
        }
      : () => {
          if (i2c.readFrom(0x18, 1)[0] > 10 && i2c.readFrom(0x18, 1)[0] < 192) return true;
        },
  chk2:
    process.env.BOARD == "P8" || process.env.BOARD == "P22"
      ? () => {
          let cor = acc.read();
          if (cor.ax >= -1200 && cor.ax <= -200 && cor.ay >= -700 && cor.ay <= 1000 && cor.az <= -100) return true;
        }
      : () => {
          let cor = acc.read();
          if (cor.ax >= -200 && cor.ay >= -500 && cor.ay <= 500 && cor.az >= 500) return true;
        },
  on: function (v) {
    i2c.writeTo(0x18, 0x20, 0x4f);
    i2c.writeTo(0x18, 0x21, 0x00);
    i2c.writeTo(0x18, 0x22, 0x40);
    i2c.writeTo(0x18, 0x23, 0x80);
    i2c.writeTo(0x18, 0x24, 0x00);
    i2c.writeTo(0x18, 0x25, 0x00);
    i2c.writeTo(0x18, 0x32, 5);
    i2c.writeTo(0x18, 0x33, 15);
    i2c.writeTo(0x18, 0x30, 0x02);
    this.mode = v ? v : 0;
    this.init(v);
  },
  off: function () {
    if (ew.tid.acc) {
      if (this.mode == 2) {
        clearInterval(ew.tid.acc);
      } else clearWatch(ew.tid.acc);
      ew.tid.acc = 0;
    }
    i2c.writeTo(0x18, 0x20, 0x07);
    i2c.writeTo(0x18, 0x26);
    i2c.readFrom(0x18, 1);
    return true;
  },
  init: function (v) {
    if (ew.tid.acc) return false;
    if (v == 2) {
      i2c.writeTo(0x18, 0x22, 0x00);
      i2c.writeTo(0x18, 0x30, 0x00);
      i2c.writeTo(0x18, 0x32, 5);
      i2c.writeTo(0x18, 0x33, 15);
      ew.tid.acc = setInterval(() => {
        "ram";
        if (this.chk2()) {
          if (w.gfx.isOn) {
            changeInterval(ew.tid.acc, 1500);
            face.off(0);
          } else if (!this.isUp) {
            changeInterval(ew.tid.acc, 3000);
            face.go(ew.is.dash[ew.def.dash.face], 0);
            this.isUp = 1;
          }
        } else {
          changeInterval(ew.tid.acc, 100);
          if (this.isUp) {
            this.isUp = 0;
            let tout = ew.def.off[face.appCurr];
            if (!tout || (tout && tout <= 60000)) face.off(1000);
          }
        }
      }, this.tmr);
      return true;
    } else {
      i2c.writeTo(0x18, 0x32, 20);
      i2c.writeTo(0x18, 0x33, 1);
      ew.tid.acc = setWatch(
        () => {
          i2c.writeTo(0x18, 0x1);
          if (this.chk1()) {
            if (!w.gfx.isOn) {
              if (face.appCurr == "clock") face.go("clock", 0);
              else face.go(face.appCurr, 0);
            } else if (ew.is.tor == 1) w.gfx.bri.set(face[0].cbri);
            else face.off();
          } else {
            let tout = ew.def.off[face.appCurr];
            if (!tout || (tout && tout <= 60000)) {
              face.off(500);
            }
          }
        },
        ew.pin.acc.INT,
        { repeat: true, edge: "rising", debounce: 50 },
      );
      return true;
    }
  },
  read: function () {
    "ram";
    i2c.writeTo(0x18, 0xa8);
    var a = i2c.readFrom(0x18, 6);
    return { ax: this.conv(a[0], a[1]), ay: this.conv(a[2], a[3]), az: this.conv(a[4], a[5]) };
  },
  conv: function (lo, hi) {
    "ram";
    let i = (hi << 8) + lo;
    return ((i & 0x7fff) - (i & 0x8000)) / 16;
  },
};
