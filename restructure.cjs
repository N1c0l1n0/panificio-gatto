const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/catalogo.json', 'utf8'));

// Extract existing items
const pizzeFocacce = data.categories.find(c => c.id === 'pane_focacce')?.items || [];
const torte = data.categories.find(c => c.id === 'torte')?.items || [];
const paneNutella = data.categories.find(c => c.id === 'pane_nutella')?.items || [];
const biscottiPers = data.categories.find(c => c.id === 'biscotti_personalizzati')?.items || [];

const newData = {
  categories: [
    {
      id: "pane",
      name: "Pane",
      subcategories: [
        { id: "pane_speciale", name: "Pane speciale", items: [] },
        { id: "pane_bianco", name: "Pane \"bianco\"", items: [] }
      ]
    },
    {
      id: "forno",
      name: "Prodotti da forno",
      subcategories: [
        { id: "pizze_focacce", name: "Pizze e Focacce", items: pizzeFocacce },
        { id: "pasticceria_salata", name: "Pasticceria salata", items: [] },
        { id: "prodotti_salati", name: "I nostri prodotti salati", items: [] }
      ]
    },
    {
      id: "pane_nutella",
      name: "Pane e nutella personalizzati",
      items: paneNutella
    },
    {
      id: "pasticceria",
      name: "Pasticceria",
      subcategories: [
        { id: "pasticceria_stagionale", name: "Pasticceria stagionale", items: [] },
        { id: "biscotteria", name: "Biscotteria", items: [] },
        { id: "torte", name: "Torte", items: torte },
        { id: "personalizzati", name: "Personalizzati", items: biscottiPers }
      ]
    }
  ]
};

fs.writeFileSync('public/catalogo.json', JSON.stringify(newData, null, 2));
console.log("JSON Restructured");
