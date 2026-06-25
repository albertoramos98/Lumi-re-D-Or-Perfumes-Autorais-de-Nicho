import React from 'react'

function Drawer({ product, isOpen, onClose }) {
  if (!product) return null;

  return (
    <>
      {/* Drawer Background Overlay */}
      <div 
        className={`drawer-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
        id="drawer-overlay"
      ></div>

      {/* Slide-over Drawer */}
      <div 
        className={`drawer ${isOpen ? 'active' : ''}`} 
        id="olfactory-drawer" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="drawer-perfume-title"
      >
        <button 
          className="drawer-close" 
          onClick={onClose}
          id="drawer-close-btn" 
          aria-label="Fechar gaveta"
        >
          &times;
        </button>

        <div className="drawer-content">
          <div className="drawer-header">
            <span className="drawer-tag" id="drawer-perfume-tag">{product.type}</span>
            <h2 className="drawer-title" id="drawer-perfume-title">{product.title}</h2>
          </div>
          
          <p className="drawer-desc" id="drawer-perfume-desc">
            {product.desc}
          </p>
          
          {/* Olfactory Pyramid */}
          {product.pyramid && (
            <div className="pyramid-container">
              {/* Head Notes */}
              {product.pyramid.top && (
                <div className="pyramid-level">
                  <div className="level-name">
                    <span>Notas de Topo</span>
                    <span id="drawer-level-top-time">{product.pyramid.top.time}</span>
                  </div>
                  <div className="level-notes" id="drawer-level-top-notes">{product.pyramid.top.notes}</div>
                  <div className="level-desc">{product.pyramid.top.desc}</div>
                </div>
              )}
              
              {/* Heart Notes */}
              {product.pyramid.heart && (
                <div className="pyramid-level">
                  <div className="level-name">
                    <span>Notas de Coração</span>
                    <span id="drawer-level-heart-time">{product.pyramid.heart.time}</span>
                  </div>
                  <div className="level-notes" id="drawer-level-heart-notes">{product.pyramid.heart.notes}</div>
                  <div className="level-desc">{product.pyramid.heart.desc}</div>
                </div>
              )}
              
              {/* Base Notes */}
              {product.pyramid.base && (
                <div className="pyramid-level">
                  <div className="level-name">
                    <span>Notas de Fundo</span>
                    <span id="drawer-level-base-time">{product.pyramid.base.time}</span>
                  </div>
                  <div className="level-notes" id="drawer-level-base-notes">{product.pyramid.base.notes}</div>
                  <div className="level-desc">{product.pyramid.base.desc}</div>
                </div>
              )}
            </div>
          )}
          
          {/* Raw Material Spotlight */}
          {product.ingredient && (
            <div className="drawer-texture-panel" id="drawer-ingredient-panel">
              <img 
                src={product.ingredient.img.startsWith('http') || product.ingredient.img.startsWith('/') ? product.ingredient.img : `/${product.ingredient.img}`} 
                alt={`Ingrediente Spotlight: ${product.ingredient.title}`} 
                className="drawer-texture-img" 
                id="drawer-ingredient-img" 
              />
              <div className="drawer-texture-info">
                <span className="texture-tag" id="drawer-ingredient-tag">{product.ingredient.tag}</span>
                <h4 className="texture-title" id="drawer-ingredient-title">{product.ingredient.title}</h4>
                <p className="texture-desc" id="drawer-ingredient-desc">
                  {product.ingredient.desc}
                </p>
              </div>
            </div>
          )}
          
          <button 
            className="btn-luxury" 
            style={{ width: '100%', textAlign: 'center' }} 
            onClick={() => {
              alert('Sua solicitação de amostra foi registrada no atelier. Entraremos em contato para confirmar o endereço de entrega.');
              onClose();
            }}
            id="btn-drawer-experience"
          >
            Agendar Experiência Privada
          </button>
        </div>
      </div>
    </>
  )
}

export default Drawer;
