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
  console.log(dyslexic_font);

  adjustPage();
}


function adjustPage() {
  var all = document.getElementsByTagName("*");

  for (var i = 0, tot = all.length; i < tot; i++) {
    if (increase_text_size) {
      increaseTextSize(all[i]);
    }
    if (zoom_image_on_hover) {
      zoomOnHover(all[i]);
    }
    if (large_cursor) {
      largeCursor(all[i]);
    }
    if (increase_contrast) {
      increaseContrast(all[i]);
      increaseContrastImages(all[i]);
    }
    if (color_blind_filter) {
      colorBlindColors(all[i]);
      colorBlindImages(all[i]);
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

function zoomOnHover(elem) {
  //todo: make large image overlay when hovered
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

function increaseContrastImages(elem) {
  //todo: add filter to increase contrast of images
}

function colorBlindColors(elem) {
  //todo: change colors for those w/ colourblindness (color & backgroundColor)
}

function colorBlindImages(elem) {
  //todo: apply image filter to do same as above
}

function dyslexicFont(elem) {
  elem.style.fontFamily = "Arial";
}

adjustPage();