const https = require('https');
const fs = require('fs');

https.get('https://sushi-history.tilda.ws/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('full_page.html', data);
    console.log('Saved full_page.html, length:', data.length);
    // Find all rec IDs
    const recs = [...data.matchAll(/id="(rec[0-9]+)"/g)].map(m => m[1]);
    console.log('Records found:', recs);

    // For each record, find text and images
    recs.forEach(recId => {
      const start = data.indexOf(recId);
      const chunk = data.substring(start, start + 30000);
      const text = chunk.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const imgs = [...chunk.matchAll(/(?:src|data-original|background-image:url\()[\'\"]?([^\'\"\)\s]+\.(?:png|jpg|jpeg|svg))/g)].map(m => m[1]);
      if (text.includes('OSHIZUSHI') || text.includes('INARIZUSHI') || chunk.includes('OSHIZUSHI')) {
        console.log(`\n=== RECORD ${recId} (MATCHED) ===`);
        console.log('Images:', Array.from(new Set(imgs)));
        console.log('Text snippet:', text.substring(0, 1000));
      }
    });
  });
});
