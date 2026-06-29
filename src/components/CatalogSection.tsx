import { useEffect, useState } from 'react';

type CatalogItem = {
  id: string;
  name: string;
  image: string;
  description: string;
};

type CatalogCategory = {
  id: string;
  name: string;
  items: CatalogItem[];
};

export default function CatalogSection() {
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/catalogo.json')
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load catalog:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="specialita" className="py-20 bg-bakery-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-bakery-dark mb-4">Le Nostre Specialità</h2>
          <div className="w-24 h-1 bg-bakery-gold mx-auto rounded-full"></div>
          <p className="mt-4 text-bakery-dark/70 max-w-2xl mx-auto">
            Scopri il nostro assortimento di prodotti artigianali, preparati ogni giorno con ingredienti selezionati.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bakery-gold"></div>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category.id}>
                <h3 className="text-2xl font-serif font-bold text-bakery-accent mb-8 border-b border-bakery-gold/20 pb-2">
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-bakery-gold/10 group">
                      <div className="h-64 overflow-hidden relative">
                        <img 
                          src={`/${item.image}`} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="font-serif font-bold text-xl text-bakery-dark mb-2">{item.name}</h4>
                        <p className="text-bakery-dark/80 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
