const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images', 'split');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const images = [
  "https://static.tildacdn.com/tild3564-6130-4531-b637-373338386665/2.png",
  "https://static.tildacdn.com/tild3561-3337-4337-b831-333138653931/_.png",
  "https://static.tildacdn.com/tild3463-6635-4435-b531-613632393937/bb58b5d5-2e28-49ad-8.png",
  "https://static.tildacdn.com/tild3166-3531-4435-a566-633537303262/e39eccff-9d31-486c-a.png",
  "https://static.tildacdn.com/tild3564-3264-4164-a266-346462653435/d058ac3d-e81a-4a78-9.png",
  "https://static.tildacdn.com/tild6465-6334-4364-b961-336337636334/4b5af898-ced9-46b8-a.png",
  "https://static.tildacdn.com/tild3534-6132-4139-b937-623736633365/9331ea11-544b-4d74-9.png",
  "https://static.tildacdn.com/tild3534-3262-4739-b935-623866343535/6ba82a0e-fc45-49ef-8.png"
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (let i = 0; i < images.length; i++) {
    const url = images[i];
    const filename = `split_${i + 1}.png`;
    const dest = path.join(dir, filename);
    console.log(`Downloading ${url} -> ${filename}...`);
    await download(url, dest);
  }
  console.log('All downloads completed!');
}

run();
