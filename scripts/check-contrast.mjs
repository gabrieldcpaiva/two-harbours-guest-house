const lum = (hex) => {
  const channels = hex.replace('#', '').match(/.{2}/g).map((value) => {
    const channel = parseInt(value, 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const ratio = (a, b) => {
  const left = lum(a);
  const right = lum(b);
  return (Math.max(left, right) + 0.05) / (Math.min(left, right) + 0.05);
};

const pairs = [
  ['Charcoal on cream', '#1A1A1A', '#F2F0E9', 4.5],
  ['Cream on charcoal', '#F2F0E9', '#1A1A1A', 4.5],
  ['Moss on cream', '#2E4036', '#F2F0E9', 4.5],
  ['Cream on moss', '#F2F0E9', '#2E4036', 4.5],
  ['Cream on Book Direct clay #A9492A', '#F2F0E9', '#A9492A', 4.5],
  ['Original clay #CC5833 on cream, not used for text', '#CC5833', '#F2F0E9', 3],
];

let failures = 0;
for (const [name, fg, bg, minimum] of pairs) {
  const value = ratio(fg, bg);
  const ok = value + 0.001 >= minimum;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${value.toFixed(2)}:1 (need ${minimum}) ${name}`);
  if (!ok) failures += 1;
}

console.log('Book Direct fill is #A9492A, Clay #CC5833 darkened until cream text clears 4.5:1 at normal size.');
console.log('Original Clay stays in the palette and is not used for small text.');
if (failures) process.exitCode = 1;
