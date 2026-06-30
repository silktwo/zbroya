import { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";

const menuItems = [
  { label: "Про нас", href: "#about" },
  { label: "Що ми робимо", href: "#services" },
  { label: "Географія", href: "#geography" },
  { label: "Чому ми", href: "#why" },
  { label: "Куди ми йдемо", href: "#direction" },
  { label: "Контакти", href: "#footer" },
];
const capabilities = [
  {
    title: "Постачання компонентів",
    text: "Широка номенклатура електронних комплектуючих під потреби виробництва.",
    image: "/components.webp?v=20260630d",
    alt: "Ізометрична схема виробничої лінії електронних компонентів",
  },
  {
    title: "Підбір і логістика",
    text: "Знаходимо потрібні позиції, будуємо маршрути, тримаємо терміни.",
    image: "/logistics.webp?v=20260630d",
    alt: "Глобальна логістична мережа на сферичній мапі",
  },
  {
    title: "Складні напрями",
    text: "Постачаємо туди, куди логістично складно, зокрема в Україну.",
    image: "/hard%20ways.webp?v=20260630d",
    alt: "Мапа України з маршрутами постачання",
  },
];
const reasons = [
  {
    title: "Реальні контракти",
    text: "Працюємо з європейськими компаніями, а не тільки виходимо на ринок.",
    image: "/real%20contacts.webp",
    alt: "Рукостискання на фоні прапора Європейського Союзу",
  },
  {
    title: "Відповідаємо за терміни і якість",
    text: "На кожному етапі постачання.",
    image: "/quality.webp",
    alt: "Електронна плата у синьо-чорному растрі",
  },
  {
    title: "Прозорість",
    text: "Зрозумілі умови, відповідність європейським нормам.",
    image: "/transparency.webp",
    alt: "Документи у синьо-чорному растрі",
  },
  {
    title: "Швидкі рішення",
    text: "Невелика команда рухається швидше за великих гравців.",
    image: "/small%20team.webp",
    alt: "Силуети невеликої команди",
  },
];
const contactRows = [
  ["IČO", "09182736"],
  ["DIČ", "CZ09182736"],
  ["Адреса", "Sokolovská 428/130, 186 00 Praha 8 - Karlín, Česká republika"],
  ["Телефон", "+420 234 567 890"],
  ["Email", "info@zbroya.cz"],
];
const gridDotNames = ["tl", "tm", "tr", "te", "bl", "bm", "br", "be"];

function Reveal({ as: Tag = "div", children, delay = 0, className, style, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...(delay ? { "--reveal-delay": `${delay}ms` } : {}), ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}

function MenuButton({ open, onClick }) {
  return (
    <button className={`icon-button ${open ? "is-open" : ""}`} type="button" onClick={onClick} aria-label={open ? "Close menu" : "Open menu"}>
      <span className="menu-icon" />
    </button>
  );
}

function BrandLogo({ className = "" }) {
  return (
    <span className={`brand-logo ${className}`} aria-hidden="true">
      <img className="brand-logo-symbol" src="/zbroya-symbol.svg" alt="" />
      <img className="brand-logo-word" src="/zbroya-logo.svg" alt="" />
    </span>
  );
}

function SectionDots({ className = "" }) {
  return (
    <div className={`section-dots${className ? ` ${className}` : ""}`} aria-hidden="true">
      {gridDotNames.map((name) => (
        <span className={`dot-${name}`} key={name} />
      ))}
    </div>
  );
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function mix(start, end, progress) {
  return start + (end - start) * progress;
}

function MorphingLogo({ progress }) {
  const style = useMemo(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const eased = 1 - Math.pow(1 - progress, 4);
    const easedSpacing = 1 - Math.pow(1 - progress, 2);
    const pageX = width <= 640 ? 18 : width <= 980 ? 24 : clamp(width * 0.048, 28, 76);
    const startLeft = pageX;
    const startWidth = width - startLeft * 2;
    const startFont = clamp(width * 0.17, 132, 288);
    const startTop = 0;
    const startSymbolTop = clamp(height * 0.06, 28, 68);
    const startWordTop = clamp(height * 0.18, 90, 220);
    const endLeft = pageX;
    const endTop = clamp(width * 0.024, 30, 48);
    const endSymbol = clamp(width * 0.044, 52, 70);
    const endFont = endSymbol / 0.82;
    const endGap = clamp(width * 0.012, 12, 18);
    const endWordWidth = endSymbol * 2.85;
    const endWidth = endSymbol + endGap + endWordWidth;
    const startSymbol = clamp(width * 0.042, 48, 72);
    const startTracking = width <= 640 ? 0.32 : width <= 980 ? 0.74 : 1.38;

    return {
      "--logo-left": `${mix(startLeft, endLeft, eased)}px`,
      "--logo-top": `${mix(startTop, endTop, eased)}px`,
      "--logo-width": `${mix(startWidth, endWidth, easedSpacing)}px`,
      "--logo-size": `${mix(startFont, endFont, eased)}px`,
      "--letter-scale": mix(0.57, 1.02, eased).toFixed(3),
      "--logo-tracking": `${mix(startTracking, -0.032, easedSpacing).toFixed(4)}em`,
      "--symbol-size": `${mix(startSymbol, endSymbol, eased)}px`,
      "--symbol-opacity": mix(0.12, 1, eased).toFixed(3),
      "--symbol-top": `${mix(startSymbolTop, 0, eased)}px`,
      "--word-left": `${mix(0, endSymbol + endGap, eased)}px`,
      "--word-top": `${mix(startWordTop, 2, eased)}px`,
      "--logo-height": `${mix(startWordTop + startFont * 0.86, endSymbol * 1.2, eased)}px`,
    };
  }, [progress]);

  return (
    <a className="morph-logo" href="#" aria-label="ZBROYA home" style={style}>
      <img className="morph-symbol" src="/zbroya-symbol.svg" alt="" aria-hidden="true" />
      <span className="morph-word">ZBROYA</span>
    </a>
  );
}

function SiteHeader({ menuOpen, onMenuToggle }) {
  return (
    <header className="site-header">
      <span aria-hidden="true" />
      <MenuButton open={menuOpen} onClick={onMenuToggle} />
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section">
      <SectionDots className="hero-dots" />
      <div className="hero-wordmark-ghost" aria-hidden="true" />

      <div className="hero-product">
        <div>
          <h1 className="hero-headline">
            <span className="hero-line">Електронні&nbsp;компоненти</span>
            <span className="hero-line">для&nbsp;виробників&nbsp;Європи&nbsp;та&nbsp;Азії</span>
          </h1>
        </div>
        <p className="hero-sub">Міжнародна торгова компанія з Чехії</p>
        <a className="cta-button hero-cta" href="#footer">
          <span>Запит на постачання</span>
        </a>
      </div>
    </section>
  );
}

function ContentSections() {
  const [directionOpen, setDirectionOpen] = useState(false);

  return (
    <>
      <section className="content-section about-section" id="about">
        <SectionDots />
        <Reveal as="p" className="section-label about-label">+ Про нас</Reveal>
        <Reveal as="div" className="section-copy about-copy" delay={120}>
          <p>Зброя, торгова компанія з Чехії. Постачаємо електронні компоненти виробникам у Європі та Азії.</p>
          <p>Працюємо близько року. За цей час уклали контракти з європейськими партнерами й розширили номенклатуру та географію.</p>
        </Reveal>
        <Reveal
          as="div"
          className="about-image blend-image"
          style={{ "--art-image": "url('/about%20us.webp?v=20260630d')" }}
        >
          <img src="/about%20us.webp?v=20260630d" alt="Про нас" />
        </Reveal>
      </section>

      <section className="content-section services-section" id="services">
        <SectionDots />
        <Reveal as="p" className="section-label services-label">+ Що ми робимо</Reveal>
        <div className="service-list">
          {capabilities.map((item, index) => (
            <Reveal as="article" className="service-item" key={item.title} delay={index * 90}>
              <div className="service-art blend-image" style={{ "--art-image": `url('${item.image}')` }}>
                <img src={item.image} alt={item.alt} />
              </div>
              <div className="service-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="content-section geography-section" id="geography">
        <SectionDots className="geography-dots" />
        <img className="geography-map" src="/map.webp" alt="Темна мапа Європи та Азії з маршрутом постачання до Чехії" />
        <div className="geography-copy">
          <Reveal as="p" className="section-label">+ Географія</Reveal>
          <Reveal as="h2" delay={110}>Працюємо по обидва боки ланцюга постачання: від виробників в Азії до замовників у Європі, включно з Україною.</Reveal>
        </div>
      </section>

      <section className="content-section why-section" id="why">
        <SectionDots />
        <div className="reason-grid">
          {reasons.map((item, index) => (
            <Reveal as="article" className="reason-card" key={item.title} delay={index * 70}>
              <img src={item.image} alt={item.alt} />
              <div className="reason-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`content-section direction-section${directionOpen ? " is-open" : ""}`} id="direction">
        <SectionDots />
        <Reveal as="p" className="section-label direction-label">+ Куди ми йдемо</Reveal>
        <Reveal as="div" className="direction-copy" delay={120}>
          <h2>Наша мета:</h2>
          <p className="direction-lead">Зробити постачання електронних компонентів для Європи передбачуваним і стійким до збоїв глобальних ланцюгів. Тому ми не зупиняємось на торгівлі.</p>
          <div className="direction-more" id="direction-more" aria-hidden={!directionOpen}>
            <div className="direction-more-inner">
              <p>Найближча перспектива, власне виробництво на території Чехії: коротший шлях від компонента до замовника й контроль якості на власному боці.</p>
              <p>Окремий напрям розвитку, безпілотні системи UAV. Ми маємо досвід співпраці з українськими технологічними компаніями й розвиваємо цивільні застосування: моніторинг, інспекцію інфраструктури, логістику.</p>
            </div>
          </div>
        </Reveal>
        <Reveal
          as="button"
          className="direction-toggle"
          type="button"
          aria-expanded={directionOpen}
          aria-controls="direction-more"
          onClick={() => setDirectionOpen((open) => !open)}
        >
          <span aria-hidden="true">{directionOpen ? "−" : "+"}</span>
          {directionOpen ? "Згорнути" : "Дізнатись більше"}
        </Reveal>
      </section>
    </>
  );
}

function MenuOverlay({ open, onClose }) {
  return (
    <div className={`menu-layer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="menu-dim" onClick={onClose} />
      <nav className="menu-panel" aria-label="Main menu">
        <a className="menu-brand" href="#" aria-label="ZBROYA home">
          <BrandLogo />
        </a>

        <div className="menu-grid">
          <section className="menu-nav">
            <h2>Навігація</h2>
            <div>
              {menuItems.filter((item) => item.href !== "#footer").map((item) => (
                <a href={item.href} key={item.label}>{item.label}</a>
              ))}
            </div>
          </section>

          <section className="menu-info">
            <h2>Інфо / Контакти</h2>
            <div className="menu-contact-list">
              {contactRows.map(([label, value]) => (
                <p key={label}>
                  <span>{label}:</span>
                  {label === "Email" ? <a href={`mailto:${value}`}>{value}</a> : <strong>{value}</strong>}
                </p>
              ))}
            </div>
          </section>
        </div>
      </nav>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer-section" id="footer">
      <h2 className="footer-title">Інфо / Контакти</h2>
      <div className="footer-details">
        {contactRows.map(([label, value]) => (
          <p key={label}>
            <span>{label}:</span>
            {label === "Email" ? <a href={`mailto:${value}`}>{value}</a> : <strong>{value}</strong>}
          </p>
        ))}
      </div>
      <p className="footer-copy">© ZBROYA 2026</p>
    </footer>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(() => new URLSearchParams(window.location.search).get("menu") === "1");
  const [logoProgress, setLogoProgress] = useState(0);
  const [nightHeader, setNightHeader] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 3.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    const onClick = (e) => {
      const anchor = e.target.closest("a[href^='#']");
      if (!anchor) return;
      const id = anchor.getAttribute("href").slice(1);
      const target = document.getElementById(id) || (id === "" ? document.documentElement : null);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -96, duration: 2.0 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get("view");
    if (target) {
      const targetId = target === "contacts" ? "footer" : target;
      window.setTimeout(() => {
        const section = document.getElementById(targetId);
        if (section) {
          window.scrollTo({ top: section.offsetTop, left: 0, behavior: "auto" });
          setLogoProgress(1);
          window.dispatchEvent(new Event("scroll"));
        }
      }, 80);
    }
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = Math.min(window.innerHeight * 0.56, 560);
        const whySection = document.getElementById("why");
        const footerSection = document.getElementById("footer");
        const nightStart = whySection ? whySection.offsetTop - 132 : Infinity;
        const nightEnd = footerSection ? footerSection.offsetTop - 132 : Infinity;
        setLogoProgress(clamp(window.scrollY / distance, 0, 1));
        setNightHeader(window.scrollY >= nightStart && window.scrollY < nightEnd);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <main className={`page${nightHeader ? " is-night-header" : ""}`}>
      <MorphingLogo progress={logoProgress} />
      <SiteHeader menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} />
      <Hero />
      <ContentSections />
      <Footer />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
