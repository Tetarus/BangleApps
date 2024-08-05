const STOR = require("Storage");

var notify = {
  New: 0,
  nIm: 0,
  nInfo: 0,
  nCall: 0,
  nMail: 0,
};
notify.im = STOR.read("im.log") ? STOR.readJSON("im.log") : [];
notify.info = STOR.read("info.log") ? STOR.readJSON("info.log") : [];
notify.call = STOR.read("call.log") ? STOR.readJSON("call.log") : [];
function handleInfoEvent(event, discrete) {
  notify.nInfo++;
  notify.New++;

  let d = Date().toString().split(" ");
  let ti = "" + d[4] + " " + d[0] + " " + d[2];
  notify.info.unshift('{"src":"' + event.src + '","title":"' + event.title + '","body":"' + event.body + '","time":"' + ti + '"}');
  if (notify.info.length > 10) notify.info.pop();
  if (ew.def.buzz && !notify.ring) {
    face.off(8000);
    buzzer.nav([80, 50, 80]);
    if (face[0].bar) {
      UI.btn.ntfy(1, 4, 0, "_bar", 6, event.title, event.body, 0, 15);
      w.gfx.flip();
    } else if (!discrete) {
      if (face.appCurr != "clock" || face.pageCurr != 0) {
        face.go("clock", 0);
        face.appPrev = "clock";
        face.pagePrev = -1;
      }
    }
  }
}
