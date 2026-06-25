import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Textures from './components/Textures.jsx'
import Catalog from './components/Catalog.jsx'
import Philosophy from './components/Philosophy.jsx'
import ScentMatcher from './components/ScentMatcher.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import Drawer from './components/Drawer.jsx'
import Footer from './components/Footer.jsx'

// --- DEFAULT PRODUCT SEED DATA ---
const defaultProducts = [
  {
    id: 'lumiere',
    title: 'Lumière d\'Or',
    type: 'Amadeirado Ambarado',
    excerpt: 'Um blend solar e majestoso que abre com a vibração da bergamota italiana, evoluindo para um corpo refinado de sândalo de Mysore e a doçura aveludada da baunilha da Polinésia Francesa.',
    desc: 'Um blend solar e majestoso que esculpe o ar com sua aura de ouro líquido. Abertura cítrica radiante que se derrete em uma base cremosa de sândalo precioso e a baunilha mais pura do pacífico, gerando uma fusão intimista e incrivelmente duradoura com a pele.',
    price: 780,
    stock: 15,
    sales: 18,
    family: 'woody', // 'woody', 'oriental', 'floral', 'fresh'
    intensity: 2, // 1: intimate, 2: balanced, 3: intense
    image: 'product_lumiere.png',
    pyramid: {
      top: { notes: 'Bergamota Italiana, Pimenta Rosa, Néroli', time: '0m - 30m', desc: 'Abertura cítrica radiante e efervescente que capta a luz e introduz o frescor solar imediato.' },
      heart: { notes: 'Jasmin de Grasse, Fava Tonka da Polinésia', time: '30m - 4h', desc: 'A alma da criação. Um corpo floral cremoso e sutilmente amendoado que se desenvolve com o calor corporal.' },
      base: { notes: 'Sândalo de Mysore, Baunilha da Polinésia, Âmbar Cinzento', time: '4h - 12h+', desc: 'O rastro majestoso e cremoso que se funde aos óleos naturais da sua pele, oferecendo uma fixação monumental.' }
    },
    ingredient: {
      title: 'Sândalo de Mysore',
      tag: 'Madeira Sagrada',
      desc: 'Colhido de forma ética e sustentável na Índia, este óleo essencial confere uma cremosidade amadeirada leitosa e reconfortante única.',
      img: 'texture_glass.png'
    }
  },
  {
    id: 'oud',
    title: 'Oud Impérial',
    type: 'Especiado Enigmático',
    excerpt: 'Uma criação densa e enigmática que combina o calor profundo e terroso de folhas de tabaco cubano curadas ao sol, envolvidas na riqueza resinosa do oud de Assam e na cremosidade da fava tonka.',
    desc: 'Uma obra-prima densa, escura e extremamente misteriosa. Criada para personalidades magnéticas, combina o calor terroso das folhas de tabaco cubano curadas ao sol com a riqueza resinosa ancestral do oud de Assam, criando uma aura de poder inquestionável.',
    price: 840,
    stock: 8,
    sales: 12,
    family: 'woody',
    intensity: 3,
    image: 'product_oud.png',
    pyramid: {
      top: { notes: 'Cardamomo Preto, Mandarina, Canela do Ceilão', time: '0m - 30m', desc: 'Uma explosão de especiarias escuras e cítricos misteriosos que anunciam uma presença enigmática.' },
      heart: { notes: 'Folha de Tabaco Cubano, Mirra da Somália, Cedro do Atlas', time: '30m - 4h', desc: 'Um corpo quente, fumegante e resinoso que evoca bibliotecas antigas, fumo nobre e resinas sagradas.' },
      base: { notes: 'Oud de Assam, Fava Tonka Torrada, Couro Negro', time: '4h - 12h+', desc: 'O rastro mais profundo e indestrutível. Uma base de resina de oud crua, fava tonka e couro que fixa na pele e na memória.' }
    },
    ingredient: {
      title: 'Fava Tonka Torrada',
      tag: 'Semente Sagrada',
      desc: 'Sementes escuras e texturizadas da Polinésia que, quando torradas, liberam nuances de amêndoa, baunilha defumada e caramelo escuro.',
      img: 'texture_tonka.png'
    }
  },
  {
    id: 'rose',
    title: 'Rose de Nuit',
    type: 'Floral Oriental',
    excerpt: 'Uma rosa escura de Grasse, colhida no crepúsculo e lapidada com a doçura misteriosa e licorosa do benjoim do Laos e o calor sensual do patchouli da Indonésia.',
    desc: 'A expressão máxima da sensualidade noturna. Uma rosa de Grasse colhida no crepúsculo, quando suas pétalas aveludadas estão saturadas de perfume. Envolta na doçura balsâmica e licorosa do benjoim e na vibração quente e terrosa do patchouli.',
    price: 790,
    stock: 2,
    sales: 22,
    family: 'floral',
    intensity: 1,
    image: 'product_rose.png',
    pyramid: {
      top: { notes: 'Pimenta Preta, Framboesa Silvestre, Açafrão', time: '0m - 30m', desc: 'Entrada picante e frutada escura, um toque licoroso que prepara a pele para a rainha das flores.' },
      heart: { notes: 'Rosa de Grasse, Rosa Búlgara, Incenso de Olíbano', time: '30m - 4h', desc: 'O coração pulsa com um buquê de rosas vermelhas aveludadas e densas, aquecidas por fumaça de incenso sagrado.' },
      base: { notes: 'Patchouli da Indonésia, Benjoim do Laos, Almíscar Negro', time: '4h - 12h+', desc: 'A assinatura final. Uma base rica de patchouli terroso e benjoim doce que envelopa as rosas em um abraço sensual eterno.' }
    },
    ingredient: {
      title: 'Rosa de Grasse',
      tag: 'Pétalas de Veludo',
      desc: 'Pétalas de rosa centifólia extremamente densas e ricas em óleos essenciais, conferindo um aroma floral denso, carnal e eterno.',
      img: 'texture_rose.png'
    }
  }
];

function App() {
  // Central State for Products
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('lumieredor_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  // Route state ('storefront' or 'admin')
  const [activeRoute, setActiveRoute] = useState('storefront');

  // Drawer states
  const [activeProduct, setActiveProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Save products to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('lumieredor_products', JSON.stringify(products));
  }, [products]);

  // Smooth scroll back to top when switching routes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeRoute]);

  // Intersection Observer for scroll fade-in animations in React
  useEffect(() => {
    if (activeRoute !== 'storefront') return;

    // Small delay to ensure DOM has rendered
    const timer = setTimeout(() => {
      const fadeElements = document.querySelectorAll('.fade-up');
      const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate once
          }
        });
      }, observerOptions);

      fadeElements.forEach(el => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [activeRoute, products]); // Re-run when route or products change

  const openDrawer = (perfumeId) => {
    const targetProduct = products.find(p => p.id === perfumeId);
    if (targetProduct) {
      setActiveProduct(targetProduct);
      setIsDrawerOpen(true);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="app-root">
      {/* HEADER NAVBAR */}
      <Navbar activeRoute={activeRoute} setActiveRoute={setActiveRoute} />

      {/* STATE-BASED ROUTER */}
      {activeRoute === 'storefront' ? (
        <>
          <Hero />
          <Textures />
          <Catalog products={products} onExplore={openDrawer} />
          <Philosophy />
          <ScentMatcher products={products} onExplore={openDrawer} />
        </>
      ) : (
        <AdminDashboard products={products} setProducts={setProducts} />
      )}

      {/* FOOTER */}
      <Footer activeRoute={activeRoute} setActiveRoute={setActiveRoute} />

      {/* DYNAMIC SENSORY DRAWER PANEL */}
      <Drawer product={activeProduct} isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  )
}

export default App;
