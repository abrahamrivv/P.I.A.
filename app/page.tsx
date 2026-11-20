"use client";

import { CSSProperties, FormEvent, Fragment, ReactNode, useEffect, useState } from "react";

const signals = [
  { value: "44%", text: "de las PyMEs mexicanas probó IA; solo 19% la usa de forma sistemática.", source: "(Endeavor México, 2026)" },
  { value: "−40%", text: "de tiempo en redacción y +18% de calidad con IA generativa.", source: "(Noy y Zhang, Science, 2023)" },
  { value: "38.9%", text: "de los empresarios mexicanos dice que su principal freno es no saber cómo.", source: "(Alegra, 2026)" },
];

const pains = [
  "Publicas cuando te acuerdas, no cuando toca.",
  "Un cliente potencial escribe de noche y le contestas dos días después.",
  "Pagas anuncios sin saber cuál te trajo una venta.",
  "El reporte del mes llega tarde y no dice qué hacer.",
  "Probaste ChatGPT una vez y ahí se quedó.",
];

const services = [
  { icon: "content", name: "Contenido con IA", text: "Posts, newsletters, carruseles, email marketing, edición de video y lead magnets, con tu voz y tu calendario.", receive: "calendario mensual y piezas publicadas." },
  { icon: "ads", name: "Meta Ads con IA", text: "Analizamos tus datos todos los días: se potencia lo que funciona, se apaga lo que no y se prueban más creativos en menos tiempo y a menor costo.", receive: "campañas activas y reporte semanal." },
  { icon: "chat", name: "Chatbots con IA", text: "Cada mensaje, correo o formulario recibe respuesta. Tu propio ManyChat a una fracción del costo y ningún cliente sin respuesta.", receive: "chatbot en producción y tiempo de respuesta medido." },
  { icon: "video", name: "UGC humano y con IA (con DIGI)", text: "El UGC con IA prueba miles de formatos para encontrar el ganador; el UGC humano genera la confianza que hace que quieran comprarte.", receive: "paquete de videos con derechos de uso." },
  { icon: "web", name: "Websites y landing pages", text: "Presencia en internet y posicionamiento para que empieces a aparecer en buscadores.", receive: "sitio o landing publicados." },
];

const steps = [
  { name: "Diagnóstico", text: "Revisamos tu marketing hoy: canales, tiempo, costos y qué ya funciona. Salimos con una línea base y una prioridad clara." },
  { name: "Montaje en 30 días", text: "Armamos y ponemos a correr lo priorizado. Tu lado designa a una persona responsable; del nuestro, un consultor asignado." },
  { name: "Operación y medición", text: "Operamos cada mes y comparamos contra la línea base. Si un número no se mueve, cambiamos la jugada." },
];

const options = ["Digitalizados", "Equipo propio", "Agencia tradicional", "Consultora grande", "Freelancers sueltos"];

const comparison: [string, string[]][] = [
  ["Tiempo para arrancar", ["Días: diagnóstico en 20 min y montaje en 30 días", "Meses para contratar y capacitar", "Semanas de onboarding", "Meses de propuesta y arranque", "Rápido, pero lo coordinas tú"]],
  ["Qué cubre", ["Contenido, anuncios, chatbots, UGC y web en un solo equipo", "Lo que sepan tus contrataciones", "Uno o dos canales", "Estrategia; la ejecución se subcontrata", "Una habilidad por persona"]],
  ["IA en la operación diaria", ["Sí, es el método", "Depende de cada persona", "Varía por cuenta", "Un diagnóstico sobre IA", "Depende de cada freelancer"]],
  ["Quién lo coordina", ["Un consultor asignado", "Tú", "Un account manager", "Un socio y un equipo junior", "Tú"]],
  ["Cómo se mide", ["Línea base y tablero de métricas", "Lo que armes tú", "Reportes de actividad", "Presentaciones", "Casi nunca"]],
  ["Cómo se paga", ["Tarifa mensual definida en el diagnóstico", "Nómina, prestaciones y herramientas", "Retainer por canal", "Tarifas premium", "Por pieza o por hora"]],
];

const reasons = [
  { icon: "news", name: "Autoridad editorial", text: "Publicamos sobre IA y tecnología para LATAM a diario. Probamos antes de recomendarte." },
  { icon: "person", name: "Una cara visible", text: "Abraham Rivv dirige el equipo y da la cara por el trabajo." },
  { icon: "live", name: "Aprendemos en público", text: "En Digitalizados Live probamos herramientas y construimos contenido y marca con IA, en vivo." },
  { icon: "pin", name: "Pensado para LATAM", text: "Canales, leyes y formas de comprar de la región, no plantillas de otro mercado." },
];

const segments = [
  { name: "Startups", text: "ya tienes producto y necesitas contenido, leads y anuncios corriendo sin armar un equipo de marketing." },
  { name: "PyMEs", text: "tu marketing depende de ti o de una persona saturada; quieres orden, respuesta rápida y saber qué te trae clientes." },
];

const fitYes = ["recibes leads o mensajes con regularidad", "la dirección participa en las decisiones de marketing", "tienes presupuesto real para invertir en crecer."];
const fitNo = ["buscas resultados sin que nadie de tu lado revise y apruebe", "quieres un curso o una plantilla, no un equipo que opere", "todavía no tienes clientes ni oferta definida."];

const packages = [
  { name: "Arranque", tag: "el más elegido", for: "para cuando quieres probar con un frente.", text: "Un servicio montado y operando durante 30 días, con línea base y reporte." },
  { name: "Motor de marketing", for: "para cuando quieres varios frentes a la vez.", text: "Contenido, anuncios, chatbot y web trabajando juntos, con consultor asignado." },
  { name: "Partner de IA", for: "para cuando quieres crecer de forma continua.", text: "Operación mensual y un frente nuevo cada trimestre." },
];

const faqs = [
  ["¿Cuánto cuesta?", "Depende de qué montemos. En el diagnóstico gratis te damos un plan y un rango antes de que decidas nada."],
  ["¿Y si no tengo tiempo?", "Nosotros operamos; tú apruebas. Tu parte es una revisión corta y una persona que responda."],
  ["¿Funciona para mi tipo de negocio?", "Si recibes leads o ya vendes, casi seguro. Lo vemos en el diagnóstico y te decimos con honestidad si no encaja."],
  ["¿Se va a notar que es IA?", "No tiene por qué. Todo se escribe con tu voz y pasa por revisión humana antes de salir."],
  ["¿Qué pasa con los datos de mis clientes?", "Trabajamos conforme a las leyes de protección de datos de México, Brasil y Colombia, y te decimos qué herramientas usamos."],
  ["¿Cómo sé si funciona?", "Medimos antes y después contra una línea base. Ves el tablero, no promesas."],
  ["¿Por qué Digitalizados y no una agencia tradicional?", "Porque operamos con IA todos los días y lo enseñamos en público. Si algo no funciona, lo sabrás y lo cambiamos."],
];

const navLinks = [
  ["#que-hacemos", "Qué hacemos"],
  ["#como-trabajamos", "Cómo trabajamos"],
  ["#por-que-digitalizados", "Por qué Digitalizados"],
  ["#paquetes", "Paquetes"],
  ["#faq", "FAQ"],
];

const COURSE_URL = "https://youtu.be/PtZBSN1W91Y?si=gCVEcwfEWGdoefOG";

const ICONS: Record<string, ReactNode> = {
  content: <><path d="M4 20h4L19 9l-4-4L4 16v4z" /><path d="M13.5 6.5l4 4" /></>,
  ads: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r=".6" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4V5z" /><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" /></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10.5l5-3v9l-5-3" /></>,
  web: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3z" /></>,
  news: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8.5h8M8 12h8M8 15.5h5" /></>,
  person: <><circle cx="12" cy="8" r="4" /><path d="M4.5 20c1.4-3.8 4.2-5.8 7.5-5.8s6.1 2 7.5 5.8" /></>,
  live: <><circle cx="12" cy="12" r="2" /><path d="M8 8a5.7 5.7 0 000 8M16 8a5.7 5.7 0 010 8M5.2 5.2a9.6 9.6 0 000 13.6M18.8 5.2a9.6 9.6 0 010 13.6" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  play: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5v7l6-3.5-6-3.5z" /></>,
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  spark: <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />,
};

function Glyph({ name }: { name: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>;
}

function Icon({ name }: { name: string }) {
  return <span className="icon" aria-hidden="true"><Glyph name={name} /></span>;
}

function Cta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <a className={`button ${className}`} href="#diagnostico"><span className="label">{children}</span><span aria-hidden="true">↗</span></a>;
}

/** Splits a heading into word spans (with an optional emphasised tail) so words can animate in one by one. */
function Split({ text, em, start = 0 }: { text: string; em?: string; start?: number }) {
  const words = (list: string[], offset: number) => list.map((w, i) => <Fragment key={offset + i}>{i > 0 && " "}<span className="w" style={{ "--i": offset + i } as CSSProperties}>{w}</span></Fragment>);
  const head = text.split(" ");
  return <>{words(head, start)}{em && <>{" "}<em>{words(em.split(" "), start + head.length)}</em></>}</>;
}

function delay(i: number, step = 70): CSSProperties {
  return { transitionDelay: `${i * step}ms` };
}

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const NUM = /^([^\d]*)([\d.]+)(.*)$/;

export default function Home() {
  const [sent, setSent] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [firstStepData, setFirstStepData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    // ---- Count-up numbers ----
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const runCount = (el: HTMLElement) => {
      const final = el.dataset.count ?? "";
      const m = final.match(NUM);
      if (!m || reduce) { el.textContent = final; return; }
      const [, pre, num, post] = m;
      const target = parseFloat(num);
      const dec = (num.split(".")[1] || "").length;
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1600);
        el.textContent = pre + (target * (1 - Math.pow(1 - k, 3))).toFixed(dec) + post;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    // ---- Reveal on scroll ----
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
      counters.forEach(runCount);
    } else {
      counters.forEach((el) => {
        const m = (el.dataset.count ?? "").match(NUM);
        if (m && el.getBoundingClientRect().top > window.innerHeight) el.textContent = m[1] + (0).toFixed((m[2].split(".")[1] || "").length) + m[3];
      });
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");
          if (el.dataset.count !== undefined) runCount(el);
          io.unobserve(el);
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
      reveals.forEach((el) => io.observe(el));
      counters.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // ---- Scroll-driven scenes: pinned steps, horizontal pan, progress line, page progress ----
    const nav = document.querySelector<HTMLElement>(".nav-wrap");
    const pins = Array.from(document.querySelectorAll<HTMLElement>("[data-pin]"));
    const pans = Array.from(document.querySelectorAll<HTMLElement>("[data-pan]"));
    const progs = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const navH = nav?.offsetHeight ?? 72;
      const docH = document.documentElement.scrollHeight - vh;
      nav?.style.setProperty("--sp", (docH > 0 ? clamp(window.scrollY / docH) : 0).toFixed(4));

      pins.forEach((sec) => {
        const stage = sec.querySelector<HTMLElement>(".pin-stage");
        const items = Array.from(sec.querySelectorAll<HTMLElement>("[data-step]"));
        const pinned = !!stage && getComputedStyle(stage).position === "sticky";
        const total = sec.offsetHeight - (stage?.offsetHeight ?? 0);
        const p = pinned && total > 0 ? clamp((navH - sec.getBoundingClientRect().top) / total) : 1;
        items.forEach((el, i) => el.classList.toggle("on", p >= (i / items.length) * 0.9));
      });

      pans.forEach((sec) => {
        const stage = sec.querySelector<HTMLElement>(".pan-stage");
        const track = sec.querySelector<HTMLElement>(".pan-track");
        if (!stage || !track) return;
        if (getComputedStyle(stage).position !== "sticky") { track.style.transform = ""; return; }
        const total = sec.offsetHeight - stage.offsetHeight;
        const raw = total > 0 ? clamp((navH - sec.getBoundingClientRect().top) / total) : 0;
        const p = clamp((raw - 0.06) / 0.86);
        track.style.transform = `translate3d(${-Math.max(0, track.scrollWidth - stage.clientWidth) * p}px,0,0)`;
        sec.style.setProperty("--p", p.toFixed(4));
      });

      progs.forEach((el) => {
        const p = clamp((vh * 0.78 - el.getBoundingClientRect().top) / (vh * 0.45));
        el.style.setProperty("--p", p.toFixed(4));
        const marks = [el.querySelectorAll<HTMLElement>(".step"), el.querySelectorAll<HTMLElement>(".steps-dot")];
        marks.forEach((list) => list.forEach((node, i) => node.classList.toggle("on", list.length < 2 || p >= i / (list.length - 1) - 0.001)));
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); });

    // ---- 3D tilt + cursor spotlight on cards (mouse/trackpad only) ----
    if (!reduce && window.matchMedia("(pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
          el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
          el.style.setProperty("--rx", `${((0.5 - y) * 6).toFixed(2)}deg`);
          el.style.setProperty("--ry", `${((x - 0.5) * 8).toFixed(2)}deg`);
        };
        const leave = () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
      });
    }

    return () => cleanups.forEach((fn) => fn());
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
    <header className="nav-wrap band-dark">
      <nav className="nav shell" aria-label="Navegación principal">
        <a className="brand" href="#inicio" aria-label="Digitalizados, inicio"><img src="/dgt-logo.png" alt="Digitalizados" width="1188" height="685" /></a>
        <div id="menu" className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </div>
        <Cta className="nav-cta">Diagnóstico gratis</Cta>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} aria-controls="menu" onClick={() => setMenuOpen((o) => !o)}><span /><span /><span /></button>
      </nav>
      <span className="nav-progress" aria-hidden="true" />
    </header>

    <main>
      {/* 2. HERO */}
      <section className="hero band-dark" id="inicio">
        <div className="hero-glow" aria-hidden="true" />
        <div className="orbit" aria-hidden="true">
          <div className="ring r1">{["content", "ads", "chat"].map((n, i) => <span className="sat" key={n} style={{ "--a": `${i * 120 + 25}deg` } as CSSProperties}><span><Glyph name={n} /></span></span>)}</div>
          <div className="ring r2">{["video", "web", "news", "play"].map((n, i) => <span className="sat" key={n} style={{ "--a": `${i * 90 + 60}deg` } as CSSProperties}><span><Glyph name={n} /></span></span>)}</div>
        </div>
        <div className="shell hero-inner">
          <p className="badge rise">⚡ AI-powered Marketing · PyMEs y startups</p>
          <h1 className="hero-title"><Split text="Tu marketing, operado con IA." em="Tu equipo, enfocado en vender." /></h1>
          <p className="lede rise" style={{ animationDelay: "520ms" }}>Somos Digitalizados, el medio de IA y tecnología de LATAM. Armamos y operamos con IA tu contenido, tus anuncios, la atención a clientes, el UGC y tu presencia web, y medimos qué te trae clientes.</p>
          <div className="hero-actions rise" style={{ animationDelay: "620ms" }}>
            <Cta>Agendar diagnóstico gratis <span className="nw">(20 min)</span></Cta>
            <a className="button ghost" href="#como-trabajamos"><span className="label">Ver cómo trabajamos</span><span aria-hidden="true">↓</span></a>
          </div>
          <p className="microcopy rise" style={{ animationDelay: "720ms" }}>Sin compromiso. Sin preparación técnica.</p>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1, 2, 3].map((copy) => <div className="marquee-group" key={copy}>{services.map((s) => <span className="marquee-item" key={s.name}>{s.name}<Glyph name="spark" /></span>)}</div>)}
        </div>
      </div>

      {/* 3. FRANJA DE SEÑALES */}
      <section className="signals band-light" aria-labelledby="signals-title">
        <div className="shell">
          <h2 id="signals-title" className="split" data-reveal><Split text="Las PyMEs ya probaron la IA." em="Pocas la usan bien." /></h2>
          <div className="stats">
            {signals.map((s, i) => <article className="stat" key={s.value} data-reveal style={delay(i, 110)}><strong data-count={s.value}>{s.value}</strong><p>{s.text}</p><small>{s.source}</small></article>)}
          </div>
        </div>
      </section>

      {/* 4. EL PROBLEMA — pinned, rows light up as you scroll */}
      <section className="problem band-dark pin" data-pin>
        <div className="pin-stage">
          <div className="shell problem-grid">
            <div>
              <h2 className="split" data-reveal><Split text="Tu marketing no necesita más horas." em="Necesita un sistema." /></h2>
              <p className="intro" data-reveal style={delay(2, 120)}>Si esto te suena, no es falta de ganas. Es falta de proceso.</p>
            </div>
            <div>
              <ul className="pain-list">{pains.map((p) => <li key={p} data-step>{p}</li>)}</ul>
              <p className="closing" data-step>Usar IA no es abrir un chat. Es poner un proceso a funcionar, con alguien responsable y números de antes y después.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUÉ HACEMOS — horizontal rail on desktop */}
      <section className="section band-tint pan" id="que-hacemos" data-pan>
        <div className="pan-stage">
          <div className="shell section-head">
            <h2 className="split" data-reveal><Split text="Cinco cosas que" em="operamos por ti." /></h2>
            <p data-reveal style={delay(2, 120)}>Cada una con IA, con una persona revisando y con un número que la mide.</p>
          </div>
          <div className="pan-viewport">
            <div className="services pan-track">
              {services.map((s, i) => <article className="card service" key={s.name} data-reveal data-tilt style={delay(i % 3, 90)}>
                <span className="card-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <Icon name={s.icon} />
                <h3>{s.name}</h3>
                <p>{s.text}</p>
                <p className="receive"><b>Recibes:</b> {s.receive}</p>
              </article>)}
            </div>
          </div>
          <div className="pan-bar" aria-hidden="true"><i /></div>
        </div>
      </section>

      {/* 6. CÓMO TRABAJAMOS — progress line fills with scroll */}
      <section className="section band-light" id="como-trabajamos">
        <div className="shell">
          <div className="section-head"><h2 className="split" data-reveal><Split text="Tres pasos." em="El primero es gratis." /></h2></div>
          <div className="steps-wrap" data-progress>
            <div className="steps-track" aria-hidden="true"><span className="steps-fill" />{steps.map((s, i) => <span className="steps-dot" key={s.name} style={{ left: `${i * 50}%` }} />)}</div>
            <ol className="steps">
              {steps.map((s, i) => <li className="card step" key={s.name} data-reveal style={delay(i, 110)}>
                <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>)}
            </ol>
          </div>
          <p className="takeaway" data-reveal><strong>Lo que te llevas:</strong> tablero de métricas, procesos corriendo y plan del mes siguiente.</p>
        </div>
      </section>

      {/* 7. COMPARATIVA */}
      <section className="section band-tint compare" id="comparativa">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow" data-reveal>Por qué nosotros</p>
            <h2 className="split" data-reveal><Split text="Un departamento de marketing completo," em="sin tener que armarlo." /></h2>
            <p data-reveal style={delay(2, 120)}>Con Digitalizados tienes un equipo de marketing trabajando contigo, operado con IA, más rápido y a menor costo que las alternativas. Comparamos lo que decide si tu marketing te trae clientes.</p>
          </div>

          <div className="compare-table-wrap" data-reveal>
            <table className="compare-table" aria-label="Comparativa entre Digitalizados y otras opciones">
              <thead>
                <tr><th scope="col">Criterio</th>{options.map((o, i) => <th scope="col" key={o} className={i === 0 ? "us" : undefined}>{o}</th>)}</tr>
              </thead>
              <tbody>
                {comparison.map(([criterion, values]) => <tr key={criterion}>
                  <th scope="row">{criterion}</th>
                  {values.map((v, i) => <td key={options[i]} className={i === 0 ? "us" : undefined}>{v}</td>)}
                </tr>)}
              </tbody>
            </table>
          </div>

          <div className="compare-cards">
            {comparison.map(([criterion, values]) => <article className="card ccard" key={criterion} data-reveal>
              <h3>{criterion}</h3>
              <dl>
                {values.map((v, i) => <div className={i === 0 ? "row us-row" : "row"} key={options[i]}><dt>{options[i]}</dt><dd>{v}</dd></div>)}
              </dl>
            </article>)}
          </div>

          <div className="card compare-close" data-reveal>
            <p>Si ya tienes un equipo de marketing completo y funcionando, probablemente no nos necesitas. Si tienes a una persona saturada o a nadie, esta es la forma más rápida de tener un departamento entero.</p>
            <Cta>Agendar diagnóstico gratis</Cta>
          </div>
        </div>
      </section>

      {/* 8. POR QUÉ DIGITALIZADOS */}
      <section className="section band-light" id="por-que-digitalizados">
        <div className="shell">
          <div className="section-head"><h2 className="split" data-reveal><Split text="Un medio que enseña IA todos los días" em="ahora opera tu marketing con ella." /></h2></div>
          <div className="why-grid">
            {reasons.map((r, i) => <article className="card why-card" key={r.name} data-reveal data-tilt style={delay(i, 90)}>
              <Icon name={r.icon} />
              <h3>{r.name}</h3>
              <p>{r.text}</p>
            </article>)}
          </div>
          <article className="card course on-dark" data-reveal>
            <div>
              <Icon name="play" />
              <h3>Curso gratuito de Claude</h3>
              <p>Más de 7,000 personas han visto el video.</p>
              <a className="button" href={COURSE_URL} target="_blank" rel="noreferrer"><span className="label">Ver el curso gratis</span><span aria-hidden="true">↗</span></a>
            </div>
            <div className="video-frame">
              <iframe src="https://www.youtube-nocookie.com/embed/PtZBSN1W91Y?rel=0" title="Curso gratuito de Claude, hecho por Digitalizados" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" />
            </div>
          </article>
        </div>
      </section>

      {/* 9. PARA QUIÉN ES */}
      <section className="section band-tint" id="para-quien">
        <div className="shell">
          <div className="section-head"><h2 className="split" data-reveal><Split text="Hecho para negocios que ya venden" em="y quieren vender más." /></h2></div>
          <div className="segments">
            {segments.map((s, i) => <article className="card segment" key={s.name} data-reveal data-tilt style={delay(i, 110)}>
              <h3>{s.name}</h3>
              <p className="cap">{s.text}</p>
            </article>)}
          </div>
          <div className="fit">
            <article className="card" data-reveal>
              <h3>Es para ti si:</h3>
              <ul className="yes">{fitYes.map((x) => <li key={x}><span className="cap">{x}</span></li>)}</ul>
            </article>
            <article className="card" data-reveal style={delay(1, 110)}>
              <h3>No es para ti si:</h3>
              <ul className="no">{fitNo.map((x) => <li key={x}><span className="cap">{x}</span></li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      {/* 10. PAQUETES */}
      <section className="section band-light" id="paquetes">
        <div className="shell">
          <div className="section-head">
            <h2 className="split" data-reveal><Split text="Tres formas de" em="trabajar juntos." /></h2>
            <p data-reveal style={delay(2, 120)}>El plan exacto se define en el diagnóstico. Estos son los puntos de partida.</p>
          </div>
          <div className="packages">
            {packages.map((p, i) => <article className={`card package ${p.tag ? "featured on-dark" : ""}`} key={p.name} data-reveal data-tilt style={delay(i, 110)}>
              {p.tag && <span className="tag">{p.tag}</span>}
              <h3>{p.name}</h3>
              <p className="for cap">{p.for}</p>
              <p>{p.text}</p>
            </article>)}
          </div>
          <div className="packages-cta" data-reveal>
            <Cta>Hablar con el equipo</Cta>
            <p className="fineprint">Si al terminar el montaje no está funcionando lo acordado, seguimos trabajando sin costo adicional hasta que funcione.</p>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="section band-tint" id="faq">
        <div className="shell faq-grid">
          <div><h2 className="split" data-reveal><Split text="Preguntas frecuentes" /></h2></div>
          <div className="accordion">
            {faqs.map(([q, a], i) => <details key={q} open={i === 0} data-reveal style={delay(i, 60)}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      {/* 12. DIAGNÓSTICO GRATIS */}
      <section className="section band-dark diagnostic" id="diagnostico">
        <div className="shell diagnostic-grid">
          <div>
            <h2 className="split" data-reveal><Split text="20 minutos para ver" em="dónde se te va el marketing." /></h2>
            <p className="sub" data-reveal style={delay(2, 120)}>Revisamos tu situación y te decimos qué haríamos primero, con o sin nosotros.</p>
            <ul className="benefits">
              {["Sin compromiso", "Sin preparación técnica", "Sales con un siguiente paso claro."].map((b, i) => <li key={b} data-reveal style={delay(i + 3, 90)}><Icon name="check" />{b}</li>)}
            </ul>
          </div>
          <form onSubmit={submit} className="lead-form" data-reveal style={delay(1, 120)}>
            {sent ? <div className="success" role="status"><span>✓</span><h3>Solicitud recibida.</h3><p>Gracias. Te contactaremos para coordinar tu diagnóstico de 20 minutos.</p><button type="button" onClick={() => { setSent(false); setFormStep(1); }}>Enviar otra solicitud</button></div> : <>
              <div className="form-progress" aria-label={`Paso ${formStep} de 2`}><span>{formStep}/2</span><div><i style={{ width: formStep === 1 ? "50%" : "100%" }} /></div></div>
              <fieldset hidden={formStep !== 1} disabled={formStep !== 1}>
                <legend>Datos de contacto</legend>
                <div className="form-row"><label>Nombre <b>*</b><input name="nombre" required autoComplete="given-name" /></label><label>Apellidos <b>*</b><input name="apellidos" required autoComplete="family-name" /></label></div>
                <label>Correo empresarial <b>*</b><input type="email" name="correo" required autoComplete="email" /></label>
                <label>Rol <b>*</b><select name="rol" required defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Dueño/a o fundador/a</option><option>Dirección general</option><option>Operaciones</option><option>Ventas</option><option>Marketing</option><option>Tecnología</option><option>Otro</option></select></label>
                <label>Número de teléfono <b>*</b><div className="phone-field"><select name="pais" aria-label="Código de país" defaultValue="+52"><option value="+52">MX +52</option><option value="+1">US +1</option><option value="+57">CO +57</option><option value="+54">AR +54</option><option value="+56">CL +56</option><option value="+51">PE +51</option><option value="otro">Otro</option></select><input type="tel" name="telefono" required autoComplete="tel" inputMode="tel" /></div></label>
                <label>Tamaño de tu empresa (# empleados) <b>*</b><input type="number" min="1" name="tamano" required inputMode="numeric" /></label>
                <button className="submit" type="submit">Siguiente <span>→</span></button>
              </fieldset>
              <fieldset hidden={formStep !== 2} disabled={formStep !== 2}>
                <legend>Sobre tu empresa</legend>
                <label>Nombre de la empresa <b>*</b><input name="empresa" required autoComplete="organization" /></label>
                <label>Perfil de LinkedIn <b>*</b><input type="url" name="linkedin" required placeholder="https://linkedin.com/in/..." /></label>
                <label>¿Cómo te enteraste de nosotros? <b>*</b><input name="origen" required /></label>
                <label>¿Cuál es tu mayor reto operativo hoy? <b>*</b><select name="reto" required defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Atención al cliente</option><option>Ventas y cotizaciones</option><option>Contenido y marketing</option><option>Administración</option><option>Otro</option></select></label>
                {formError && <p className="form-error" role="alert">{formError}</p>}
                <div className="form-actions"><button className="back-button" type="button" onClick={() => setFormStep(1)}>Anterior</button><button className="submit" type="submit" disabled={submitting}>{submitting ? "Enviando..." : "Agendar mi diagnóstico"} <span>↗</span></button></div>
              </fieldset>
              <small>Al enviar aceptas que te contactemos y nuestro <a href="#">aviso de privacidad</a>.</small>
            </>}
          </form>
        </div>
      </section>

      {/* 13. CTA FINAL */}
      <section className="final-cta band-neon">
        <div className="final-rings" aria-hidden="true"><span /><span /><span /></div>
        <div className="shell">
          <h2 className="split" data-reveal><Split text="Tu competencia ya probó la IA." em="La diferencia es quién la pone a vender." /></h2>
          <p data-reveal style={delay(3, 120)}>Empieza con 20 minutos. Sin costo.</p>
          <div data-reveal style={delay(4, 120)}><Cta>Agendar diagnóstico gratis</Cta></div>
        </div>
      </section>
    </main>

    {/* 14. FOOTER */}
    <footer className="band-dark">
      <div className="shell footer-top">
        <div className="footer-brand">
          <a className="brand" href="#inicio" aria-label="Digitalizados, inicio"><img src="/dgt-logo.png" alt="Digitalizados" width="1188" height="685" loading="lazy" /></a>
          <p>AI-powered Marketing para PyMEs y startups.</p>
        </div>
        <nav className="footer-links" aria-label="Enlaces del pie de página">
          <a href="#que-hacemos">Qué hacemos</a>
          <a href="#como-trabajamos">Cómo trabajamos</a>
          <a href="#paquetes">Paquetes</a>
          <a href="#faq">FAQ</a>
          <a href="#diagnostico">Contacto</a>
          <a href="https://www.instagram.com/digitalizadosco/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/company/digitalizadosco/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.youtube.com/@digitalizados" target="_blank" rel="noreferrer">YouTube</a>
          <a href="#">Aviso de privacidad</a>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <p>Los resultados varían según cada negocio. Las cifras son estimaciones, no garantías.</p>
        <p>© 2026 Digitalizados</p>
      </div>
    </footer>
  </>;
}
