ew.def.touchtype = "716";
var TC = {
  tid: 0,
  x: 0,
  y: 0,
  do: 0,
  st: 1,
  loop: 30,
  val: { cur: 0, up: 0, dn: 0 },
  slide: function (cur, up, dn) {
    let step = Math.round(200 / (up - dn));
  },
  init: function () {
    var tp = i2c.readFrom(0x15, 7);
    if (tp == Uint8Array(7) || (tp[3] == 64 && this.st)) return;
    if (ew.temp.bar) {
      if ((((tp[5] & 0x0f) << 8) | tp[6]) > 180) {
        if (tp[2]) {
          if (this.st) {
            this.st = 0;
            this.y = tp[4];
            return;
          }
          if (this.y != tp[4]) {
            this.val.tmp = this.y < tp[4] ? this.val.tmp + (tp[4] - this.y) : this.val.tmp - (this.y - tp[4]);
            let len = 10;
            let step = Math.round(this.val.tmp / len);
            if (step == 1) step = 0;
            else if (step == -1) step = 0;
            else if (step == 2 || step == 3) step = 1;
            else if (step == -2 || step == -3) step = -1;
            else if (step) step = Math.round(step * 1.8);
            if (step) {
              if (len < this.val.tmp || this.val.tmp < -len) {
                this.val.cur = this.val.cur + step;
                this.val.tmp = 0;
              }
              if (this.val.up < this.val.cur) this.val.cur = this.val.up;
              else if (this.val.cur < this.val.dn) this.val.cur = this.val.dn;
              if (!this.val.tmp) {
                buzzer.nav(10);
                TC.emit("bar", this.y < tp[4] ? 1 : -1, this.val.cur);
              }
            }
            this.y = tp[4];
          }
        } else {
          this.st = 1;
          face.off();
        }
        return;
      } else ew.temp.bar = 0;
    }
    if (tp[3] === 0 || tp[3] === 128) {
      if (tp[2] == 1 && this.st) {
        this.st = 0;
        this.do = 1;
        this.x = tp[4];
        this.y = ((tp[5] & 0x0f) << 8) | tp[6];
        this.time = getTime();
        return;
      }
      if (this.do && getTime() - this.time > 1 && tp[2] == 1) {
        this.do = 0;
        UIc.xy(TC.x + TC.x / 10, TC.y, 1);
        face.off();
      } else if (this.do && tp[2] == 1) {
        var a = 0;
        if ((((tp[5] & 0x0f) << 8) | tp[6]) >= this.y + 30) a = 1;
        else if ((((tp[5] & 0x0f) << 8) | tp[6]) <= this.y - 30) a = 2;
        else if ((((tp[3] & 0x0f) << 8) | tp[4]) <= this.x - 20) a = 3;
        else if ((((tp[3] & 0x0f) << 8) | tp[4]) >= this.x + 20) a = 4;
        if (a != 0 && this.aLast != a) {
          this.aLast = a;
          this.do = 0;
          face.off();
          TC.emit("tc" + a, TC.x + TC.x / 10, TC.y);
        }
        return;
      }
    } else if (tp[3] == 64 && !this.st) {
      if (this.do === 1) {
        this.do = 0;
        face.off();
        UIc.xy(TC.x + TC.x / 10, TC.y);
      }
      this.aLast = 0;
      this.st = 1;
      this.time = 0;
    }
  },
  bar: function () {
    var tp = i2c.readFrom(0x15, 7);
    if (ew.temp.bar && tp[6] > 180 && tp[2]) {
      if (this.st) {
        this.st = 0;
        this.y = tp[4];
        return;
      }
      if (this.y != tp[4]) {
        this.last = this.y < tp[4] ? this.last + (tp[4] - this.y) : this.last - (this.y - tp[4]);
        if (this.last > 500) this.last = 500;
        else if (this.last < 0) this.last = 0;
        TC.emit("bar", (this.last / 5) | 0);
        buzzer.nav(buzzer.buzz.na);
        this.y = tp[4];
      }
    } else this.st = 1;
  },
  start: function () {
    if (this.tid) clearInterval(this.tid);
    digitalPulse(ew.def.rstP, 1, [10, 100]);
    i2c.writeTo(0x15, 0);
    this.st = 1;
    this.tid = setInterval(function () {
      TC.init();
    }, this.loop);
  },
  stop: function () {
    if (this.tid) clearInterval(this.tid);
    this.tid = 0;
    digitalPulse(ew.def.rstP, 1, [5, 50]);
    setTimeout(() => {
      i2c.writeTo(0x15, ew.def.rstR, 3);
    }, 100);
    this.aLast = 0;
    this.st = 1;
    this.time = 0;
  },
};
