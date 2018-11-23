var increase_text_size = true;
var zoom_image_on_hover = true;
var large_cursor = true;
var increase_contrast = true;
var invert_colors = true;
var color_blind_filter = true;
var dyslexic_font = true;


function adjustPage() {
  var all = document.getElementsByTagName("body *");

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
    if (invert_colors) {
      invert(all[i]);
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
  var style = getComputedStyle(elem);

  var size = parseFloat(style.fontSize);
  elem.style.fontSize = (size * 2) + "px";
}

function zoomOnHover(elem) {
  //todo: make large image overlay when hovered
}

function largeCursor(elem) {
  var style = getComputedStyle(elem);
  var tag = elem.tagName;

  if (style.cursor == "pointer") {
    elem.style.cursor = "url(pointer.png), pointer";
  } else if ((tag == "button") || (tag == "a")) {
    elem.style.cursor = "url(pointer.png), pointer";
  } else {
    elem.style.cursor = "url(mouse.png), auto";
  }
}

function increaseContrast(elem) {
  var style = getComputedStyle(elem);
  var back = style.backgroundColor;
  var front = style.color;

  var backHSV = RGBtoHSV(back);
  var frontHSV = RGBtoHSV(front);

  backHSV["v"] = Math.round(backHSV["v"]);
  backHSV["s"] = Math.round(backHSV["s"]);

  frontHSV["v"] = Math.round(frontHSV["v"]);
  frontHSV["s"] = Math.round(frontHSV["s"]);
}

function invert(elem) {
  var style = getComputedStyle(elem);
  var back = style.backgroundColor;
  var front = style.color;

  var backHSV = RGBtoHSV(back);
  var frontHSV = RGBtoHSV(front);

  backHSV["v"] = 1 - backHSV["v"];
  frontHSV["v"] = 1 - frontHSV["v"];

  elem.style.backgroundColor = HSVtoRGB(backHSV);
  elem.style.color = HSVtoRGB(frontHSV);
}

function HSVtoRGB(hsvIn) {
  var h = hsvIn["h"];
  var s = hsvIn["s"];
  var v = hsvIn["v"];
  var o = hsvIn["o"];

  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;
      break;
    case 1:
      r = q, g = v, b = p;
      break;
    case 2:
      r = p, g = v, b = t;
      break;
    case 3:
      r = p, g = q, b = v;
      break;
    case 4:
      r = t, g = p, b = v;
      break;
    case 5:
      r = v, g = p, b = q;
      break;
  }
  return "rgba(" + (Math.round(r * 255)) + "," + (Math.round(g * 255)) + "," + (Math.round(b * 255)) + "," + o + ")";
}

function RGBtoHSV(rgbIn) {
  var rgb = rgbIn.replace(/[^\d,]/g, '').split(',').push("1");

  var r = rgb[0];
  var g = rgb[1];
  var b = rgb[2];
  var o = rgb[3];

  if (arguments.length === 1) {
    g = r.g, b = r.b, r = r.r;
  }
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    d = max - min,
    h,
    s = (max === 0 ? 0 : d / max),
    v = max / 255;

  switch (max) {
    case min:
      h = 0;
      break;
    case r:
      h = (g - b) + d * (g < b ? 6 : 0);
      h /= 6 * d;
      break;
    case g:
      h = (b - r) + d * 2;
      h /= 6 * d;
      break;
    case b:
      h = (r - g) + d * 4;
      h /= 6 * d;
      break;
  }

  return {
    h: h,
    s: s,
    v: v,
    o: o
  };
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
  elem.style.fontFamily = "dyslex";
}