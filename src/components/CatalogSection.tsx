import { useEffect, useState } from 'react';
import { X, Play } from 'lucide-react';

type CatalogItem = {
  id: string;
  name: string;
  image: string;
  description: string;
  type?: 'image' | 'video';
};

type CatalogSubcategory = {
  id: string;
  name: string;
  items: CatalogItem[];
};

type CatalogCategory = {
  id: string;
  name: string;
  subcategories?: CatalogSubcategory[];
  items?: CatalogItem[];
};

export default function CatalogSection() {
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{url: string, type: 'image' | 'video'} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/catalogo.json')
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories);
        // setActiveCategoryId is deliberately left as null to show the carousel initially
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load catalog:", err);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (id: string) => {
    if (activeCategoryId === id) {
      setActiveCategoryId(null);
      setActiveSubcategoryId(null);
    } else {
      setActiveCategoryId(id);
      const category = categories.find(c => c.id === id);
      if (category?.subcategories && category.subcategories.length > 0) {
        setActiveSubcategoryId(category.subcategories[0].id);
      } else {
        setActiveSubcategoryId(null);
      }
    }
  };

  const activeCategory = categories.find(c => c.id === activeCategoryId);
  const activeSubcategory = activeCategory?.subcategories?.find(s => s.id === activeSubcategoryId);
  const itemsToDisplay = activeSubcategory ? activeSubcategory.items : (activeCategory?.items || []);

  const allImages = categories.flatMap(c => {
    const items = c.items || [];
    const subItems = c.subcategories?.flatMap(s => s.items) || [];
    return [...items, ...subItems];
  }).filter(item => item.type !== 'video').sort(() => Math.random() - 0.5);

  return (
    <section id="specialita" className="py-20 bg-bakery-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
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
        ) : categories.length === 0 ? (
          <div className="text-center py-10 text-bakery-dark/60">
            Nessun prodotto presente al momento.
          </div>
        ) : (
          <div className="space-y-12">
            {/* Category tabs */}
            <div className="text-center mb-6">
              <p className="text-bakery-accent font-medium inline-block bg-white px-5 py-2 rounded-full shadow-sm border border-bakery-gold/30 animate-pulse text-sm md:text-base">
                👇 Clicca su una categoria per vedere i prodotti
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex overflow-x-auto pt-4 pb-2 gap-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`whitespace-nowrap px-6 py-3 rounded-full font-serif font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer ${
                      activeCategoryId === category.id
                        ? 'bg-bakery-gold text-white shadow-lg scale-105 ring-2 ring-bakery-gold ring-offset-2'
                        : 'bg-white text-bakery-dark border-2 border-bakery-gold/30 hover:border-bakery-gold hover:text-bakery-accent hover:shadow-md hover:-translate-y-1'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {activeCategory?.subcategories && activeCategory.subcategories.length > 0 && (
                <div className="flex overflow-x-auto pb-6 pt-2 gap-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  {activeCategory.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubcategoryId(sub.id)}
                      className={`whitespace-nowrap px-4 py-2 text-sm rounded-full font-medium transition-all duration-200 cursor-pointer ${
                        activeSubcategoryId === sub.id
                          ? 'bg-bakery-accent text-white shadow-md'
                          : 'bg-bakery-light/80 text-bakery-dark/80 border border-bakery-gold/20 hover:bg-white hover:text-bakery-accent'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Active category items */}
            {activeCategory ? (
              <div className="animate-in fade-in duration-500">
                <h3 className="text-2xl font-serif font-bold text-bakery-accent mb-8 border-b border-bakery-gold/20 pb-2 flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <span>{activeCategory.name}</span>
                  {activeSubcategory && (
                    <span className="text-lg text-bakery-dark/60 font-sans font-normal">/ {activeSubcategory.name}</span>
                  )}
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                  {itemsToDisplay.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-bakery-gold/10 group cursor-pointer relative"
                      onClick={() => setSelectedMedia({ url: `/${item.image}`, type: item.type || 'image' })}
                    >
                      <div className="relative w-full aspect-square bg-black/5">
                        {item.type === 'video' ? (
                          <>
                            <video 
                              src={`/${item.image}`} 
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              muted 
                              playsInline 
                              loop
                              onMouseEnter={(e) => e.currentTarget.play()}
                              onMouseLeave={(e) => {
                                e.currentTarget.pause();
                                e.currentTarget.currentTime = 0;
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none z-10">
                              <Play className="w-16 h-16 text-white/90 drop-shadow-lg" fill="currentColor" />
                            </div>
                          </>
                        ) : (
                          <img 
                            src={`/${item.image}`} 
                            alt={item.name} 
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  {itemsToDisplay.length === 0 && (
                    <div className="col-span-full text-center py-10 text-bakery-dark/60">
                      Nessun prodotto presente in questa categoria.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Carousel */
              allImages.length > 0 && (
                <div className="overflow-hidden relative w-full py-4 mt-8">
                  <div className="flex gap-6 animate-scroll">
                    {[...allImages, ...allImages].map((item, index) => (
                      <div 
                        key={`${item.id}-${index}`} 
                        className="flex-none w-64 md:w-80 aspect-square rounded-xl overflow-hidden shadow-md border border-bakery-gold/10 cursor-pointer group"
                        onClick={() => setSelectedMedia({ url: `/${item.image}`, type: 'image' })}
                      >
                        <img 
                          src={`/${item.image}`} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Media Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedMedia(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-50"
            onClick={(e) => { e.stopPropagation(); setSelectedMedia(null); }}
          >
            <X className="h-10 w-10" />
          </button>
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === 'video' ? (
              <video 
                src={selectedMedia.url} 
                className="max-w-full max-h-full rounded-md shadow-2xl"
                autoPlay 
                muted
                loop
                playsInline
              />
            ) : (
              <img 
                src={selectedMedia.url} 
                alt="Immagine ingrandita" 
                className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
