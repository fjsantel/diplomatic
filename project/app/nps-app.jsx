// === NPS — App shell (tabs) ===
function NPSApp() {
  const [tab, setTab] = React.useState('encuesta');
  const tabs = [
    {id: 'encuesta', label: 'Encuesta'},
    {id: 'distribucion', label: 'Distribución'},
    {id: 'panel', label: 'Panel interno'},
    {id: 'guia', label: 'Guía de uso'},
  ];
  return (
    <div className="nps-shell" data-screen-label="NPS · Encuesta de satisfacción">
      <div className="nps-top">
        <div className="nps-top-inner">
          <a className="nps-back" href="index.html"><Icon.Arrow size={14}/> Volver al sitio</a>
          <div className="nps-title-row">
            <div>
              <h1 className="nps-h1">Encuesta de satisfacción — NPS</h1>
              <p className="nps-sub">Prototipo funcional: mide lealtad de clientes con el Net Promoter Score, integrado al ciclo del IMDI.</p>
            </div>
          </div>
          <nav className="nps-tabs">
            {tabs.map(t => (
              <button key={t.id} className={'nps-tab' + (tab === t.id ? ' active' : '')} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </nav>
        </div>
      </div>
      <div className="nps-body">
        <div className={'nps-panel' + (tab === 'encuesta' ? ' active' : '')}><NPSSurvey/></div>
        <div className={'nps-panel' + (tab === 'distribucion' ? ' active' : '')}><NPSDistribution/></div>
        <div className={'nps-panel' + (tab === 'panel' ? ' active' : '')}><NPSDashboard/></div>
        <div className={'nps-panel' + (tab === 'guia' ? ' active' : '')}><NPSTutorial/></div>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<NPSApp/>);
