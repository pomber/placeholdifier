const opentype = require("opentype.js");

const code = (s) => s.charCodeAt(0);
const exclude = "  ',;[]().\"`".split("").map(code);

function changePath(glyph, h) {
  console.log(glyph);

  const aPath = new opentype.Path();

  if (!exclude.includes(glyph.unicode)) {
    aPath.moveTo(0, 0);
    aPath.lineTo(0, h);
    aPath.lineTo(glyph.advanceWidth + 24, h);
    aPath.lineTo(glyph.advanceWidth + 24, 0);
    aPath.close();
  }

  glyph.path = aPath;
}

// curl 'https://fonts.googleapis.com/css?family=Name' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'User-Agent: AppleWebKit/537.36 (KHTML, like Gecko) Chrome'
const url = "somefont.woff";

const f = (font) => {
  const glyphs = Object.values(font.glyphs.glyphs);
  const H = glyphs.find((g) => g.unicode === 72);
  const h = H.yMax;

  glyphs.forEach((g) => changePath(g, h));

  const newFont = new opentype.Font({
    familyName: "Placeholdifier",
    styleName: "Medium",
    unitsPerEm: font.unitsPerEm,
    ascender: font.ascender,
    descender: font.descender,
    glyphs: Object.values(font.glyphs.glyphs),
  });

  const fontface = new window.FontFace(
    "Placeholdifier",
    newFont.toArrayBuffer()
  );

  document.fonts.add(fontface);

  window.downloadFont = function () {
    newFont.download("placeholdifier.otf");
  };
};

opentype.load(url).then(f);
