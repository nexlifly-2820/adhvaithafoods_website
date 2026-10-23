const fs = require('fs');
const html = fs.readFileSync('rec841514085.html', 'utf8');

const ids = ['1734583238526', '1734583238558', '1734583238520', '1734583238534', '1734583238551', '1734583238553'];
ids.forEach(id => {
  const re = new RegExp('#rec841514085 [^{]*' + id + '[^{]*\\{[^}]+\\}', 'g');
  console.log(`\n=== ID: ${id} ===`);
  const matches = html.match(re);
  if (matches) {
    matches.slice(0, 3).forEach(m => console.log(m));
  }
});
