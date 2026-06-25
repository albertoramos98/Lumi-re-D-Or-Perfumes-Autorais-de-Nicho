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
            "O perfume artesanal é a alquimia da memória. Ele evoca, traduz e eterniza as maiores assinaturas olfativas do mundo sob uma perspectiva íntima e exclusiva."
          </blockquote>
          <p className="narrative-text">
            Na Lumière D'Or, unimos a sofisticação das estruturas olfativas mais aclamadas do mundo à pureza do trabalho inteiramente feito à mão. Acreditamos que a perfumaria fina deve ser uma experiência rica e acessível, servindo como uma extensão viva de sua identidade em cada detalhe.
          </p>
          <p className="narrative-text">
            Nossos blends são elaborados com óleos essenciais selecionados e acordes importados de altíssima fidelidade. Cada lote passa por um rigoroso processo de maturação e maceração lenta em nosso atelier, permitindo que as notas alcancem sua máxima evolução na pele, garantindo um rastro elegante e uma fixação excepcional superior a 12 horas.
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
