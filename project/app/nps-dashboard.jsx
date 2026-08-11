// === NPS — Dashboard interno (mockup) + Guía de uso + opciones de backend ===

const MES_LABELS = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const claveMes = (fecha) => { const d = new Date(fecha); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; };
const segmento = (p) => p >= 9 ? 'promoter' : p >= 7 ? 'passive' : 'detractor';

// calcularNPS: agrega respuestas {cliente, puntaje, fecha} en las métricas del panel.
function calcularNPS(respuestas) {
  const total = respuestas.length;
  if (!total) {
    return { promoters: 0, passives: 0, detractors: 0, score: 0, trend: 0, porMes: [], porCliente: [] };
  }

  const promotersN = respuestas.filter(r => segmento(r.puntaje) === 'promoter').length;
  const passivesN  = respuestas.filter(r => segmento(r.puntaje) === 'passive').length;
  const detractorsN = respuestas.filter(r => segmento(r.puntaje) === 'detractor').length;
  const promoters = Math.round((promotersN/total)*100);
  const passives  = Math.round((passivesN/total)*100);
  const detractors = 100 - promoters - passives; // evita desajuste por redondeo
  const score = promoters - detractors;

  // Agrupar por mes (YYYY-MM), ordenado cronológicamente
  const mesesMap = {};
  respuestas.forEach(r => {
    const k = claveMes(r.fecha);
    if (!mesesMap[k]) mesesMap[k] = [];
    mesesMap[k].push(r.puntaje);
  });
  const clavesOrdenadas = Object.keys(mesesMap).sort();
  const porMes = clavesOrdenadas.map(k => {
    const puntajes = mesesMap[k];
    const t = puntajes.length;
    const p = Math.round((puntajes.filter(s => segmento(s)==='promoter').length/t)*100);
    const pa = Math.round((puntajes.filter(s => segmento(s)==='passive').length/t)*100);
    const d = 100 - p - pa;
    const [y, m] = k.split('-');
    return { m: MES_LABELS[parseInt(m,10)-1], p, pa, d };
  });

  // Trend: score de este mes vs. mes anterior (por NPS de esos meses, no del set completo)
  const scoreDe = (puntajes) => {
    const t = puntajes.length;
    const p = (puntajes.filter(s=>segmento(s)==='promoter').length/t)*100;
    const d = (puntajes.filter(s=>segmento(s)==='detractor').length/t)*100;
    return Math.round(p-d);
  };
  let trend = 0;
  if (clavesOrdenadas.length >= 2) {
    const actual = scoreDe(mesesMap[clavesOrdenadas[clavesOrdenadas.length-1]]);
    const anterior = scoreDe(mesesMap[clavesOrdenadas[clavesOrdenadas.length-2]]);
    trend = actual - anterior;
  }

  // Por cliente: última respuesta + comparación con la anterior de ese mismo cliente
  const porClienteMap = {};
  respuestas.forEach(r => {
    if (!porClienteMap[r.cliente]) porClienteMap[r.cliente] = [];
    porClienteMap[r.cliente].push(r);
  });
  const porCliente = Object.keys(porClienteMap).map(nombre => {
    const hist = porClienteMap[nombre].slice().sort((a,b) => new Date(a.fecha) - new Date(b.fecha));
    const ultimo = hist[hist.length-1];
    const previo = hist[hist.length-2];
    let trendCliente = 'flat';
    if (previo) {
      if (ultimo.puntaje > previo.puntaje) trendCliente = 'up';
      else if (ultimo.puntaje < previo.puntaje) trendCliente = 'down';
    }
    return { name: nombre, score: ultimo.puntaje, trend: trendCliente };
  });

  return { promoters, passives, detractors, score, trend, porMes, porCliente };
}
window.calcularNPS = calcularNPS;

// Datos de prueba: ~40 respuestas repartidas en 6 meses y 6 clientes, con
// variación intencional para poder chequear que porMes/porCliente/trend cuadran.
const RESPUESTAS_PRUEBA = [
  {cliente:'JLL', puntaje:8, fecha:'2025-12-05'}, {cliente:'JLL', puntaje:9, fecha:'2026-01-06'}, {cliente:'JLL', puntaje:9, fecha:'2026-02-04'}, {cliente:'JLL', puntaje:9, fecha:'2026-03-05'}, {cliente:'JLL', puntaje:10, fecha:'2026-04-07'}, {cliente:'JLL', puntaje:9, fecha:'2026-05-06'},
  {cliente:'Colliers International', puntaje:7, fecha:'2025-12-10'}, {cliente:'Colliers International', puntaje:7, fecha:'2026-01-09'}, {cliente:'Colliers International', puntaje:8, fecha:'2026-02-08'}, {cliente:'Colliers International', puntaje:8, fecha:'2026-03-10'}, {cliente:'Colliers International', puntaje:8, fecha:'2026-04-09'}, {cliente:'Colliers International', puntaje:8, fecha:'2026-05-08'},
  {cliente:'Grupo Security', puntaje:8, fecha:'2025-12-12'}, {cliente:'Grupo Security', puntaje:9, fecha:'2026-01-11'}, {cliente:'Grupo Security', puntaje:9, fecha:'2026-02-10'}, {cliente:'Grupo Security', puntaje:9, fecha:'2026-03-12'}, {cliente:'Grupo Security', puntaje:9, fecha:'2026-04-11'}, {cliente:'Grupo Security', puntaje:9, fecha:'2026-05-10'},
  {cliente:'Accor', puntaje:7, fecha:'2025-12-15'}, {cliente:'Accor', puntaje:6, fecha:'2026-01-14'}, {cliente:'Accor', puntaje:6, fecha:'2026-02-13'}, {cliente:'Accor', puntaje:5, fecha:'2026-03-15'}, {cliente:'Accor', puntaje:6, fecha:'2026-04-14'}, {cliente:'Accor', puntaje:6, fecha:'2026-05-13'},
  {cliente:'Grupo Patio', puntaje:8, fecha:'2025-12-18'}, {cliente:'Grupo Patio', puntaje:8, fecha:'2026-01-17'}, {cliente:'Grupo Patio', puntaje:9, fecha:'2026-02-16'}, {cliente:'Grupo Patio', puntaje:9, fecha:'2026-03-18'}, {cliente:'Grupo Patio', puntaje:9, fecha:'2026-04-17'}, {cliente:'Grupo Patio', puntaje:9, fecha:'2026-05-16'},
  {cliente:'GeoSinergia', puntaje:6, fecha:'2025-12-20'}, {cliente:'GeoSinergia', puntaje:7, fecha:'2026-01-19'}, {cliente:'GeoSinergia', puntaje:6, fecha:'2026-02-18'}, {cliente:'GeoSinergia', puntaje:7, fecha:'2026-03-20'}, {cliente:'GeoSinergia', puntaje:7, fecha:'2026-04-19'}, {cliente:'GeoSinergia', puntaje:7, fecha:'2026-05-18'},
];

function ScoreDonut({promoters, passives, detractors}) {
  const total = promoters + passives + detractors;
  const pPct = Math.round((promoters/total)*100);
  const paPct = Math.round((passives/total)*100);
  const dPct = 100 - pPct - paPct;
  const style = {
    background: `conic-gradient(#16A34A 0 ${pPct}%, #F59E0B ${pPct}% ${pPct+paPct}%, #DC2626 ${pPct+paPct}% 100%)`
  };
  return (
    <div className="donut-wrap">
      <div className="donut" style={style}></div>
      <div className="donut-legend">
        <div className="row"><span className="dot" style={{background:'#16A34A'}}></span>Promotores<b>{pPct}%</b></div>
        <div className="row"><span className="dot" style={{background:'#F59E0B'}}></span>Pasivos<b>{paPct}%</b></div>
        <div className="row"><span className="dot" style={{background:'#DC2626'}}></span>Detractores<b>{dPct}%</b></div>
      </div>
    </div>
  );
}

function TrendChart({porMes}) {
  return (
    <div className="trend-chart">
      {porMes.map(t => (
        <div className="trend-bar" key={t.m}>
          <div className="seg" style={{height: t.p+'%', background:'#16A34A'}}></div>
          <div className="seg" style={{height: t.pa+'%', background:'#F59E0B'}}></div>
          <div className="seg" style={{height: t.d+'%', background:'#DC2626'}}></div>
          <div className="lbl">{t.m}</div>
        </div>
      ))}
    </div>
  );
}

function segTag(score) {
  if (score >= 9) return 'promoter';
  if (score >= 7) return 'passive';
  return 'detractor';
}

function ClientTable({porCliente}) {
  return (
    <table className="client-table">
      <thead><tr><th>Cliente</th><th>Puntaje</th><th>Tendencia</th></tr></thead>
      <tbody>
        {porCliente.map(c => (
          <tr key={c.name}>
            <td className="co">{c.name}</td>
            <td><span className={'score-tag ' + segTag(c.score)}>{c.score}/10</span></td>
            <td>
              {c.trend === 'up' && <span className="arrow-up">↑ mejora</span>}
              {c.trend === 'down' && <span className="arrow-down">↓ atención</span>}
              {c.trend === 'flat' && <span className="arrow-flat">→ estable</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ActionLog() {
  const items = [
    {status:'open', dot:'#DC2626', text: <>Accor (puntaje 6): reporta demoras en reposición de insumos, piso 4.</>, tag:'open'},
    {status:'progress', dot:'#F59E0B', text: <>GeoSinergia (7): solicitó mayor frecuencia en baños de visita.</>, tag:'progress'},
    {status:'done', dot:'#16A34A', text: <>JLL (9): visita de seguimiento agendada tras comentario positivo.</>, tag:'done'},
  ];
  return (
    <div className="action-log">
      {items.map((it, i) => (
        <div className="action-item" key={i}>
          <span className="dot" style={{background: it.dot}}></span>
          <span className="txt">{it.text}</span>
          <span className={'status ' + it.tag}>{it.tag === 'open' ? 'Abierto' : it.tag === 'progress' ? 'En curso' : 'Resuelto'}</span>
        </div>
      ))}
    </div>
  );
}

function NPSDashboard() {
  // En producción, respuestas vendría de la base/backend real de la encuesta.
  // Por ahora: array de prueba (RESPUESTAS_PRUEBA) para validar que los cálculos cuadran.
  const { promoters, passives, detractors, score, trend, porMes, porCliente } = calcularNPS(RESPUESTAS_PRUEBA);

  return (
    <div className="dash-grid">
      <div className="dash-card">
        <h4>Puntaje general · últimos {porMes.length} meses</h4>
        <div className="score-hero">
          <span className="num">{score}</span>
          <span className="delta">{trend >= 0 ? '↑' : '↓'} {trend >= 0 ? '+' : ''}{trend} pts</span>
        </div>
        <div className="ctx">NPS = % Promotores − % Detractores · benchmark B2B servicios ≈ 30-40</div>
        <TrendChart porMes={porMes} />
      </div>

      <div className="dash-card">
        <h4>Distribución actual</h4>
        <ScoreDonut promoters={promoters} passives={passives} detractors={detractors} />
      </div>

      <div className="dash-card">
        <h4>Por cliente</h4>
        <ClientTable porCliente={porCliente} />
      </div>

      <div className="dash-card">
        <h4>Registro de acción — detractores y seguimiento</h4>
        <ActionLog />
      </div>
    </div>
  );
}
window.NPSDashboard = NPSDashboard;

/* ---------- Tutorial / guía de uso ---------- */
const TUT_STEPS = [
  {
    h: 'Envía tras cada visita o incidencia',
    p: 'El líder de grupo comparte el QR o el link de WhatsApp al cerrar una visita de supervisión o resolver un reclamo. No esperes más de 48 horas.',
    tip: 'Cuanto más fresca la experiencia, más honesta y útil la respuesta.',
  },
  {
    h: 'Adjunta la encuesta al IMDI cada mes',
    p: 'El mismo correo que entrega el informe mensual incluye el enlace a la encuesta relacional. Es el momento de mayor contexto para el cliente.',
    tip: 'No la envíes por separado — súmala al flujo que el cliente ya espera.',
  },
  {
    h: 'Revisa el panel semanalmente',
    p: 'Un responsable de cuenta revisa el tablero cada semana: nuevas respuestas, puntajes por cliente y comentarios abiertos.',
    tip: '15 minutos semanales bastan si el registro de acción se mantiene al día.',
  },
  {
    h: 'Actúa sobre detractores en 24 horas',
    p: 'Todo puntaje de 0 a 6 dispara un contacto humano — llamada o visita — dentro de 24 horas hábiles. Se documenta en el registro de acción.',
    tip: 'La velocidad de respuesta importa más que la elegancia de la disculpa.',
  },
  {
    h: 'Activa a los promotores',
    p: 'Todo puntaje de 9 o 10 recibe una invitación a dejar una reseña pública o dar un testimonio con nombre para el sitio web.',
    tip: 'Los promotores de hoy son los testimonios y referidos de mañana.',
  },
];

function NPSTutorial() {
  return (
    <div>
      <div className="tut-steps">
        {TUT_STEPS.map((s, i) => (
          <div className="tut-step" key={i}>
            <span className="n">{String(i+1).padStart(2,'0')}</span>
            <div>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
              <div className="tip"><Icon.Check size={14}/> {s.tip}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop: 56}}>
        <span className="eyebrow" style={{display:'block', marginBottom: 16}}>Backend — qué construir después</span>
        <p className="lead muted" style={{marginBottom: 24, maxWidth: '70ch'}}>
          Este prototipo es visual: no guarda respuestas todavía. Con 13 clientes B2B y bajo volumen mensual, la cobertura de cuenta importa más que la sofisticación de la herramienta. Dos caminos, según qué tanto análisis automatizado quiera el cliente:
        </p>
        <div className="backend-compare">
          <div className="backend-opt reco">
            <span className="flag">Recomendado para empezar</span>
            <h4>Formulario propio + Google Sheets</h4>
            <div className="price">Sin costo mensual</div>
            <ul>
              <li>Este mismo formulario, conectado a Sheets o Google Forms como backend.</li>
              <li>El panel se arma con un Sheets enlazado o Looker Studio (gratis).</li>
              <li>Suficiente para 13 cuentas con revisión manual semanal.</li>
              <li>Limitación: sin alertas automáticas ni WhatsApp nativo.</li>
            </ul>
          </div>
          <div className="backend-opt">
            <span className="flag" style={{background:'rgba(13,31,60,0.08)', color:'var(--navy)'}}>Si el volumen crece</span>
            <h4>Herramienta NPS dedicada</h4>
            <div className="price">≈ US$19–25/mes</div>
            <ul>
              <li>SurveySparrow, Delighted o similar: envío automático por WhatsApp/email/SMS.</li>
              <li>Alertas instantáneas a detractores, dashboards listos.</li>
              <li>Vale la pena si el número de clientes o de encuestas mensuales crece 3-4x.</li>
              <li>Requiere suscripción y una integración inicial (media jornada de trabajo).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
window.NPSTutorial = NPSTutorial;
