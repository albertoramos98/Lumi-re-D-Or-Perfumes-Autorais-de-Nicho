import React, { useState, useEffect } from 'react'

function ScentMatcher({ products, onExplore }) {
  const [selectedFamily, setSelectedFamily] = useState('woody');
  const [intensity, setIntensity] = useState(2); // 1 to 3
  const [matchedProduct, setMatchedProduct] = useState(null);

  // Re-calculate match whenever family, intensity, or products array changes
  useEffect(() => {
    if (!products || products.length === 0) {
      setMatchedProduct(null);
      return;
    }

    // 1. Filter by family first
    const familyMatches = products.filter(p => p.family === selectedFamily);

    let match = null;

    if (familyMatches.length > 0) {
      // Find the family match with the closest intensity
      match = familyMatches.reduce((prev, curr) => {
        const prevDiff = Math.abs(prev.intensity - intensity);
        const currDiff = Math.abs(curr.intensity - intensity);
        return currDiff < prevDiff ? curr : prev;
      });
    } else {
      // Fallback: find the absolute closest intensity across all products
      match = products.reduce((prev, curr) => {
        const prevDiff = Math.abs(prev.intensity - intensity);
        const currDiff = Math.abs(curr.intensity - intensity);
        return currDiff < prevDiff ? curr : prev;
      });
    }

    setMatchedProduct(match);
  }, [selectedFamily, intensity, products]);

  const getIntensityLabel = (value) => {
    if (value === 1) return 'Intimista & Elegante';
    if (value === 3) return 'Marcante & Intenso';
    return 'Equilibrado';
  };

  return (
    <section className="matcher-section" id="explorador">
      <div className="container">
        <div className="matcher-container">
          <div className="section-header fade-up" style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <span className="section-tagline">Alquimia Pessoal</span>
            <h2 class="section-title">Encontre Sua Assinatura</h2>
            <p class="section-desc" style={{ margin: '0' }}>
              Responda às escolhas sensoriais abaixo e descubra qual criação Lumière D'Or se fundirá harmoniosamente com a sua presença.
            </p>
          </div>
          
          <div className="matcher-grid">
            {/* Questions Panel */}
            <div className="matcher-questions">
              {/* Question 1: Olfactory Family */}
              <div className="matcher-group">
                <h3 className="matcher-group-title">1. Qual atmosfera sensorial mais atrai você?</h3>
                <div className="family-buttons" role="radiogroup" aria-label="Atmosfera sensorial preferida">
                  <button 
                    className={`family-btn ${selectedFamily === 'woody' ? 'active' : ''}`} 
                    onClick={() => setSelectedFamily('woody')}
                    role="radio" 
                    aria-checked={selectedFamily === 'woody'}
                    id="opt-woody"
                  >
                    <span className="family-name">Amadeirada & Especiada</span>
                    <span className="family-desc">Florestas densas, especiarias quentes, mistério e sofisticação sóbria.</span>
                  </button>
                  <button 
                    className={`family-btn ${selectedFamily === 'oriental' ? 'active' : ''}`} 
                    onClick={() => setSelectedFamily('oriental')}
                    role="radio" 
                    aria-checked={selectedFamily === 'oriental'}
                    id="opt-oriental"
                  >
                    <span className="family-name">Ambarada & Resinosa</span>
                    <span className="family-desc">Doçura licorosa, calor de resinas orientais, presença magnética e envolvente.</span>
                  </button>
                  <button 
                    className={`family-btn ${selectedFamily === 'floral' ? 'active' : ''}`} 
                    onClick={() => setSelectedFamily('floral')}
                    role="radio" 
                    aria-checked={selectedFamily === 'floral'}
                    id="opt-floral"
                  >
                    <span className="family-name">Floral Aveludada</span>
                    <span className="family-desc">Rosas noturnas, pétalas densas, sensualidade intimista e toque de veludo.</span>
                  </button>
                  <button 
                    className={`family-btn ${selectedFamily === 'fresh' ? 'active' : ''}`} 
                    onClick={() => setSelectedFamily('fresh')}
                    role="radio" 
                    aria-checked={selectedFamily === 'fresh'}
                    id="opt-fresh"
                  >
                    <span className="family-name">Cítrica Solar</span>
                    <span className="family-desc">Frescor de cascas de bergamota, brilho de raios de sol, leveza elegante.</span>
                  </button>
                </div>
              </div>
              
              {/* Question 2: Intensity Slider */}
              <div className="matcher-group">
                <h3 className="matcher-group-title">2. Qual intensidade e rastro você deseja projetar?</h3>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="1" 
                    max="3" 
                    value={intensity} 
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="luxury-slider" 
                    id="intensity-slider" 
                    aria-label="Intensidade da fragrância"
                  />
                  <div className="slider-labels">
                    <span>Intimista & Elegante</span>
                    <span>Equilibrado</span>
                    <span>Marcante & Intenso</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Result Panel */}
            <div className="matcher-result">
              {!matchedProduct ? (
                <div className="result-placeholder" id="result-placeholder">
                  <div className="result-placeholder-icon">✦</div>
                  <p class="result-placeholder-text">Sua alquimia de assinatura aparecerá aqui após selecionar suas preferências olfativas.</p>
                </div>
              ) : (
                <div className="result-card" id={`result-${matchedProduct.id}`}>
                  <img 
                    src={matchedProduct.image.startsWith('http') || matchedProduct.image.startsWith('/') ? matchedProduct.image : `/${matchedProduct.image}`} 
                    alt={`Resultado: ${matchedProduct.title}`} 
                    className="result-image" 
                  />
                  <span className="result-tag">Sua Assinatura Ideal</span>
                  <h3 className="result-title luxury-title">{matchedProduct.title}</h3>
                  <p className="result-desc">
                    {matchedProduct.desc.length > 180 ? `${matchedProduct.desc.slice(0, 180)}...` : matchedProduct.desc}
                  </p>
                  <button 
                    className="btn-luxury btn-result-details" 
                    onClick={() => onExplore(matchedProduct.id)}
                    id={`btn-result-detail-${matchedProduct.id}`}
                  >
                    Explorar Obra
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScentMatcher;
