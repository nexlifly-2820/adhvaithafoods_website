const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images', 'chirashi');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const images = [
  "https://static.tildacdn.com/tild3362-3136-4965-a661-656337383233/image_95_2.jpg",
  "https://static.tildacdn.com/tild3733-3563-4032-a663-306639326438/image_93_2.jpg",
  "https://static.tildacdn.com/tild6133-6161-4738-b062-386362303636/image_88_2.jpg",
  "https://static.tildacdn.com/tild3333-3664-4534-b762-333432666333/image_-_2024-07-04T1.jpg"
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
    const filename = `chirashi_${i + 1}.jpg`;
    const dest = path.join(dir, filename);
    console.log(`Downloading ${url} -> ${filename}...`);
    await download(url, dest);
  }
  console.log('All downloads completed!');
}

run();
