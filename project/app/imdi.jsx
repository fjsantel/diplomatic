// === DIPLOMATIC — IMDI report mockup ===
const ImdiMock = () => {
  return (
    <div className="imdi-mock" role="img" aria-label="Vista previa del Informe Mensual Diplomatic">
      <div className="imdi-mock-head">
        <span className="file">IMDI · abril 2026 · Cliente.pdf</span>
        <span className="dots"><span></span><span></span><span></span></span>
      </div>
      <div className="imdi-mock-body">
        <div>
          <div className="imdi-mock-title">Informe Mensual Diplomatic</div>
          <div className="imdi-mock-sub">Edificio corporativo · Las Condes · 14.200 m²</div>
        </div>

        <div className="imdi-mock-row">
          <div className="lab">Período</div>
          <div className="val">01.04 — 30.04.2026</div>
        </div>
        <div className="imdi-mock-row" style={{marginTop: -10}}>
          <div className="lab">Líder de grupo</div>
          <div className="val">M. González</div>
        </div>

        <div className="imdi-kpi-row">
          <div className="imdi-kpi">
            <div className="k">Cobertura</div>
            <div className="v">98<span className="pct">%</span></div>
          </div>
          <div className="imdi-kpi">
            <div className="k">Incidencias</div>
            <div className="v">2</div>
          </div>
          <div className="imdi-kpi">
            <div className="k">Resueltas</div>
            <div className="v">2</div>
          </div>
        </div>

        <div className="imdi-bar-block">
          <h4>Indicadores de calidad</h4>
          <div className="imdi-bar">
            <span className="lbl">Oficinas</span>
            <div className="track"><div className="fill" style={{width: '96%'}}></div></div>
            <span className="pct">96%</span>
          </div>
          <div className="imdi-bar">
            <span className="lbl">Baños</span>
            <div className="track"><div className="fill" style={{width: '94%'}}></div></div>
            <span className="pct">94%</span>
          </div>
          <div className="imdi-bar">
            <span className="lbl">Cocinas</span>
            <div className="track"><div className="fill" style={{width: '99%'}}></div></div>
            <span className="pct">99%</span>
          </div>
          <div className="imdi-bar">
            <span className="lbl">Lobby</span>
            <div className="track"><div className="fill" style={{width: '100%'}}></div></div>
            <span className="pct">100%</span>
          </div>
        </div>

        <div className="imdi-bullet-block">
          <h4 style={{font: '600 12px/1 var(--f-sans)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', margin: '0 0 6px'}}>Novedades</h4>
          <div className="imdi-bullet">
            <span className="dot ok"></span>
            <span className="txt">Reposición de aspiradora industrial — piso 8</span>
            <span className="tag">12.04</span>
          </div>
          <div className="imdi-bullet">
            <span className="dot warn"></span>
            <span className="txt">Sanitización extra post-evento — auditorio</span>
            <span className="tag">19.04</span>
          </div>
          <div className="imdi-bullet">
            <span className="dot info"></span>
            <span className="txt">Programa especial: limpieza profunda alfombras</span>
            <span className="tag">25.04</span>
          </div>
        </div>
      </div>
    </div>
  );
};

window.ImdiMock = ImdiMock;
