import React, { useState, useEffect } from 'react'

function Navbar({ activeRoute, setActiveRoute }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll height to trigger glassmorphism background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (activeRoute !== 'storefront') {
      setActiveRoute('storefront');
      // Delay scrolling slightly to let the route mount
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
    <header className={isScrolled ? 'scrolled' : ''} id="main-header">
      <div className="container nav-container">
        {/* Brand Logo - click takes back to storefront home */}
        <div onClick={() => setActiveRoute('storefront')} className="nav-logo" id="header-logo-link">
          <img src="/logo.png" alt="Lumière D'Or Logo" id="logo-img" />
        </div>
        
        {/* Navigation Menu */}
        <nav>
          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`} id="nav-menu-list">
            {activeRoute === 'storefront' ? (
              <>
                <li><button onClick={(e) => handleLinkClick(e, 'hero-section')} className="nav-link">Início</button></li>
                <li><button onClick={(e) => handleLinkClick(e, 'marca')} className="nav-link">A Marca</button></li>
                <li><button onClick={(e) => handleLinkClick(e, 'mosaico')} className="nav-link">Ingredientes</button></li>
                <li><button onClick={(e) => handleLinkClick(e, 'colecao')} className="nav-link">A Coleção</button></li>
                <li><button onClick={(e) => handleLinkClick(e, 'explorador')} className="nav-link">Explorador Olfativo</button></li>
              </>
            ) : (
              <li><button onClick={() => setActiveRoute('storefront')} className="nav-link">Voltar para a Vitrine</button></li>
            )}
          </ul>
        </nav>
        
        {/* Actions button & Mobile Hamburger Toggle */}
        <div className="nav-actions">
          {activeRoute === 'storefront' ? (
            <>
              <button 
                onClick={() => setActiveRoute('admin')} 
                className="btn-minimal" 
                style={{ marginRight: '1rem', borderBottomColor: 'transparent' }}
                id="nav-to-admin-btn"
              >
                Painel Admin
              </button>
              <button className="btn-luxury" id="btn-header-experience">Agendar Atelier</button>
            </>
          ) : (
            <button className="btn-luxury" onClick={() => setActiveRoute('storefront')}>Ver Loja</button>
          )}
          
          <button 
            className="menu-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="menu-toggle-btn" 
            aria-label="Abrir menu de navegação"
          >
            <span style={{ 
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              transition: 'all 0.2s ease'
            }}></span>
            <span style={{ 
              opacity: isMobileMenuOpen ? '0' : '1',
              transition: 'all 0.2s ease'
            }}></span>
            <span style={{ 
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              transition: 'all 0.2s ease'
            }}></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
