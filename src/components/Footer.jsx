import React from 'react'

function Footer({ activeRoute, setActiveRoute }) {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    if (activeRoute !== 'storefront') {
      setActiveRoute('storefront');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <div className="container footer-grid">
        {/* Brand Section */}
        <div className="footer-brand">
          <img src="/logo.png" alt="Lumière D'Or" className="footer-logo" id="footer-logo-img" />
          <span className="footer-brand-tag">Alta Perfumaria Autoral</span>
          <p className="footer-brand-desc">
            Experiências olfativas de nicho baseadas em pureza botânica, frascaria lapidada e a alma do design clássico contemporâneo.
          </p>
        </div>
        
        {/* Navigation Links */}
        <div>
          <h3 className="footer-title">Navegação</h3>
          <ul className="footer-links" id="footer-nav-links">
            {activeRoute === 'storefront' ? (
              <>
                <li><button onClick={(e) => handleLinkClick(e, 'hero-section')} className="footer-link">Início</button></li>
                <li><button onClick={(e) => handleLinkClick(e, 'marca')} className="footer-link">A Marca</button></li>
                <li><button onClick={(e) => handleLinkClick(e, 'mosaico')} className="footer-link">Ingredientes</button></li>
                <li><button onClick={(e) => handleLinkClick(e, 'colecao')} className="footer-link">A Coleção</button></li>
                <li><button onClick={(e) => handleLinkClick(e, 'explorador')} className="footer-link">Explorador Olfativo</button></li>
              </>
            ) : (
              <>
                <li><button onClick={() => setActiveRoute('storefront')} className="footer-link">Voltar para a Vitrine</button></li>
                <li><button onClick={() => setActiveRoute('admin')} className="footer-link">Painel Admin</button></li>
              </>
            )}
          </ul>
        </div>
        
        {/* Atelier & Contact Info */}
        <div>
          <h3 className="footer-title">Atelier Privado</h3>
          <div className="footer-contact">
            <span>
              <strong>Endereço:</strong><br />
              Av. da Alta Costura, 1050<br />
              Jardins, São Paulo - SP
            </span>
            <span>
              <strong>Atendimento:</strong><br />
              Exclusivamente sob agendamento prévio.
            </span>
            <span>
              <strong>Contato:</strong><br />
              atelier@lumieredor.com.br<br />
              +55 (11) 99900-5555
            </span>
          </div>
        </div>
        
        {/* Exclusive Releases Signup */}
        <div className="footer-newsletter">
          <h3 className="footer-title">Círculo Privado</h3>
          <p className="newsletter-desc">
            Inscreva seu e-mail para receber convites para apresentações privadas e acesso antecipado a lotes limitados e numerados de nossas criações.
          </p>
          <form 
            className="newsletter-form" 
            id="newsletter-form-element" 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Seu convite foi solicitado. Entraremos em contato após análise de elegibilidade.');
              e.target.reset();
            }}
          >
            <input 
              type="email" 
              placeholder="Seu e-mail de assinatura..." 
              required 
              className="newsletter-input" 
              id="newsletter-email-input" 
              aria-label="Endereço de e-mail para newsletter"
            />
            <button type="submit" className="newsletter-submit" id="newsletter-submit-btn" aria-label="Enviar inscrição">➔</button>
          </form>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <p id="copyright-text">&copy; 2026 Lumière D'Or Perfumes. Todos os direitos reservados. Feito no Brasil.</p>
        <div className="footer-socials" id="footer-social-links">
          <a href="#" className="footer-social-link">Instagram</a>
          <a href="#" className="footer-social-link">Pinterest</a>
          <a href="#" className="footer-social-link">Journal</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
