import React from 'react'

function Philosophy() {
  const handleExperienceClick = () => {
    alert('Seu agendamento foi solicitado no atelier Lumière D\'Or. Nossa concierge entrará em contato para agendar seu horário.');
  };

  return (
    <section className="narrative-section" id="marca">
      <div className="container narrative-grid">
        <div className="narrative-logo-container fade-up">
          <div className="narrative-logo-glow"></div>
          <img src="/logo.png" alt="Monograma LD Lumière D'Or" className="narrative-logo" id="narrative-logo-img" />
        </div>
        <div className="narrative-content fade-up">
          <span className="section-tagline">Nossa Filosofia</span>
          <h2 className="section-title">A Arte do Perfume Autoral</h2>
          <blockquote className="narrative-quote">
            "O perfume de nicho não imita. Ele evoca. Ele eterniza. É a tradução líquida de quem você é."
          </blockquote>
          <p className="narrative-text">
            Na Lumière D'Or, rejeitamos atalhos comerciais e a pasteurização da perfumaria industrial. Acreditamos que o seu perfume deve ser uma extensão íntima da sua própria identidade, não um produto copiado em massa.
          </p>
          <p className="narrative-text">
            Nossos blends contêm óleos essenciais puros selecionados em pequenos produtores familiares ao redor do mundo. Cada lote é maturado e macerado lentamente em nosso atelier, permitindo que as notas olfativas se fundam de maneira orgânica, garantindo rastro elegante e fixação excepcional superior a 12 horas.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <button className="btn-luxury" onClick={handleExperienceClick} id="btn-narrative-experience">
              Agendar Experiência Olfativa
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Philosophy;
