// === DIPLOMATIC — App + Tweaks ===
const { useState } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "balanced",
  "servicesVariant": "cards",
  "sectionOrder": "framework",
  "ctaStyle": "standout",
  "accent": "#2D7DD2",
  "showFabWhatsapp": true,
  "showClientBand": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Live-apply accent color to CSS variable
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
  }, [t.accent]);

  // Stand-out CTA mode
  React.useEffect(() => {
    document.documentElement.dataset.cta = t.ctaStyle;
  }, [t.ctaStyle]);

  React.useEffect(() => {
    if (!window.location.hash) return;
    requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    });
  }, []);

  // Two narrative orders. 'framework' = Hero → Proof → About → Diff → Services
  // → IMDI (lead magnet) → Testimonios → CTA. 'brief' = the original brief
  // order. Reordering instead of forking lets us A/B the homepage arc.
  const sections = t.sectionOrder === 'brief'
    ? ['hero','band','proveedor','banners','services','testi','about','values','proceso','cta','team']
    : ['hero','band','proveedor','banners','about','values','proceso','services','testi','cta','team'];

  const renderSection = (id) => {
    switch (id) {
      case 'hero':     return <Hero key={id} heroVariant={t.heroVariant} />;
      case 'proveedor': return <MoreThanProvider key={id} />;
      case 'banners':  return <BannerCarousel key={id} />;
      case 'band':     return t.showClientBand ? <ClientBand key={id} /> : null;
      case 'about':    return <About key={id} compact={t.sectionOrder === 'framework'} />;
      case 'proceso':  return <Proceso key={id} />;
      case 'values':   return <ValuesTicker key={id} />;
      case 'services': return <Services key={id} servicesVariant={t.servicesVariant} />;
      case 'galeria':  return <Gallery key={id} />;
      case 'testi':    return <Testimonials key={id} />;
      case 'cta':      return <FinalCTA key={id} />;
      case 'team':     return <Team key={id} />;
      default: return null;
    }
  };

  return (
    <div data-screen-label="Home · diplomatic.cl">
      <Header />
      <main>
        {sections.map(renderSection)}
      </main>
      <Footer />
      {t.showFabWhatsapp && <FabWhatsapp />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Estructura">
          <TweakRadio
            label="Orden de scroll"
            value={t.sectionOrder}
            onChange={v => setTweak('sectionOrder', v)}
            options={[
              {value: 'framework', label: 'Framework'},
              {value: 'brief',     label: 'Brief'},
            ]}
          />
        </TweakSection>

        <TweakSection label="Hero">
          <TweakRadio
            label="Mensaje del H1"
            value={t.heroVariant}
            onChange={v => setTweak('heroVariant', v)}
            options={[
              {value: 'balanced',  label: 'Equilibrado'},
              {value: 'invisible', label: 'Manifiesto'},
              {value: 'specific',  label: 'Específico'},
            ]}
          />
          <TweakRadio
            label="CTA del hero"
            value={t.ctaStyle}
            onChange={v => setTweak('ctaStyle', v)}
            options={[
              {value: 'standout', label: 'Stand-out'},
              {value: 'subtle',   label: 'Sobrio'},
            ]}
          />
        </TweakSection>

        <TweakSection label="Servicios">
          <TweakRadio
            label="Layout"
            value={t.servicesVariant}
            onChange={v => setTweak('servicesVariant', v)}
            options={[
              {value: 'cards', label: 'Grid 2+3'},
              {value: 'list',  label: 'Lista índice'},
            ]}
          />
        </TweakSection>

        <TweakSection label="Marca">
          <TweakColor
            label="Color de acento"
            value={t.accent}
            onChange={v => setTweak('accent', v)}
            options={['#2D7DD2', '#1A3A6B', '#0EA5A1', '#C68B3C']}
          />
        </TweakSection>

        <TweakSection label="Componentes">
          <TweakToggle
            label="Banda de clientes"
            value={t.showClientBand}
            onChange={v => setTweak('showClientBand', v)}
          />
          <TweakToggle
            label="WhatsApp flotante"
            value={t.showFabWhatsapp}
            onChange={v => setTweak('showFabWhatsapp', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
