// === NPS — Distribución multicanal (QR / WhatsApp / Email) + recomendaciones ===
function NPSDistribution() {
  return (
    <div>
      <div className="reco-banner">
        <span className="ico"><Icon.Check size={20}/></span>
        <div>
          <h4>Recomendación: combinar cadencia relacional y transaccional</h4>
          <p>
            Para una operación B2B como Diplomatic (13 clientes, contratos anuales), lo que más mueve la aguja no es el canal de moda sino la <b>cobertura de cuenta</b>: encuestar a cada cliente, cada mes, y cerrar el ciclo con quien puntúa bajo.
            La encuesta relacional mensual va adjunta al IMDI (email); la transaccional se activa tras una visita puntual o el cierre de una incidencia (QR en sitio o WhatsApp).
          </p>
        </div>
      </div>

      <div className="channel-grid">
        <article className="channel-card">
          <span className="tag transaccional">Transaccional</span>
          <span className="ico-wrap"><Icon.Pin size={20}/></span>
          <h4>QR en sitio</h4>
          <div className="qr-mock" aria-hidden="true"></div>
          <p>Un adhesivo con QR en la recepción o sala de control del edificio. El cliente escanea al terminar una visita de supervisión o una reunión presencial.</p>
          <div className="meta">Mejor para: visitas programadas · reuniones in situ</div>
        </article>

        <article className="channel-card">
          <span className="tag transaccional">Transaccional</span>
          <span className="ico-wrap"><Icon.Whatsapp size={20}/></span>
          <h4>WhatsApp</h4>
          <div className="wa-mock">
            <div className="wa-bubble">
              Hola <b>Marcela</b> 👋 Gracias por la reunión de hoy. ¿Nos ayudas con 30 segundos de feedback sobre el servicio? <br/><br/>
              🔗 diplomatic.cl/encuesta
            </div>
            <div className="wa-time">Enviado 14:32 · abre 88% de las veces</div>
          </div>
          <p>Mensaje corto al finalizar una visita o resolver una incidencia. Mayor tasa de apertura que el email — ideal para feedback en caliente.</p>
          <div className="meta">Mejor para: post-incidencia · seguimiento inmediato</div>
        </article>

        <article className="channel-card">
          <span className="tag relacional">Relacional</span>
          <span className="ico-wrap"><Icon.Mail size={20}/></span>
          <h4>Email + IMDI</h4>
          <div className="email-mock">
            <div className="head">De: l.lopez@diplomatic.cl · Asunto: Tu IMDI de abril + 1 pregunta rápida</div>
            <div className="body">
              Adjunto encontrarás el informe del mes. Antes de irte, ¿nos recomendarías a otro gerente de edificio?
              <div className="cta">Responder en 30 segundos →</div>
            </div>
          </div>
          <p>El enlace a la encuesta se adjunta al envío mensual del IMDI — el cliente ya está revisando el servicio, es el momento de más contexto.</p>
          <div className="meta">Mejor para: pulso mensual · contratos largos</div>
        </article>
      </div>

      <h4 className="eyebrow" style={{marginBottom: 16, display: 'block'}}>Por qué esta cadencia</h4>
      <div className="timing-strip">
        <div className="timing-item">
          <div className="k">24-48h</div>
          <p>Ventana ideal tras una visita o incidencia — la experiencia sigue fresca sin ser intrusiva.</p>
        </div>
        <div className="timing-item">
          <div className="k">1x / mes</div>
          <p>Cadencia relacional ligada al ciclo del IMDI — sin sobrecargar al cliente con encuestas.</p>
        </div>
        <div className="timing-item">
          <div className="k">Multicanal</div>
          <p>Email solo alcanza ~12% de respuesta en B2B; sumar WhatsApp y QR eleva la cobertura de cuenta.</p>
        </div>
        <div className="timing-item">
          <div className="k">Cierre en 24h</div>
          <p>Todo detractor recibe contacto humano dentro de 24 horas hábiles — antes de que escale.</p>
        </div>
      </div>
    </div>
  );
}
window.NPSDistribution = NPSDistribution;
