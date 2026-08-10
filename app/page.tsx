"use client";

import { FormEvent, useState } from "react";

const stats = [
  { value: "44%", text: "de las PyMEs mexicanas ya probó una herramienta de IA, pero solo 19% la usa de forma sistemática", source: "Endeavor México / agentedigitalizado.com, 2026" },
  { value: "+15%", text: "más casos resueltos por hora en atención al cliente con IA generativa", source: "Brynjolfsson, Li & Raymond, Quarterly Journal of Economics, 2025" },
  { value: "−40%", text: "de tiempo en tareas de redacción, con +18% de calidad", source: "Noy & Zhang, Science, 2023" },
  { value: "38.9%", text: "de los empresarios mexicanos dice que la falta de conocimiento es su principal freno para adoptar IA", source: "Alegra, Pulso Pymes LATAM, 2026" },
];

const reasons = [
  ["Autoridad editorial, no un curso genérico", "Digitalizados es el medio de tecnología y negocios de LATAM. No improvisamos contenido de IA para vender un curso: es nuestro trabajo diario cubrirlo."],
  ["Contenido siempre actualizado", "Analizamos herramientas y tendencias de IA todos los días. Lo que enseñamos se actualiza con lo que realmente está pasando."],
  ["Una cara visible, con trayectoria real", "El programa lo lidera Abraham Rivv, con años de experiencia ayudando a empresas de tecnología a implementar herramientas y crecer en mercados de habla hispana."],
  ["Enfoque LATAM, no una traducción", "Ejemplos, casos y plantillas pensados para cómo opera realmente una PyME mexicana o latinoamericana."],
  ["Comunidad, no un curso que desaparece", "Acceso a la comunidad de Digitalizados al terminar: sigues cerca de herramientas y tendencias después de las 6 semanas."],
];

const route = [
  { day: "DÍA 1—7", title: "Diagnóstico", copy: "Mapeamos en dónde se te van las horas y el dinero. Sales con una línea base de KPIs y un primer quick win implementado.", tag: "MAPEAR", visual: "Tiempo → tarea → costo" },
  { day: "DÍA 8—X", title: "Primer proceso en producción", copy: "Implementamos respuesta automática a leads o atención al cliente, con supervisión humana. Medimos el antes y el después.", tag: "ACTIVAR", visual: "Lead → IA → revisión" },
  { day: "DÍA X—X", title: "Segundo proceso en producción", copy: "Sumamos contenido o cotizaciones asistidas por IA. Tu equipo ya está usando ambos procesos de forma autónoma.", tag: "ESCALAR", visual: "Brief → borrador → listo" },
  { day: "DÍA X—X", title: "Medición y hoja de ruta", copy: "Revisamos resultados reales contra la línea base y dejamos un plan para el siguiente proceso a automatizar.", tag: "MEDIR", visual: "Antes ↗ después" },
];

const plans = [
  { name: "Educativo", price: "USD 400–500", format: "Grupal, autoservicio guiado", duration: "6 semanas", processes: "A tu ritmo", support: "Comunidad + Q&A grupal", kpis: "—", ideal: "Explorar antes de invertir más", cta: "Empezar aquí" },
  { name: "Implementación", price: "USD 800–1,200", format: "Grupal + acompañamiento", duration: "6 semanas", processes: "2 procesos garantizados", support: "Office hours + asíncrono", kpis: "Incluido", ideal: "Pequeña empresa con leads entrantes", cta: "Quiero este", featured: true },
  { name: "Premium", price: "USD 2,500–4,000", format: "1:1 con diagnóstico", duration: "8–12 semanas", processes: "A la medida", support: "Consultor asignado", kpis: "Incluido + personalizado", ideal: "Mediana empresa / mayor complejidad", cta: "Hablemos" },
];

const faqs = [
  ["Es caro para mi empresa", "Compáralo con el costo de una contratación o con las horas que hoy se pierden en tareas repetitivas: te ayudamos a hacer esa cuenta en el diagnóstico. También puedes pagarlo hasta en 3 meses sin intereses."],
  ["¿Puedo pagarlo en partes?", "Sí. Aceptamos pago en una sola exhibición o hasta en 3 meses sin intereses (MSI) con tarjeta de crédito de consumo emitida en México, a través de Stripe."],
  ["No tengo tiempo para esto", "Está diseñado para dueños ocupados: 3–4 horas por semana durante 8 semanas, no más."],
  ["Mi negocio es muy específico", "Trabajamos con plantillas por industria y un diagnóstico inicial antes de personalizar."],
  ["Mi equipo no lo va a usar", "Designamos a una persona campeona dentro de tu empresa y trabajamos la gestión del cambio como parte del programa."],
  ["¿Qué pasa con la privacidad de mis datos y los de mis clientes?", "El programa incluye un módulo de cumplimiento con la Ley Federal de Protección de Datos Personales vigente en México."],
  ["Ya probé ChatGPT y no pasó nada", "La diferencia es implementar procesos completos con medición, no lanzar prompts sueltos sin seguimiento."],
  ["No sé nada de tecnología", "No se requiere programar ni tener un equipo técnico: usamos herramientas que probablemente ya conoces."],
  ["¿Cómo sé que va a funcionar para mí?", "Sales con un tablero de KPIs antes/después: mides tú mismo el resultado, no te pedimos que nos creas."],
  ["¿Por qué Digitalizados y no cualquier curso de IA?", "Porque no somos un curso armado para vender un curso: somos el medio que cubre IA y tecnología en LATAM todos los días, y el contenido está siempre actualizado."],
];

const pain = ["Leads que llegan por WhatsApp y nadie contesta a tiempo.", "Noches enteras redactando propuestas y cotizaciones.", "Contenido que no alcanzas a publicar, aunque sabes que deberías.", "Reportes que se arman a mano, mes tras mes.", "Un equipo saturado —y la sensación de que contratar a alguien más no resuelve el problema de fondo."].map((x) => <li key={x}>{x}</li>);

function Cta({ children = "Agenda tu diagnóstico gratuito", className = "" }: { children?: React.ReactNode; className?: string }) {
  return <a className={`button ${className}`} href="#diagnostico">{children}<span aria-hidden="true">↗</span></a>;
}

export default function Home() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSent(true); }

  return <>
    <header className="nav-wrap">
      <nav className="nav shell" aria-label="Navegación principal">
        <a className="brand" href="#inicio" aria-label="Digitalizados, inicio"><img src="/dgt-logo.png" alt="Digitalizados" /></a>
        <div className="nav-links"><a href="#programa">Programa</a><a href="#ruta">Ruta</a><a href="#niveles">Niveles</a><a href="#faq">FAQ</a></div>
        <Cta className="nav-cta">Diagnóstico gratis</Cta>
      </nav>
    </header>

    <main>
      <section className="hero" id="inicio">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <h1>Implementa IA en tu empresa en <em>6 semanas</em></h1>
            <p className="lede">Un programa práctico —no un curso teórico— del medio que cubre IA y tecnología para LATAM todos los días. Sales con procesos funcionando y resultados medidos, no con una lista de ideas.</p>
            <div className="hero-actions"><Cta/><a className="text-link" href="#ruta">Ver cómo funciona <span>↓</span></a></div>
            <p className="payment-note">Paga en 1 sola exhibición o hasta en 3 meses sin intereses con tu tarjeta (Stripe).</p>
          </div>
          <aside className="hero-report" aria-label="Resumen del programa">
            <div className="report-top"><span>REPORTE DE IMPLEMENTACIÓN</span><span className="live-dot">EN PRODUCCIÓN</span></div>
            <div className="report-main"><p>OBJETIVO OPERATIVO</p><strong>2 procesos</strong><span>funcionando dentro de tu empresa</span></div>
            <div className="report-lines"><div><span>Diagnóstico</span><b>01</b></div><div><span>Implementación</span><b>02</b></div><div><span>Medición</span><b>03</b></div></div>
            <div className="report-footer"><span>SEMANA 01</span><div className="progress"><i/></div><span>SEMANA 06</span></div>
          </aside>
        </div>
      </section>

      <section className="data-strip" aria-labelledby="datos-title"><div className="shell"><div className="strip-heading"><span id="datos-title">SEÑALES DEL MERCADO</span><span>Datos verificables, no opinión</span></div><div className="stats-grid">{stats.map(s => <article className="stat" key={s.value}><strong>{s.value}</strong><p>{s.text}</p><small>FUENTE — {s.source}</small></article>)}</div></div></section>

      <section className="section light" id="programa"><div className="shell"><div className="section-head split"><div><p className="eyebrow dark">LA DIFERENCIA</p><h2>Esto no lo arma un “gurú”.</h2></div><p>Lo arma el medio que vive cubriendo IA y tecnología para LATAM todos los días.</p></div><div className="reasons">{reasons.map(([title, copy], i) => <article key={title}><span className="reason-mark">{["◆","↻","◎","⌁","∞"][i]}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

      <section className="section video-section" aria-labelledby="video-title"><div className="shell video-grid"><div className="video-copy"><p className="eyebrow">APRENDE CON DIGITALIZADOS</p><h2 id="video-title">El mejor curso gratuito de Claude, <em>hecho por nosotros.</em></h2><p>Más de <strong>7,000 personas</strong> ya aprendieron de IA con este video. Puedes empezar ahora mismo, sin registro y a tu ritmo.</p><a className="text-link" href="https://youtu.be/PtZBSN1W91Y?si=gCVEcwfEWGdoefOG" target="_blank" rel="noreferrer">Ver directamente en YouTube <span>↗</span></a></div><div className="video-frame"><div className="video-label"><span>CURSO GRATUITO</span><span>CLAUDE · DIGITALIZADOS</span></div><iframe src="https://www.youtube-nocookie.com/embed/PtZBSN1W91Y?rel=0" title="El mejor curso gratuito de Claude, hecho por Digitalizados" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" /></div></div></section>

      <section className="section pain-section"><div className="shell pain-grid"><div><p className="eyebrow">EL PROBLEMA NO ES TU EQUIPO</p><h2>Tu equipo no necesita trabajar más horas. <em>Necesita dejar de perderlas.</em></h2></div><div><ul className="pain-list">{pain}</ul><p className="pain-close">Ya probaste ChatGPT una vez... y no pasó nada. Nadie lo volvió a usar.</p></div></div></section>

      <section className="section route-section" id="ruta"><div className="shell"><div className="section-head split"><div><p className="eyebrow dark">LA RUTA · DE IDEA A OPERACIÓN</p><h2>Así funciona.</h2></div><p>Implementamos primero. Medimos después. Cada etapa deja algo concreto funcionando.</p></div><div className="route">{route.map((r, i) => <article className="route-item" key={r.title}><div className="route-visual"><div className="visual-grid"><span>{r.tag}</span><strong>{r.visual}</strong><i style={{width:`${58 + i*11}%`}}/></div></div><div className="route-copy"><p className="route-day">{String(i+1).padStart(2,"0")} / {r.day}</p><h3>{r.title}</h3><p>{r.copy}</p></div></article>)}</div><div className="mid-cta"><p>¿Quieres saber cuál sería tu primer proceso?</p><Cta>Lo vemos en 20 minutos</Cta></div></div></section>

      <section className="section deliverables"><div className="shell"><p className="eyebrow">AL FINAL NO TE LLEVAS UN DIPLOMA</p><h2>Te llevas una operación más clara.</h2><div className="deliver-grid"><article><b>01</b><h3>Tablero de KPIs</h3><p>Una línea base y resultados antes/después que tu equipo puede revisar.</p></article><article><b>02</b><h3>Procesos en producción</h3><p>Dos flujos reales, con supervisión humana y responsables definidos.</p></article><article><b>03</b><h3>Hoja de ruta</h3><p>El siguiente proceso priorizado por impacto, esfuerzo y riesgo.</p></article></div></div></section>

      <section className="section pricing-section" id="niveles"><div className="shell"><div className="section-head split"><div><p className="eyebrow dark">TRES FORMAS DE EMPEZAR</p><h2>Elige cuánto acompañamiento necesitas.</h2></div><p>Implementación es el punto de partida recomendado para una PyME con operación activa.</p></div><div className="plans">{plans.map(p => <article className={`plan ${p.featured ? "featured" : ""}`} key={p.name}>{p.featured && <div className="ribbon">★ MÁS ELEGIDO</div>}<div className="plan-head"><p>{p.name}</p><strong>{p.price}</strong></div><dl><div><dt>Formato</dt><dd>{p.format}</dd></div><div><dt>Duración</dt><dd>{p.duration}</dd></div><div><dt>Procesos</dt><dd>{p.processes}</dd></div><div><dt>Soporte</dt><dd>{p.support}</dd></div><div><dt>Tablero de KPIs</dt><dd>{p.kpis}</dd></div><div><dt>Forma de pago</dt><dd>1 pago o hasta 3 MSI</dd></div><div><dt>Ideal para</dt><dd>{p.ideal}</dd></div></dl><a className="plan-button" href="#diagnostico">{p.cta} <span>↗</span></a></article>)}</div><p className="fineprint">“Hasta 3 MSI” = meses sin intereses vía Stripe, con tarjeta de crédito de consumo emitida en México.</p></div></section>

      <section className="guarantee"><div className="shell guarantee-grid"><div><p className="eyebrow">GARANTÍA DE IMPLEMENTACIÓN</p><span className="shield">✓</span></div><blockquote>“Si al terminar las 6 semanas no tienes al menos 2 procesos de IA funcionando en tu operación, seguimos trabajando contigo sin costo adicional hasta lograrlo.”</blockquote></div></section>

      <section className="section fit-section"><div className="shell"><div className="fit-grid"><article><p className="eyebrow dark">ES PARA TI SI...</p><ul>{["Recibes leads o clientes de forma constante", "Tu equipo cotiza, contesta o redacta repetidamente", "Ya usas WhatsApp Business, un CRM o Excel ordenado", "Alguien en tu equipo puede liderar la implementación"].map(x=><li key={x}>{x}</li>)}</ul></article><article className="not-fit"><p className="eyebrow dark">NO ES PARA TI SI...</p><ul>{["No tienes flujo entrante de prospectos", "Operas 100% en efectivo y papel", "No tienes ni 3 horas a la semana", "Buscas una solución “mágica” sin involucrarte"].map(x=><li key={x}>{x}</li>)}</ul></article></div></div></section>

      <section className="section faq-section" id="faq"><div className="shell faq-grid"><div><p className="eyebrow dark">PREGUNTAS FRECUENTES</p><h2>Las dudas antes de empezar.</h2><p>Sin letra pequeña. Si tu caso es distinto, lo vemos en el diagnóstico.</p></div><div className="accordion">{faqs.map(([q,a], i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>

      <section className="diagnostic" id="diagnostico"><div className="shell diagnostic-grid"><div><p className="eyebrow">DIAGNÓSTICO GRATUITO · 20 MINUTOS</p><h2>Identifica dónde la IA tendría mayor impacto antes de invertir.</h2><p>Revisamos tu operación, elegimos un primer proceso viable y te decimos con honestidad si el programa encaja.</p><div className="call-points"><span>01 · Sin compromiso</span><span>02 · Sin preparación técnica</span><span>03 · Con siguiente paso claro</span></div></div><form onSubmit={submit} className="lead-form">{sent ? <div className="success" role="status"><span>✓</span><h3>Solicitud recibida.</h3><p>Gracias. Te contactaremos para coordinar tu diagnóstico de 20 minutos.</p><button type="button" onClick={()=>setSent(false)}>Enviar otra solicitud</button></div> : <><div className="form-row"><label>Nombre<input name="nombre" required autoComplete="name" placeholder="Tu nombre"/></label><label>Empresa<input name="empresa" required autoComplete="organization" placeholder="Nombre de tu empresa"/></label></div><label>¿Cuántas personas trabajan en tu equipo?<select name="equipo" required defaultValue=""><option value="" disabled>Selecciona una opción</option><option>1–3</option><option>4–10</option><option>11–50</option><option>51+</option></select></label><label>¿Cuántos leads o clientes nuevos recibes al mes, aproximadamente?<input name="leads" required inputMode="numeric" placeholder="Ej. 40"/></label><label>¿Cuál es tu mayor reto operativo hoy?<select name="reto" required defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Atención al cliente</option><option>Ventas y cotizaciones</option><option>Contenido y marketing</option><option>Administración</option><option>Otro</option></select></label><label>WhatsApp o correo de contacto<input name="contacto" required placeholder="Tu WhatsApp o correo"/></label><button className="submit" type="submit">Quiero mi diagnóstico gratuito <span>↗</span></button><small>Al enviar aceptas que Digitalizados te contacte sobre esta solicitud. No compartimos tus datos.</small></>}</form></div></section>

      <section className="final-cta"><div className="shell"><p className="eyebrow">EL MOMENTO ES AHORA. EL HYPE NO.</p><h2>Tu competencia ya está probando IA. La diferencia la va a hacer quién la implemente de verdad.</h2><p>Empieza con un diagnóstico gratuito de 20 minutos —sin compromiso. Paga en 1 sola exhibición o hasta en 3 meses sin intereses.</p><Cta>Agendar mi diagnóstico</Cta></div></section>
    </main>

    <footer><div className="shell footer-grid"><div><a className="brand footer-brand" href="#inicio"><img src="/dgt-logo.png" alt="Digitalizados" /></a><p>El medio de tecnología y negocios de LATAM.</p></div><div><h3>Programa</h3><a href="#programa">La diferencia</a><a href="#ruta">Cómo funciona</a><a href="#niveles">Niveles</a><a href="#faq">FAQ</a></div><div><h3>Digitalizados</h3><a href="#">Contacto</a><a href="#">Instagram</a><a href="#">LinkedIn</a></div><div><h3>Legal</h3><a href="#">Aviso de privacidad</a><p>Los resultados varían según la empresa; las cifras mostradas son estimaciones basadas en fuentes públicas y casos previos, no garantías.</p></div></div><div className="shell footer-bottom"><span>© 2026 Digitalizados</span><span>MSI sujeto a elegibilidad de tu tarjeta y términos de Stripe; monto mínimo y comisión pueden variar.</span></div></footer>
  </>;
}
