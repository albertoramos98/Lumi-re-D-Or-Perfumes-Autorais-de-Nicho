import React from 'react'

function Textures() {
  const handleManifestoClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('marca');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="textures-section" id="mosaico">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tagline">Matérias-Primas Raras</span>
          <h2 class="section-title">O Mosaico Sensorial</h2>
          <p class="section-desc">
            A perfumaria autoral exige ingredientes colhidos em sua melhor origem geográfica. Explore a tridimensionalidade física e as texturas ricas que compõem a alma de nossas criações.
          </p>
        </div>
        
        <div className="textures-grid">
          {/* Text Intro Card */}
          <div className="grid-item item-text-1 fade-up">
            <h3 className="text-item-title luxury-title">A Matéria e o Espírito</h3>
            <p className="text-item-desc">
              Para nós, o perfume transcende o aroma. É a lapidação granulada do frasco sob os dedos, o toque aveludado de uma pétala de rosa, a doçura resinosa e rugosa de uma fava de tonka. Uma jornada tátil que começa no toque e termina na alma.
            </p>
            <div>
              <a href="#marca" onClick={handleManifestoClick} className="btn-minimal" id="btn-read-manifesto">
                Ler Nosso Manifesto
              </a>
            </div>
          </div>
          
          {/* Glass Texture Card */}
          <div className="grid-item item-img-glass fade-up">
            <img src="/texture_glass.png" alt="Textura de vidro granulado de luxo Lumière D'Or" className="grid-item-img" />
            <div className="grid-overlay"></div>
            <div className="grid-content">
              <span className="grid-item-tag">Frascaria de Luxo</span>
              <h4 className="grid-item-title luxury-title">Vidro Granulado</h4>
              <p className="grid-item-desc">
                Frascos de alta gramatura com superfícies lapidadas artesanalmente que refratam a luz âmbar e protegem a integridade física de nossas essências puras.
              </p>
            </div>
          </div>
          
          {/* Tonka Bean Texture Card */}
          <div className="grid-item item-img-tonka fade-up">
            <img src="/texture_tonka.png" alt="Favas de tonka escuras e texturizadas com partículas douradas" className="grid-item-img" />
            <div className="grid-overlay"></div>
            <div className="grid-content">
              <span className="grid-item-tag">Calor e Profundidade</span>
              <h4 className="grid-item-title luxury-title">Fava Tonka da Polinésia</h4>
              <p className="grid-item-desc">
                Sementes escuras e texturizadas que revelam um aroma amendoado e resinoso quente, trazendo uma doçura sofisticada e magnética aos nossos fundos amadeirados.
              </p>
            </div>
          </div>
          
          {/* Rose Petal Texture Card */}
          <div className="grid-item item-img-rose fade-up">
            <img src="/texture_rose.png" alt="Pétala de rosa vermelha aveludada com gotas de orvalho" className="grid-item-img" />
            <div className="grid-overlay"></div>
            <div className="grid-content">
              <span className="grid-item-tag">Sofisticação Botânica</span>
              <h4 className="grid-item-title luxury-title">Pétala de Rosa de Grasse</h4>
              <p className="grid-item-desc">
                A maciez aveludada e misteriosa da rosa mais escura, colhida manualmente no primeiro orvalho da manhã para reter sua vibração natural e sensual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Textures;
