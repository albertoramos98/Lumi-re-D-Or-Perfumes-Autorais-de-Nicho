import React from 'react'

function Hero() {
  const handleDiscoverClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('colecao');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero-section">
      <div className="container hero-grid">
        <div className="hero-content fade-up visible">
          <span className="hero-tagline">Lumière D'Or</span>
          <h1 className="hero-title">
            Perfumes Autorais <span>Criados para Marcar</span>
          </h1>
          <p class="hero-desc">
            Nascida da alta perfumaria de nicho, a Lumière D'Or cria experiências tridimensionais esculpidas como joias líquidas. Cada fragrância é um blend complexo de ingredientes raros, desenhado para se fundir à pele e revelar uma assinatura olfativa única e inesquecível.
          </p>
          <a href="#colecao" onClick={handleDiscoverClick} className="btn-luxury" id="btn-hero-discover">
            Descobrir Coleção
          </a>
        </div>
        <div className="hero-image-wrapper">
          <div className="hero-image-glow"></div>
          <img 
            src="/product_lumiere.png" 
            alt="Frasco de Perfume de Luxo Lumière D'Or" 
            className="hero-image" 
            id="hero-product-img" 
          />
        </div>
      </div>
    </section>
  )
}

export default Hero;
