const fs = require('fs');
const html = fs.readFileSync('full_page.html', 'utf8');
const start = html.indexOf('id="rec841514085"');
const nextRec = html.indexOf('class="r t-rec"', start + 20);
const chunk = html.substring(start, nextRec !== -1 ? nextRec : start + 60000);
fs.writeFileSync('rec841514085.html', chunk);
console.log('Chunk length:', chunk.length);

const imgs = [];
const regex = /https:\/\/static\.tildacdn\.com\/[^\s"'<>]+\.(?:png|jpg|jpeg|svg)/g;
let m;
while ((m = regex.exec(chunk)) !== null) {
  imgs.push(m[0]);
}

console.log('Unique images:');
console.log(JSON.stringify(Array.from(new Set(imgs)), null, 2));

// Extract all text elements with their classes/fields
const elemRegex = /<div class='[^']*tn-atom'[^>]*field='([^']*)'[^>]*>([\s\S]*?)<\/div>/g;
let em;
console.log('\nText elements:');
while ((em = elemRegex.exec(chunk)) !== null) {
  console.log(`${em[1]}: ${em[2].replace(/&nbsp;/g, ' ').trim()}`);
}
