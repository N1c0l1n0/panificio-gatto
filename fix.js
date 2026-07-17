const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/catalogo.json', 'utf8'));

// find "Personalizzati" category or subcategory
for (const cat of data.categories) {
  if (cat.items) {
    cat.items = cat.items.filter(i => !i.name.includes('23') || !i.id.includes('23'));
  }
  if (cat.subcategories) {
    for (const sub of cat.subcategories) {
      if (sub.items) {
        sub.items = sub.items.filter(i => !i.name.includes('23') || !i.id.includes('23'));
      }
    }
  }
}

fs.writeFileSync('public/catalogo.json', JSON.stringify(data, null, 2));
console.log("Done");
