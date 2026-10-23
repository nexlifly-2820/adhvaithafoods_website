const https = require('https');
const fs = require('fs');

https.get('https://sushi-history.tilda.ws/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf('841513934');
    console.log('Record 841513934 idx:', idx);
    if (idx !== -1) {
      const chunk = data.substring(idx - 200, idx + 25000);
      fs.writeFileSync('scratch_split_rec.html', chunk);
      const imgs = [...chunk.matchAll(/https:\/\/static\.tildacdn\.com\/[^\s\"\'\)\>]+/g)].map(m => m[0]);
      console.log('Images in record:');
      console.log(JSON.stringify(Array.from(new Set(imgs)), null, 2));
    }
  });
});
