const fs = require('fs');
const txt = fs.readFileSync('C:/Users/DELL/.gemini/antigravity-ide/brain/629f37d0-234d-4fe2-a9cd-66f7c0dd176c/.system_generated/steps/3363/content.md', 'utf8');
const regex = /https:\/\/static\.tildacdn\.com\/[a-zA-Z0-9_\-\/]+\.(?:png|jpg|jpeg|svg)/gi;
const matches = txt.match(regex) || [];
const set = [...new Set(matches)];
console.log('Total static images:', set.length);
set.forEach(u => console.log(u));
