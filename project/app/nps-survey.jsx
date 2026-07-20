// === NPS — Encuesta cliente (0-10 + follow-up + agradecimiento segmentado) ===
const { useState } = React;

function segmentOf(score) {
  if (score >= 9) return 'promoter';
  if (score >= 7) return 'passive';
  return 'detractor';
}

const FOLLOWUP_COPY = {
  promoter: { q: '¿Qué fue lo que más valoraste de nuestro servicio?', ph: 'Ej: la puntualidad del equipo, el detalle en las áreas comunes…' },
  passive:  { q: '¿Qué haría falta para que fuera un 10?', ph: 'Ej: mayor frecuencia en baños, mejor comunicación de incidencias…' },
  detractor:{ q: '¿Qué salió mal? Cuéntanos para corregirlo.', ph: 'Sé específico: qué pasó, cuándo, en qué área…' },
};

const THANKS_COPY = {
  promoter: {
    title: '¡Gracias por tu confianza!',
    body: 'Nos alegra saber que somos parte de un buen día de trabajo para tu equipo. ¿Nos ayudarías con una reseña pública?',
    cta: 'Dejar una reseña en Google',
  },
  passive: {
    title: 'Gracias por tu honestidad',
    body: 'Tomamos nota de tu comentario. Un supervisor de zona revisará el punto que mencionaste esta semana.',
    cta: null,
  },
  detractor: {
    title: 'Gracias por avisarnos',
    body: 'Esto no es el estándar que prometemos. Un líder de grupo te contactará dentro de las próximas 24 horas hábiles para resolverlo.',
    cta: null,
  },
};

function NPSSurvey() {
  const [step, setStep] = useState('score'); // score | followup | thanks
  const [score, setScore] = useState(null);
  const [followup, setFollowup] = useState('');
  const segment = score != null ? segmentOf(score) : null;

  const pick = (n) => { setScore(n); setStep('followup'); };
  const submit = (e) => { e.preventDefault(); setStep('thanks'); };
  const restart = () => { setStep('score'); setScore(null); setFollowup(''); };

  return (
    <div className="nps-survey-wrap">
      <div className="nps-card">
        {step !== 'thanks' && (
          <div className="nps-progress">
            <span className="done"></span>
            <span className={step === 'followup' ? 'done' : ''}></span>
          </div>
        )}

        {step === 'score' && (
          <>
            <span className="eyebrow">Encuesta de satisfacción</span>
            <h3 className="nps-q mt-32">¿Nos recomendarías a otro gerente de edificio o administrador?</h3>
            <p className="nps-q-sub">Edificio corporativo · Las Condes · Servicio de abril 2026</p>
            <div className="nps-scale" role="radiogroup" aria-label="Puntaje de 0 a 10">
              {Array.from({length: 11}, (_, i) => (
                <button key={i} type="button" className={score === i ? 'selected' : ''} onClick={() => pick(i)}>
                  {i}
                </button>
              ))}
            </div>
            <div className="nps-scale-labels">
              <span>Nada probable</span>
              <span>Muy probable</span>
            </div>
          </>
        )}

        {step === 'followup' && segment && (
          <form onSubmit={submit}>
            <span className={'seg-pill ' + segment}>
              {segment === 'promoter' ? 'Promotor' : segment === 'passive' ? 'Pasivo' : 'Detractor'} · puntaje {score}
            </span>
            <h3 className="nps-q mt-32">{FOLLOWUP_COPY[segment].q}</h3>
            <div className="nps-followup">
              <textarea value={followup} onChange={e => setFollowup(e.target.value)} placeholder={FOLLOWUP_COPY[segment].ph}></textarea>
              <button type="submit" className="btn btn-primary" style={{justifyContent: 'center'}}>
                Enviar respuesta <Icon.Arrow/>
              </button>
            </div>
          </form>
        )}

        {step === 'thanks' && segment && (
          <div className={'nps-thanks ' + segment}>
            <span className="badge">
              {segment === 'promoter' ? <Icon.Check size={26}/> : segment === 'detractor' ? <Icon.Phone size={22}/> : <Icon.Mail size={22}/>}
            </span>
            <h3>{THANKS_COPY[segment].title}</h3>
            <p>{THANKS_COPY[segment].body}</p>
            {THANKS_COPY[segment].cta && (
              <a className="btn btn-primary" href="#" style={{marginBottom: 12}}>{THANKS_COPY[segment].cta}</a>
            )}
            <div>
              <button className="btn btn-ghost" onClick={restart} type="button">Ver otra simulación de puntaje</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
window.NPSSurvey = NPSSurvey;
