import { useEffect, useMemo, useRef, useState } from "react";

const menuItems = [
  { label: "Про нас", href: "#about" },
  { label: "Що ми робимо", href: "#services" },
  { label: "Контакти", href: "#footer" },
];
const quickLinks = [
  { label: "Постачання компонентів", href: "#services" },
  { label: "Підбір і логістика", href: "#services" },
  { label: "Складні напрями", href: "#services" },
];
const researchLinks = [
  { label: "Європейські контракти", href: "#why" },
  { label: "Контроль якості", href: "#why" },
  { label: "Виробництво в Чехії", href: "#direction" },
  { label: "UAV напрям", href: "#direction" },
];
const capabilities = [
  {
    title: "Постачання компонентів",
    text: "Широка номенклатура електронних комплектуючих під потреби виробництва.",
  },
  {
    title: "Підбір і логістика",
    text: "Знаходимо потрібні позиції, будуємо маршрути, тримаємо терміни.",
  },
  {
    title: "Складні напрями",
    text: "Постачаємо туди, куди логістично складно, зокрема в Україну.",
  },
];
const reasons = [
  "Реальні контракти. Працюємо з європейськими компаніями, а не тільки виходимо на ринок.",
  "Відповідаємо за терміни і якість на кожному етапі постачання.",
  "Прозорість. Зрозумілі умови, відповідність європейським нормам.",
  "Швидкі рішення. Невелика команда рухається швидше за великих гравців.",
];
const contactRows = [
  ["IČO", "Уточнюється"],
  ["DIČ", "Уточнюється"],
  ["Адреса", "Чехія"],
  ["Телефон", "Уточнюється"],
  ["Email", "info@zbroya-timepieces.com"],
];

const logoLetters = ["Z", "B", "R", "O", "Y", "A"];

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

function MenuContactStrip() {
  return (
    <div className="menu-contact-rail">
      <a href="#footer" aria-label="Адреса"><strong>Адреса</strong><em>Чехія</em></a>
      <span>/</span>
      <a href="#footer" aria-label="Телефон"><strong>Телефон</strong><em>Уточнюється</em></a>
      <span>/</span>
      <a href="mailto:info@zbroya-timepieces.com" aria-label="Email"><strong>Email</strong><em>info@zbroya-timepieces.com</em></a>
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
    const pageX = width <= 640 ? 18 : width <= 980 ? 24 : clamp(width * 0.058, 30, 96);
    const startLeft = pageX;
    const startTop = clamp(height * 0.155, 118, 168);
    const startWidth = width - startLeft * 2;
    const startFont = clamp(width * 0.185, 150, 318);
    const endLeft = pageX;
    const endTop = clamp(width * 0.038, 42, 66);
    const endWidth = clamp(width * 0.105, 112, 164);
    const endFont = clamp(width * 0.038, 48, 66);

    return {
      "--logo-left": `${mix(startLeft, endLeft, eased)}px`,
      "--logo-top": `${mix(startTop, endTop, eased)}px`,
      "--logo-width": `${mix(startWidth, endWidth, eased)}px`,
      "--logo-size": `${mix(startFont, endFont, eased)}px`,
      "--letter-scale": mix(0.58, 0.7, eased).toFixed(3),
    };
  }, [progress]);

  return (
    <a className="morph-logo" href="#" aria-label="ZBROYA home" style={style}>
      {logoLetters.map((letter) => <span key={letter}>{letter}</span>)}
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
      <div className="hero-wordmark-ghost" aria-hidden="true" />

      <div className="hero-product">
        <div>
          <h1 className="hero-headline">Електронні компоненти для виробників Європи та Азії</h1>
          <p className="hero-sub">Міжнародна торгова компанія з Чехії.</p>
        </div>
        <a className="cta-button hero-cta" href="#footer">
          Запит на постачання
        </a>
      </div>
    </section>
  );
}

function ContentSections() {
  return (
    <>
      <section className="content-section about-section" id="about">
        <Reveal as="p" className="section-label">Про нас</Reveal>
        <Reveal as="div" className="section-copy" delay={120}>
          <p>Зброя, торгова компанія з Чехії. Постачаємо електронні компоненти виробникам у Європі та Азії.</p>
          <p>Працюємо близько року. За цей час уклали контракти з європейськими партнерами й розширили номенклатуру та географію.</p>
        </Reveal>
      </section>

      <section className="content-section split-section" id="services">
        <div>
          <Reveal as="p" className="section-label">Що ми робимо</Reveal>
          <Reveal as="h2" delay={110}>Постачання, підбір, логістика для виробничих задач.</Reveal>
        </div>
        <div className="service-list">
          {capabilities.map((item, index) => (
            <Reveal as="article" className="service-item" key={item.title} delay={index * 90}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="content-section geography-section" id="geography">
        <div className="geography-copy">
          <Reveal as="p" className="section-label">Географія</Reveal>
          <Reveal as="p" delay={110}>Працюємо по обидва боки ланцюга постачання: від виробників в Азії до замовників у Європі, включно з Україною.</Reveal>
        </div>
        <Reveal as="div" className="map-graphic" delay={180}>
          <img src="/map.webp" alt="Темна мапа Європи та Азії з маршрутом постачання до Чехії" />
        </Reveal>
      </section>

      <section className="content-section why-section" id="why">
        <Reveal as="p" className="section-label">Чому ми</Reveal>
        <div className="reason-grid">
          {reasons.map((item, index) => (
            <Reveal as="p" key={item} delay={index * 70}>
              <span>{String(index + 1).padStart(2, "0")}</span>{item}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="content-section direction-section" id="direction">
        <Reveal as="p" className="section-label">Куди ми йдемо</Reveal>
        <Reveal as="div" className="section-copy" delay={120}>
          <p>Наша мета: зробити постачання електронних компонентів для Європи передбачуваним і стійким до збоїв глобальних ланцюгів. Тому ми не зупиняємось на торгівлі.</p>
          <p>Найближча перспектива, власне виробництво на території Чехії: коротший шлях від компонента до замовника й контроль якості на власному боці.</p>
          <p>Окремий напрям розвитку, безпілотні системи UAV. Ми маємо досвід співпраці з українськими технологічними компаніями й розвиваємо цивільні застосування: моніторинг, інспекцію інфраструктури, логістику.</p>
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
        <header className="menu-header">
          <a className="menu-logo" href="#" aria-label="ZBROYA home">ZBROYA</a>
        </header>

        <div className="menu-columns">
          <section className="primary-menu">
            <div className="primary-links">
              {menuItems.map((item) => (
                <a href={item.href} key={item.label}>{item.label}</a>
              ))}
            </div>
          </section>

          <section className="list-menu">
            <p className="section-label">Напрями</p>
            {quickLinks.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
          </section>

          <section className="list-menu">
            <p className="section-label">Розвиток</p>
            {researchLinks.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
          </section>
        </div>

        <MenuContactStrip />
      </nav>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer-section" id="footer">
      <div className="footer-main">
        <div className="contact-list">
          {contactRows.map(([label, value], index) => (
            <Reveal as="div" className="contact-row" key={label} delay={index * 55}>
              <span>{label}</span>
              {label === "Email" ? <a href={`mailto:${value}`}>{value}</a> : <strong>{value}</strong>}
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal as="div" className="footer-contact" delay={contactRows.length * 55}>
        <div>
          <span>Контакти</span>
          <a href="mailto:info@zbroya-timepieces.com">info@zbroya-timepieces.com</a>
        </div>
        <span>© ZBROYA 2026</span>
      </Reveal>
    </footer>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(() => new URLSearchParams(window.location.search).get("menu") === "1");
  const [logoProgress, setLogoProgress] = useState(0);

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
        setLogoProgress(clamp(window.scrollY / distance, 0, 1));
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
    <main className="page">
      <MorphingLogo progress={logoProgress} />
      <SiteHeader menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} />
      <Hero />
      <ContentSections />
      <Footer />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
