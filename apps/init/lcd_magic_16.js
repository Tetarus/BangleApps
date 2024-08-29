Modules.addCached("eucWatch", () => {
  D7.write(1); // turns off HR red led + power up i2c chips
  // MAGIC3 pins
  CS = D3;
  DC = D47;
  RST = D2;
  BL = D12;
  SCK = D45;
  MOSI = D44;
  RST.reset();
  SCK.write(0);
  MOSI.write(0);
  CS.write(1);
  DC.write(1);

  function toFlatString(arr, retries) {
    return (
      (E.toFlatString || E.toString)(arr) ||
      (function () {
        if (retries === 0) return undefined;
        E.kickWatchdog();
        E.defrag();
        print("toFlatString() fail&retry!");
        return toFlatString(arr, retries ? retries - 1 : 2); // 3 retries
      })()
    );
  }
  function toFlatBuffer(a) {
    return E.toArrayBuffer(toFlatString(a));
  }

  // screen driver
  // compiled with options LCD_BPP=16,SHARED_SPIFLASH
  var SPI2 = (function () {
    var bin = toFlatString(atob("AAAAAAAAAAAAAAUqAAAAAAUrAAAAAAEsAAAAv/////8AAAAAAAAAAP//////////ELUHTHxEIGAGSHhEAWABIZFABUp6RBFgBEp6RBNgEL30////6v///9z////S////BksAIsP4ACXD+AghASJaYNP4BCMKscP4CCNwRwDwAkAXS9P4ACU6u9P4BCMKscP4CCMUSnpEAAYSaMP4CCUSSnpESQASaMP4DCUQSnpEEmjD+BAlT/D/MsP4FCUMSnpEEmjD+GwlACLD+HAlw/gkBcP4VBUBIHBHT/D/MHBHAL8A8AJAlP///4T///9s////Xv///xC1Bkx8RCKABUp6RBCABUp6RBGABEp6RBOAEL0M////BP////z+///0/v//FEt7RDC1HIgRS0yx0/gYQQAs+9AQTX1EACTD+BhBLIAAJMP4OEXD+BhBw/hEBcP4SBUBIRlhGrEIS3tEGYAwvdP4GCEAKvvQACLD+Bgh9ucA8AJA2v7//8b+//+i/v//GEt7RBC1G2g7sxVMByPE+AA1ASPE+HA1E0t7RBtoG7FP8KBCwvgMNQAi//e5/w9Le0QbaBuxT/CgQsL4CDUMS3tEG2gbsU/woELC+Ag1ACABI8T4AAVjYBC9T/D/MPvnAPACQJr+//+G/v//cP7//2D+//9wtQRGiLFGGAAlIEYQ+AEbGbFEGLRCAtltQihGcL3/97X/ACj50QE17+cFRvXnAAAQtES6B0gBOXhESbpEgIGAUrpbul34BEsCgQ8hQ4H/99e/AL/a/f//E7UAKB/bACmmv434BRACJAEkACqhvwTxCAFpRAE0AfgELAAror8E8QgCakQBNI34BAAhRgGoqL8C+AQ8//d6/yBGArAQvQAk+ucAAC3p8E9bS7ewe0QPRht4AZIAkAAoAPCqgAApAPCngFoeByoA8qOAASKaQAE6BUbSsjX4AksCkgGa3/g8gRRBT0p6RKSysvgAkAAiyPhwJQciyPgAJUpKekQSaBqxT/CgQcH4DCVHSk/wAAp6RFFGHqgDkgOaAZ6y+ACwHqoEkgKaHkT2sgcuAuoEAoi/CD43+BLAgb8V+AEr9rLG8QgOAvoO8kT6A/SIvyJDT+ocLgD4AeCIv5SyAfEBAgHxAgGYv6SyC/H/O18pAPgCwB/6i/sL3QEiBZP/99f+BZu68QAPL9FRRgaoT/ABCrvxAA/G0SVKAJx6RAnx/zkSiBREJUYBmgCUNfgCSx/6ifkUQaSyufEAD63RACkY3UpG//e0/hpLe0QbaBuxT/CgQsL4CDUAIAEjyPgABcj4BDA3sL3o8I9P8AAKBJhRRs7nEEt7RBuIACvk0Nj4GDEAK/vQDUp6RAAjyPgYMROA2edP8P8w5OcAv2T9//8A8AJAKP3//zL9//8A/f//cvz//2b8//8W/P//BPz//w=="));
    return {
      cmd: E.nativeCall(385, "int(int,int)", bin),
      cmds: E.nativeCall(501, "int(int,int)", bin),
      cmd4: E.nativeCall(589, "int(int,int,int,int)", bin),
      setpins: E.nativeCall(49, "void(int,int,int,int)", bin),
      setwin: E.nativeCall(549, "void(int,int,int,int)", bin),
      enable: E.nativeCall(129, "int(int,int)", bin),
      disable: E.nativeCall(97, "void()", bin),
      blit_setup: E.nativeCall(245, "void(int,int,int,int)", bin),
      blt_pal: E.nativeCall(665, "int(int,int,int)", bin),
    };
  })();

  // this method would produce code string that can replace bin declaration above with heatshrink compressed variant
  // however it seems the gain is very small so is not worth it
  //    shrink:function(){return `var bin=E.toString(require("heatshrink").decompress(atob("${btoa(require("heatshrink").compress(bin))}")))`;}
  //* /
  E.kickWatchdog();

  SPI2.setpins(SCK, MOSI, CS, DC);
  SPI2.enable(0x14, 0); // 32MBit, mode 0

  function delayms(ms) {
    digitalPulse(DC, 0, ms);
    digitalPulse(DC, 0, 0); // 0=wait for previous
  }

  function cmd(a) {
    var l = a.length;
    if (!l) return SPI2.cmd4(a, -1, -1, -1);
    if (l === 2) return SPI2.cmd4(a[0], a[1], -1, -1);
    if (l === 3) return SPI2.cmd4(a[0], a[1], a[2], -1);
    if (l === 4) return SPI2.cmd4(a[0], a[1], a[2], a[3]);
    if (l === 1) return SPI2.cmd4(a[0], -1, -1, -1);
    var b = toFlatString(a);
    SPI2.cmd(E.getAddressOf(b, true), b.length);
  }

  function cmds(arr) {
    var b = toFlatString(arr);
    var c = SPI2.cmds(E.getAddressOf(b, true), b.length);
    if (c < 0) print("lcd_cmds: buffer mismatch, cnt=" + c);
    return c;
  }

  RST.set(); // release LCD from reset

  function init() {
    cmd(0x11); // sleep out
    delayms(120);
    cmd([0x36, 0]); // MADCTL - This is an unrotated screen
    // cmd([0x37, 1, 44]); //256+44=300 = offset by -20 so no need to add +20 to y
    // These 2 rotate the screen by 180 degrees
    // [0x36,0xC0],     // MADCTL
    // [0x37,0,80],   // VSCSAD (37h): Vertical Scroll Start Address of RAM
    // ROTATE 90, swap also width,height in createArrayBuffer
    // cmd([0x36,0x60]);cmd([0x37,0,20]);
    // cmd([0x36,0xB4]);cmd([0x37,1,44]); // ROTATE -90
    cmd([0x3a, 0x05]); // COLMOD - interface pixel format - 03 - 12bpp, 05 - 16bpp
    cmd([0xb2, 0xb, 0xb, 0x33, 0x00, 0x33]); // PORCTRL (B2h): Porch Setting
    cmd([0xb7, 0x11]); // GCTRL (B7h): Gate Control
    cmd([0xbb, 0x35]); // VCOMS (BBh): VCOM Setting
    cmd([0xc0, 0x2c]);
    cmd([0xc2, 1]); // VDVVRHEN (C2h): VDV and VRH Command Enable
    cmd([0xc3, 8]); // VRHS (C3h): VRH Set
    cmd([0xc4, 0x20]); // VDVS (C4h): VDV Set
    cmd([0xc6, 0x1f]); // VCMOFSET (C5h): VCOM Offset Set .
    cmd([0xd0, 0xa4, 0xa1]); // PWCTRL1 (D0h): Power Control 1
    cmd([0xe0, 0xf0, 0x4, 0xa, 0xa, 0x8, 0x25, 0x33, 0x27, 0x3d, 0x38, 0x14, 0x14, 0x25, 0x2a]); // PVGAMCTRL (E0h): Positive Voltage Gamma Control
    cmd([0xe1, 0xf0, 0x05, 0x08, 0x7, 0x6, 0x2, 0x26, 0x32, 0x3d, 0x3a, 0x16, 0x16, 0x26, 0x2c]); // NVGAMCTRL (E1h): Negative Voltage Gamma Control
    cmd(0x21); // INVON (21h): Display Inversion On
    cmd([0x35, 0]);
    cmd([0x44, 0x25, 0, 0]);
    delayms(120);
    cmd(0x29);
    //  cmd([0x35, 0]);
  }

  var bpp = require("Storage").read("ew.json") && require("Storage").readJSON("ew.json").bpp ? require("Storage").readJSON("ew.json").bpp : 1;
  var g = Graphics.createArrayBuffer(240, 280, bpp);
  var pal;
  g.sc = g.setColor;
  // 16bit RGB565  //    0=black,1=dgray,2=gray,3=lgray,4=raf, 5=raf1,6=back2,7=lgreen,8=blue,9=purple,10=lblue,11=cyan,12=green,  13=red,  14=yellow,15=white
  global.color = Uint16Array([0x000, 0x1084, 0x5b2f, 0xce9b, 0x001d, 0x3299, 0x0842, 0x0f6a, 0x3adc, 0xf81f, 2220, 0x07ff, 115, 0xd800, 0xffe0, 0xffff]);
  global.theme = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  switch (bpp) {
    case 1:
      pal = Uint16Array([0x000, 4095]);
      g.setColor = function (c, v) {
        if (c === 1) pal[1] = color[v];
        else pal[0] = color[v];
        g.sc(c);
      };
      break;
    case 2:
      pal = Uint16Array([0x000, 1365, 1629, 1535]); // white won't fit
      g.buffer = new ArrayBuffer(16800);
      break;
    case 4:
    default:
      pal = global.color;
      g.buffer = new ArrayBuffer(33600);
      g.setColor = (c, v) => {
        g.sc(v);
      };
      break;
  }
  // precompute addresses for flip
  g.palA = E.getAddressOf(pal.buffer, true); // pallete address
  g.buffA = E.getAddressOf(g.buffer, true); // framebuffer address
  g.stride = (g.getWidth() * bpp) / 8;

  g.flip = function (force) {
    var r = g.getModified(true);
    if (force) {
      r = {
        x1: 0,
        y1: 0,
        x2: this.getWidth() - 1,
        y2: this.getHeight() - 1,
      };
    }
    if (r === undefined) return;
    var x1 = r.x1;
    var x2 = r.x2;
    var xw = x2 - x1;
    var yw = r.y2 - r.y1 + 1;
    if (xw < 1 || yw < 1) {
      print("empty rect ", xw, yw);
      return;
    }
    SPI2.blit_setup(xw, yw, bpp, g.stride);
    var xbits = x1 * bpp;
    var bitoff = xbits % 8;
    var addr = g.buffA + (xbits - bitoff) / 8 + r.y1 * g.stride; // address of upper left corner
    // VIB.set();//debug
    SPI2.setwin(r.x1, r.x2, r.y1 + 20, r.y2 + 20);
    SPI2.blt_pal(addr, g.palA, bitoff);
    // VIB.reset();//debug
  };

  g.isOn = false;
  init();

  g.on = function () {
    if (this.isOn) return;
    cmd(0x11);
    delayms(10);
    g.flip();
    // cmd(0x13); //ST7735_NORON: Set Normal display on, no args, w/delay: 10 ms delay
    // cmd(0x29); //ST7735_DISPON: Set Main screen turn on, no args w/delay: 100 ms delay
    this.isOn = true;
    this.bri.set(this.bri.lv);
  };

  g.off = function () {
    if (!this.isOn) return;
    // cmd(0x28);
    cmd(0x10);
    BL.reset();
    this.isOn = false;
  };

  g.bri = {
    lv: (require("Storage").readJSON("ew.json", 1) || {}).bri ? (require("Storage").readJSON("ew.json", 1) || {}).bri : 3,
    set(o) {
      if (o) this.lv = o;
      else {
        this.lv += 1;
        if (this.lv > 7) this.lv = 1;
        o = this.lv;
      }
      if (this.lv === 0 || this.lv === 7) digitalWrite(BL, this.lv === 0 ? 0 : 1);
      else analogWrite(BL, (this.lv * 42.666) / 256, { freq: 4096 });
      ew.def.bri = o;
      return o;
    },
  };
  // battery
  const batt = function (i, c) {
    const v = (4.2 / 0.6) * analogRead(ew.pin.BAT);
    const l = 3.5;
    const h = 4.19;
    const hexString = "0x" + (0x50000700 + ew.pin.BAT * 4).toString(16);
    poke32(hexString, 2); // disconnect pin for power saving, otherwise it draws 70uA more
    if (i === "info") {
      if (c) return (((100 * (v - l)) / (h - l)) | 0) + "%-" + v.toFixed(2) + "V";
      return (v <= l ? 0 : h <= v ? 100 : (((v - l) / (h - l)) * 100) | 0) + "%-" + v.toFixed(2) + "V";
    }
    if (i) {
      if (c) return ((100 * (v - l)) / (h - l)) | 0;
      return v <= l ? 0 : h <= v ? 100 : (((v - l) / (h - l)) * 100) | 0;
    }
    return +v.toFixed(2);
  };
  module.exports = {
    batt: batt,
    gfx: g,
  };
});
