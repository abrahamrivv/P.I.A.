"use client";

import { FormEvent, useEffect, useState } from "react";

const stats = [
  { value: "44%", text: "de las PyMEs mexicanas ya probó una herramienta de IA, pero solo 19% la usa de forma sistemática", source: "Endeavor México / agentedigitalizado.com, 2026" },
  { value: "+15%", text: "más casos resueltos por hora en atención al cliente con IA generativa", source: "Brynjolfsson, Li & Raymond, Quarterly Journal of Economics, 2025" },
  { value: "−40%", text: "de tiempo en tareas de redacción, con +18% de calidad", source: "Noy & Zhang, Science, 2023" },
  { value: "38.9%", text: "de los empresarios mexicanos dice que la falta de conocimiento es su principal freno para adoptar IA", source: "Alegra, Pulso Pymes LATAM, 2026" },
];

const reasons = [
  ["Autoridad editorial, no una consultora improvisada", "Digitalizados es el medio de tecnología y negocios de LATAM. No llegamos a tu empresa con lo que leímos en un blog: es nuestro trabajo diario cubrir esto."],
  ["Contenido siempre actualizado", "Analizamos herramientas y tendencias de IA todos los días. Lo que enseñamos se actualiza con lo que realmente está pasando."],
  ["Una cara visible, con trayectoria real", "El programa lo lidera Abraham Rivv, con años de experiencia ayudando a empresas de tecnología a implementar herramientas y crecer en mercados de habla hispana."],
  ["Enfoque LATAM, no una traducción", "Ejemplos, casos y plantillas pensados para cómo opera realmente una PyME mexicana o latinoamericana."],
  ["Acceso a nuestra red, no un proveedor que desaparece", "Al terminar la implementación, sigues cerca de Digitalizados: herramientas nuevas, tendencias, y la puerta abierta para el siguiente proceso a automatizar."],
];

const route = [
  { day: "1—2 SEMANAS", title: "Diagnóstico", copy: "Mapeamos tu operación: en dónde se va el tiempo y el dinero. Sales con una línea base de KPIs.", tag: "MAPEAR", visual: "Tiempo → tarea → costo" },
  { day: "PRIORIZACIÓN", title: "Roadmap", copy: "Priorizamos los procesos por impacto, esfuerzo y riesgo, y acordamos contigo cuáles se implementan primero.", tag: "PRIORIZAR", visual: "Impacto × esfuerzo × riesgo" },
  { day: "4—8 SEMANAS", title: "Implementación", copy: "Construimos e implementamos el o los procesos priorizados, con supervisión humana en cada paso. En paralelo, designamos a un responsable dentro de tu empresa y hacemos la gestión del cambio necesaria para que el equipo lo adopte — no solo que exista.", tag: "CONSTRUIR", visual: "Proceso → producción" },
  { day: "RESULTADOS", title: "Medición", copy: "Medimos antes y después con datos reales, no percepción, contra la línea base del diagnóstico. Cerramos con el siguiente proceso priorizado — muchos clientes pasan de una implementación puntual a una relación continua.", tag: "MEDIR", visual: "Antes ↗ después" },
];

const tiers = [
  { name: "Sprint de Implementación", copy: "Un proceso, implementado de principio a fin. Ideal si tienes un dolor claro y urgente y quieres ver resultado rápido antes de comprometerte a más." },
  { name: "Transformación de Operación", copy: "Varios procesos, cross-departamento, con consultor asignado y tablero de KPIs. Para empresas con más de un cuello de botella que resolver.", featured: true },
  { name: "Partner de IA", copy: "Relación continua — nuevos procesos cada trimestre, acceso prioritario al equipo. Para empresas que ya implementaron y quieren seguir escalando con nosotros como su equipo de IA externo." },
];

const segments = [
  { name: "Startups y scaleups", pain: "Crecen rápido pero sin procesos definidos — todo se resuelve “a mano” y no escala con el equipo.", processes: "Automatización de operaciones internas (onboarding, soporte, reporting a inversionistas), agentes para tareas repetitivas de growth y ventas." },
  { name: "PyMEs", detail: "(agencias, servicios profesionales, inmobiliarias, e-commerce, etc.)", pain: "Leads sin contestar a tiempo, cotizaciones y reportes que tardan días en salir.", processes: "Respuesta automática a leads con supervisión humana, generación asistida de propuestas, reportería automatizada." },
  { name: "Enterprise", pain: "Sistemas y datos dispersos entre áreas, decisiones lentas por falta de visibilidad.", processes: "Integración de sistemas dispersos en un flujo único, dashboards con IA, agentes con supervisión humana en procesos de mayor volumen." },
];

const faqs = [
  ["Es caro para mi empresa", "Compáralo con el costo de una contratación o con las horas que hoy se pierden en tareas repetitivas: te ayudamos a hacer esa cuenta en el diagnóstico."],
  ["¿Puedo pagarlo en partes?", "Sí. Normalmente trabajamos con un anticipo para arrancar y el resto contra entregas, con factura. El esquema exacto lo definimos en el diagnóstico, según el alcance."],
  ["No tengo tiempo para esto", "Necesitamos acceso y decisiones rápidas de un responsable de tu lado, no que tu equipo lo construya."],
  ["Mi negocio es muy específico", "Trabajamos con plantillas por industria y un diagnóstico inicial antes de personalizar."],
  ["Mi equipo no lo va a usar", "Designamos a una persona campeona dentro de tu empresa y trabajamos la gestión del cambio como parte de la implementación."],
  ["¿Qué pasa con la privacidad de mis datos y los de mis clientes?", "Trabajamos bajo la ley de protección de datos vigente donde operes — la Ley Federal en México, la LGPD en Brasil o la Ley 1581 en Colombia — y cuidamos tanto tus datos como los de tus clientes en cada proceso que implementamos."],
  ["Ya probé ChatGPT y no pasó nada", "La diferencia es implementar procesos completos con medición, no lanzar prompts sueltos sin seguimiento."],
  ["No sé nada de tecnología", "No se requiere programar ni tener un equipo técnico: usamos herramientas que probablemente ya conoces."],
  ["¿Cómo sé que va a funcionar para mí?", "Sales con un tablero de KPIs antes/después: mides tú mismo el resultado, no te pedimos que nos creas."],
  ["¿Por qué Digitalizados y no una consultora de IA cualquiera?", "Porque no llegamos a improvisar: somos el medio que cubre IA y tecnología en LATAM todos los días, y esa lectura del terreno la aplicamos directo en tu operación."],
  ["¿Cómo saben que funcionará para nuestro tipo de negocio?", "Empezamos con diagnóstico, no con supuestos. Si no vemos un caso de negocio claro, te lo decimos con honestidad antes de cobrar nada."],
  ["¿Trabajan con nuestro equipo de tecnología interno (si lo tenemos)?", "Sí, nos integramos con quien ya tengas; no venimos a reemplazar, venimos a acelerar."],
];

const pain = ["Leads que llegan por WhatsApp y nadie contesta a tiempo.", "Noches enteras redactando propuestas y cotizaciones.", "Contenido que no alcanzas a publicar, aunque sabes que deberías.", "Reportes que se arman a mano, mes tras mes.", "Un equipo saturado. Contratar a alguien más no resuelve el problema de fondo."].map((x) => <li key={x}>{x}</li>);

function Cta({ children = "Agenda tu diagnóstico gratuito", className = "" }: { children?: React.ReactNode; className?: string }) {
  return <a className={`button ${className}`} href="#diagnostico">{children}<span aria-hidden="true">↗</span></a>;
}

export default function Home() {
  const [sent, setSent] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [firstStepData, setFirstStepData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currentData = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    if (formStep === 1) { setFirstStepData(currentData); setFormStep(2); setFormError(""); return; }
    setSubmitting(true); setFormError("");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...firstStepData, ...currentData }) });
      if (!response.ok) throw new Error("No pudimos guardar tu solicitud.");
      setSent(true);
    } catch { setFormError("No pudimos enviar tus datos. Inténtalo de nuevo en un momento."); }
    finally { setSubmitting(false); }
  }

  return <>
    <header className="nav-wrap">
      <nav className="nav shell" aria-label="Navegación principal">
        <a className="brand" href="#inicio" aria-label="Digitalizados, inicio"><img src="/dgt-logo.png" alt="Digitalizados" /></a>
        <div className="nav-links"><a href="#programa">La diferencia</a><a href="#ruta">Cómo trabajamos</a><a href="#niveles">Modalidades</a><a href="#faq">FAQ</a></div>
        <Cta className="nav-cta">Diagnóstico gratis</Cta>
      </nav>
    </header>

    <main>
      <section className="hero" id="inicio">
        <div className="hero-bg" aria-hidden="true"><span className="orb orb-1"/><span className="orb orb-2"/><span className="orb orb-3"/></div>
        <div className="shell hero-copy hero-centered">
          <p className="hero-tag" data-reveal>AGENCIA DE IMPLEMENTACIÓN DE IA · MÉXICO Y LATAM</p>
          <h1 data-reveal style={{transitionDelay:".05s"}}>Implementamos IA en tu empresa. <em>Nosotros hacemos el trabajo.</em></h1>
          <p className="lede" data-reveal style={{transitionDelay:".12s"}}>No es un curso ni una plantilla. Es un equipo que entra a tu operación, identifica dónde se pierde tiempo y dinero, y deja procesos de IA funcionando — medidos, no prometidos.</p>
          <div className="hero-actions" data-reveal style={{transitionDelay:".19s"}}><Cta>Agenda una llamada de diagnóstico</Cta><a className="text-link" href="#ruta">Ver cómo trabajamos <span>↓</span></a></div>
        </div>
      </section>

      <section className="data-strip" aria-labelledby="datos-title"><div className="shell"><div className="strip-heading" data-reveal><span id="datos-title">SEÑALES DEL MERCADO</span><span>Datos verificables, no opinión</span></div><div className="stats-grid">{stats.map((s, i) => <article className="stat" key={s.value} data-reveal style={{transitionDelay:`${i*70}ms`}}><strong>{s.value}</strong><p>{s.text}</p><small>FUENTE: {s.source}</small></article>)}</div></div></section>

      <section className="section light" id="programa"><div className="shell"><div className="section-head split" data-reveal><div><p className="eyebrow dark">LA DIFERENCIA</p><h2>Esto no lo arma un “gurú” ni una consultora genérica.</h2></div><p>Lo arma el medio que vive cubriendo IA y tecnología para LATAM todos los días — y lo implementamos nosotros mismos en tu operación.</p></div><div className="reasons">{reasons.map(([title, copy], i) => <article key={title} data-reveal style={{transitionDelay:`${i*55}ms`}}><span className="reason-mark">{["◆","↻","◎","⌁","∞"][i]}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

      <section className="section video-section" aria-labelledby="video-title"><div className="shell video-grid"><div className="video-copy" data-reveal><p className="eyebrow">APRENDE CON DIGITALIZADOS</p><h2 id="video-title">El mejor curso gratuito de Claude, <em>hecho por nosotros.</em></h2><p>Más de <strong>7,000 personas</strong> ya aprendieron de IA con este video. Puedes empezar ahora mismo, sin registro y a tu ritmo.</p><a className="text-link" href="https://youtu.be/PtZBSN1W91Y?si=gCVEcwfEWGdoefOG" target="_blank" rel="noreferrer">Ver directamente en YouTube <span>↗</span></a></div><div className="video-frame"><div className="video-label"><span>CURSO GRATUITO</span><span>CLAUDE · DIGITALIZADOS</span></div><iframe src="https://www.youtube-nocookie.com/embed/PtZBSN1W91Y?rel=0" title="El mejor curso gratuito de Claude, hecho por Digitalizados" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" /></div></div></section>

      <section className="live-section" aria-labelledby="live-title"><div className="shell"><div className="live-head" data-reveal><div><p className="eyebrow dark">DIGITALIZADOS LIVE</p><h2 id="live-title">No hablamos de IA desde afuera. <em>La probamos en vivo.</em></h2></div><p>Sesiones reales analizando herramientas, cambios de producto y aplicaciones para negocio. Así mantenemos el programa conectado con lo que está pasando ahora.</p></div><div className="live-gallery"><figure className="live-main"><img src="/dgt-live-claude.webp" alt="Sesión de Digitalizados Live analizando nuevas reglas de contexto en Claude" loading="lazy"/><figcaption><span>ANÁLISIS EN VIVO</span><strong>Claude y context engineering</strong></figcaption></figure><figure><img src="/dgt-live-patron-digital.webp" alt="Sesión de Digitalizados Live desarrollando el concepto El Patrón Digital" loading="lazy"/><figcaption><span>CONSTRUCCIÓN EN PÚBLICO</span><strong>IA aplicada a contenido y marca</strong></figcaption></figure><figure><img src="/dgt-live-kimi.webp" alt="Sesión de Digitalizados Live explorando herramientas y conectores de Kimi" loading="lazy"/><figcaption><span>PRUEBA DE HERRAMIENTAS</span><strong>Nuevas capacidades de IA</strong></figcaption></figure></div></div></section>

      <section className="section pain-section"><div className="shell pain-grid"><div data-reveal><p className="eyebrow">EL PROBLEMA NO ES TU EQUIPO</p><h2>Tu equipo no necesita trabajar más horas. <em>Necesita dejar de perderlas.</em></h2></div><div data-reveal style={{transitionDelay:".1s"}}><ul className="pain-list">{pain}</ul><p className="pain-close">Ya probaste ChatGPT una vez... y no pasó nada. Nadie lo volvió a usar.</p><p className="pain-close">El problema no es la herramienta. Es que nadie en tu empresa tiene el tiempo ni el mandato para implementarla de verdad. Por eso lo hacemos nosotros.</p></div></div></section>

      <section className="section sectors-section"><div className="shell"><div className="section-head split" data-reveal><div><p className="eyebrow dark">SECTORES</p><h2>Trabajamos en los sectores que ya conocemos.</h2></div><p>No llegamos genéricos. Cada segmento tiene sus propios procesos, herramientas y objeciones — y ya los mapeamos.</p></div><div className="sectors-grid">{segments.map((s, i) => <article className="sector" key={s.name} data-reveal style={{transitionDelay:`${i*80}ms`}}><div className="sector-head"><h3>{s.name}</h3>{s.detail && <span>{s.detail}</span>}</div><div className="sector-row"><p className="sector-label">Dolor nombrado</p><p>{s.pain}</p></div><div className="sector-row"><p className="sector-label">Procesos típicos que implementamos</p><p>{s.processes}</p></div></article>)}</div></div></section>

      <section className="section route-section" id="ruta"><div className="shell"><div className="section-head split" data-reveal><div><p className="eyebrow dark">CÓMO TRABAJAMOS</p><h2>Así trabajamos. Nosotros ejecutamos, tú apruebas.</h2></div><p>Sin roadmaps de 6 meses ni presentaciones de 200 slides. Vamos directo a lo que mueve la aguja.</p></div><div className="route">{route.map((r, i) => <article className="route-item" key={r.title} data-reveal><div className="route-visual"><div className="visual-grid"><span>{r.tag}</span><strong>{r.visual}</strong><i style={{width:`${58 + i*11}%`}}/></div></div><div className="route-copy"><p className="route-day">{String(i+1).padStart(2,"0")} / {r.day}</p><h3>{r.title}</h3><p>{r.copy}</p></div></article>)}</div><div className="mid-cta" data-reveal><p>¿Quieres saber cuál sería tu primer proceso?</p><Cta>Lo vemos en 20 minutos</Cta></div></div></section>

      <section className="section deliverables"><div className="shell"><div data-reveal><p className="eyebrow">AL FINAL NO TE LLEVAS UN DIPLOMA</p><h2>Te llevas una operación más clara.</h2></div><div className="deliver-grid"><article data-reveal><b>01</b><h3>Tablero de KPIs</h3><p>Una línea base y resultados antes/después que tu equipo puede revisar.</p></article><article data-reveal style={{transitionDelay:".08s"}}><b>02</b><h3>Procesos en producción</h3><p>Dos flujos reales, con supervisión humana y responsables definidos.</p></article><article data-reveal style={{transitionDelay:".16s"}}><b>03</b><h3>Hoja de ruta</h3><p>El siguiente proceso priorizado por impacto, esfuerzo y riesgo.</p></article></div></div></section>

      <section className="section pricing-section" id="niveles"><div className="shell"><div className="section-head split" data-reveal><div><p className="eyebrow dark">TRES FORMAS DE TRABAJAR JUNTOS</p><h2>Tres formas de trabajar juntos.</h2></div><p>El alcance y la inversión se definen en el diagnóstico, según tu operación — no hay dos empresas iguales.</p></div><div className="plans" data-reveal>{tiers.map(t => <article className={`plan ${t.featured ? "featured" : ""}`} key={t.name}>{t.featured && <div className="ribbon">★ MÁS ELEGIDO</div>}<div className="plan-head"><p>{t.name}</p></div><p className="plan-copy">{t.copy}</p></article>)}</div><div className="tiers-cta" data-reveal><Cta>Habla con ventas</Cta></div></div></section>

      <section className="guarantee"><div className="shell guarantee-grid" data-reveal><div><p className="eyebrow">GARANTÍA DE IMPLEMENTACIÓN</p><span className="shield">✓</span></div><blockquote>“Si al terminar la implementación no tienes el o los procesos acordados funcionando en tu operación, seguimos trabajando sin costo adicional hasta lograrlo.”</blockquote></div></section>

      <section className="section fit-section"><div className="shell"><div className="fit-grid"><article data-reveal><p className="eyebrow dark">ES PARA TI SI...</p><ul>{["Tu empresa recibe leads o clientes de forma constante", "Tienes un proceso repetitivo claro que te está costando tiempo o dinero", "El dueño o alguien de dirección está involucrado y puede tomar la decisión", "Tienes presupuesto para resolverlo de verdad, no solo para “probar”"].map(x=><li key={x}>{x}</li>)}</ul></article><article className="not-fit" data-reveal style={{transitionDelay:".1s"}}><p className="eyebrow dark">NO ES PARA TI SI...</p><ul>{["No tienes flujo entrante de prospectos o procesos repetitivos identificables", "Buscas una solución de autoservicio/DIY de bajo costo", "Nadie en tu empresa tiene tiempo ni autoridad para acompañar el proyecto", "Buscas una “app mágica” sin cambio de proceso ni de equipo de por medio"].map(x=><li key={x}>{x}</li>)}</ul></article></div></div></section>

      <section className="section faq-section" id="faq"><div className="shell faq-grid"><div data-reveal><p className="eyebrow dark">PREGUNTAS FRECUENTES</p><h2>Las dudas antes de empezar.</h2><p>Sin letra pequeña. Si tu caso es distinto, lo vemos en el diagnóstico.</p></div><div className="accordion">{faqs.map(([q,a], i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>

      <section className="diagnostic" id="diagnostico"><div className="shell diagnostic-grid"><div data-reveal><p className="eyebrow">DIAGNÓSTICO GRATUITO · 20 MINUTOS</p><h2>Identifica dónde la IA tendría mayor impacto antes de invertir.</h2><p>Revisamos tu operación, elegimos un primer proceso viable y te decimos con honestidad si tiene sentido trabajar juntos.</p><div className="call-points"><span>01 · Sin compromiso</span><span>02 · Sin preparación técnica</span><span>03 · Con siguiente paso claro</span></div></div><form onSubmit={submit} className="lead-form">{sent ? <div className="success" role="status"><span>✓</span><h3>Solicitud recibida.</h3><p>Gracias. Te contactaremos para coordinar tu diagnóstico de 20 minutos.</p><button type="button" onClick={()=>{setSent(false);setFormStep(1)}}>Enviar otra solicitud</button></div> : <><div className="form-progress" aria-label={`Paso ${formStep} de 2`}><span>{formStep}/2</span><div><i style={{width:formStep === 1 ? "50%" : "100%"}}/></div></div><fieldset hidden={formStep !== 1} disabled={formStep !== 1}><legend>Datos de contacto</legend><div className="form-row"><label>Nombre <b>*</b><input name="nombre" required autoComplete="given-name"/></label><label>Apellidos <b>*</b><input name="apellidos" required autoComplete="family-name"/></label></div><label>Correo empresarial <b>*</b><input type="email" name="correo" required autoComplete="email"/></label><label>Rol <b>*</b><select name="rol" required defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Dueño/a o fundador/a</option><option>Dirección general</option><option>Operaciones</option><option>Ventas</option><option>Marketing</option><option>Tecnología</option><option>Otro</option></select></label><label>Número de teléfono <b>*</b><div className="phone-field"><select name="pais" aria-label="Código de país" defaultValue="+52"><option value="+52">MX +52</option><option value="+1">US +1</option><option value="+57">CO +57</option><option value="+54">AR +54</option><option value="+56">CL +56</option><option value="+51">PE +51</option><option value="otro">Otro</option></select><input type="tel" name="telefono" required autoComplete="tel" inputMode="tel"/></div></label><label>Tamaño de tu empresa (# empleados) <b>*</b><input type="number" min="1" name="tamano" required inputMode="numeric"/></label><button className="submit" type="submit">Siguiente <span>→</span></button></fieldset><fieldset hidden={formStep !== 2} disabled={formStep !== 2}><legend>Sobre tu empresa</legend><label>Nombre de la empresa <b>*</b><input name="empresa" required autoComplete="organization"/></label><label>Perfil de LinkedIn <b>*</b><input type="url" name="linkedin" required placeholder="https://linkedin.com/in/..."/></label><label>¿Cómo te enteraste de nosotros? <b>*</b><input name="origen" required/></label><label>¿Cuál es tu mayor reto operativo hoy? <b>*</b><select name="reto" required defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Atención al cliente</option><option>Ventas y cotizaciones</option><option>Contenido y marketing</option><option>Administración</option><option>Otro</option></select></label>{formError && <p className="form-error" role="alert">{formError}</p>}<div className="form-actions"><button className="back-button" type="button" onClick={()=>setFormStep(1)}>Anterior</button><button className="submit" type="submit" disabled={submitting}>{submitting ? "Enviando..." : "Enviar"} <span>↗</span></button></div></fieldset><small>Al enviar aceptas que Digitalizados te contacte sobre esta solicitud. No compartimos tus datos.</small></>}</form></div></section>

      <section className="final-cta"><div className="shell" data-reveal><p className="eyebrow">EL MOMENTO ES AHORA. EL HYPE NO.</p><h2>Tu competencia ya está probando IA. La diferencia la va a hacer quién la implemente de verdad.</h2><p>Empieza con un diagnóstico gratuito de 20 minutos, sin compromiso.</p><Cta>Agendar mi diagnóstico</Cta></div></section>
    </main>

    <footer><div className="shell footer-grid"><div><a className="brand footer-brand" href="#inicio"><img src="/dgt-logo.png" alt="Digitalizados" /></a><p>El medio de tecnología y negocios de LATAM.</p></div><div><h3>El servicio</h3><a href="#programa">La diferencia</a><a href="#ruta">Cómo trabajamos</a><a href="#niveles">Modalidades</a><a href="#faq">FAQ</a></div><div><h3>Digitalizados</h3><a href="#">Contacto</a><a href="#">Instagram</a><a href="#">LinkedIn</a></div><div><h3>Legal</h3><a href="#">Aviso de privacidad</a><p>Los resultados varían según la empresa; las cifras mostradas son estimaciones basadas en fuentes públicas y casos previos, no garantías.</p></div></div><div className="shell footer-bottom"><span>© 2026 Digitalizados</span><span>Los resultados varían según la empresa; el alcance y la inversión se definen en el diagnóstico.</span></div></footer>
  </>;
}
