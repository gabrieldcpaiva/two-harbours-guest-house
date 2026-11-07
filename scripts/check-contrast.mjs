// Checks the declared text/background pairs used by the design system.
const pairs = [
  ['Body on paper', '#24302f', '#f5f4ef'],
  ['Muted on paper', '#56615f', '#f5f4ef'],
  ['Muted on deep paper', '#56615f', '#ecebe4'],
  ['Button text', '#fffefa', '#263b3a'],
  ['Footer text', '#f5f4ef', '#1b2c2b'],
  ['Footer muted', '#c5d2cc', '#1b2c2b'],
  ['Dark-band text', '#d4dfda', '#263b3a'],
  ['Placeholder', '#715b27', '#eee7d4'],
  ['Footer placeholder', '#f0dfb2', '#34443b'],
  ['Error text', '#8a2f24', '#f7e9e5'],
  ['Success text', '#2d4a34', '#e8eee6'],
  ['Hero light text on darkest scrim', '#f0f3ef', '#102021'],
  ['Hero text on lightest photo through 70% scrim', '#f0f3ef', '#586364'],
];
const luminance = (hex) => {
  const c = hex.replace('#', '').match(/.{2}/g).map((v) => parseInt(v, 16) / 255).map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
let failures = 0;
for (const [name, fg, bg] of pairs) {
  const a = luminance(fg), b = luminance(bg);
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  const ok = ratio >= 4.5;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${ratio.toFixed(2)}:1 ${name}`);
  if (!ok) failures++;
}
console.log('Note: photographic heroes also use a dark gradient; browser axe checks the rendered pages.');
if (failures) process.exitCode = 1;
