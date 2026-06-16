/* ============================================================
   i18n.js — language switching (DE/EN), theme toggle, scroll reveal
   Static, no dependencies. Texts live in the dictionary below.
   Mark elements with:
     data-i18n="key"            -> sets textContent
     data-i18n-html="key"       -> sets innerHTML (use for <br>, <strong>)
     data-i18n-ph="key"         -> sets placeholder attribute
     data-i18n-title="key"      -> sets <title> / aria-label
   ============================================================ */

const I18N = {
  de: {
    "nav.cv": "Lebenslauf",
    "nav.projects": "Projekte",
    "nav.contact": "Kontakt",
    "footer.tagline": "Physik-Student · Embedded · Maker",

    // ---- Index ----
    "index.title": "Enrico Kleffmann — Portfolio",
    "hero.eyebrow": "Physik · Embedded Systems · Maker",
    "hero.tagline": "Physikstudent, Hobby-Engineer & Tech-Enthusiast.<br>Fokus auf Embedded Systems und das Zusammenbringen junger, motivierter Menschen.",
    "btn.cv": "Lebenslauf",
    "btn.projects": "Projekte",
    "btn.contact": "Kontakt",

    // ---- CV ----
    "cv.title": "Lebenslauf — Enrico Kleffmann",
    "cv.back": "← Zurück",
    "cv.location": "München, Deutschland · Geb. 2008",
    "cv.dl": "Lebenslauf als PDF",
    "cv.h.exp": "Praktische Erfahrungen",
    "cv.h.awards": "Auszeichnungen & Stipendien",
    "cv.h.engage": "Besonderes Engagement",
    "cv.h.edu": "Bildung",
    "cv.h.skills": "Kenntnisse",
    "cv.today": "heute",

    "cv.exp1.role": "Werkstudent",
    "cv.exp1.desc": "Produktionsservice und Automatisierung der Datenverwaltung.",
    "cv.exp2.role": "Freiwilliges Praktikum",
    "cv.exp2.desc": "Produktion und Embedded Programming.",
    "cv.exp3.role": "Produktion & Prozessoptimierung",
    "cv.exp3.desc": "Produktion und Optimierung von Produktionsabläufen.",
    "cv.exp4.role": "Freelance SEO-Data",
    "cv.exp4.desc": "Organisation und Auswertung von SEO-Daten.",
    "cv.exp5.role": "Pflichtpraktikum Web & Backend",
    "cv.exp5.desc": "Einblicke in Webdesign, Backend-Development und Ruby on Rails.",

    "cv.aw1.role": "Stipendium der Studienstiftung des deutschen Volkes",
    "cv.aw1.desc": "Förderung durch die renommierteste Studienstiftung Deutschlands.",
    "cv.aw2.role": "Deutschlandstipendium",
    "cv.aw2.desc": "Stipendium für begabte, engagierte und leistungsstarke Studierende.",

    "cv.en1.role": "WARR Rocketry",
    "cv.en1.desc": "Entwicklung von Electronic Systems für Airbreathing Vehicles.",
    "cv.en2.role": "Quantum Quest",
    "cv.en2.desc": "5-Wochen-Programm: Einführung in Quantencomputing und Kryptographie.",
    "cv.en3.role": "Gründer & Leiter Elektrotechnik-AG",
    "cv.en3.desc": "Leitung von Projekten auf Arduino-Basis (z. B. RC-Cars, LED-Matrix).",
    "cv.en4.role": "Leiter Theater-AG",
    "cv.en4.desc": "Leiten, Schreiben und Bühnenbilddesign für die Unterstufe.",

    "cv.ed1.role": "B.Sc. Physik",
    "cv.ed2.role": "Allgemeine Hochschulreife (Abitur)",
    "cv.ed2.desc": "<strong>Note: 1,6</strong><br>Fächer: Physik, Mathematik, Philosophie, Deutsch.",

    "cv.sk.dev": "Development",
    "cv.sk.dev.v": "Embedded C++ (Grundlagen), Rust (Grundlagen), Java (Grundlagen), VBA, Google Apps Script, Visual Basic",
    "cv.sk.sys": "Systeme & Tools",
    "cv.sk.sys.v": "Linux, macOS, Windows, Vim, Git, GitHub, LaTeX, Markdown",
    "cv.sk.hw": "Hardware & CAD",
    "cv.sk.hw.v": "Fusion 360, KiCad, Arduino / Embedded Systems",
    "cv.sk.lang": "Sprachen",
    "cv.sk.lang.v": "Deutsch (Muttersprache)<br>Englisch (fließend)",

    // ---- Projects ----
    "proj.title": "Projekte — Enrico Kleffmann",
    "proj.back": "← Zurück",
    "proj.h": "Ausgewählte Projekte",
    "proj.lead": "Eine Auswahl meiner Arbeiten aus Schule, Praktika und privatem Interesse.",

    "proj.eq.badge": "Wichtigstes Projekt",
    "proj.eq.title": "Equez Unity",
    "proj.eq.meta": "Gründer & Entwickler · seit 2025",
    "proj.eq.desc": "Bildungsplattform, die Lernende und Lehrende zusammenbringt: Echtzeit-Chaträume, ein kuratiertes Download-Center, ein Eventkalender mit RSVP, rollenbasierte Zugriffsrechte (Admin, Lehrkraft, Moderator, Student, Gast) sowie rollenspezifische Fortschritts-Dashboards. Privacy-first — nur notwendige Session-Cookies, kein Tracking, komplett zweisprachig.",
    "proj.eq.link": "equez.de besuchen ↗",

    "proj.p1.title": "Elektrotechnik-AG & Arduino Education",
    "proj.p1.meta": "Gründer & Leiter · 2024–2025",
    "proj.p1.desc": "Gründung und Leitung einer Arbeitsgemeinschaft, um Mitschülern die Grundlagen der Elektrotechnik näherzubringen. Fokus auf Arduino-basierte Systeme — realisiert wurden u. a. ferngesteuerte RC-Cars und eine programmierte 4×4×4-LED-Matrix.",
    "proj.p2.title": "Quantum Quest",
    "proj.p2.meta": "University of Amsterdam · 2023",
    "proj.p2.desc": "Teilnahme am „Quantum Quest“, einem 5-wöchigen Intensivprogramm. Auseinandersetzung mit der Funktionsweise von Quantencomputern und Quantenkryptographie auf Hardware- und Softwareebene.",
    "proj.p3.title": "Theater-Produktion & Bühnenbild",
    "proj.p3.meta": "Kreative Leitung · 2023–2025",
    "proj.p3.desc": "Leitung der Theater-AG der 5. und 6. Klasse. Verantwortlich für das Schreiben der Stücke, die Regie sowie das technische Design und den Bau des Bühnenbilds.",
    "proj.p4.title": "WARR Rocketry — Electronics",
    "proj.p4.meta": "WARR e.V. · seit 2025",
    "proj.p4.desc": "Mitarbeit an der Entwicklung elektronischer Systeme für Airbreathing Vehicles im studentischen Raumfahrtverein WARR.",

    // ---- Contact ----
    "contact.title": "Kontakt — Enrico Kleffmann",
    "contact.back": "← Zurück",
    "contact.h": "Kontakt",
    "contact.lead": "Ich freue mich über Nachrichten zu Projekten, Kollaborationen oder einfach zum Austausch.",
    "contact.name": "Name",
    "contact.name.ph": "Dein Name",
    "contact.email": "E-Mail",
    "contact.email.ph": "deine@email.com",
    "contact.msg": "Nachricht",
    "contact.msg.ph": "Schreib hier deine Nachricht …",
    "contact.send": "Nachricht senden"
  },

  en: {
    "nav.cv": "Résumé",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "footer.tagline": "Physics student · Embedded · Maker",

    // ---- Index ----
    "index.title": "Enrico Kleffmann — Portfolio",
    "hero.eyebrow": "Physics · Embedded Systems · Maker",
    "hero.tagline": "Physics student, hobby engineer & tech enthusiast.<br>Focused on embedded systems and bringing motivated young people together.",
    "btn.cv": "Résumé",
    "btn.projects": "Projects",
    "btn.contact": "Contact",

    // ---- CV ----
    "cv.title": "Résumé — Enrico Kleffmann",
    "cv.back": "← Back",
    "cv.location": "Munich, Germany · Born 2008",
    "cv.dl": "Download résumé (PDF)",
    "cv.h.exp": "Work Experience",
    "cv.h.awards": "Awards & Scholarships",
    "cv.h.engage": "Engagement & Activities",
    "cv.h.edu": "Education",
    "cv.h.skills": "Skills",
    "cv.today": "today",

    "cv.exp1.role": "Working Student",
    "cv.exp1.desc": "Production services and automation of data management.",
    "cv.exp2.role": "Voluntary Internship",
    "cv.exp2.desc": "Production and embedded programming.",
    "cv.exp3.role": "Production & Process Optimization",
    "cv.exp3.desc": "Production and optimization of production workflows.",
    "cv.exp4.role": "Freelance SEO Data",
    "cv.exp4.desc": "Organizing and analyzing SEO data.",
    "cv.exp5.role": "Mandatory Internship — Web & Backend",
    "cv.exp5.desc": "Insights into web design, backend development and Ruby on Rails.",

    "cv.aw1.role": "Scholarship — German Academic Scholarship Foundation",
    "cv.aw1.desc": "Funding by Germany's most prestigious academic scholarship foundation (Studienstiftung).",
    "cv.aw2.role": "Germany Scholarship (Deutschlandstipendium)",
    "cv.aw2.desc": "Scholarship for talented, committed and high-achieving students.",

    "cv.en1.role": "WARR Rocketry",
    "cv.en1.desc": "Development of electronic systems for airbreathing vehicles.",
    "cv.en2.role": "Quantum Quest",
    "cv.en2.desc": "5-week program: introduction to quantum computing and cryptography.",
    "cv.en3.role": "Founder & Lead — Electronics Club",
    "cv.en3.desc": "Led Arduino-based projects (e.g. RC cars, LED matrix).",
    "cv.en4.role": "Head of Theatre Club",
    "cv.en4.desc": "Directing, writing and stage design for the lower grades.",

    "cv.ed1.role": "B.Sc. Physics",
    "cv.ed2.role": "University Entrance Qualification (Abitur)",
    "cv.ed2.desc": "<strong>Grade: 1.6</strong><br>Subjects: Physics, Mathematics, Philosophy, German.",

    "cv.sk.dev": "Development",
    "cv.sk.dev.v": "Embedded C++ (basics), Rust (basics), Java (basics), VBA, Google Apps Script, Visual Basic",
    "cv.sk.sys": "Systems & Tools",
    "cv.sk.sys.v": "Linux, macOS, Windows, Vim, Git, GitHub, LaTeX, Markdown",
    "cv.sk.hw": "Hardware & CAD",
    "cv.sk.hw.v": "Fusion 360, KiCad, Arduino / Embedded Systems",
    "cv.sk.lang": "Languages",
    "cv.sk.lang.v": "German (native)<br>English (fluent)",

    // ---- Projects ----
    "proj.title": "Projects — Enrico Kleffmann",
    "proj.back": "← Back",
    "proj.h": "Selected Projects",
    "proj.lead": "A selection of my work from school, internships and personal interest.",

    "proj.eq.badge": "Flagship project",
    "proj.eq.title": "Equez Unity",
    "proj.eq.meta": "Founder & Developer · since 2025",
    "proj.eq.desc": "An educational platform connecting learners and educators: real-time chat rooms, a curated download centre, an events calendar with RSVP, role-based access (admin, teacher, moderator, student, guest) and role-specific progress dashboards. Privacy-first — only necessary session cookies, no tracking, fully bilingual.",
    "proj.eq.link": "Visit equez.de ↗",

    "proj.p1.title": "Electronics Club & Arduino Education",
    "proj.p1.meta": "Founder & Lead · 2024–2025",
    "proj.p1.desc": "Founded and led a student club to teach classmates the fundamentals of electronics. Focused on Arduino-based systems — projects included remote-controlled RC cars and a programmed 4×4×4 LED matrix.",
    "proj.p2.title": "Quantum Quest",
    "proj.p2.meta": "University of Amsterdam · 2023",
    "proj.p2.desc": "Took part in “Quantum Quest”, a 5-week intensive program exploring how quantum computers and quantum cryptography work, at both the hardware and software level.",
    "proj.p3.title": "Theatre Production & Stage Design",
    "proj.p3.meta": "Creative Lead · 2023–2025",
    "proj.p3.desc": "Led the theatre club for grades 5 and 6. Responsible for writing the plays, directing, and the technical design and construction of the set.",
    "proj.p4.title": "WARR Rocketry — Electronics",
    "proj.p4.meta": "WARR e.V. · since 2025",
    "proj.p4.desc": "Contributing to the development of electronic systems for airbreathing vehicles at WARR, Germany's largest student space association.",

    // ---- Contact ----
    "contact.title": "Contact — Enrico Kleffmann",
    "contact.back": "← Back",
    "contact.h": "Contact",
    "contact.lead": "I'm happy to hear about projects, collaborations, or just to chat.",
    "contact.name": "Name",
    "contact.name.ph": "Your name",
    "contact.email": "Email",
    "contact.email.ph": "your@email.com",
    "contact.msg": "Message",
    "contact.msg.ph": "Write your message here …",
    "contact.send": "Send message"
  }
};

(function () {
  const STORE_LANG = "ek_lang";

  function getLang() {
    const saved = localStorage.getItem(STORE_LANG);
    if (saved === "de" || saved === "en") return saved;
    return (navigator.language || "de").toLowerCase().startsWith("en") ? "en" : "de";
  }

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.de;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const k = el.getAttribute("data-i18n-html");
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      const k = el.getAttribute("data-i18n-ph");
      if (dict[k] != null) el.setAttribute("placeholder", dict[k]);
    });
    document.querySelectorAll("[data-i18n-title]").forEach(el => {
      const k = el.getAttribute("data-i18n-title");
      if (dict[k] != null) document.title = dict[k];
    });

    const btn = document.getElementById("langToggle");
    if (btn) btn.textContent = lang === "de" ? "EN" : "DE";

    localStorage.setItem(STORE_LANG, lang);
  }

  function initScrollProgress() {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initRevealObserver() {
    const els = document.querySelectorAll(".reveal, .reveal-left");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(e => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyLang(getLang());
    initRevealObserver();
    initScrollProgress();

    const langBtn = document.getElementById("langToggle");
    if (langBtn) langBtn.addEventListener("click", () => {
      applyLang(document.documentElement.lang === "de" ? "en" : "de");
    });
  });
})();
