const fs = require('fs');
const html = fs.readFileSync('rec841514085.html', 'utf8');

const images = [
  { file: 'split_1.png', url: 'https://static.tildacdn.com/tild3564-6130-4531-b637-373338386665/2.png' },
  { file: 'split_2.png', url: 'https://static.tildacdn.com/tild3561-3337-4337-b831-333138653931/_.png' },
  { file: 'split_3.png', url: 'https://static.tildacdn.com/tild3463-6635-4435-b531-613632393937/bb58b5d5-2e28-49ad-8.png' },
  { file: 'split_4.png', url: 'https://static.tildacdn.com/tild3166-3531-4435-a566-633537303262/e39eccff-9d31-486c-a.png' },
  { file: 'split_5.png', url: 'https://static.tildacdn.com/tild3564-3264-4164-a266-346462653435/d058ac3d-e81a-4a78-9.png' },
  { file: 'split_6.png', url: 'https://static.tildacdn.com/tild6465-6334-4364-b961-336337636334/4b5af898-ced9-46b8-a.png' },
  { file: 'split_7.png', url: 'https://static.tildacdn.com/tild3534-6132-4139-b937-623736633365/9331ea11-544b-4d74-9.png' },
  { file: 'split_8.png', url: 'https://static.tildacdn.com/tild3534-3262-4739-b935-623866343535/6ba82a0e-fc45-49ef-8.png' }
];

images.forEach(img => {
  const idx = html.indexOf(img.url);
  const snippet = html.substring(Math.max(0, idx - 400), idx + 200);
  console.log('=== ' + img.file + ' ===');
  const elemMatch = snippet.match(/data-elem-id='([^']+)'/);
  console.log('Elem ID:', elemMatch ? elemMatch[1] : 'unknown');
  const topMatch = snippet.match(/data-field-top-value="([^"]+)"/);
  const leftMatch = snippet.match(/data-field-left-value="([^"]+)"/);
  const widthMatch = snippet.match(/data-field-width-value="([^"]+)"/);
  const heightMatch = snippet.match(/data-field-height-value="([^"]+)"/);
  console.log(`Pos: top=${topMatch?.[1]}, left=${leftMatch?.[1]}, w=${widthMatch?.[1]}, h=${heightMatch?.[1]}`);
});
