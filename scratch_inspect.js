const fs = require('fs');
const https = require('https');

const urls = [
  'https://static.tildacdn.com/tild3561-3337-4337-b831-333138653931/_.png',
  'https://static.tildacdn.com/tild6336-6438-4838-a463-396538653364/ba22cf71-c50f-4510-b.png',
  'https://static.tildacdn.com/tild3931-3131-4430-a164-643465623737/3569fa30-ef5d-4e1f-8.png',
  'https://static.tildacdn.com/tild3736-3130-4764-b432-653136303165/34516f86-ce7c-43a8-b.png',
  'https://static.tildacdn.com/tild3938-3662-4336-b963-646532616533/c11d6a48-c53d-414f-a.png'
];

if (!fs.existsSync('public/images/makizushi/types')) {
  fs.mkdirSync('public/images/makizushi/types', { recursive: true });
}

urls.forEach((u, i) => {
  const file = `public/images/makizushi/types/sushi_${i + 1}.png`;
  const ws = fs.createWriteStream(file);
  https.get(u, res => {
    res.pipe(ws);
    ws.on('finish', () => console.log('Saved', file, 'from', u));
  });
});
