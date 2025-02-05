if (global.euc && !euc.proxy) {
  euc.proxy = {
    state: 0,
    buffer: [],
    r: (o) => {
      if (euc.state == "READY") {
        euc.wri("proxy", o.data);
      }
      if (ew.dbg && ew.log) {
        ew.log.unshift("Proxy from phone: " + " " + Date() + " " + E.toJS(o.data));
        if (ew.log.length > 100) ew.log.pop();
      }
    },
    w: (o) => {
      if (ew.is.bt != 5) return;
      NRF.updateServices({ 0xffe0: { 0xffe1: { value: o, notify: true } } });
    },
    s: (o) => {
      NRF.setServices(
        {
          0xfff0: {
            0xfff1: {
              value: [0x01],
              maxLen: 20,
              writable: false,
              readable: true,
              description: "Characteristic 1",
            },
          },
          0xffa0: {
            0xffa1: {
              value: [0x01],
              maxLen: 20,
              writable: true,
              onWrite: function (evt) {
                ew.emit("ewBtIn", evt);
              },
              readable: true,
              notify: true,
              description: "ew",
            },
            0xffa9: {
              value: [0x01],
              maxLen: 20,
              writable: false,
              readable: true,
              notify: false,
              description: "Kingsong",
            },
          },
          0xffe0: {
            0xffe1: {
              value: [0x00],
              maxLen: 20,
              writable: true,
              onWrite: function (evt) {
                euc.proxy.r(evt);
              },
              readable: true,
              notify: true,
              description: "Kingsong",
            },
          },
        },
        { advertise: ["0xfff0", "0xffa0"], uart: false },
      );
      NRF.setAdvertising({}, { name: "KS-" + euc.dash.info.get.name + "-" + ew.def.name, connectable: true });
      NRF.setAddress(NRF.getAddress().substr(0, 15) + "a9 public");
      NRF.disconnect();
      NRF.restart();
    },
    e: (o) => {
      euc.proxy = 0;
      ew.do.update.bluetooth();
      NRF.disconnect();
      NRF.restart();
      return;
    },
  };
  euc.proxy.s();
}
