// === DIPLOMATIC — Page sections ===

/* ---------- Logo ---------- */
const Logo = ({onDark=false}) => (
  <a href="#top" className="logo" style={onDark ? {color: '#fff'} : null} aria-label="Diplomatic Chile — Servicios de aseo industrial profesional">
    <img src="uploads/logo-gota.png" alt="" className="logo-mark-img" />
    <span className="logo-text">
      <span className="logo-name logo-name-mont">Diplomatic <span style={{opacity:0.55, fontWeight: 700}}>Chile</span></span>
      <span className="logo-tagline" style={onDark ? {color: 'rgba(255,255,255,0.55)'} : null}>Servicios de aseo industrial profesional</span>
    </span>
  </a>
);
window.Logo = Logo;

/* ---------- Header / Nav ---------- */
const NAV_LINKS = [
  {label: 'Servicios', href: '#servicios'},
  {label: 'Galería',   href: '#galeria'},
  {label: 'Clientes',  href: '#clientes'},
  {label: 'Nosotros',  href: '#nosotros'},
  {label: 'Contacto',  href: '#contacto'},
];

const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, {passive: true});
    return () => window.removeEventListener('scroll', on);
  }, []);
  React.useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header className={'site-header ' + (scrolled ? 'scrolled' : '')}>
        <div className="container nav">
          <Logo />
          <nav className="nav-links" aria-label="Principal">
            {NAV_LINKS.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <div className="nav-cta">
            <a className="nav-phone" href="tel:+56950670318" aria-label="Llamar">
              <Icon.Phone size={14}/>
              +56 9 5067 0318
            </a>
            <a className="btn btn-primary" href="#contacto">
              Cotizar
              <Icon.Arrow/>
            </a>
          </div>
          <button className="nav-burger" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Icon.Burger/>
          </button>
        </div>
      </header>

      <div className={'drawer-backdrop ' + (open ? 'open' : '')} onClick={() => setOpen(false)}></div>
      <aside className={'drawer ' + (open ? 'open' : '')} aria-hidden={!open}>
        <div className="drawer-head">
          <Logo />
          <button className="nav-burger" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <Icon.Close/>
          </button>
        </div>
        <div className="drawer-links">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
              <Icon.Arrow size={14}/>
            </a>
          ))}
        </div>
        <div className="drawer-foot">
          <a className="btn btn-secondary" href="tel:+56950670318" style={{justifyContent: 'center'}}>
            <Icon.Phone size={14}/> +56 9 5067 0318
          </a>
          <a className="btn btn-primary" href="#contacto" onClick={() => setOpen(false)} style={{justifyContent: 'center'}}>
            Cotizar <Icon.Arrow/>
          </a>
        </div>
      </aside>
    </>
  );
};
window.Header = Header;

/* ---------- Hero image carousel (fades right-side photos, masks into navy) ---------- */
const HERO_PHOTOS = [
  'uploads/foto-fachada-rappel-cielo.png',
  'uploads/foto-lobby-equipo-carro.png',
  'uploads/foto-cocina-vapor-pistola.png',
  'uploads/foto-fachada-andamio.png',
];
const HeroCarousel = () => {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % HERO_PHOTOS.length), 5200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hero-carousel" aria-hidden="true">
      {HERO_PHOTOS.map((src, idx) => (
        <img key={src} src={src} alt="" className={'hero-carousel-slide' + (idx === i ? ' active' : '')} />
      ))}
      <div className="hero-carousel-fade"></div>
    </div>
  );
};
window.HeroCarousel = HeroCarousel;

/* ---------- Hero ---------- */
const Hero = ({heroVariant='balanced'}) => {
  // Variants: 'balanced' (default), 'invisible' (manifesto), 'specific' (data-first)
  const variants = {
    balanced: {
      h1: <>Cuidamos espacios. <em>Creamos experiencias.</em></>,
      sub: 'En Diplomatic desarrollamos soluciones integrales de Facility Services y aseo industrial profesional para organizaciones que exigen altos estándares de calidad, seguridad y continuidad operacional.',
    },
    invisible: {
      h1: <>El aseo debería ser <em>invisible</em>. Si te preocupa, algo está fallando.</>,
      sub: 'Diplomatic Chile · Aseo industrial B2B desde 2017. Operación silenciosa, informes mensuales auditables, equipo formado en protocolo internacional.',
    },
    specific: {
      h1: <>Limpieza <em>auditable</em>, mes a mes.</>,
      sub: 'Cada primer día del mes recibes el IMDI: un informe interactivo con cobertura, incidencias y novedades del personal asignado. Cero zonas grises.',
    },
  };
  const v = variants[heroVariant] || variants.balanced;

  return (
    <section className="hero" id="top">
      <div className="hero-grid"></div>
      <HeroCarousel />
      <div className="container hero-inner">
        <div>
          <div className="hero-meta">
            <span className="eyebrow on-dark">Aseo industrial · B2B</span>
            <span className="mono" style={{color: 'rgba(255,255,255,0.45)'}}>Santiago · desde 2017</span>
          </div>
          <h1 className="hero-h1">{v.h1}</h1>
          <p className="hero-sub">{v.sub}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary on-dark cta-standout" href="#contacto">
              Solicitar Cotización
              <Icon.Arrow/>
            </a>
            <a className="btn btn-secondary on-dark" href="#contacto">
              Agendar una Reunión
            </a>
          </div>
        </div>
        <div className="hero-stats" aria-label="Indicadores">
          <div className="hero-stat">
            <span className="v">2017</span>
            <span className="k">Operando</span>
          </div>
          <div className="hero-stat">
            <span className="v">5.000<span style={{fontSize: '0.5em', marginLeft: 4, color: 'rgba(255,255,255,0.55)'}}>UF</span></span>
            <span className="k">Seguro de resp. civil</span>
          </div>
          <div className="hero-stat">
            <span className="v">13+</span>
            <span className="k">Clientes activos</span>
          </div>
        </div>
      </div>
    </section>
  );
};
window.Hero = Hero;

/* ---------- Más que un proveedor ---------- */
const MoreThanProvider = () => (
  <section className="section provider-section" style={{paddingTop: 0}}>
    <div className="provider-photo-band">
      <img src="uploads/foto-gorra-uniforme-fade.jpg" alt="Uniforme y gorra con la marca Diplomatic Chile" />
    </div>
    <div className="container">
      <div className="provider-copy">
        <span className="eyebrow">Nuestra propuesta</span>
        <h2 className="h2 mt-32">Más que un proveedor</h2>
        <p className="lead muted mt-24">
          En Diplomatic entendemos que un espacio limpio no solo proyecta una buena imagen: protege la operación, mejora la experiencia de las personas y fortalece la confianza. Por eso combinamos personal especializado, supervisión permanente, procesos estandarizados y mejora continua para entregar soluciones confiables y adaptadas a cada cliente.
        </p>
      </div>
    </div>
  </section>
);
window.MoreThanProvider = MoreThanProvider;

/* ---------- Proceso / Cómo trabajamos ---------- */
const PROCESO_STEPS = ['Diagnóstico','Plan Operacional','Implementación','Supervisión','Control de Calidad','Indicadores','Mejora Continua'];
const PROCESO_COLORS = ['#0D1F3C','#15294F','#1A3A6B','#20406e','#1A3A6B','#15294F','#0D1F3C'];

function buildStringArt() {
  const N = 10;
  const pad = 40, size = 400;
  const axisLen = size - pad * 2;
  const lines = [];
  for (let i = 0; i < N; i++) {
    const vx = pad, vy = pad + (i / (N - 1)) * axisLen;
    const hx = pad + ((N - 1 - i) / (N - 1)) * axisLen, hy = size - pad;
    const len = Math.hypot(hx - vx, hy - vy);
    lines.push({x1: vx, y1: vy, x2: hx, y2: hy, len});
  }
  lines.sort((a, b) => a.len - b.len);
  return lines;
}
const STRING_LINES = buildStringArt();

const Proceso = () => {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx(v => (v + 1) % PROCESO_STEPS.length), 2200);
    return () => clearInterval(id);
  }, []);
  const pct = (idx / (PROCESO_STEPS.length - 1)) * 100;
  return (
    <section className="proceso-section" style={{background: PROCESO_COLORS[idx]}}>
      <div className="container proceso-layout">
        <div className="proceso-copy">
          <div className="proceso-head">
            <span className="eyebrow on-dark">Metodología</span>
            <span className="proceso-h1">Cómo trabajamos</span>
          </div>
          <div className="proceso-labels">
            {PROCESO_STEPS.map((s, i) => (
              <div key={s} className={'proceso-label' + (i === idx ? ' current' : '')}>{s}</div>
            ))}
          </div>
          <div className="proceso-track">
            <div className="proceso-fill" style={{width: pct + '%'}}></div>
            <div className="proceso-dot" style={{left: pct + '%'}}></div>
          </div>
        </div>
        <div className="proceso-orbit" aria-hidden="true">
          <svg viewBox="0 0 400 400">
            <g className="orbit-spin">
              {STRING_LINES.map((l, i) => (
                <line key={i} className={'orbit-ring' + (i <= Math.round((idx / (PROCESO_STEPS.length - 1)) * (STRING_LINES.length - 1)) ? ' revealed' : '')} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}/>
              ))}
              {STRING_LINES.map((l, i) => (
                <React.Fragment key={'d'+i}>
                  <circle className="orbit-dot" cx={l.x1} cy={l.y1} r="3"/>
                  <circle className="orbit-dot" cx={l.x2} cy={l.y2} r="3"/>
                </React.Fragment>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};
window.Proceso = Proceso;

/* ---------- Values keyword ticker ---------- */
const VALUES_LIST = ['Compromiso','Calidad','Seguridad','Innovación','Trabajo en equipo','Orientación al cliente','Mejora continua'];
const ValuesTicker = () => (
  <div className="values-ticker">
    <div className="values-track">
      {[...VALUES_LIST, ...VALUES_LIST, ...VALUES_LIST].map((v, i) => (
        <span key={i} className="values-item">{v}<span className="values-dot">•</span></span>
      ))}
    </div>
  </div>
);
window.ValuesTicker = ValuesTicker;

/* ---------- Commercial banners carousel ---------- */
const BANNER_IMAGES = [
  'uploads/banner-viviendas.jpg',
  'uploads/banner-oficinas-cafeterias.jpg',
  'uploads/banner-hoteleria.jpg',
  'uploads/banner-fachadas.jpg',
  'uploads/banner-areas-comunes.jpg',
  'uploads/banner-alimentos-bebidas.jpg',
  'uploads/banner-estacionamientos.jpg',
  'uploads/banner-alfombras.jpg',
];
const BannerCarousel = () => {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % BANNER_IMAGES.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="section banner-carousel-section">
      <div className="container">
        <div className="banner-carousel">
          {BANNER_IMAGES.map((src, idx) => (
            <img key={src} src={src} alt="" className={'banner-carousel-slide' + (idx === i ? ' active' : '')} />
          ))}
          <div className="gallery-dots" role="tablist" aria-label="Seleccionar imagen">
            {BANNER_IMAGES.map((_, idx) => (
              <button key={idx} className={'gallery-dot' + (idx === i ? ' active' : '')} onClick={() => setI(idx)} aria-label={'Ver imagen ' + (idx + 1)}></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
window.BannerCarousel = BannerCarousel;

/* ---------- Client logo band ---------- */
const CLIENTS = ['JLL', 'Colliers International', 'Accor', 'Grupo Patio', 'Grupo Security', 'Hotel Cumbres', 'REALSA', 'GeoSinergia', 'Alonso', 'DAG', 'Diversur', 'HOME TEC', 'SADE'];

const ClientBand = () => (
  <div className="client-band">
    <div className="container client-band-inner">
      <span className="client-band-label">Confían en nosotros</span>
      <div className="marquee" aria-hidden="false">
        <div className="marquee-track">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} className="client-logo">{c}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);
window.ClientBand = ClientBand;

/* ---------- Differentiators ---------- */
const DIFFS = [
  {
    n: '01',
    title: 'Personal con formación continua',
    body: 'Líderes de grupo y colaboradores formados internamente en protocolo, seguridad y trato. No subcontratamos rotación.',
  },
  {
    n: '02',
    title: 'IMDI cada mes, sin pedirlo',
    body: 'Un informe interactivo del servicio llega los primeros días del mes. Cobertura, incidencias, programas especiales. Auditable.',
  },
  {
    n: '03',
    title: 'Continuidad operativa garantizada',
    body: 'Dotación de apoyo para licencias e inasistencias. Reposición inmediata de maquinaria. Seguro de 5.000 UF.',
  },
];

const Differentiators = () => (
  <section className="section" id="diferenciadores">
    <div className="container">
      <div className="section-head centered">
        <div>
          <span className="eyebrow">Por qué Diplomatic</span>
          <h2 className="h2 mt-32">Tres compromisos que el resto del rubro no entrega.</h2>
        </div>
        <div className="head-aside">
          <p className="lead muted">Lo que parece sentido común — en este mercado, no lo es.</p>
        </div>
      </div>
      <div className="diff-grid">
        {DIFFS.map(d => (
          <article className="diff-card" key={d.n}>
            <span className="num">{d.n} ·</span>
            <h3>{d.title}</h3>
            <p>{d.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
window.Differentiators = Differentiators;

/* ---------- Services ---------- */
const SERVICES = [
  {n: '01', title: 'Áreas comunes', desc: 'Espacios de alto tránsito en condiciones óptimas: limpieza, presentación y continuidad operacional.', href: null},
  {n: '02', title: 'Oficinas', desc: 'Ambientes limpios y seguros que favorecen la productividad y la imagen corporativa.', href: null},
  {n: '03', title: 'Housekeeping', desc: 'Personal especializado para hoteles con foco en calidad, rapidez y experiencia del huésped.', href: 'servicio-housekeeping.html'},
  {n: '04', title: 'Steward', desc: 'Apoyo operativo para cocinas y Alimentos & Bebidas, manteniendo higiene y continuidad del servicio.', href: null},
  {n: '05', title: 'Fachadas', desc: 'Limpieza profesional de fachadas y vidrios mediante procedimientos seguros.', href: 'servicio-fachadas.html'},
  {n: '06', title: 'Alfombras', desc: 'Limpieza profunda que prolonga la vida útil de las superficies y mejora la presentación.', href: null},
  {n: '07', title: 'Estacionamientos', desc: 'Lavado mecanizado y limpieza integral para una mejor experiencia de ingreso.', href: null},
];

const Services = ({servicesVariant='cards'}) => {
  return (
    <section className="section services-bg" id="servicios">
      <div className="container">
        <div className="section-head centered">
          <div>
            <span className="eyebrow">Servicios</span>
            <h2 className="h2 mt-32">Siete frentes de aseo industrial.</h2>
          </div>
          <div className="head-aside">
            <p className="lead muted">Cada servicio entrega un resultado verificable. Sin paquetes ambiguos.</p>
          </div>
        </div>
        <div className="svc-tile-grid">
          {SERVICES.map(s => (
            s.href ? (
              <a key={s.n} className="svc-tile" href={s.href}>
                <span className="svc-tile-num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="svc-tile-link">Ver servicio <Icon.Arrow size={14}/></span>
              </a>
            ) : (
              <div key={s.n} className="svc-tile is-static">
                <span className="svc-tile-num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            )
          ))}
        </div>
        <div className="svc-viewall">
          <a className="btn btn-secondary" href="Servicios.html">Ver todos los servicios e industrias <Icon.Arrow/></a>
        </div>
      </div>
    </section>
  );
};
window.Services = Services;

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  {
    quote: 'Cambiamos tres proveedores antes de Diplomatic. El IMDI es lo que nos hizo dejar de revisar.',
    name: 'M. Cárdenas',
    role: 'Property Manager · Edificio corporativo',
    co: 'JLL',
  },
  {
    quote: 'Operan sin que el residente los note. Cuando hay una incidencia, ya tienen propuesta de solución antes de la reunión.',
    name: 'R. Vergara',
    role: 'Gerente de Administración',
    co: 'Colliers',
  },
  {
    quote: 'En hotelería el estándar es no improvisar. Diplomatic llega con protocolo escrito, no con buena voluntad.',
    name: 'P. Soto',
    role: 'Operations Manager',
    co: 'Accor',
  },
];

const Testimonials = () => (
  <section className="section testi-section" id="clientes">
    <div className="container">
      <div className="section-head centered on-dark">
        <div>
          <span className="eyebrow on-dark">Clientes</span>
          <h2 className="h2 on-dark mt-32">El estándar lo definen ellos.</h2>
        </div>
        <div className="head-aside">
          <p className="lead on-dark">Operaciones inmobiliarias y hoteleras que cambiaron de proveedor — y se quedaron.</p>
        </div>
      </div>
      <div className="testi-grid">
        {TESTIMONIALS.map((t, i) => (
          <article className="testi-card" key={i}>
            <p className="testi-quote">{t.quote}</p>
            <div className="testi-author">
              <div className="who">
                <div className="name">{t.name}</div>
                <div className="role">{t.role}</div>
              </div>
              <div className="co-logo">{t.co}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
window.Testimonials = Testimonials;

/* ---------- Gallery / Carousel ---------- */
const GALLERY_PHOTOS = [
  {src: 'uploads/foto-lobby-equipo-carro.png', alt: 'Equipo Diplomatic trabajando en lobby de hotel'},
  {src: 'uploads/foto-fachada-rappel-cielo.png', alt: 'Limpieza vertical de fachada en altura'},
  {src: 'uploads/foto-cocina-vapor-pistola.png', alt: 'Sanitización a vapor en cocina industrial'},
  {src: 'uploads/foto-estacionamiento-fregadora.png', alt: 'Lavado de estacionamiento con fregadora industrial'},
  {src: 'uploads/foto-lobby-mesa-centro.png', alt: 'Limpieza de áreas comunes en edificio corporativo'},
  {src: 'uploads/foto-equipo-oficina-sonriendo.png', alt: 'Equipo Diplomatic en oficina corporativa'},
  {src: 'uploads/foto-cocina-lavado-vajilla.png', alt: 'Lavado de vajilla en cocina de hotelería'},
  {src: 'uploads/foto-fachada-andamio.png', alt: 'Limpieza de fachada con andamio'},
];

const Gallery = () => {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % GALLERY_PHOTOS.length), 4800);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="section" id="galeria">
      <div className="container">
        <div className="gallery-carousel">
          {GALLERY_PHOTOS.map((p, idx) => (
            <img key={p.src} src={p.src} alt={p.alt} className={'gallery-slide' + (idx === i ? ' active' : '')} />
          ))}
          <div className="gallery-dots" role="tablist" aria-label="Seleccionar foto">
            {GALLERY_PHOTOS.map((_, idx) => (
              <button key={idx} className={'gallery-dot' + (idx === i ? ' active' : '')} onClick={() => setI(idx)} aria-label={'Ver foto ' + (idx + 1)}></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
window.Gallery = Gallery;

/* ---------- IMDI section ---------- */
const IMDISection = ({prominent = false}) => (
  <section className={'section imdi-section' + (prominent ? ' imdi-prominent' : '')} id="imdi">
    <div className="container">
      <div className="section-head centered">
        <div>
          {prominent && <span className="lead-magnet-flag">El lead magnet</span>}
          <span className="eyebrow">IMDI · Diferenciador único</span>
          {prominent ? (
            <h2 className="h2 mt-32">Recibe cada mes un informe que demuestra, dato por dato, que el servicio se ejecutó.</h2>
          ) : (
            <h2 className="h2 mt-32">Informe Mensual Diplomatic. Lo que nadie más entrega.</h2>
          )}
        </div>
        <div className="head-aside">
          <p className="lead muted">Los primeros días de cada mes. Sin pedirlo. Auditable y firmado.</p>
        </div>
      </div>
      <div className="imdi-grid">
        <ImdiMock />
        <div className="imdi-copy">
          <p className="lead" style={{marginBottom: 28}}>
            Un PDF interactivo que reúne todo lo ocurrido en tu instalación durante el mes. No es un resumen comercial: es la operación, medida y firmada.
          </p>
          <ul className="imdi-feat-list" aria-label="Qué incluye el IMDI">
            <li><span className="n">01</span><span><b>Resumen de actividades</b> del período por área y por turno.</span></li>
            <li><span className="n">02</span><span><b>Estado de activos</b> y maquinaria, con reposiciones aplicadas.</span></li>
            <li><span className="n">03</span><span><b>Novedades del personal</b> asignado: licencias, reemplazos, formación.</span></li>
            <li><span className="n">04</span><span><b>Incidencias y soluciones</b> aplicadas, con fecha y responsable.</span></li>
            <li><span className="n">05</span><span><b>Indicadores de calidad</b> medidos por zona.</span></li>
            <li><span className="n">06</span><span><b>Programas especiales</b> ejecutados durante el período.</span></li>
          </ul>
          <div className="imdi-cta-row">
            <a className="btn btn-primary cta-standout" href="#contacto">Solicitar un IMDI de ejemplo <Icon.Arrow/></a>
            <a className="btn btn-ghost" href="/imdi/">Cómo funciona el IMDI <Icon.Arrow size={14}/></a>
          </div>
          <div style={{marginTop: 16}}>
            <a className="btn btn-secondary" href="Encuesta NPS.html">Ver encuesta de satisfacción (NPS) <Icon.Arrow size={14}/></a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
window.IMDISection = IMDISection;

/* ---------- About ---------- */
const About = ({compact = false}) => (
  <section className={'section about-section' + (compact ? ' about-compact' : '')} id="nosotros">
    <div className="about-top">
    <div className="about-photo-bleed" aria-label="Leonardo López, fundador de Diplomatic Chile">
      <img src="uploads/foto-trabajador-recortado.png" alt="Leonardo López, fundador de Diplomatic Chile" />
    </div>
    <div className="container">
      <div className="section-head centered">
        <div>
          <span className="eyebrow">Quiénes somos</span>
          <h2 className="h2 mt-32">Personas reales detrás del protocolo.</h2>
        </div>
        <div className="head-aside">
          <p className="lead muted">Operación enfocada, sin servicios anexos. Esa es la apuesta desde 2017.</p>
        </div>
      </div>
      <div className="about-grid">
        <div className="about-photo-spacer" aria-hidden="true"></div>
        <div>
          <p className="about-quote">
            Las empresas focalizadas rinden más que aquellas que afrontan responsabilidades anexas o paralelas.
          </p>
          <p className="about-cite">— Leonardo López, fundador</p>

          {compact ? (
            <div className="about-tldr">
              <p className="lead" style={{marginBottom: 24}}>
                Somos una empresa chilena especializada en servicios de aseo industrial profesional y Facility Services. Trabajamos junto a empresas, hoteles, edificios corporativos, centros comerciales e instituciones que buscan un aliado estratégico para mantener espacios seguros, eficientes y preparados para recibir a quienes los utilizan cada día.
              </p>
              <div className="about-pills">
                <span className="pill"><b>2017</b> Año de fundación</span>
                <span className="pill"><b>13+</b> Clientes activos</span>
                <span className="pill"><b>5.000 UF</b> Resp. civil</span>
              </div>
            </div>
          ) : (
            <div className="about-stack">
              <div className="row">
                <span className="yr">2017</span>
                <p><b>Fundación.</b> Diplomatic Chile nace con un foco único: aseo industrial profesional, sin servicios anexos que diluyan el estándar.</p>
              </div>
              <div className="row">
                <span className="yr">2019 →</span>
                <p><b>Crecimiento por fidelidad.</b> Clientes que iniciaron contrato en 2017 siguen operando con nosotros. La cartera crece por permanencia, no por rotación.</p>
              </div>
              <div className="row">
                <span className="yr">Hoy</span>
                <p><b>Filosofía.</b> Equipos formados internamente, comunicación directa con cada cliente, IMDI mensual y respaldo de seguros y mutual. La limpieza profesional como disciplina, no como commodity.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
    <div className="mv-band">
      <div className="container mv-grid">
        <div className="mv-card">
          <span className="mv-label">Misión</span>
          <p>Entregar soluciones integrales de limpieza profesional que contribuyan a la continuidad operacional de nuestros clientes mediante personas capacitadas, supervisión permanente y una cultura de mejora continua.</p>
        </div>
        <div className="mv-card">
          <span className="mv-label">Visión</span>
          <p>Ser una de las empresas de Facility Services más reconocidas de Chile por la calidad de nuestro servicio, la innovación y la confianza que construimos con nuestros clientes.</p>
        </div>
      </div>
    </div>
  </section>
);
window.About = About;

/* ---------- CTA Final + Form ---------- */
const FinalCTA = () => {
  const [form, setForm] = React.useState({nombre: '', empresa: '', telefono: '', mensaje: ''});
  const [err, setErr] = React.useState({});
  const [sent, setSent] = React.useState(false);

  const set = (k, v) => { setForm(f => ({...f, [k]: v})); setErr(e => ({...e, [k]: null})); };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.nombre.trim()) next.nombre = 'Falta tu nombre.';
    if (!form.empresa.trim()) next.empresa = 'Indica la empresa.';
    if (!form.telefono.trim() || form.telefono.replace(/\D/g, '').length < 8) next.telefono = 'Teléfono inválido.';
    if (Object.keys(next).length) { setErr(next); return; }
    setSent(true);
  };

  return (
    <section className="section cta-section" id="contacto">
      <div className="container cta-grid">
        <div>
          <span className="eyebrow on-dark">Contacto</span>
          <h2 className="cta-h2 mt-32">¿Quieres ver cómo trabajamos antes de decidir?</h2>
          <p className="lead on-dark" style={{maxWidth: '46ch'}}>
            Te llamamos en menos de 24 horas hábiles. Sin cotización al voleo: visitamos la instalación y entregamos propuesta específica.
          </p>

          <div className="cta-direct">
            <div className="item">
              <span className="k">Teléfono</span>
              <span className="v">
                <a href="tel:+56950670318">+56 9 5067 0318</a>
              </span>
            </div>
            <div className="item">
              <span className="k">Cotizaciones</span>
              <span className="v">
                <a href="mailto:l.lopez@diplomatic.cl">l.lopez@diplomatic.cl</a>
              </span>
            </div>
            <div className="item">
              <span className="k">Oficina</span>
              <span className="v" style={{fontFamily: 'var(--f-sans)', fontSize: 15}}>
                Consejo de Indias 1439, Providencia, Santiago
              </span>
            </div>
          </div>
        </div>

        <div className="cta-form">
          {sent ? (
            <div className="form-success">
              <span className="check"><Icon.Check/></span>
              <h3>Solicitud recibida</h3>
              <p>Te contactamos dentro de las próximas 24 horas hábiles con un horario para visitar tu instalación.</p>
              <div className="meta">Confirmación enviada a {form.empresa || 'tu empresa'}</div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3>Solicitar cotización</h3>
              <p className="form-sub">4 campos. Nada de formularios kilométricos.</p>

              <div className={'field' + (err.nombre ? ' has-error' : '')}>
                <label htmlFor="nombre">Nombre completo</label>
                <input id="nombre" type="text" value={form.nombre} onChange={e => set('nombre', e.target.value)} autoComplete="name"/>
                {err.nombre && <span className="err">{err.nombre}</span>}
              </div>
              <div className={'field' + (err.empresa ? ' has-error' : '')}>
                <label htmlFor="empresa">Empresa</label>
                <input id="empresa" type="text" value={form.empresa} onChange={e => set('empresa', e.target.value)} autoComplete="organization"/>
                {err.empresa && <span className="err">{err.empresa}</span>}
              </div>
              <div className={'field' + (err.telefono ? ' has-error' : '')}>
                <label htmlFor="telefono">Teléfono</label>
                <input id="telefono" type="tel" value={form.telefono} onChange={e => set('telefono', e.target.value)} autoComplete="tel" placeholder="+56 9 …"/>
                {err.telefono && <span className="err">{err.telefono}</span>}
              </div>
              <div className="field">
                <label htmlFor="mensaje">Mensaje <span style={{color: 'var(--muted)', fontWeight: 500, textTransform: 'none', letterSpacing: 0}}>· opcional</span></label>
                <textarea id="mensaje" value={form.mensaje} onChange={e => set('mensaje', e.target.value)} placeholder="Tipo de instalación, metros cuadrados, frecuencia esperada…"></textarea>
              </div>
              <button type="submit" className="btn btn-primary on-dark submit">
                Solicitar cotización gratuita <Icon.Arrow/>
              </button>
              <div className="legal">Respuesta en menos de 24 h hábiles · Sin compromiso</div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
window.FinalCTA = FinalCTA;

/* ---------- Footer ---------- */
const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="foot-grid">
        <div className="foot-brand">
          <Logo onDark/>
          <p>Servicios integrales de aseo industrial en Santiago. Operación B2B desde 2017 — oficinas, edificios, hotelería y fachadas.</p>
        </div>
        <div className="foot-col">
          <h4>Servicios</h4>
          <ul>
            <li><a href="/aseo-oficinas-santiago/">Aseo de oficinas</a></li>
            <li><a href="/aseo-areas-comunes-edificios/">Áreas comunes</a></li>
            <li><a href="/limpieza-vertical-fachadas/">Limpieza vertical</a></li>
            <li><a href="/aseo-hoteleria-profesional/">Aseo hotelero</a></li>
            <li><a href="/sanitizacion-desinfeccion-empresas/">Sanitización</a></li>
            <li><a href="Encuesta NPS.html">Encuesta de satisfacción</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Contacto</h4>
          <ul>
            <li><a className="mono-link" href="tel:+56950670318">+56 9 5067 0318</a></li>
            <li><a className="mono-link" href="tel:+56512498695">+56 51 249 8695</a></li>
            <li><a className="mono-link" href="mailto:l.lopez@diplomatic.cl">l.lopez@diplomatic.cl</a></li>
            <li style={{color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.55, marginTop: 8}}>Consejo de Indias 1439<br/>Providencia, Santiago</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="foot-legal">
      <div className="container foot-legal-inner">
        <span>RUT 76.903.656-3 · © 2026 Diplomatic Chile SPA</span>
        <span>diplomatic.cl</span>
      </div>
    </div>
  </footer>
);
window.Footer = Footer;

/* ---------- Floating WhatsApp ---------- */
const FabWhatsapp = () => (
  <a className="fab-wa" href="https://wa.me/56950670318" target="_blank" rel="noopener" aria-label="WhatsApp">
    <Icon.Whatsapp size={26}/>
  </a>
);
window.FabWhatsapp = FabWhatsapp;
