Modules.addCached("eucWatch", () => {
  //MAGIC3/Rock/QY03 LCD pins
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
    "ram";
    return (
      (E.toFlatString || E.toString)(arr) ||
      (function () {
        if (retries == 0) return undefined;
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
  // compiled with options SPI3,LCD_BPP=12,SHARED_SPIFLASH
  var SPI2 = (function () {
    var bin = toFlatString(atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAFKgAAAAAFKwAAAAABLAAA////////////////ELUDTHxEIoBggKGA44AQvcj///8HS3tEG4lDsQRKE2gAK/zQACMTYANKekQTgXBHGPECQLb///+i////OLUjS3tE2mgAKjDQGUoHJBRgGUwBJSVgG2kURguxF0oTYP/32f8WSwAiGmCj9YRjGmAUShBgUWCi8jRSASERYBpoACr80AAiGmASS3tEG2kLsQ1KE2AQS3tEG2kLsQpKE2AKSwAgASIgYBpgOL1P8P8w++cA9QJAcPUCQAwFAFA49QJARPUCQAgFAFAE8AJAjP///0T///84////E7UAKB7bACmmv434BRACJAEkACqkvwKpCRmN+AQApL8BNAH4BCwAK6K/AqoSGQE0IUYBqKi/AvgEPP/3k/8gRgKwEL0AJPrncLUFRoixRhgAJChGEPgBGxmxRRi1QgLZZEIgRnC9//d9/wAo+dEBNO/nBEb15wAAAPT/cBC0AjFEuglIAfT/cXhEATlJulK6W7rEggGDgoPDgw8hFDBd+ARL//fRvwC/bP7//xJLG2gQteu5EUsbaAuxEUoTYBNLEEp7RAAGXGoUYJxqVGDcapRgT/D/NNRg2mgLS0kAGmAAIlpgQ/hIDEP4GBwBIBC9T/D/MPvnAL8A9QJABPMCQAjzAkAI9QJAbPUCQDL+//8HSgAjE2Ci9X5yE2AFSwEiGmAD9UBzG2gLsQNKE2BwRwD1AkAE8AJACPMCQBC1BUx8RMTpCQEBIQH6AvLE6QMyEL0Av7T9//8t6fBPt7DN6QESakp6RJL4AJAAKADwuoAAKQDwt4AJ8f8zBysA8rKAASMD+gnzATvbsgOTAXhDeJeIQeoDIQKbGUFUSwAkHGBTTAcjI2ATaQWUAPECC4myC7FQShNgT+pJA9uyT/AACASTREYerlJLAp17RLP4AqADmwGaC0BB+gnxMvgTwAObC0BB+gnxMvgTIASbHUTtsgctZ9iJsk/qLBMzVRMSBPECDkPqDBwzGQM0qvECCl8sg/gBwB/6ivoG+A4gGN3/943+NUoAIxNgovWEYhNgwvgsZML4MEQxTAEiImA1THxEsusICCKBB78erkRGHEYGrrrxAA+80TBLe0QBP9uIGES/skN4AXhB6gMhApsZQQDxAguJsgAvptEALDDQ//de/h1LH0ofYKP1hGOi8jRSH2DC+DRlwvg4RQEhEWAaaAAq/NAAIhpgHUt7RBtpC7EVShNgBZsAIBhgE0sBIhpgN7C96PCP3kYIPR74ATvtssXxCAsD+gvzGUOJsvNGi+f/9y3+4OdP8P8w6ecAv3D1AkAA9QJADAUAUDj1AkAQ8AJARPUCQAgFAFAE8AJAkP3//yr9//+2/P//nPz//0z8//8="));
    return {
      cmd: E.nativeCall(109, "int(int,int)", bin),
      cmds: E.nativeCall(337, "int(int,int)", bin),
      cmd4: E.nativeCall(265, "int(int,int,int,int)", bin),
      setpins: E.nativeCall(581, "void(int,int,int,int)", bin),
      setwin: E.nativeCall(385, "void(int,int,int,int)", bin),
      enable: E.nativeCall(437, "int(int,int)", bin),
      disable: E.nativeCall(537, "void()", bin),
      blit_setup: E.nativeCall(49, "void(int,int,int,int)", bin),
      blt_pal: E.nativeCall(609, "int(int,int,int)", bin),
    };
  })();
  //*/
  E.kickWatchdog();

  SPI2.setpins(SCK, MOSI, CS, DC);
  SPI2.enable(0x14, 0); //32MBit, mode 0

  function delayms(ms) {
    "ram";
    // for short delays, blocks everything
    digitalPulse(DC, 0, ms); // use some harmless pin (LCD DC)
    digitalPulse(DC, 0, 0); // 0ms just waits for previous call
  }

  function cmd(a) {
    "ram";
    var l = a.length;
    if (!l) return SPI2.cmd4(a, -1, -1, -1);
    if (l == 2) return SPI2.cmd4(a[0], a[1], -1, -1);
    if (l == 3) return SPI2.cmd4(a[0], a[1], a[2], -1);
    if (l == 4) return SPI2.cmd4(a[0], a[1], a[2], a[3]);
    if (l == 1) return SPI2.cmd4(a[0], -1, -1, -1);
    var b = toFlatString(a);
    SPI2.cmd(E.getAddressOf(b, true), b.length);
  }

  function cmds(arr) {
    "ram";
    var b = toFlatString(arr);
    var c = SPI2.cmds(E.getAddressOf(b, true), b.length);
    if (c < 0) print("lcd_cmds: buffer mismatch, cnt=" + c);
    return c;
  }

  RST.set(); // release LCD from reset

  function init() {
    "ram";
    cmd(0x11); // sleep out
    delayms(120);
    cmd([0x36, 0]); // MADCTL - This is an unrotated screen
    //cmd([0x37, 1, 44]); //256+44=300 = offset by -20 so no need to add +20 to y
    // These 2 rotate the screen by 180 degrees
    //[0x36,0xC0],     // MADCTL
    //[0x37,0,80],   // VSCSAD (37h): Vertical Scroll Start Address of RAM
    // ROTATE 90, swap also width,height in createArrayBuffer
    //cmd([0x36,0x60]);cmd([0x37,0,20]);
    //cmd([0x36,0xB4]);cmd([0x37,1,44]); // ROTATE -90
    cmd([0x3a, 0x03]); // COLMOD - interface pixel format - 03 - 12bpp, 05 - 16bpp
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
    cmd([0xe1, 0xf0, 0x05, 0x08, 0x7, 0x6, 0x2, 0x26, 0x32, 0x3d, 0x3a, 0x16, 0x16, 0x26, 0x2c]); // NVGAMCTRL (E1h): Negative Voltage Gamma Contro
    cmd(0x21); // INVON (21h): Display Inversion On
    cmd([0x35, 0]);
    cmd([0x44, 0x25, 0, 0]);
    delayms(120);
    cmd(0x29);
    //  cmd([0x35, 0]);
  }

  var bpp = 4; // powers of two work, 3=8 colors would be nice
  var g = Graphics.createArrayBuffer(240, 280, bpp);
  var pal;
  global.color = Uint16Array([
    0x000, // 0 - Black
    0x112, // 1 - Very dark grayish blue
    0x567, // 2 - Dark grayish cyan
    0xccd, // 3 - Light grayish purple
    0x00e, // 4 - Very dark blue
    0x35c, // 5 - Dark cyan
    0x001, // 6 - Very dark blue (almost black)
    0x0e5, // 7 - Medium cyan
    0x35e, // 8 - Light cyan
    0xf0f, // 9 - Magenta
    0x016, // 10 - Very dark cyan
    0x0ff, // 11 - Cyan
    0x019, // 12 - Dark cyan
    0xf00, // 13 - Red
    0xff0, // 14 - Yellow
    0xfff, // 15 - White
  ]);
  global.theme = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  switch (bpp) {
    case 1:
      pal = global.color;
      g.sc = g.setColor;
      c1 = pal[1]; //save color 1
      g.setColor = function (c, v) {
        //change color 1 dynamically
        v = Math.floor(v);
        if (v > 1) {
          pal[1] = pal[v];
          g.sc(1);
        } else if (v == 1) {
          pal[1] = c1;
          g.sc(1);
        } else g.sc(v);
      };
      break;
    case 2:
      pal = Uint16Array([0x000, 0xf00, 0x0f0, 0x00f]);
      break; // white won't fit
    case 4:
    default:
      pal = global.color;
      g.sc = g.setColor;
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
    "ram";
    var r = g.getModified(true);
    if (force) r = { x1: 0, y1: 0, x2: this.getWidth() - 1, y2: this.getHeight() - 1 };
    if (r === undefined) return;
    var x1 = r.x1 & 0x1fe;
    var x2 = (r.x2 + 2) & 0x1fe; // for 12bit mode align to 2 pixels
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
    //VIB.set();//debug
    SPI2.setwin(r.x1, r.x2, r.y1 + 20, r.y2 + 20);
    SPI2.blt_pal(addr, g.palA, bitoff);
    //VIB.reset();//debug
  };

  g.isOn = false;
  init();

  g.on = function () {
    "ram";
    if (this.isOn) return;
    cmd(0x11);
    delayms(10);
    g.flip();
    //cmd(0x13); //ST7735_NORON: Set Normal display on, no args, w/delay: 10 ms delay
    //cmd(0x29); //ST7735_DISPON: Set Main screen turn on, no args w/delay: 100 ms delay
    this.isOn = true;
    this.bri.set(this.bri.lv);
  };

  g.off = function () {
    "ram";
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
        this.lv++;
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
    "ram";
    let v = (4.2 / 0.6) * analogRead(ew.pin.BAT);
    let l = 3.5,
      h = 4.19;
    let hexString = "0x" + (0x50000700 + ew.pin.BAT * 4).toString(16);
    poke32(hexString, 2); // disconnect pin for power saving, otherwise it draws 70uA more
    if (i === "info") {
      if (c) return (((100 * (v - l)) / (h - l)) | 0) + "%-" + v.toFixed(2) + "V";
      return (v <= l ? 0 : h <= v ? 100 : (((v - l) / (h - l)) * 100) | 0) + "%-" + v.toFixed(2) + "V";
    } else if (i) {
      if (c) return ((100 * (v - l)) / (h - l)) | 0;
      return v <= l ? 0 : h <= v ? 100 : (((v - l) / (h - l)) * 100) | 0;
    } else return +v.toFixed(2);
  };
  module.exports = {
    batt: batt,
    gfx: g,
  };
});
