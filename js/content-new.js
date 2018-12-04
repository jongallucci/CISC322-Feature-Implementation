var increase_text_size = false;
var zoom_image_on_hover = false;
var large_cursor = false;
var increase_contrast = false;
var color_blind_filter = false;
var dyslexic_font = false;
var contrast_value = 150;

chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
  increase_text_size = request.f0;
  zoom_image_on_hover = request.f1;
  large_cursor = request.f2;
  color_blind_filter = request.f3;
  dyslexic_font = request.f4;
  increase_contrast = request.f5;
  contrast_value = request.f6;

  console.log(request);

  adjustPage();
}

function adjustPage() {
  var all = document.getElementsByTagName("*");

  if (color_blind_filter) {
    document.body.innerHTML += '<span id="cvd_extension_svg_filter" hidden=""><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter x="0" y="0" width="99999" height="99999" id="cvd_extension_0"><feColorMatrix id="cvd_matrix_0" type="matrix" values="0.6622999999999999 -0.5325000000000001 0.8702 0 0 0.10406000000000001 0.76614 0.1296 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter><filter x="0" y="0" width="99999" height="99999" id="cvd_extension_1"><feColorMatrix id="cvd_matrix_1" type="matrix" values="0.7393609999999999 -0.47654700000000005 0.737186 0 0 0.07926840000000002 0.8075666000000001 0.11299399999999998 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs></svg></span>';
    document.body.style = "-webkit-filter: url(#cvd_extension_0);";
  }
  if (increase_contrast) {
    document.body.style.filter = "contrast(" + contrast_value + "%)";
  }
  if (zoom_image_on_hover) {
    document.styleSheets[0].insertRule('img:hover { z - index: 1000; transform: scale(2.5); }', 0);
  }
  for (var i = 0, tot = all.length; i < tot; i++) {
    if (increase_text_size) {
      increaseTextSize(all[i]);
    }
    if (large_cursor) {
      largeCursor(all[i]);
    }
    if (dyslexic_font) {
      dyslexicFont(all[i]);
    }
  }
}

function increaseTextSize(elem) {
  elem.style.fontSize = "24px";
  elem.style.lineHeight = "24px";
}

function largeCursor(elem) {
  var style = getComputedStyle(elem);
  var tag = elem.tagName;

  if (style.cursor == "pointer") {
    elem.style.cursor = "url('https://i.imgur.com/dyF4C7i.png'), pointer";
  } else if ((tag == "button") || (tag == "a")) {
    elem.style.cursor = "url('https://i.imgur.com/dyF4C7i.png'), pointer";
  } else {
    elem.style.cursor = "url('https://i.imgur.com/wr1v5AD.png'), auto";
  }
}

function increaseContrast(elem) {
  elem.style.backgroundColor = "black";
  elem.style.color = "yellow";
}

function dyslexicFont(elem) {
  elem.style.fontFamily = "Arial";
}

adjustPage();