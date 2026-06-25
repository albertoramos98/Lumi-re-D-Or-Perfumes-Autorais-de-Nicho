import React, { useState } from 'react'

function AdminDashboard({ products, setProducts }) {
  // Navigation Tabs: 'metrics', 'inventory', 'crud'
  const [activeTab, setActiveTab] = useState('metrics');

  // CRUD States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null means "creating new"
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Form Inputs State
  const [formInputs, setFormInputs] = useState({
    title: '',
    type: '',
    excerpt: '',
    desc: '',
    price: '',
    stock: '',
    sales: '0',
    family: 'woody',
    intensity: '2',
    image: 'product_lumiere.png',
    topNotes: '',
    topTime: '0m - 30m',
    topDesc: 'Abertura radiante que capta a atenção inicial.',
    heartNotes: '',
    heartTime: '30m - 4h',
    heartDesc: 'A alma da criação, dita o caráter principal na pele.',
    baseNotes: '',
    baseTime: '4h - 12h+',
    baseDesc: 'O rastro duradouro que se funde aos óleos da pele.',
    ingTitle: '',
    ingTag: 'Ingrediente Chave',
    ingDesc: '',
    ingImg: 'texture_glass.png'
  });

  // --- METRIC CALCULATIONS (DYNAMIC AGGREGATION) ---
  const totalRevenue = products.reduce((acc, p) => acc + (p.sales * p.price), 0);
  const totalSales = products.reduce((acc, p) => acc + p.sales, 0);
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0;

  // --- SVG BAR CHART CALCULATIONS (DYNAMIC RESCALING) ---
  const maxSales = products.reduce((max, p) => p.sales > max ? p.sales : max, 1);
  const barChartHeight = 180;
  const barChartWidth = 350;
  const padding = 30;

  // --- CRUD ACTIONS ---
  
  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setFormInputs({
      title: '',
      type: 'Amadeirado',
      excerpt: '',
      desc: '',
      price: '650',
      stock: '10',
      sales: '0',
      family: 'woody',
      intensity: '2',
      image: 'product_lumiere.png',
      topNotes: 'Bergamota, Lavanda',
      topTime: '0m - 30m',
      topDesc: 'Abertura fresca e estimulante.',
      heartNotes: 'Jasmin, Acorde Especiado',
      heartTime: '30m - 4h',
      heartDesc: 'Evolução sofisticada no corpo do perfume.',
      baseNotes: 'Sândalo, Cedro, Almíscar',
      baseTime: '4h - 12h+',
      baseDesc: 'Fixação marcante de longa duração.',
      ingTitle: 'Sândalo Cremoso',
      ingTag: 'Óleo Essencial Puro',
      ingDesc: 'Origem sustentável com cremosidade aromática inconfundível.',
      ingImg: 'texture_glass.png'
    });
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (product) => {
    setEditingProduct(product);
    setFormInputs({
      title: product.title,
      type: product.type,
      excerpt: product.excerpt,
      desc: product.desc,
      price: product.price.toString(),
      stock: product.stock.toString(),
      sales: product.sales.toString(),
      family: product.family,
      intensity: product.intensity.toString(),
      image: product.image,
      topNotes: product.pyramid?.top?.notes || '',
      topTime: product.pyramid?.top?.time || '0m - 30m',
      topDesc: product.pyramid?.top?.desc || '',
      heartNotes: product.pyramid?.heart?.notes || '',
      heartTime: product.pyramid?.heart?.time || '30m - 4h',
      heartDesc: product.pyramid?.heart?.desc || '',
      baseNotes: product.pyramid?.base?.notes || '',
      baseTime: product.pyramid?.base?.time || '4h - 12h+',
      baseDesc: product.pyramid?.base?.desc || '',
      ingTitle: product.ingredient?.title || '',
      ingTag: product.ingredient?.tag || 'Ingrediente Chave',
      ingDesc: product.ingredient?.desc || '',
      ingImg: product.ingredient?.img || 'texture_glass.png'
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Reconstruct product object
    const updatedProduct = {
      id: editingProduct ? editingProduct.id : formInputs.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title: formInputs.title,
      type: formInputs.type,
      excerpt: formInputs.excerpt,
      desc: formInputs.desc,
      price: parseFloat(formInputs.price) || 0,
      stock: parseInt(formInputs.stock) || 0,
      sales: parseInt(formInputs.sales) || 0,
      family: formInputs.family,
      intensity: parseInt(formInputs.intensity) || 2,
      image: formInputs.image,
      pyramid: {
        top: { notes: formInputs.topNotes, time: formInputs.topTime, desc: formInputs.topDesc },
        heart: { notes: formInputs.heartNotes, time: formInputs.heartTime, desc: formInputs.heartDesc },
        base: { notes: formInputs.baseNotes, time: formInputs.baseTime, desc: formInputs.baseDesc }
      },
      ingredient: {
        title: formInputs.ingTitle,
        tag: formInputs.ingTag,
        desc: formInputs.ingDesc,
        img: formInputs.ingImg
      }
    };

    if (editingProduct) {
      // Update
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      alert('Fragrância atualizada com sucesso no catálogo.');
    } else {
      // Create
      // Avoid duplicate IDs
      if (products.some(p => p.id === updatedProduct.id)) {
        updatedProduct.id = `${updatedProduct.id}-${Date.now().toString().slice(-4)}`;
      }
      setProducts([...products, updatedProduct]);
      alert('Nova fragrância adicionada com sucesso ao catálogo.');
    }

    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
      alert(`O perfume "${productToDelete.title}" foi removido do atelier.`);
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="admin-layout">
      <div className="container">
        
        {/* Admin Header Row */}
        <div className="admin-header-row">
          <div>
            <span className="hero-tagline" style={{ letterSpacing: '0.15em' }}>Atelier Privado</span>
            <h1 className="luxury-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Painel de Controle</h1>
          </div>
          
          <button className="btn-luxury" onClick={handleOpenAddForm}>
            Nova Fragrância
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
            onClick={() => { setActiveTab('metrics'); setIsFormOpen(false); }}
          >
            Métricas & Gráficos
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => { setActiveTab('inventory'); setIsFormOpen(false); }}
          >
            Controle de Estoque
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'crud' ? 'active' : ''}`}
            onClick={() => { setActiveTab('crud'); setIsFormOpen(false); }}
          >
            Catálogo & CRUD
          </button>
        </div>

        {/* --- FORM SECTION (OPENED VIA CRUD OVERLAY / IN-PLACE) --- */}
        {isFormOpen && (
          <div className="admin-form-card fade-up visible">
            <h2 className="form-title">
              {editingProduct ? `Editar Fragrância: ${editingProduct.title}` : 'Registrar Nova Fragrância Autoral'}
            </h2>
            
            <form className="admin-form" onSubmit={handleFormSubmit}>
              {/* Row 1: Title, Category */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nome do Perfume</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    value={formInputs.title}
                    onChange={(e) => setFormInputs({...formInputs, title: e.target.value})}
                    placeholder="Ex: Santal Impérial"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Subtítulo / Categoria Visual</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    value={formInputs.type}
                    onChange={(e) => setFormInputs({...formInputs, type: e.target.value})}
                    placeholder="Ex: Amadeirado Cremoso"
                  />
                </div>
              </div>

              {/* Row 2: Price, Stock, Sales */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Preço Unitário (R$)</label>
                  <input 
                    type="number" 
                    required 
                    className="form-input" 
                    value={formInputs.price}
                    onChange={(e) => setFormInputs({...formInputs, price: e.target.value})}
                    placeholder="Ex: 750"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Estoque Inicial (Frascos)</label>
                  <input 
                    type="number" 
                    required 
                    className="form-input" 
                    value={formInputs.stock}
                    onChange={(e) => setFormInputs({...formInputs, stock: e.target.value})}
                    placeholder="Ex: 15"
                  />
                </div>
              </div>

              {/* Row 3: Matching logic (Family & Intensity) & Image selection */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Família Olfativa (Filtro Scent Matcher)</label>
                  <select 
                    className="form-select"
                    value={formInputs.family}
                    onChange={(e) => setFormInputs({...formInputs, family: e.target.value})}
                  >
                    <option value="woody">Amadeirada & Especiada</option>
                    <option value="oriental">Ambarada & Resinosa</option>
                    <option value="floral">Floral Aveludada</option>
                    <option value="fresh">Cítrica Solar</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Intensidade / Projeção (1 a 3)</label>
                  <select 
                    className="form-select"
                    value={formInputs.intensity}
                    onChange={(e) => setFormInputs({...formInputs, intensity: e.target.value})}
                  >
                    <option value="1">Intimista & Delicado (1)</option>
                    <option value="2">Equilibrado & Elegante (2)</option>
                    <option value="3">Marcante & Intenso (3)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Mockup Image Selection */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Frasco Mockup Padrão</label>
                  <select 
                    className="form-select"
                    value={formInputs.image}
                    onChange={(e) => setFormInputs({...formInputs, image: e.target.value})}
                  >
                    <option value="product_lumiere.png">Lumière D'Or Mockup (Flagship Amber)</option>
                    <option value="product_oud.png">Oud Impérial Mockup (Deep Amber)</option>
                    <option value="product_rose.png">Rose de Nuit Mockup (Reddish Amber)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Vendas Acumuladas (Histórico)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={formInputs.sales}
                    onChange={(e) => setFormInputs({...formInputs, sales: e.target.value})}
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="form-group">
                <label className="form-label">Excertos (Resumo da Vitrine)</label>
                <input 
                  type="text" 
                  required 
                  className="form-input" 
                  value={formInputs.excerpt}
                  onChange={(e) => setFormInputs({...formInputs, excerpt: e.target.value})}
                  placeholder="Resumo de 1 a 2 linhas exibido nos cards da vitrine..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Descrição Conceitual Completa</label>
                <textarea 
                  required 
                  className="form-textarea" 
                  value={formInputs.desc}
                  onChange={(e) => setFormInputs({...formInputs, desc: e.target.value})}
                  placeholder="Descreva a jornada poética e o perfil olfativo do blend..."
                />
              </div>

              <div className="gold-line" style={{ margin: '1rem 0' }}></div>
              <h3 className="luxury-title" style={{ fontSize: '1.1rem', color: 'var(--gold-light)' }}>Pirâmide Olfativa Detalhada</h3>

              {/* Top Notes */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Notas de Topo (Ingredientes)</label>
                  <input 
                    type="text" 
                    required
                    className="form-input" 
                    value={formInputs.topNotes}
                    onChange={(e) => setFormInputs({...formInputs, topNotes: e.target.value})}
                    placeholder="Ex: Pimenta Rosa, Bergamota"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Top Notes: Tempo & Descrição</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formInputs.topDesc}
                    onChange={(e) => setFormInputs({...formInputs, topDesc: e.target.value})}
                  />
                </div>
              </div>

              {/* Heart Notes */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Notas de Coração (Ingredientes)</label>
                  <input 
                    type="text" 
                    required
                    className="form-input" 
                    value={formInputs.heartNotes}
                    onChange={(e) => setFormInputs({...formInputs, heartNotes: e.target.value})}
                    placeholder="Ex: Fava Tonka, Jasmin"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Heart Notes: Tempo & Descrição</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formInputs.heartDesc}
                    onChange={(e) => setFormInputs({...formInputs, heartDesc: e.target.value})}
                  />
                </div>
              </div>

              {/* Base Notes */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Notas de Fundo (Ingredientes)</label>
                  <input 
                    type="text" 
                    required
                    className="form-input" 
                    value={formInputs.baseNotes}
                    onChange={(e) => setFormInputs({...formInputs, baseNotes: e.target.value})}
                    placeholder="Ex: Sândalo de Mysore, Tabaco"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Base Notes: Tempo & Descrição</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formInputs.baseDesc}
                    onChange={(e) => setFormInputs({...formInputs, baseDesc: e.target.value})}
                  />
                </div>
              </div>

              <div className="gold-line" style={{ margin: '1rem 0' }}></div>
              <h3 className="luxury-title" style={{ fontSize: '1.1rem', color: 'var(--gold-light)' }}>Destaque de Matéria-Prima (Spotlight)</h3>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Ingrediente Principal</label>
                  <input 
                    type="text" 
                    required
                    className="form-input" 
                    value={formInputs.ingTitle}
                    onChange={(e) => setFormInputs({...formInputs, ingTitle: e.target.value})}
                    placeholder="Ex: Sândalo de Mysore"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Selo / Tag do Ingrediente</label>
                  <input 
                    type="text" 
                    required
                    className="form-input" 
                    value={formInputs.ingTag}
                    onChange={(e) => setFormInputs({...formInputs, ingTag: e.target.value})}
                    placeholder="Ex: Madeira Sagrada"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Textura Macro Associada</label>
                  <select 
                    className="form-select"
                    value={formInputs.ingImg}
                    onChange={(e) => setFormInputs({...formInputs, ingImg: e.target.value})}
                  >
                    <option value="texture_glass.png">Vidro Granulado Texture</option>
                    <option value="texture_tonka.png">Fava Tonka Texture</option>
                    <option value="texture_rose.png">Pétala de Rosa Texture</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Descrição Conceitual do Ingrediente</label>
                  <input 
                    type="text" 
                    required
                    className="form-input" 
                    value={formInputs.ingDesc}
                    onChange={(e) => setFormInputs({...formInputs, ingDesc: e.target.value})}
                    placeholder="Ex: Colhido de forma ética nas florestas da Índia..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-form-cancel"
                  onClick={() => { setIsFormOpen(false); setEditingProduct(null); }}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-luxury">
                  {editingProduct ? 'Salvar Alterações' : 'Adicionar ao Catálogo'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- TAB 1: METRIC PANEL & SVG CHARTS --- */}
        {!isFormOpen && activeTab === 'metrics' && (
          <div className="fade-up visible">
            {/* Metrics Cards Grid */}
            <div className="metrics-grid">
              <div className="admin-card">
                <div className="metric-label">
                  <span>Faturamento Total</span>
                  <span style={{ fontSize: '1rem', color: 'var(--gold-primary)' }}>✦</span>
                </div>
                <div className="metric-value">
                  {`R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                </div>
                <div className="metric-trend trend-up">
                  <span>▲ +12.4%</span>
                  <span style={{ color: 'var(--text-muted)' }}>vs mês anterior</span>
                </div>
              </div>

              <div className="admin-card">
                <div className="metric-label">
                  <span>Fragrâncias Vendidas</span>
                  <span style={{ fontSize: '1rem', color: 'var(--gold-primary)' }}>✦</span>
                </div>
                <div className="metric-value">{totalSales}</div>
                <div className="metric-trend trend-up">
                  <span>▲ +8.2%</span>
                  <span style={{ color: 'var(--text-muted)' }}>unidades físicas</span>
                </div>
              </div>

              <div className="admin-card">
                <div className="metric-label">
                  <span>Ticket Médio</span>
                  <span style={{ fontSize: '1rem', color: 'var(--gold-primary)' }}>✦</span>
                </div>
                <div className="metric-value">
                  {`R$ ${averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                </div>
                <div className="metric-trend trend-up">
                  <span>▲ +4.1%</span>
                  <span style={{ color: 'var(--text-muted)' }}>por blend autoral</span>
                </div>
              </div>

              <div className="admin-card">
                <div className="metric-label">
                  <span>Estoque no Atelier</span>
                  <span style={{ fontSize: '1rem', color: 'var(--gold-primary)' }}>✦</span>
                </div>
                <div className="metric-value">{totalStock}</div>
                <div className="metric-trend" style={{ color: totalStock < 10 ? '#f44336' : 'var(--gold-light)' }}>
                  <span>{totalStock < 10 ? '● Estoque Geral Baixo' : '● Nível Saudável'}</span>
                </div>
              </div>
            </div>

            {/* SVG Charts Section */}
            <div className="charts-grid">
              {/* Area Chart: Revenue Trend */}
              <div className="chart-card">
                <h3 className="chart-card-title">
                  <span>✦</span> Trajetória de Faturamento Semanal
                </h3>
                
                <div className="chart-container">
                  <svg className="chart-svg" viewBox="0 0 350 180">
                    <defs>
                      <linearGradient id="gold-gradient-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--gold-primary)" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="var(--gold-primary)" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="gold-line-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="var(--gold-champagne)"/>
                        <stop offset="50%" stopColor="var(--gold-primary)"/>
                        <stop offset="100%" stopColor="var(--gold-dark)"/>
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="30" y1="30" x2="330" y2="30" className="chart-grid-line" />
                    <line x1="30" y1="70" x2="330" y2="70" className="chart-grid-line" />
                    <line x1="30" y1="110" x2="330" y2="110" className="chart-grid-line" />
                    <line x1="30" y1="150" x2="330" y2="150" className="chart-grid-line" />

                    {/* Chart Area */}
                    <path 
                      d="M 30 150 L 30 130 L 90 100 L 150 115 L 210 80 L 270 50 L 330 35 L 330 150 Z" 
                      className="chart-area" 
                    />

                    {/* Chart Line */}
                    <path 
                      d="M 30 130 L 90 100 L 150 115 L 210 80 L 270 50 L 330 35" 
                      className="chart-line"
                      stroke="url(#gold-line-grad)"
                    />

                    {/* Vertices points */}
                    <circle cx="30" cy="130" r="4" className="chart-point" />
                    <circle cx="90" cy="100" r="4" className="chart-point" />
                    <circle cx="150" cy="115" r="4" className="chart-point" />
                    <circle cx="210" cy="80" r="4" className="chart-point" />
                    <circle cx="270" cy="50" r="4" className="chart-point" />
                    <circle cx="330" cy="35" r="4" className="chart-point" />

                    {/* Axes */}
                    <line x1="30" y1="150" x2="330" y2="150" className="chart-axis" />
                    <line x1="30" y1="15" x2="30" y2="150" className="chart-axis" />

                    {/* Labels X */}
                    <text x="30" y="165" className="chart-text" textAnchor="middle">Sem 1</text>
                    <text x="90" y="165" className="chart-text" textAnchor="middle">Sem 2</text>
                    <text x="150" y="165" className="chart-text" textAnchor="middle">Sem 3</text>
                    <text x="210" y="165" className="chart-text" textAnchor="middle">Sem 4</text>
                    <text x="270" y="165" className="chart-text" textAnchor="middle">Sem 5</text>
                    <text x="330" y="165" className="chart-text" textAnchor="middle">Hoje</text>

                    {/* Labels Y */}
                    <text x="22" y="153" className="chart-text" textAnchor="end">0</text>
                    <text x="22" y="113" className="chart-text" textAnchor="end">10k</text>
                    <text x="22" y="73" className="chart-text" textAnchor="end">20k</text>
                    <text x="22" y="33" className="chart-text" textAnchor="end">30k</text>
                  </svg>
                </div>
              </div>

              {/* Bar Chart: Sales volume per perfume (FULLY DYNAMIC!) */}
              <div className="chart-card">
                <h3 className="chart-card-title">
                  <span>✦</span> Volume de Vendas por Fragrância
                </h3>
                
                <div className="chart-container">
                  {products.length === 0 ? (
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      Nenhum produto cadastrado para exibir gráficos.
                    </div>
                  ) : (
                    <svg className="chart-svg" viewBox={`0 0 ${barChartWidth} ${barChartHeight}`}>
                      <defs>
                        <linearGradient id="gold-gradient-bar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--gold-champagne)" />
                          <stop offset="100%" stopColor="var(--gold-dark)" />
                        </linearGradient>
                      </defs>

                      {/* X-axis */}
                      <line 
                        x1={padding} 
                        y1={barChartHeight - padding} 
                        x2={barChartWidth - padding} 
                        y2={barChartHeight - padding} 
                        className="chart-axis" 
                      />

                      {products.map((product, idx) => {
                        const barWidth = 35;
                        const spacing = (barChartWidth - padding * 2) / products.length;
                        const x = padding + idx * spacing + (spacing - barWidth) / 2;
                        
                        // Scale bar height based on maxSales
                        const barHeight = (product.sales / maxSales) * (barChartHeight - padding * 2 - 20);
                        const y = barChartHeight - padding - barHeight;

                        return (
                          <g key={product.id}>
                            {/* Bar */}
                            <rect 
                              x={x} 
                              y={y} 
                              width={barWidth} 
                              height={barHeight} 
                              className="chart-bar" 
                              rx="2"
                            />
                            
                            {/* Value label on top of bar */}
                            <text 
                              x={x + barWidth / 2} 
                              y={y - 6} 
                              className="chart-text" 
                              textAnchor="middle" 
                              style={{ fill: 'var(--text-primary)', fontWeight: 'bold' }}
                            >
                              {product.sales}
                            </text>
                            
                            {/* Product label below chart */}
                            <text 
                              x={x + barWidth / 2} 
                              y={barChartHeight - 12} 
                              className="chart-text" 
                              textAnchor="middle"
                            >
                              {product.title.split(' ')[0]} {/* first word to fit */}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: INVENTORY MANAGEMENT TABLE --- */}
        {!isFormOpen && activeTab === 'inventory' && (
          <div className="crud-container fade-up visible">
            <div className="crud-header-row">
              <h2 className="luxury-title" style={{ fontSize: '1.5rem' }}>Status de Inventário & Vendas</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {products.length} fragrâncias catalogadas
              </span>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="table-th">Produto</th>
                    <th className="table-th">Preço Unitário</th>
                    <th className="table-th">Estoque Físico</th>
                    <th className="table-th">Vendas Acumuladas</th>
                    <th className="table-th">Ações de Ajuste</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="table-td" style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                        Nenhuma fragrância cadastrada no momento. Clique em "Nova Fragrância" para iniciar.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => {
                      const isOutOfStock = product.stock === 0;
                      const isLowStock = product.stock > 0 && product.stock < 5;
                      
                      let stockClass = 'stock-normal';
                      let stockText = 'Estoque Saudável';
                      
                      if (isOutOfStock) {
                        stockClass = 'stock-empty';
                        stockText = 'Esgotado (0)';
                      } else if (isLowStock) {
                        stockClass = 'stock-low';
                        stockText = `Crítico (${product.stock})`;
                      } else {
                        stockText = `Disponível (${product.stock})`;
                      }

                      return (
                        <tr className="table-tr" key={product.id}>
                          <td className="table-td">
                            <div className="table-product-cell">
                              <img 
                                src={product.image.startsWith('http') || product.image.startsWith('/') ? product.image : `/${product.image}`} 
                                alt={product.title} 
                                className="table-product-img" 
                              />
                              <div>
                                <span className="table-product-name">{product.title}</span>
                                <span className="table-product-cat">{product.type}</span>
                              </div>
                            </div>
                          </td>
                          <td className="table-td" style={{ fontWeight: '500' }}>
                            {`R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                          </td>
                          <td className="table-td">
                            <span className={`stock-badge ${stockClass}`}>
                              {stockText}
                            </span>
                          </td>
                          <td className="table-td" style={{ fontWeight: '500' }}>
                            {product.sales} frascos
                          </td>
                          <td className="table-td">
                            <div className="table-actions">
                              <button 
                                className="btn-table-action action-edit" 
                                onClick={() => handleOpenEditForm(product)}
                                title="Editar Produto"
                              >
                                ✍
                              </button>
                              <button 
                                className="btn-table-action action-delete" 
                                onClick={() => handleDeleteClick(product)}
                                title="Remover Produto"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 3: CRUD CATALOGUE & CRUD ACTIONS --- */}
        {!isFormOpen && activeTab === 'crud' && (
          <div className="crud-container fade-up visible">
            <div className="crud-header-row">
              <h2 className="luxury-title" style={{ fontSize: '1.5rem' }}>Gerenciar Catálogo Exclusivo</h2>
              <button className="btn-luxury" onClick={handleOpenAddForm}>
                Nova Fragrância
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="table-th">Fragrância</th>
                    <th className="table-th">Família Olfativa</th>
                    <th className="table-th">Notas Principais</th>
                    <th className="table-th">Intensidade</th>
                    <th className="table-th">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="table-td" style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                        Catálogo vazio. Adicione fragrâncias autorais para exibi-las na vitrine da loja.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => {
                      const getFamilyLabel = (fam) => {
                        if (fam === 'woody') return 'Amadeirada & Especiada';
                        if (fam === 'oriental') return 'Ambarada & Resinosa';
                        if (fam === 'floral') return 'Floral Aveludada';
                        if (fam === 'fresh') return 'Cítrica Solar';
                        return fam;
                      };

                      return (
                        <tr className="table-tr" key={product.id}>
                          <td className="table-td">
                            <div className="table-product-cell">
                              <img 
                                src={product.image.startsWith('http') || product.image.startsWith('/') ? product.image : `/${product.image}`} 
                                alt={product.title} 
                                className="table-product-img" 
                              />
                              <div>
                                <span className="table-product-name">{product.title}</span>
                                <span className="table-product-cat">{product.type}</span>
                              </div>
                            </div>
                          </td>
                          <td className="table-td">
                            {getFamilyLabel(product.family)}
                          </td>
                          <td className="table-td" style={{ fontSize: '0.85rem', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={product.pyramid?.base?.notes}>
                            {product.pyramid?.base?.notes || 'Não cadastrada'}
                          </td>
                          <td className="table-td" style={{ fontWeight: '500' }}>
                            {product.intensity === 1 ? 'Intimista (1)' : product.intensity === 3 ? 'Intenso (3)' : 'Equilibrado (2)'}
                          </td>
                          <td className="table-td">
                            <div className="table-actions">
                              <button 
                                className="btn-table-action action-edit" 
                                onClick={() => handleOpenEditForm(product)}
                                title="Editar Detalhes"
                              >
                                ✍
                              </button>
                              <button 
                                className="btn-table-action action-delete" 
                                onClick={() => handleDeleteClick(product)}
                                title="Remover do Catálogo"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* --- CONFIRM DELETE MODAL --- */}
      <div className={`modal-overlay ${showDeleteModal ? 'active' : ''}`} id="delete-modal-overlay">
        <div className="modal-card">
          <div className="modal-icon">⚠</div>
          <h3 className="modal-title luxury-title">Confirmar Exclusão</h3>
          <p className="modal-desc">
            Você tem certeza que deseja remover o perfume <strong>{productToDelete?.title}</strong> permanentemente do catálogo? 
            Esta ação não poderá ser desfeita e ele deixará de aparecer na vitrine e no explorador de assinaturas.
          </p>
          <div className="modal-actions">
            <button 
              className="btn-form-cancel" 
              onClick={() => { setShowDeleteModal(false); setProductToDelete(null); }}
              id="btn-delete-cancel"
            >
              Cancelar
            </button>
            <button 
              className="btn-luxury btn-danger" 
              onClick={confirmDelete}
              id="btn-delete-confirm"
            >
              Excluir Perfume
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard;
