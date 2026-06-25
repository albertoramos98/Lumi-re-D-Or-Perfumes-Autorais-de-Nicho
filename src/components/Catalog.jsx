import React from 'react'

function Catalog({ products, onExplore }) {
  return (
    <section className="collection-section" id="colecao">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tagline">Coleção de Assinatura</span>
          <h2 class="section-title">Nossas Joias Líquidas</h2>
          <p class="section-desc">
            Fragrâncias complexas e tridimensionais, criadas para se tornarem a sua assinatura olfativa definitiva. Sem atalhos comerciais, sem cópias industriais. Pura arte líquida.
          </p>
        </div>
        
        <div className="products-grid">
          {products.map((product) => {
            const isOutOfStock = product.stock === 0;
            const isLowStock = product.stock > 0 && product.stock < 5;

            return (
              <article className="product-card fade-up" id={`card-${product.id}`} key={product.id}>
                {/* Dynamic Stock Badges */}
                {isOutOfStock && (
                  <div className="product-badge-outofstock">Esgotado</div>
                )}
                {!isOutOfStock && isLowStock && (
                  <div className="product-badge-lowstock">Últimas Unidades</div>
                )}

                <div className="product-image-container">
                  <div className="product-card-glow"></div>
                  <img 
                    src={product.image.startsWith('http') || product.image.startsWith('/') ? product.image : `/${product.image}`} 
                    alt={`Frasco ${product.title}`} 
                    className="product-card-img" 
                  />
                </div>
                
                <div className="product-info">
                  <span className="product-type">{product.type}</span>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-excerpt">{product.excerpt}</p>
                  
                  <div className="product-actions">
                    <span className="product-price">
                      {typeof product.price === 'number' 
                        ? `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
                        : product.price
                      }
                    </span>
                    <button 
                      className="btn-minimal btn-explore-perfume" 
                      onClick={() => onExplore(product.id)}
                      id={`btn-explore-${product.id}`}
                    >
                      Explorar Perfil Olfativo
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default Catalog;
