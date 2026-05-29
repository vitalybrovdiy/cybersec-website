const matrix = document.getElementById("matrix");

if (matrix) {
  const ctx = matrix.getContext("2d");
  const alphabet = "0101011010010110CYBERSECURITY";
  const fontSize = 16;
  let columns = 0;
  let drops = [];

  function resizeMatrix() {
    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;
    columns = Math.floor(matrix.width / fontSize);
    drops = Array(columns).fill(1);
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, matrix.width, matrix.height);

    ctx.fillStyle = "#19ff35";
    ctx.font = `${fontSize}px JetBrains Mono`;

    for (let i = 0; i < drops.length; i++) {
      const text = alphabet[Math.floor(Math.random() * alphabet.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > matrix.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  resizeMatrix();
  window.addEventListener("resize", resizeMatrix);
  setInterval(drawMatrix, 45);
}

function createParticles() {
  if (document.querySelector(".particle-field")) {
    return;
  }

  const field = document.createElement("div");
  field.className = "particle-field";
  document.body.appendChild(field);

  for (let i = 0; i < 38; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${8 + Math.random() * 12}s`;
    particle.style.animationDelay = `${Math.random() * -12}s`;
    particle.style.opacity = String(0.18 + Math.random() * 0.45);
    field.appendChild(particle);
  }
}

createParticles();

const currentPage = document.body.dataset.page;
const navLinks = document.querySelectorAll("[data-page-link]");

navLinks.forEach(link => {
  if (link.dataset.pageLink === currentPage) {
    link.classList.add("active");
  }
});

const navToggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".menu");

if (navToggle && menu) {
  navToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", event => {
    if (event.target.closest("a")) {
      menu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", event => {
    const href = anchor.getAttribute("href");

    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

document.querySelectorAll("[data-scroll-target]").forEach(card => {
  card.addEventListener("click", event => {
    if (event.target.closest("a, button")) {
      return;
    }

    const target = document.getElementById(card.dataset.scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  card.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    const target = document.getElementById(card.dataset.scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

const chartCanvas = document.getElementById("threatChart");

if (chartCanvas && window.Chart) {
  const gradient = chartCanvas
    .getContext("2d")
    .createLinearGradient(0, 0, 0, 150);

  gradient.addColorStop(0, "rgba(57,255,74,0.45)");
  gradient.addColorStop(1, "rgba(57,255,74,0.03)");

  new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: [
        "00:00", "", "", "", "", "06:00", "", "", "", "", "12:00",
        "", "", "", "", "18:00", "", "", "", "", "24:00"
      ],
      datasets: [
        {
          data: [50, 42, 56, 38, 49, 34, 39, 47, 70, 53, 66, 86, 68, 79, 61, 42, 31, 58, 49, 66, 88],
          borderColor: "#39ff4a",
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 2,
          pointBackgroundColor: "#39ff4a"
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#c9c9c9",
            maxRotation: 0,
            autoSkip: false
          },
          grid: {
            color: "rgba(57,255,74,0.08)"
          }
        },
        y: {
          min: 0,
          max: 100,
          ticks: {
            color: "#c9c9c9"
          },
          grid: {
            color: "rgba(57,255,74,0.08)"
          }
        }
      }
    }
  });
}

const terminal = document.getElementById("terminalLines");
let terminalTimer;

document.querySelectorAll(".contact-form").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const status = form.querySelector(".form-status");

    if (status) {
      status.textContent = (runtimeText[activeLanguage] || runtimeText.uk).formSent;
    }

    form.reset();
  });
});

const scanTargets = [
  { url: "secure-client.app", status: "safe", level: "low", tone: "safe" },
  { url: "login-cloud-gateway.net", status: "suspicious", level: "medium", tone: "suspicious" },
  { url: "billing-alert.example", status: "dangerous", level: "high", tone: "dangerous" },
  { url: "api.partner-vault.io", status: "safe", level: "low", tone: "safe" }
];
const feedMessages = [
  { key: "sql", type: "alert" },
  { key: "qr", type: "warn" },
  { key: "policy", type: "" },
  { key: "stuffing", type: "alert" },
  { key: "ioc", type: "warn" },
  { key: "zeroTrust", type: "" }
];
const progressBar = document.getElementById("homeScanProgress");
const scanTarget = document.getElementById("scanTarget");
const scanStatus = document.getElementById("scanStatus");
const aiAnalysis = document.getElementById("aiAnalysis");
const threatFeed = document.getElementById("threatFeed");
const homeScanHistory = document.getElementById("homeScanHistory");
let scanIndex = 0;
let feedIndex = 0;

function typeText(element, text) {
  if (!element) {
    return;
  }

  element.textContent = "";
  let index = 0;

  const timer = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;

    if (index >= text.length) {
      clearInterval(timer);
    }
  }, 22);
}

function runHomeScanner() {
  if (!progressBar || !scanTarget || !scanStatus) {
    return;
  }

  const scan = scanTargets[scanIndex % scanTargets.length];
  const copy = runtimeText[activeLanguage] || runtimeText.uk;
  let progress = 0;

  scanTarget.textContent = scan.url;
  scanStatus.textContent = copy.scannerStates[scanIndex % copy.scannerStates.length];
  scanStatus.className = "";
  progressBar.style.width = "0%";
  typeText(aiAnalysis, copy.aiMessages[scanIndex % copy.aiMessages.length]);

  const timer = setInterval(() => {
    progress += 8 + Math.floor(Math.random() * 13);
    progressBar.style.width = `${Math.min(progress, 100)}%`;

    if (progress >= 100) {
      clearInterval(timer);
      scanStatus.textContent = copy.risk[scan.status];
      scanStatus.className = scan.tone === "safe" ? "" : scan.tone;
      addHistoryRow(scan);
      scanIndex++;
    }
  }, 260);
}

function addThreatFeedItem() {
  if (!threatFeed) {
    return;
  }

  const item = feedMessages[feedIndex % feedMessages.length];
  const copy = runtimeText[activeLanguage] || runtimeText.uk;
  const row = document.createElement("div");
  row.className = `feed-item ${item.type}`;
  row.textContent = `[${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}] ${copy.feed[item.key]}`;
  threatFeed.prepend(row);

  while (threatFeed.children.length > 5) {
    threatFeed.lastElementChild.remove();
  }

  feedIndex++;
}

function addHistoryRow(scan) {
  if (!homeScanHistory) {
    return;
  }

  if (!homeScanHistory.children.length) {
    const copy = runtimeText[activeLanguage] || runtimeText.uk;
    const head = document.createElement("div");
    head.className = "history-row history-head";
    head.innerHTML = `<span>URL</span><span>${copy.table.time}</span><span>${copy.table.risk}</span><span>${copy.table.status}</span>`;
    homeScanHistory.appendChild(head);
  }

  const row = document.createElement("div");
  const copy = runtimeText[activeLanguage] || runtimeText.uk;
  const riskClass = scan.level === "high" ? "risk-high" : scan.level === "medium" ? "risk-medium" : "risk-low";
  const badgeClass = scan.status === "dangerous" ? "alert" : scan.status === "suspicious" ? "review" : "done";

  row.className = "history-row";
  row.innerHTML = `
    <span>${scan.url}</span>
    <span>${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
    <span class="${riskClass}">${copy.riskLevel[scan.level]}</span>
    <span class="status-badge ${badgeClass}">${copy.risk[scan.status]}</span>
  `;
  homeScanHistory.insertBefore(row, homeScanHistory.children[1] || null);

  while (homeScanHistory.children.length > 6) {
    homeScanHistory.lastElementChild.remove();
  }
}

function animateCounters() {
  document.querySelectorAll("[data-counter]").forEach(counter => {
    const target = Number(counter.dataset.target || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 70));

    const timer = setInterval(() => {
      current = Math.min(target, current + step);
      counter.textContent = counter.dataset.target === "37"
        ? `${current}%`
        : current.toLocaleString("en-US");

      if (current >= target) {
        clearInterval(timer);
      }
    }, 24);
  });
}

const translations = {
  uk: {
    show: "Показати",
    hide: "Сховати",
    levels: ["Дуже слабкий", "Слабкий", "Середній", "Сильний", "Дуже сильний"],
    crackTimes: ["миттєво", "кілька хвилин", "кілька годин", "кілька років", "мільйони років"],
    recommendations: {
      start: "Введіть пароль, щоб почати аналіз.",
      length: "Збільште довжину до 12+ символів.",
      uppercase: "Додайте великі літери.",
      lowercase: "Додайте малі літери.",
      numbers: "Додайте цифри.",
      special: "Додайте символи на кшталт !, # або ?.",
      repeated: "Уникайте повторюваних символів або шаблонів.",
      common: "Уникайте поширених слів і типових паролів.",
      sequential: "Уникайте послідовностей на кшталт 1234, abcd або qwerty.",
      good: "Пароль виглядає сильним. Збережіть його в password manager."
    }
  },
  en: {
    show: "Show",
    hide: "Hide",
    levels: ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"],
    crackTimes: ["instantly", "few minutes", "several hours", "several years", "millions of years"],
    recommendations: {
      start: "Enter a password to begin analysis.",
      length: "Increase length to 12+ characters.",
      uppercase: "Add uppercase letters.",
      lowercase: "Add lowercase letters.",
      numbers: "Add numbers.",
      special: "Add symbols like !, # or ?.",
      repeated: "Avoid repeated characters or patterns.",
      common: "Avoid common words and known weak passwords.",
      sequential: "Avoid sequences like 1234, abcd or qwerty.",
      good: "Password looks strong. Store it in a password manager."
    }
  },
  de: {
    show: "Anzeigen",
    hide: "Verbergen",
    levels: ["Sehr schwach", "Schwach", "Mittel", "Stark", "Sehr stark"],
    crackTimes: ["sofort", "wenige Minuten", "mehrere Stunden", "mehrere Jahre", "Millionen Jahre"],
    recommendations: {
      start: "Gib ein Passwort ein, um die Analyse zu starten.",
      length: "Erhöhe die Länge auf 12+ Zeichen.",
      uppercase: "Füge Großbuchstaben hinzu.",
      lowercase: "Füge Kleinbuchstaben hinzu.",
      numbers: "Füge Zahlen hinzu.",
      special: "Füge Symbole wie !, # oder ? hinzu.",
      repeated: "Vermeide wiederholte Zeichen oder Muster.",
      common: "Vermeide häufige Wörter und bekannte schwache Passwörter.",
      sequential: "Vermeide Folgen wie 1234, abcd oder qwerty.",
      good: "Das Passwort wirkt stark. Speichere es in einem Passwortmanager."
    }
  }
};

const runtimeText = {
  uk: {
    terminal: [
      "> Систему запущено...",
      "> Захищене з'єднання встановлено",
      "> Сканування загроз...",
      "> Загроз не виявлено",
      "> Firewall: АКТИВНИЙ",
      "> Ви захищені",
      "> Бережіть себе!",
      "> _"
    ],
    scannerStates: ["Сканування...", "Аналіз...", "Перевірка SSL...", "Перевірка redirects...", "Генерація AI аналізу..."],
    aiMessages: [
      "AI аналіз: перевірка DNS репутації та SSL сертифіката...",
      "AI аналіз: сканування headers, redirects і підозрілих токенів...",
      "AI аналіз: порівняння поведінки URL з threat intelligence...",
      "AI аналіз: перевірка fingerprint сторінки та anomaly score..."
    ],
    risk: { safe: "БЕЗПЕЧНО", suspicious: "ПІДОЗРІЛИЙ", dangerous: "НЕБЕЗПЕЧНИЙ" },
    riskLevel: { low: "НИЗЬКИЙ", medium: "СЕРЕДНІЙ", high: "ВИСОКИЙ" },
    table: { time: "Час", risk: "Ризик", status: "Статус" },
    feed: {
      sql: "WAF заблокував SQL injection спробу з ASN-20473",
      qr: "Підозрілий QR redirect ізольовано у email sandbox",
      policy: "Політику endpoint оновлено для 8412 користувачів",
      stuffing: "Credential stuffing хвилю виявлено й обмежено",
      ioc: "Новий IOC знайдено у cloud access logs",
      zeroTrust: "Zero Trust сесію підтверджено через device posture"
    },
    formSent: "Передачу зафіксовано. Команда CYBERSEC скоро зв'яжеться з вами."
  },
  en: {
    terminal: [
      "> System initialized...",
      "> Secure connection established",
      "> Scanning for threats...",
      "> No threats detected",
      "> Firewall: ACTIVE",
      "> You are protected",
      "> Stay safe!",
      "> _"
    ],
    scannerStates: ["Scanning...", "Analyzing...", "Checking SSL...", "Checking redirects...", "Generating AI analysis..."],
    aiMessages: [
      "AI analysis: checking DNS reputation and certificate chain...",
      "AI analysis: scanning headers, redirects and suspicious tokens...",
      "AI analysis: comparing URL behavior against threat intelligence...",
      "AI analysis: validating page fingerprint and anomaly score..."
    ],
    risk: { safe: "SAFE", suspicious: "SUSPICIOUS", dangerous: "DANGEROUS" },
    riskLevel: { low: "LOW", medium: "MEDIUM", high: "HIGH" },
    table: { time: "Time", risk: "Risk", status: "Status" },
    feed: {
      sql: "WAF blocked SQL injection probe from ASN-20473",
      qr: "Suspicious QR redirect isolated in email sandbox",
      policy: "Endpoint policy updated across 8412 protected users",
      stuffing: "Credential stuffing burst detected and rate-limited",
      ioc: "New IOC matched against cloud access logs",
      zeroTrust: "Zero Trust session verified with device posture"
    },
    formSent: "Transmission queued. CYBERSEC team will contact you soon."
  },
  de: {
    terminal: [
      "> System gestartet...",
      "> Sichere Verbindung hergestellt",
      "> Suche nach Bedrohungen...",
      "> Keine Bedrohungen gefunden",
      "> Firewall: AKTIV",
      "> Sie sind geschützt",
      "> Bleiben Sie sicher!",
      "> _"
    ],
    scannerStates: ["Scannen...", "Analysieren...", "SSL prüfen...", "Weiterleitungen prüfen...", "KI-Analyse generieren..."],
    aiMessages: [
      "KI-Analyse: DNS-Reputation und Zertifikatskette werden geprüft...",
      "KI-Analyse: Header, Weiterleitungen und verdächtige Tokens werden gescannt...",
      "KI-Analyse: URL-Verhalten wird mit Threat Intelligence verglichen...",
      "KI-Analyse: Seiten-Fingerprint und Anomaliewert werden validiert..."
    ],
    risk: { safe: "SICHER", suspicious: "VERDÄCHTIG", dangerous: "GEFÄHRLICH" },
    riskLevel: { low: "NIEDRIG", medium: "MITTEL", high: "HOCH" },
    table: { time: "Zeit", risk: "Risiko", status: "Status" },
    feed: {
      sql: "WAF blockierte SQL-Injection-Versuch von ASN-20473",
      qr: "Verdächtiger QR-Redirect in Email-Sandbox isoliert",
      policy: "Endpoint-Richtlinie für 8412 geschützte Nutzer aktualisiert",
      stuffing: "Credential-Stuffing-Welle erkannt und begrenzt",
      ioc: "Neuer IOC in Cloud-Zugriffslogs gefunden",
      zeroTrust: "Zero-Trust-Sitzung mit Gerätestatus verifiziert"
    },
    formSent: "Übertragung vorgemerkt. Das CYBERSEC-Team meldet sich bald."
  }
};

const staticTranslations = [
  ["[data-page-link='home']", "ГОЛОВНА", "HOME", "START"],
  ["[data-page-link='about']", "ПРО НАС", "ABOUT", "ÜBER UNS"],
  ["[data-page-link='services']", "ПОСЛУГИ", "SERVICES", "SERVICES"],
  ["[data-page-link='blog']", "БЛОГ", "BLOG", "BLOG"],
  ["[data-page-link='resources']", "РЕСУРСИ", "RESOURCES", "RESSOURCEN"],
  ["[data-page-link='tools']", "ІНСТРУМЕНТИ", "TOOLS", "TOOLS"],
  ["[data-page-link='contacts']", "КОНТАКТИ", "CONTACTS", "KONTAKT"],
  [".login", "🔒 ЗВ'ЯЗАТИСЬ", "🔒 CONTACT", "🔒 KONTAKT"],
  [".footer-inner > div:first-child", "© 2026 CYBERSEC. Усі права захищені.", "© 2026 CYBERSEC. All rights reserved.", "© 2026 CYBERSEC. Alle Rechte vorbehalten."],
  [".footer-links a:nth-child(1)", "Політика конфіденційності", "Privacy Policy", "Datenschutz"],
  [".footer-links a:nth-child(2)", "Умови використання", "Terms of Use", "Nutzungsbedingungen"],
  [".hero .eyebrow", "// КІБЕРБЕЗПЕКА", "// CYBER SECURITY", "// CYBERSECURITY"],
  [".hero h1", "Захищаємо твоє цифрове майбутнє", "Protecting Your Digital Future", "Wir schützen Ihre digitale Zukunft"],
  [".hero .lead", "Кібербезпека, тестування на проникнення, аналіз загроз і захист даних для компаній, які не можуть дозволити собі мовчання після атаки.", "Cybersecurity, penetration testing, threat analysis and data protection for companies that cannot afford silence after an attack.", "Cybersecurity, Penetration Testing, Bedrohungsanalyse und Datenschutz für Unternehmen, die sich nach einem Angriff kein Schweigen leisten können."],
  [".hero .btn-primary", "Наші послуги", "Our Services", "Unsere Services"],
  [".hero .buttons .btn:not(.btn-primary)", "Дізнатись більше", "Learn More", "Mehr erfahren"],
  [".scanner-main .panel-title", "// AI сканер загроз", "// AI Threat Scanner", "// KI-Bedrohungsscanner"],
  [".detection-labels .detect-safe", "БЕЗПЕЧНО", "SAFE", "SICHER"],
  [".detection-labels .detect-suspicious", "ПІДОЗРІЛИЙ", "SUSPICIOUS", "VERDÄCHTIG"],
  [".detection-labels .detect-dangerous", "НЕБЕЗПЕЧНИЙ", "DANGEROUS", "GEFÄHRLICH"],
  [".cyber-globe-panel .panel-title", "// Глобальний трафік", "// Global Traffic", "// Globaler Traffic"],
  [".threat-feed-panel .panel-title", "// Live стрічка загроз", "// Live Threat Feed", "// Live-Bedrohungsfeed"],
  [".live-metrics .stat:nth-child(1) span", "Сканувань сьогодні", "Today's Scans", "Scans heute"],
  [".live-metrics .stat:nth-child(2) span", "Загроз заблоковано", "Threats Blocked", "Blockierte Bedrohungen"],
  [".live-metrics .stat:nth-child(3) span", "Середній ризик", "Average Risk", "Durchschnittliches Risiko"],
  [".live-metrics .stat:nth-child(4) span", "Захищені користувачі", "Protected Users", "Geschützte Nutzer"],
  [".live-history .panel-title", "// Live історія сканувань", "// Live Scan History", "// Live-Scanverlauf"],
  [".dashboard .news .panel-title", "// Останні новини", "// Latest News", "// Neueste Meldungen"],
  [".dashboard .panel:nth-child(2) .panel-title", "// Статистика загроз, 24h", "// Threat Statistics, 24h", "// Bedrohungsstatistik, 24h"],
  [".terminal .panel-title", "// Термінал", "// Terminal", "// Terminal"],
  ["body[data-page='home'] .service-card:nth-child(1) h3", "Тестування на проникнення", "Penetration Testing", "Penetration Testing"],
  ["body[data-page='home'] .service-card:nth-child(1) p", "Знаходимо критичні вразливості до того, як ними скористаються атакувальники.", "We find critical vulnerabilities before attackers use them.", "Wir finden kritische Schwachstellen, bevor Angreifer sie nutzen."],
  ["body[data-page='home'] .service-card:nth-child(2) h3", "Захист мережі", "Network Protection", "Netzwerkschutz"],
  ["body[data-page='home'] .service-card:nth-child(2) p", "Захищаємо мережі, сервери та інфраструктуру від реальних кіберзагроз.", "We protect networks, servers and infrastructure from real cyber threats.", "Wir schützen Netzwerke, Server und Infrastruktur vor realen Cyberbedrohungen."],
  ["body[data-page='home'] .service-card:nth-child(3) h3", "Аналіз загроз", "Threat Analysis", "Bedrohungsanalyse"],
  ["body[data-page='home'] .service-card:nth-child(3) p", "Моніторимо, аналізуємо й пріоритезуємо ризики у режимі 24/7.", "We monitor, analyze and prioritize risks 24/7.", "Wir überwachen, analysieren und priorisieren Risiken rund um die Uhr."],
  ["body[data-page='home'] .service-card:nth-child(4) h3", "Security Consulting", "Security Consulting", "Security Consulting"],
  ["body[data-page='home'] .service-card:nth-child(4) p", "Будуємо зрозумілу cyber strategy для бізнесу, команд і продуктів.", "We build clear cyber strategy for businesses, teams and products.", "Wir entwickeln klare Cyber-Strategien für Unternehmen, Teams und Produkte."],
  ["body[data-page='home'] .service-card .more", "ДЕТАЛЬНІШЕ →", "READ MORE →", "MEHR LESEN →"],
  ["body[data-page='about'] .page-hero .eyebrow", "// ПРО НАС", "// ABOUT", "// ÜBER UNS"],
  ["body[data-page='about'] .page-hero h1", "Ми будуємо захист, який витримує реальні атаки", "We build protection that withstands real attacks", "Wir bauen Schutz, der echten Angriffen standhält"],
  ["body[data-page='about'] .page-hero .lead", "CYBERSEC об'єднує offensive security, SOC monitoring і стратегічний консалтинг, щоб бізнес міг рости без цифрової паніки.", "CYBERSEC combines offensive security, SOC monitoring and strategic consulting so business can grow without digital panic.", "CYBERSEC verbindet Offensive Security, SOC-Monitoring und strategische Beratung, damit Unternehmen ohne digitale Panik wachsen können."],
  ["body[data-page='about'] .split-section article:nth-child(1) .panel-title", "// Місія", "// Mission", "// Mission"],
  ["body[data-page='about'] .split-section article:nth-child(1) p", "Наша місія - зробити кібербезпеку зрозумілою, вимірюваною та дієвою.", "Our mission is to make cybersecurity clear, measurable and actionable.", "Unsere Mission ist es, Cybersecurity klar, messbar und umsetzbar zu machen."],
  ["body[data-page='about'] .split-section article:nth-child(2) .panel-title", "// Досвід", "// Experience", "// Erfahrung"],
  ["body[data-page='about'] .split-section article:nth-child(2) p", "Команда працювала з фінтехом, SaaS, e-commerce та enterprise системами.", "The team has worked with fintech, SaaS, e-commerce and enterprise systems.", "Das Team arbeitete mit Fintech, SaaS, E-Commerce und Enterprise-Systemen."],
  ["body[data-page='services'] .page-hero .eyebrow", "// ПОСЛУГИ", "// SERVICES", "// SERVICES"],
  ["body[data-page='services'] .page-hero h1", "Cyber defense services для критичних систем", "Cyber defense services for critical systems", "Cyber-Defense-Services für kritische Systeme"],
  ["body[data-page='services'] .page-hero .lead", "Від першого аудиту до постійного моніторингу - ми закриваємо повний цикл захисту.", "From the first audit to continuous monitoring, we cover the full protection cycle.", "Vom ersten Audit bis zum kontinuierlichen Monitoring decken wir den gesamten Schutzzyklus ab."],
  ["body[data-page='services'] .feature-card:nth-child(1) p", "Web, API, mobile та infrastructure testing з пріоритетами remediation.", "Web, API, mobile and infrastructure testing with remediation priorities.", "Web-, API-, Mobile- und Infrastrukturtests mit Remediation-Prioritäten."],
  ["body[data-page='services'] .feature-card:nth-child(2) p", "Segmentation, firewall rules, secure remote access, hardening і traffic analysis.", "Segmentation, firewall rules, secure remote access, hardening and traffic analysis.", "Segmentierung, Firewall-Regeln, sicherer Remote-Zugriff, Hardening und Traffic-Analyse."],
  ["body[data-page='services'] .feature-card:nth-child(3) p", "Cloud posture review, IAM hardening, secrets hygiene і workload protection.", "Cloud posture review, IAM hardening, secrets hygiene and workload protection.", "Cloud-Posture-Review, IAM-Hardening, Secrets-Hygiene und Workload-Schutz."],
  ["body[data-page='services'] .feature-card:nth-child(4) p", "Alert triage, SIEM tuning, playbooks і incident response readiness.", "Alert triage, SIEM tuning, playbooks and incident response readiness.", "Alert-Triage, SIEM-Tuning, Playbooks und Incident-Response-Bereitschaft."],
  ["body[data-page='services'] .feature-card:nth-child(5) p", "Static/dynamic analysis, IOC extraction, sandbox reports і containment guidance.", "Static/dynamic analysis, IOC extraction, sandbox reports and containment guidance.", "Statische/dynamische Analyse, IOC-Extraktion, Sandbox-Berichte und Eindämmung."],
  ["body[data-page='services'] .feature-card:nth-child(6) p", "Security roadmap, policies, awareness, vendor review та executive risk reporting.", "Security roadmap, policies, awareness, vendor review and executive risk reporting.", "Security-Roadmap, Policies, Awareness, Vendor Review und Executive Reporting."],
  ["body[data-page='services'] .cta-band .eyebrow", "// ЗАПИТ ASSESSMENT", "// REQUEST ASSESSMENT", "// ASSESSMENT ANFRAGEN"],
  ["body[data-page='services'] .cta-band h2", "Потрібен security audit цього тижня?", "Need a security audit this week?", "Brauchen Sie diese Woche ein Security Audit?"],
  ["body[data-page='services'] .cta-band .btn", "Запитати консультацію", "Request consultation", "Beratung anfragen"],
  ["body[data-page='blog'] .page-hero .eyebrow", "// БЛОГ", "// BLOG", "// BLOG"],
  ["body[data-page='blog'] .page-hero h1", "Cyber security articles, briefings, field notes", "Cyber security articles, briefings, field notes", "Cybersecurity-Artikel, Briefings und Notizen"],
  ["body[data-page='blog'] .page-hero .lead", "Практичні матеріали про атаки, захист, інструменти й рішення для команд.", "Practical materials about attacks, defense, tools and decisions for teams.", "Praktische Inhalte zu Angriffen, Schutz, Tools und Entscheidungen für Teams."],
  ["body[data-page='blog'] .article-card .more", "ЧИТАТИ ДАЛІ →", "READ MORE →", "WEITERLESEN →"],
  ["body[data-page='blog'] .featured-article h2", "AI-powered phishing: як перевірити readiness команди", "AI-powered phishing: how to test team readiness", "KI-Phishing: Team-Bereitschaft prüfen"],
  ["body[data-page='blog'] .featured-article p", "Deepfake voice, персоналізовані листи та автоматизована social engineering кампанія змінюють правила defense training.", "Deepfake voice, personalized emails and automated social engineering are changing defense training.", "Deepfake-Stimmen, personalisierte E-Mails und automatisiertes Social Engineering verändern Defense-Training."],
  ["body[data-page='resources'] .page-hero .eyebrow", "// РЕСУРСИ", "// RESOURCES", "// RESSOURCEN"],
  ["body[data-page='resources'] .page-hero h1", "Tools, guides, checklists для практичного захисту", "Tools, guides and checklists for practical defense", "Tools, Guides und Checklisten für praktischen Schutz"],
  ["body[data-page='resources'] .page-hero .lead", "Матеріали, які допомагають швидко оцінити стан безпеки і закрити типові прогалини.", "Resources that help quickly assess security posture and close common gaps.", "Ressourcen, die Sicherheitslage schnell bewerten und typische Lücken schließen."],
  ["body[data-page='resources'] .resource-card .more", "ВІДКРИТИ →", "OPEN →", "ÖFFNEN →"],
  ["body[data-page='resources'] .resource-card:nth-child(1) p", "Базовий набір інструментів для inventory, scanning і швидкої перевірки exposed assets.", "Starter toolkit for inventory, scanning and quick exposed asset checks.", "Starter-Toolkit für Inventar, Scans und schnelle Prüfung exponierter Assets."],
  ["body[data-page='resources'] .resource-card:nth-child(2) p", "PDF playbook для перших кроків після підозри на breach або malware infection.", "PDF playbook for first steps after suspected breach or malware infection.", "PDF-Playbook für erste Schritte nach Breach- oder Malware-Verdacht."],
  ["body[data-page='resources'] .resource-card:nth-child(3) p", "IAM, logging, storage, network exposure, secrets і backup hygiene для cloud команд.", "IAM, logging, storage, network exposure, secrets and backup hygiene for cloud teams.", "IAM, Logging, Storage, Netzwerk-Exposure, Secrets und Backup-Hygiene für Cloud-Teams."],
  ["body[data-page='contacts'] .page-hero .eyebrow", "// КОНТАКТИ", "// CONTACTS", "// KONTAKT"],
  ["body[data-page='contacts'] .page-hero h1", "Розкажи, що потрібно захистити", "Tell us what needs protection", "Sagen Sie uns, was geschützt werden muss"],
  ["body[data-page='contacts'] .page-hero .lead", "Опиши задачу, а ми повернемось з коротким планом assessment, ризиками й наступними кроками.", "Describe the task and we will return with an assessment plan, risks and next steps.", "Beschreiben Sie die Aufgabe und wir melden uns mit Assessment-Plan, Risiken und nächsten Schritten."],
  ["body[data-page='contacts'] .contact-form .panel-title", "// Захищена контактна форма", "// Secure Contact Form", "// Sicheres Kontaktformular"],
  ["body[data-page='contacts'] .contact-form .btn", "Надіслати", "Send", "Senden"],
  ["body[data-page='contacts'] .contact-stack .panel:nth-child(1) .panel-title", "// Прямі канали", "// Direct Channels", "// Direkte Kanäle"],
  ["body[data-page='contacts'] .contact-stack .panel:nth-child(2) .panel-title", "// Соціальні мережі", "// Social Links", "// Social Links"],
];

let activeLanguage = localStorage.getItem("cybersec-language") || "uk";

function hydrateStaticTranslations() {
  staticTranslations.forEach(([selector, uk, en, de]) => {
    document.querySelectorAll(selector).forEach(element => {
      element.dataset.uk = uk;
      element.dataset.en = en;
      element.dataset.de = de;
    });
  });

  document.querySelectorAll("input, textarea").forEach(element => {
    if (element.dataset.ukPlaceholder && element.dataset.enPlaceholder && element.dataset.dePlaceholder) {
      return;
    }

    if (element.id === "passwordInput") {
      element.dataset.ukPlaceholder = "Введіть пароль...";
      element.dataset.enPlaceholder = "Enter password...";
      element.dataset.dePlaceholder = "Passwort eingeben...";
    }

    if (element.name === "name") {
      element.dataset.ukPlaceholder = "Ваше ім'я";
      element.dataset.enPlaceholder = "Your name";
      element.dataset.dePlaceholder = "Ihr Name";
    }

    if (element.name === "email") {
      element.dataset.ukPlaceholder = "security@company.com";
      element.dataset.enPlaceholder = "security@company.com";
      element.dataset.dePlaceholder = "security@company.com";
    }

    if (element.name === "message") {
      element.dataset.ukPlaceholder = "Коротко опишіть інфраструктуру, дедлайн і очікування";
      element.dataset.enPlaceholder = "Briefly describe infrastructure, deadline and expectations";
      element.dataset.dePlaceholder = "Beschreiben Sie kurz Infrastruktur, Frist und Erwartungen";
    }
  });

  document.querySelectorAll(".contact-form select option").forEach((option, index) => {
    const optionTranslations = [
      ["Оберіть напрям", "Choose service", "Service auswählen"],
      ["Тестування на проникнення", "Penetration Testing", "Penetration Testing"],
      ["Захист мережі", "Network Protection", "Netzwerkschutz"],
      ["Хмарна безпека", "Cloud Security", "Cloud Security"],
      ["SOC моніторинг", "SOC Monitoring", "SOC-Monitoring"],
      ["Security Consulting", "Security Consulting", "Security Consulting"]
    ];
    const row = optionTranslations[index];

    if (row) {
      option.dataset.uk = row[0];
      option.dataset.en = row[1];
      option.dataset.de = row[2];
    }
  });
}

function renderTerminal() {
  if (!terminal) {
    return;
  }

  clearTimeout(terminalTimer);
  terminal.innerHTML = "";
  const lines = (runtimeText[activeLanguage] || runtimeText.uk).terminal;
  let line = 0;

  function printLine() {
    if (line < lines.length) {
      terminal.innerHTML += `${lines[line]}<br>`;
      line++;
      terminalTimer = setTimeout(printLine, 420);
    }
  }

  printLine();
}

function refreshDynamicLanguage() {
  const copy = runtimeText[activeLanguage] || runtimeText.uk;

  document.querySelectorAll(".feed-item").forEach(item => item.remove());
  document.querySelectorAll("#homeScanHistory .history-row").forEach(item => item.remove());

  if (scanStatus && scanStatus.textContent) {
    const current = scanTargets[Math.max(0, scanIndex - 1) % scanTargets.length] || scanTargets[0];
    scanStatus.textContent = copy.risk[current.status] || copy.scannerStates[0];
  }

  if (aiAnalysis) {
    aiAnalysis.textContent = copy.aiMessages[0];
  }

  renderTerminal();
  addThreatFeedItem();
}

function applyLanguage(lang) {
  activeLanguage = translations[lang] ? lang : "uk";
  const language = translations[activeLanguage];
  document.documentElement.lang = activeLanguage;
  localStorage.setItem("cybersec-language", activeLanguage);

  document.body.classList.add("language-changing");

  document.querySelectorAll("[data-uk][data-en][data-de]").forEach(element => {
    element.textContent = element.dataset[activeLanguage];
  });

  document.querySelectorAll("[data-uk-placeholder][data-en-placeholder][data-de-placeholder]").forEach(element => {
    element.placeholder = element.dataset[`${activeLanguage}Placeholder`];
  });

  document.querySelectorAll("[data-lang]").forEach(button => {
    const isActive = button.dataset.lang === activeLanguage;
    button.classList.toggle("active", isActive);
    button.classList.toggle("active-lang", isActive);
  });

  if (togglePassword && passwordInput) {
    togglePassword.textContent = passwordInput.type === "password"
      ? language.show
      : language.hide;
  }

  updatePasswordAnalysis();
  refreshDynamicLanguage();
  if (window.__cybersecToolsReady) {
    refreshToolLanguage();
  }

  setTimeout(() => document.body.classList.remove("language-changing"), 220);
}

function setLanguage(lang) {
  applyLanguage(lang);
}

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

let passwordInput = null;
let togglePassword = null;
let strengthBar = null;
let strengthLabel = null;
let entropyValue = null;
let crackTime = null;
let recommendationsList = null;
const commonPasswords = [
  "password", "password1", "123456", "12345678", "qwerty", "admin",
  "letmein", "welcome", "iloveyou", "monkey", "dragon", "football",
  "cybersec", "qwerty123", "111111", "abc123"
];

function hasSequentialCharacters(password) {
  const lower = password.toLowerCase();
  const sequences = [
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "qwertyuiop",
    "asdfghjkl",
    "zxcvbnm"
  ];

  return sequences.some(sequence => {
    for (let i = 0; i <= sequence.length - 4; i++) {
      const part = sequence.slice(i, i + 4);
      const reversed = part.split("").reverse().join("");

      if (lower.includes(part) || lower.includes(reversed)) {
        return true;
      }
    }

    return false;
  });
}

function hasRepeatedPattern(password) {
  return /(.)\1{2,}/.test(password) || /(.{2,4})\1{1,}/i.test(password);
}

function calculateEntropy(password, checks) {
  let pool = 0;

  if (checks.lowercase) pool += 26;
  if (checks.uppercase) pool += 26;
  if (checks.numbers) pool += 10;
  if (checks.special) pool += 33;

  if (!pool || !password.length) {
    return 0;
  }

  let entropy = password.length * Math.log2(pool);

  if (checks.repeated) entropy -= 12;
  if (checks.sequential) entropy -= 12;
  if (checks.common) entropy -= 24;

  return Math.max(0, Math.round(entropy));
}

function getCrackTimeIndex(entropy) {
  if (entropy < 28) return 0;
  if (entropy < 42) return 1;
  if (entropy < 56) return 2;
  if (entropy < 78) return 3;
  return 4;
}

function getStrengthIndex(password, checks, entropy) {
  if (!password) return 0;

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (checks.uppercase && checks.lowercase) score++;
  if (checks.numbers) score++;
  if (checks.special) score++;
  if (entropy >= 70) score++;
  if (checks.common || checks.repeated || checks.sequential) score -= 2;

  return Math.max(0, Math.min(4, Math.floor(score / 1.35)));
}

function setCriterion(name, passed) {
  const item = document.querySelector(`[data-check="${name}"]`);

  if (item) {
    item.classList.toggle("pass", passed);
  }
}

function renderRecommendations(items) {
  if (!recommendationsList) {
    return;
  }

  recommendationsList.textContent = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    recommendationsList.appendChild(li);
  });
}

function updatePasswordAnalysis() {
  if (!passwordInput || !strengthBar || !strengthLabel || !entropyValue || !crackTime) {
    return;
  }

  const password = passwordInput.value;
  const lower = password.toLowerCase();
  const checks = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    repeated: hasRepeatedPattern(password),
    sequential: hasSequentialCharacters(password),
    common: commonPasswords.some(common => lower.includes(common))
  };
  const entropy = calculateEntropy(password, checks);
  const strengthIndex = getStrengthIndex(password, checks, entropy);
  const levelClasses = ["very-weak", "weak", "medium", "strong", "very-strong"];
  const levelColors = ["var(--red)", "var(--orange)", "var(--yellow)", "var(--green)", "var(--green)"];
  const language = translations[activeLanguage] || translations.uk;

  strengthLabel.textContent = language.levels[strengthIndex];
  strengthLabel.className = `result-chip ${levelClasses[strengthIndex]}`;
  strengthBar.style.width = `${Math.max(4, (strengthIndex + 1) * 20)}%`;
  strengthBar.style.background = levelColors[strengthIndex];
  entropyValue.textContent = `${entropy} bits`;
  crackTime.textContent = language.crackTimes[getCrackTimeIndex(entropy)];

  setCriterion("length", checks.length);
  setCriterion("uppercase", checks.uppercase);
  setCriterion("lowercase", checks.lowercase);
  setCriterion("numbers", checks.numbers);
  setCriterion("special", checks.special);
  setCriterion("patterns", password.length > 0 && !checks.repeated && !checks.sequential && !checks.common);

  if (!password) {
    renderRecommendations([language.recommendations.start]);
    return;
  }

  const recommendations = [];

  if (!checks.length) recommendations.push(language.recommendations.length);
  if (!checks.uppercase) recommendations.push(language.recommendations.uppercase);
  if (!checks.lowercase) recommendations.push(language.recommendations.lowercase);
  if (!checks.numbers) recommendations.push(language.recommendations.numbers);
  if (!checks.special) recommendations.push(language.recommendations.special);
  if (checks.repeated) recommendations.push(language.recommendations.repeated);
  if (checks.common) recommendations.push(language.recommendations.common);
  if (checks.sequential) recommendations.push(language.recommendations.sequential);
  if (!recommendations.length) recommendations.push(language.recommendations.good);

  renderRecommendations(recommendations);
}

function initPasswordChecker() {
  passwordInput = document.getElementById("passwordInput");
  togglePassword = document.getElementById("togglePassword");
  strengthBar = document.getElementById("strengthBar");
  strengthLabel = document.getElementById("strengthLabel");
  entropyValue = document.getElementById("entropyValue");
  crackTime = document.getElementById("crackTime");
  recommendationsList = document.getElementById("recommendations");

  if (!passwordInput || !togglePassword || !strengthBar || !strengthLabel || !entropyValue || !crackTime || !recommendationsList) {
    return;
  }

  passwordInput.addEventListener("input", updatePasswordAnalysis);
  togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePassword.textContent = isHidden
      ? translations[activeLanguage].hide
      : translations[activeLanguage].show;
  });
  updatePasswordAnalysis();
}

hydrateStaticTranslations();
applyLanguage(activeLanguage);

if (progressBar) {
  runHomeScanner();
  animateCounters();
  setInterval(runHomeScanner, 5200);
  setInterval(addThreatFeedItem, 2300);
}

const toolCopy = {
  uk: {
    emptyInput: "Введи текст або вибери файл",
    cryptoUnsupported: "Твій браузер не підтримує Web Crypto API",
    filePriority: "Використовується вибраний файл",
    copied: "СКОПІЙОВАНО",
    copy: "КОПІЮВАТИ",
    fileSelected: "Файл вибрано:",
    decodeEmpty: "Вставте рядок для декодування.",
    invalidBase64: "Неможливо декодувати Base64.",
    invalidJwt: "JWT має містити header.payload.signature.",
    signatureWarning: "Увага: цей інструмент не перевіряє підпис.",
    expired: "Токен прострочений",
    active: "Токен активний",
    missing: "немає",
    alg: "Алгоритм",
    issuer: "Issuer",
    subject: "Subject",
    issuedAt: "Issued at",
    expires: "Expiration",
    loading: "Завантаження CVE з NVD...",
    fallback: "NVD API недоступний. Показано демодані, щоб інтерфейс працював.",
    openNvd: "Відкрити в NVD",
    score: "Рахунок",
    best: "Найкращий результат",
    question: "Питання",
    final: "Фінальний результат",
    correct: "Правильно.",
    wrong: "Неправильно.",
    choose: "Оберіть відповідь.",
    solved: "Вирішено",
    hint: "Підказка",
    submit: "Надіслати",
    answerPlaceholder: "Введіть відповідь",
    points: "балів",
    totalPoints: "Загальні бали",
    ctfCorrect: "Правильно. Бали зараховано.",
    ctfWrong: "Спробуйте ще раз.",
    severityExplanation: "Оцінка базується на impact та exploitability згідно з FIRST CVSS v3.1."
  },
  en: {
    emptyInput: "Enter text or choose a file",
    cryptoUnsupported: "Your browser does not support Web Crypto API",
    filePriority: "Selected file is being used",
    copied: "COPIED",
    copy: "COPY",
    fileSelected: "Selected file:",
    decodeEmpty: "Paste a string to decode.",
    invalidBase64: "Unable to decode Base64.",
    invalidJwt: "JWT must contain header.payload.signature.",
    signatureWarning: "Warning: this tool does not verify signature.",
    expired: "Token is expired",
    active: "Token is active",
    missing: "missing",
    alg: "Algorithm",
    issuer: "Issuer",
    subject: "Subject",
    issuedAt: "Issued at",
    expires: "Expiration",
    loading: "Loading CVEs from NVD...",
    fallback: "NVD API is unavailable. Showing mock data so the page still works.",
    openNvd: "Open on NVD",
    score: "Score",
    best: "Best score",
    question: "Question",
    final: "Final score",
    correct: "Correct.",
    wrong: "Wrong.",
    choose: "Choose an answer.",
    solved: "Solved",
    hint: "Hint",
    submit: "Submit",
    answerPlaceholder: "Enter answer",
    points: "points",
    totalPoints: "Total points",
    ctfCorrect: "Correct. Points saved.",
    ctfWrong: "Try again.",
    severityExplanation: "The score is based on impact and exploitability using the FIRST CVSS v3.1 formula."
  },
  de: {
    emptyInput: "Gib Text ein oder wähle eine Datei",
    cryptoUnsupported: "Dein Browser unterstützt Web Crypto API nicht",
    filePriority: "Ausgewählte Datei wird verwendet",
    copied: "KOPIERT",
    copy: "KOPIEREN",
    fileSelected: "Ausgewählte Datei:",
    decodeEmpty: "Füge einen String zum Dekodieren ein.",
    invalidBase64: "Base64 konnte nicht dekodiert werden.",
    invalidJwt: "JWT muss header.payload.signature enthalten.",
    signatureWarning: "Warnung: Dieses Tool prüft die Signatur nicht.",
    expired: "Token ist abgelaufen",
    active: "Token ist aktiv",
    missing: "fehlt",
    alg: "Algorithmus",
    issuer: "Issuer",
    subject: "Subject",
    issuedAt: "Ausgestellt",
    expires: "Ablauf",
    loading: "CVEs werden aus NVD geladen...",
    fallback: "NVD API ist nicht erreichbar. Es werden Demodaten angezeigt.",
    openNvd: "In NVD öffnen",
    score: "Punktzahl",
    best: "Bestwert",
    question: "Frage",
    final: "Endergebnis",
    correct: "Richtig.",
    wrong: "Falsch.",
    choose: "Wähle eine Antwort.",
    solved: "Gelöst",
    hint: "Hinweis",
    submit: "Senden",
    answerPlaceholder: "Antwort eingeben",
    points: "Punkte",
    totalPoints: "Gesamtpunkte",
    ctfCorrect: "Richtig. Punkte gespeichert.",
    ctfWrong: "Versuche es erneut.",
    severityExplanation: "Der Score basiert auf Impact und Exploitability nach der FIRST CVSS v3.1 Formel."
  }
};

function tTool(key) {
  return (toolCopy[activeLanguage] || toolCopy.uk)[key] || key;
}

function copyText(text, button) {
  const write = navigator.clipboard?.writeText
    ? navigator.clipboard.writeText(text)
    : new Promise(resolve => {
      const fallback = document.createElement("textarea");
      fallback.value = text;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      fallback.remove();
      resolve();
    });

  write.then(() => {
    if (!button) return;
    const previous = button.textContent;
    button.textContent = tTool("copied");
    setTimeout(() => {
      button.textContent = previous;
    }, 1200);
  });
}

function bytesToHex(buffer) {
  return [...new Uint8Array(buffer)].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function initHashGenerator() {
  const input = document.getElementById("hashTextInput");
  const fileInput = document.getElementById("hashFileInput");
  const generate = document.getElementById("generateHashBtn");
  const clear = document.getElementById("clearHashBtn");
  const error = document.getElementById("hashError");
  const notice = document.getElementById("hashNotice");
  const fileInfo = document.getElementById("hashFileInfo");
  const outputs = {
    "SHA-1": document.getElementById("sha1Output"),
    "SHA-256": document.getElementById("sha256Output"),
    "SHA-384": document.getElementById("sha384Output"),
    "SHA-512": document.getElementById("sha512Output")
  };

  if (!input || !fileInput || !generate || Object.values(outputs).some(output => !output)) return;

  const setMessage = (element, key) => {
    if (!element) return;
    element.dataset.uk = toolCopy.uk[key] || "";
    element.dataset.en = toolCopy.en[key] || "";
    element.dataset.de = toolCopy.de[key] || "";
    element.textContent = tTool(key);
  };

  const clearMessage = element => {
    if (element) {
      element.textContent = "";
    }
  };

  const resetOutputs = () => {
    Object.values(outputs).forEach(output => {
      output.textContent = "-";
    });
    document.querySelectorAll(".copy-feedback").forEach(feedback => {
      feedback.classList.remove("is-visible");
    });
  };

  const formatBytes = bytes => {
    if (!bytes) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / (1024 ** index)).toFixed(index ? 2 : 0)} ${units[index]}`;
  };

  const updateFileInfo = () => {
    const file = fileInput.files[0];
    if (file) {
      fileInfo.dataset.fileName = file.name;
      fileInfo.dataset.fileSize = formatBytes(file.size);
      fileInfo.textContent = `${tTool("fileSelected")} ${file.name} (${fileInfo.dataset.fileSize})`;
    } else {
      delete fileInfo.dataset.fileName;
      delete fileInfo.dataset.fileSize;
      fileInfo.textContent = "";
    }
  };

  fileInput.addEventListener("change", updateFileInfo);

  generate.addEventListener("click", async () => {
    clearMessage(error);
    clearMessage(notice);
    document.querySelectorAll(".copy-feedback").forEach(feedback => feedback.classList.remove("is-visible"));

    if (!window.crypto || !window.crypto.subtle) {
      setMessage(error, "cryptoUnsupported");
      return;
    }

    const file = fileInput.files[0];
    const text = input.value;

    if (!file && !text.trim()) {
      setMessage(error, "emptyInput");
      resetOutputs();
      return;
    }

    const data = file ? await file.arrayBuffer() : new TextEncoder().encode(text).buffer;

    if (file && text.trim()) {
      setMessage(notice, "filePriority");
    }

    for (const algorithm of Object.keys(outputs)) {
      outputs[algorithm].textContent = bytesToHex(await crypto.subtle.digest(algorithm, data));
    }
  });

  clear?.addEventListener("click", () => {
    input.value = "";
    fileInput.value = "";
    clearMessage(fileInfo);
    clearMessage(error);
    clearMessage(notice);
    resetOutputs();
  });

  document.querySelectorAll("[data-copy-target]").forEach(button => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.copyTarget);
      const value = target?.textContent?.trim();
      const feedback = button.parentElement?.querySelector(".copy-feedback");

      if (!value || value === "-") return;

      copyText(value, button);
      if (feedback) {
        feedback.textContent = tTool("copied");
        feedback.classList.add("is-visible");
        setTimeout(() => feedback.classList.remove("is-visible"), 1400);
      }
    });
  });

  updateFileInfo();
}

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), "=");
  return decodeURIComponent(escape(atob(padded)));
}

function initJwtDecoder() {
  const input = document.getElementById("decoderInput");
  const result = document.getElementById("decoderResult");
  const error = document.getElementById("decoderError");
  const decode = document.getElementById("decodeBtn");
  const encode = document.getElementById("encodeBase64Btn");
  const clear = document.getElementById("clearDecoder");
  const copy = document.getElementById("copyDecoderResult");
  const modeButtons = document.querySelectorAll("[data-decode-mode]");
  let mode = "base64";

  if (!input || !result || !decode) return;

  modeButtons.forEach(button => button.addEventListener("click", () => {
    mode = button.dataset.decodeMode;
    modeButtons.forEach(item => item.classList.toggle("active", item === button));
  }));

  decode.addEventListener("click", () => {
    error.textContent = "";
    result.textContent = "";
    const value = input.value.trim();
    if (!value) {
      error.textContent = tTool("decodeEmpty");
      return;
    }

    try {
      if (mode === "base64") {
        result.textContent = decodeBase64Url(value);
        return;
      }

      const parts = value.split(".");
      if (parts.length < 3) throw new Error("jwt");
      const header = JSON.parse(decodeBase64Url(parts[0]));
      const payload = JSON.parse(decodeBase64Url(parts[1]));
      const issued = payload.iat ? new Date(payload.iat * 1000).toLocaleString() : tTool("missing");
      const expires = payload.exp ? new Date(payload.exp * 1000).toLocaleString() : tTool("missing");
      const expired = payload.exp ? payload.exp * 1000 < Date.now() : false;
      result.textContent = [
        `${tTool("signatureWarning")}`,
        `${tTool("alg")}: ${header.alg || tTool("missing")}`,
        `${tTool("issuer")}: ${payload.iss || tTool("missing")}`,
        `${tTool("subject")}: ${payload.sub || tTool("missing")}`,
        `${tTool("issuedAt")}: ${issued}`,
        `${tTool("expires")}: ${expires}`,
        expired ? tTool("expired") : tTool("active"),
        "",
        "HEADER",
        JSON.stringify(header, null, 2),
        "",
        "PAYLOAD",
        JSON.stringify(payload, null, 2)
      ].join("\n");
    } catch (decodeError) {
      error.textContent = mode === "jwt" ? tTool("invalidJwt") : tTool("invalidBase64");
    }
  });

  encode?.addEventListener("click", () => {
    error.textContent = "";
    result.textContent = input.value ? btoa(unescape(encodeURIComponent(input.value))) : "";
  });
  clear?.addEventListener("click", () => {
    input.value = "";
    result.textContent = "";
    error.textContent = "";
  });
  copy?.addEventListener("click", () => copyText(result.textContent, copy));
}

const quizQuestions = [
  ["Basic", { uk: "Що означає 2FA?", en: "What does 2FA mean?", de: "Was bedeutet 2FA?" }, [{ uk: "Другий фактор входу", en: "A second login factor", de: "Ein zweiter Login-Faktor" }, { uk: "Два файли архіву", en: "Two file archives", de: "Zwei Dateiarchive" }, { uk: "Швидкий firewall", en: "Fast firewall", de: "Schnelle Firewall" }, { uk: "Тип DNS", en: "A DNS type", de: "Ein DNS-Typ" }], 0, { uk: "2FA додає незалежний фактор підтвердження.", en: "2FA adds an independent verification factor.", de: "2FA ergänzt einen unabhängigen Bestätigungsfaktor." }],
  ["Passwords", { uk: "Що краще для пароля?", en: "What is better for a password?", de: "Was ist besser für ein Passwort?" }, [{ uk: "Довга унікальна фраза", en: "A long unique phrase", de: "Eine lange eindeutige Phrase" }, { uk: "Назва компанії", en: "Company name", de: "Firmenname" }, { uk: "123456789", en: "123456789", de: "123456789" }, { uk: "Один пароль всюди", en: "One password everywhere", de: "Ein Passwort überall" }], 0, { uk: "Довжина й унікальність різко підвищують стійкість.", en: "Length and uniqueness greatly improve strength.", de: "Länge und Einzigartigkeit verbessern die Stärke deutlich." }],
  ["Phishing", { uk: "Яка ознака фішингу?", en: "Which is a phishing signal?", de: "Was ist ein Phishing-Signal?" }, [{ uk: "Терміновий тиск і дивне посилання", en: "Urgent pressure and an odd link", de: "Dringender Druck und ein seltsamer Link" }, { uk: "Підпис колеги", en: "A coworker signature", de: "Eine Kollegensignatur" }, { uk: "Звичайний домен", en: "A normal domain", de: "Eine normale Domain" }, { uk: "HTTPS сам по собі", en: "HTTPS alone", de: "HTTPS allein" }], 0, { uk: "Тиск і підозрілі URL часто використовують у фішингу.", en: "Pressure and suspicious URLs are common in phishing.", de: "Druck und verdächtige URLs sind bei Phishing üblich." }],
  ["Web Security", { uk: "Що допомагає проти XSS?", en: "What helps prevent XSS?", de: "Was hilft gegen XSS?" }, [{ uk: "Екранування виводу", en: "Output encoding", de: "Ausgabe-Encoding" }, { uk: "Слабкі паролі", en: "Weak passwords", de: "Schwache Passwörter" }, { uk: "Вимкнений TLS", en: "Disabled TLS", de: "Deaktiviertes TLS" }, { uk: "Публічні secrets", en: "Public secrets", de: "Öffentliche Secrets" }], 0, { uk: "Коректне кодування виводу блокує виконання небажаного коду.", en: "Correct output encoding blocks unwanted code execution.", de: "Korrektes Ausgabe-Encoding blockiert unerwünschte Codeausführung." }],
  ["Network", { uk: "Для чого потрібен firewall?", en: "What is a firewall for?", de: "Wofür ist eine Firewall da?" }, [{ uk: "Фільтрувати мережевий трафік", en: "Filtering network traffic", de: "Netzwerkverkehr filtern" }, { uk: "Зберігати фото", en: "Storing photos", de: "Fotos speichern" }, { uk: "Писати паролі", en: "Writing passwords", de: "Passwörter schreiben" }, { uk: "Видаляти backups", en: "Deleting backups", de: "Backups löschen" }], 0, { uk: "Firewall контролює дозволені та заблоковані з'єднання.", en: "A firewall controls allowed and blocked connections.", de: "Eine Firewall steuert erlaubte und blockierte Verbindungen." }]
];

while (quizQuestions.length < 30) {
  const seed = quizQuestions[quizQuestions.length % 5];
  quizQuestions.push([seed[0], {
    uk: `${seed[1].uk} #${quizQuestions.length + 1}`,
    en: `${seed[1].en} #${quizQuestions.length + 1}`,
    de: `${seed[1].de} #${quizQuestions.length + 1}`
  }, seed[2], seed[3], seed[4]]);
}

let quizState = null;
const quizCategoryLabels = {
  Basic: { uk: "Базове", en: "Basic", de: "Grundlagen" },
  "Web Security": { uk: "Веббезпека", en: "Web Security", de: "Web-Sicherheit" },
  Phishing: { uk: "Фішинг", en: "Phishing", de: "Phishing" },
  Passwords: { uk: "Паролі", en: "Passwords", de: "Passwörter" },
  Network: { uk: "Мережа", en: "Network", de: "Netzwerk" }
};

function initSecurityQuiz() {
  if (!document.getElementById("quizQuestion")) return;
  startQuiz();
  document.getElementById("quizNext")?.addEventListener("click", nextQuizStep);
  document.getElementById("quizRestart")?.addEventListener("click", startQuiz);
}

function startQuiz() {
  quizState = {
    questions: [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 10),
    index: 0,
    score: 0,
    selected: null,
    answered: false
  };
  renderQuiz();
}

function renderQuiz() {
  if (!quizState) return;
  const questionEl = document.getElementById("quizQuestion");
  const optionsEl = document.getElementById("quizOptions");
  const feedback = document.getElementById("quizFeedback");
  const meta = document.getElementById("quizMeta");
  const progress = document.getElementById("quizProgress");
  const best = document.getElementById("quizBestScore");
  const current = quizState.questions[quizState.index];

  best.textContent = `${localStorage.getItem("cybersec-quiz-best") || 0}/10`;
  progress.style.width = `${(quizState.index / 10) * 100}%`;
  meta.textContent = `${tTool("question")} ${Math.min(quizState.index + 1, 10)}/10 · ${(quizCategoryLabels[current[0]] || {})[activeLanguage] || current[0]}`;
  feedback.textContent = "";
  questionEl.textContent = current[1][activeLanguage] || current[1].uk;
  optionsEl.textContent = "";

  current[2].forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option[activeLanguage] || option.uk;
    button.addEventListener("click", () => {
      quizState.selected = index;
      document.querySelectorAll(".quiz-option").forEach(item => item.classList.remove("selected"));
      button.classList.add("selected");
    });
    optionsEl.appendChild(button);
  });
}

function nextQuizStep() {
  if (!quizState) return;
  const feedback = document.getElementById("quizFeedback");
  const current = quizState.questions[quizState.index];

  if (!quizState.answered) {
    if (quizState.selected === null) {
      feedback.textContent = tTool("choose");
      return;
    }
    quizState.answered = true;
    if (quizState.selected === current[3]) {
      quizState.score++;
      feedback.textContent = tTool("correct");
    } else {
      feedback.textContent = `${tTool("wrong")} ${current[4][activeLanguage] || current[4].uk}`;
    }
    document.querySelectorAll(".quiz-option").forEach((button, index) => {
      button.classList.toggle("correct", index === current[3]);
      button.classList.toggle("wrong", index === quizState.selected && index !== current[3]);
    });
    return;
  }

  quizState.index++;
  quizState.selected = null;
  quizState.answered = false;

  if (quizState.index >= 10) {
    const best = Math.max(Number(localStorage.getItem("cybersec-quiz-best") || 0), quizState.score);
    localStorage.setItem("cybersec-quiz-best", String(best));
    document.getElementById("quizProgress").style.width = "100%";
    document.getElementById("quizQuestion").textContent = `${tTool("final")}: ${quizState.score}/10`;
    document.getElementById("quizOptions").textContent = "";
    document.getElementById("quizFeedback").textContent = `${tTool("best")}: ${best}/10`;
    document.getElementById("quizBestScore").textContent = `${best}/10`;
    return;
  }

  renderQuiz();
}

let cveItems = [];
let cveFilter = "all";

const mockCves = [
  { id: "CVE-2026-10001", published: "2026-05-28", severity: "critical", score: "9.8", description: "Demo critical vulnerability in an exposed management interface." },
  { id: "CVE-2026-10002", published: "2026-05-27", severity: "high", score: "8.1", description: "Demo high severity authentication bypass scenario." },
  { id: "CVE-2026-10003", published: "2026-05-26", severity: "medium", score: "5.6", description: "Demo medium severity information disclosure issue." },
  { id: "CVE-2026-10004", published: "2026-05-25", severity: "low", score: "3.1", description: "Demo low severity hardening weakness." }
];

function initCveFeed() {
  if (!document.getElementById("cveList")) return;
  document.getElementById("refreshCve")?.addEventListener("click", loadCves);
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      cveFilter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach(item => item.classList.toggle("active", item === button));
      renderCves();
    });
  });
  loadCves();
  setInterval(loadCves, 60 * 60 * 1000);
}

async function loadCves() {
  const status = document.getElementById("cveStatus");
  status.textContent = tTool("loading");
  try {
    const response = await fetch("https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=12");
    if (!response.ok) throw new Error("nvd");
    const data = await response.json();
    cveItems = (data.vulnerabilities || []).map(item => {
      const cve = item.cve;
      const metric = cve.metrics?.cvssMetricV31?.[0] || cve.metrics?.cvssMetricV30?.[0] || cve.metrics?.cvssMetricV2?.[0];
      return {
        id: cve.id,
        published: (cve.published || "").slice(0, 10),
        severity: (metric?.cvssData?.baseSeverity || metric?.baseSeverity || "unknown").toLowerCase(),
        score: metric?.cvssData?.baseScore ?? "N/A",
        description: cve.descriptions?.find(desc => desc.lang === "en")?.value || "",
        link: `https://nvd.nist.gov/vuln/detail/${cve.id}`
      };
    });
    status.textContent = "";
  } catch (error) {
    cveItems = mockCves.map(item => ({ ...item, link: `https://nvd.nist.gov/vuln/detail/${item.id}` }));
    status.textContent = tTool("fallback");
  }
  renderCves();
}

function renderCves() {
  const list = document.getElementById("cveList");
  if (!list) return;
  const cveSeverity = {
    critical: { uk: "КРИТИЧНА", en: "CRITICAL", de: "KRITISCH" },
    high: { uk: "ВИСОКА", en: "HIGH", de: "HOCH" },
    medium: { uk: "СЕРЕДНЯ", en: "MEDIUM", de: "MITTEL" },
    low: { uk: "НИЗЬКА", en: "LOW", de: "NIEDRIG" },
    unknown: { uk: "НЕВІДОМА", en: "UNKNOWN", de: "UNBEKANNT" }
  };
  list.textContent = "";
  cveItems.filter(item => cveFilter === "all" || item.severity === cveFilter).forEach(item => {
    const card = document.createElement("article");
    card.className = "cve-card";
    card.innerHTML = `<h3>${item.id}</h3><div class="cve-meta"><span>${item.published}</span><span class="severity-${item.severity}">${(cveSeverity[item.severity] || cveSeverity.unknown)[activeLanguage]}</span><span>CVSS ${item.score}</span></div><p>${item.description.slice(0, 220)}${item.description.length > 220 ? "..." : ""}</p><a class="more" href="${item.link}" target="_blank" rel="noopener">${tTool("openNvd")} →</a>`;
    list.appendChild(card);
  });
}

const cvssMetrics = {
  AV: [["N", "Network", 0.85], ["A", "Adjacent", 0.62], ["L", "Local", 0.55], ["P", "Physical", 0.2]],
  AC: [["L", "Low", 0.77], ["H", "High", 0.44]],
  PR: [["N", "None", { U: 0.85, C: 0.85 }], ["L", "Low", { U: 0.62, C: 0.68 }], ["H", "High", { U: 0.27, C: 0.5 }]],
  UI: [["N", "None", 0.85], ["R", "Required", 0.62]],
  S: [["U", "Unchanged"], ["C", "Changed"]],
  C: [["N", "None", 0], ["L", "Low", 0.22], ["H", "High", 0.56]],
  I: [["N", "None", 0], ["L", "Low", 0.22], ["H", "High", 0.56]],
  A: [["N", "None", 0], ["L", "Low", 0.22], ["H", "High", 0.56]]
};

const cvssLabels = {
  AV: { uk: "Вектор атаки", en: "Attack Vector", de: "Angriffsvektor" },
  AC: { uk: "Складність атаки", en: "Attack Complexity", de: "Angriffskomplexität" },
  PR: { uk: "Потрібні привілеї", en: "Privileges Required", de: "Erforderliche Privilegien" },
  UI: { uk: "Взаємодія користувача", en: "User Interaction", de: "Benutzerinteraktion" },
  S: { uk: "Scope", en: "Scope", de: "Scope" },
  C: { uk: "Конфіденційність", en: "Confidentiality", de: "Vertraulichkeit" },
  I: { uk: "Цілісність", en: "Integrity", de: "Integrität" },
  A: { uk: "Доступність", en: "Availability", de: "Verfügbarkeit" }
};

const cvssOptionLabels = {
  AV: { N: { uk: "Мережевий", en: "Network", de: "Netzwerk" }, A: { uk: "Суміжний", en: "Adjacent", de: "Angrenzend" }, L: { uk: "Локальний", en: "Local", de: "Lokal" }, P: { uk: "Фізичний", en: "Physical", de: "Physisch" } },
  AC: { L: { uk: "Низька", en: "Low", de: "Niedrig" }, H: { uk: "Висока", en: "High", de: "Hoch" } },
  PR: { N: { uk: "Немає", en: "None", de: "Keine" }, L: { uk: "Низькі", en: "Low", de: "Niedrig" }, H: { uk: "Високі", en: "High", de: "Hoch" } },
  UI: { N: { uk: "Немає", en: "None", de: "Keine" }, R: { uk: "Потрібна", en: "Required", de: "Erforderlich" } },
  S: { U: { uk: "Незмінений", en: "Unchanged", de: "Unverändert" }, C: { uk: "Змінений", en: "Changed", de: "Geändert" } },
  C: { N: { uk: "Немає", en: "None", de: "Keine" }, L: { uk: "Низька", en: "Low", de: "Niedrig" }, H: { uk: "Висока", en: "High", de: "Hoch" } },
  I: { N: { uk: "Немає", en: "None", de: "Keine" }, L: { uk: "Низька", en: "Low", de: "Niedrig" }, H: { uk: "Висока", en: "High", de: "Hoch" } },
  A: { N: { uk: "Немає", en: "None", de: "Keine" }, L: { uk: "Низька", en: "Low", de: "Niedrig" }, H: { uk: "Висока", en: "High", de: "Hoch" } }
};

const severityLabels = {
  None: { uk: "Немає", en: "None", de: "Keine" },
  Low: { uk: "Низька", en: "Low", de: "Niedrig" },
  Medium: { uk: "Середня", en: "Medium", de: "Mittel" },
  High: { uk: "Висока", en: "High", de: "Hoch" },
  Critical: { uk: "Критична", en: "Critical", de: "Kritisch" }
};

function initCvssCalculator() {
  const form = document.getElementById("cvssForm");
  if (!form) return;
  renderCvssControls();
  calculateCvss();
}

function renderCvssControls(previous = {}) {
  const form = document.getElementById("cvssForm");
  if (!form) return;
  form.innerHTML = `<div class="panel-title">// CVSS v3.1</div>`;
  Object.entries(cvssMetrics).forEach(([key, values]) => {
    const label = document.createElement("label");
    label.className = "tool-field";
    label.innerHTML = `<span>${cvssLabels[key][activeLanguage] || cvssLabels[key].en}</span><select class="cvss-select" data-cvss="${key}">${values.map(value => `<option value="${value[0]}">${((cvssOptionLabels[key] || {})[value[0]] || {})[activeLanguage] || value[1]}</option>`).join("")}</select>`;
    form.appendChild(label);
    const select = label.querySelector("select");
    if (previous[key]) select.value = previous[key];
  });
  form.querySelectorAll("select").forEach(select => select.addEventListener("change", calculateCvss));
}

function roundUp1(value) {
  return Math.ceil(value * 10) / 10;
}

function calculateCvss() {
  const selected = {};
  document.querySelectorAll("[data-cvss]").forEach(select => selected[select.dataset.cvss] = select.value);
  if (!selected.AV) return;
  const metricValue = key => cvssMetrics[key].find(item => item[0] === selected[key])[2];
  const scope = selected.S;
  const iscBase = 1 - ((1 - metricValue("C")) * (1 - metricValue("I")) * (1 - metricValue("A")));
  const impact = scope === "U" ? 6.42 * iscBase : 7.52 * (iscBase - 0.029) - 3.25 * Math.pow(iscBase - 0.02, 15);
  const pr = metricValue("PR")[scope];
  const exploitability = 8.22 * metricValue("AV") * metricValue("AC") * pr * metricValue("UI");
  const score = impact <= 0 ? 0 : scope === "U" ? roundUp1(Math.min(impact + exploitability, 10)) : roundUp1(Math.min(1.08 * (impact + exploitability), 10));
  const severity = score === 0 ? "None" : score < 4 ? "Low" : score < 7 ? "Medium" : score < 9 ? "High" : "Critical";
  document.getElementById("cvssScore").textContent = score.toFixed(1);
  document.getElementById("cvssSeverity").textContent = severityLabels[severity][activeLanguage] || severity;
  document.getElementById("cvssVector").textContent = `CVSS:3.1/${Object.entries(selected).map(([key, value]) => `${key}:${value}`).join("/")}`;
  document.getElementById("cvssExplanation").textContent = tTool("severityExplanation");
}

const ctfChallenges = [
  { id: "b64", points: 20, answer: "cybersec", title: { uk: "Base64 декодування", en: "Base64 decode challenge", de: "Base64-Dekodierung" }, desc: { uk: "Декодуй Y3liZXJzZWM= і введи прапор.", en: "Decode Y3liZXJzZWM= and enter the flag.", de: "Dekodiere Y3liZXJzZWM= und gib die Flag ein." }, hint: { uk: "Base64 перетворює байти у текстовий алфавіт.", en: "Base64 turns bytes into a text alphabet.", de: "Base64 wandelt Bytes in ein Textalphabet." } },
  { id: "caesar", points: 20, answer: "secure", title: { uk: "Шифр Цезаря", en: "Caesar cipher challenge", de: "Caesar-Chiffre" }, desc: { uk: "Зсув -3 для vhfxuh.", en: "Shift -3 for vhfxuh.", de: "Verschiebe -3 für vhfxuh." }, hint: { uk: "Кожна літера повертається на три позиції назад.", en: "Each letter moves three positions back.", de: "Jeder Buchstabe geht drei Positionen zurück." } },
  { id: "url", points: 20, answer: "redirect", title: { uk: "Підозрілий параметр URL", en: "Find suspicious URL parameter", de: "Verdächtigen URL-Parameter finden" }, desc: { uk: "У /login?user=demo&redirect=http://fake.example який параметр ризиковий?", en: "In /login?user=demo&redirect=http://fake.example which parameter is risky?", de: "Welcher Parameter ist in /login?user=demo&redirect=http://fake.example riskant?" }, hint: { uk: "Шукай параметр, що веде користувача на інший сайт.", en: "Look for the parameter that sends users to another site.", de: "Suche den Parameter, der Nutzer auf eine andere Seite schickt." } },
  { id: "phish", points: 20, answer: "urgency", title: { uk: "Фішинговий red flag", en: "Identify phishing red flags", de: "Phishing-Warnsignal erkennen" }, desc: { uk: "Яке слово описує тиск 'дій негайно'?", en: "What word describes pressure to act immediately?", de: "Welches Wort beschreibt Druck, sofort zu handeln?" }, hint: { uk: "Це створення штучної терміновості.", en: "It creates artificial urgency.", de: "Es erzeugt künstliche Dringlichkeit." } },
  { id: "hash", points: 20, answer: "sha256", title: { uk: "Розпізнай хеш", en: "Simple hash recognition challenge", de: "Hash-Erkennung" }, desc: { uk: "Який алгоритм часто має 64 hex символи?", en: "Which algorithm often has 64 hex characters?", de: "Welcher Algorithmus hat oft 64 Hex-Zeichen?" }, hint: { uk: "256 біт дорівнює 32 байти або 64 hex символи.", en: "256 bits equals 32 bytes or 64 hex characters.", de: "256 Bit sind 32 Byte oder 64 Hex-Zeichen." } }
];

function initCtfChallenges() {
  if (!document.getElementById("ctfList")) return;
  renderCtf();
}

function getSolvedCtf() {
  return JSON.parse(localStorage.getItem("cybersec-ctf-solved") || "[]");
}

function setSolvedCtf(items) {
  localStorage.setItem("cybersec-ctf-solved", JSON.stringify(items));
}

function renderCtf() {
  const list = document.getElementById("ctfList");
  const solved = getSolvedCtf();
  list.textContent = "";
  let total = 0;
  ctfChallenges.forEach(challenge => {
    if (solved.includes(challenge.id)) total += challenge.points;
    const card = document.createElement("article");
    card.className = `ctf-card reveal is-visible ${solved.includes(challenge.id) ? "solved" : ""}`;
    card.innerHTML = `<span class="tool-badge">${challenge.points} ${tTool("points")}</span><h3>${challenge.title[activeLanguage] || challenge.title.uk}</h3><p>${challenge.desc[activeLanguage] || challenge.desc.uk}</p><div class="ctf-controls"><input class="tool-input" data-answer="${challenge.id}" placeholder="${tTool("answerPlaceholder")}"><button class="hint-btn" type="button">${tTool("hint")}</button><button class="submit-answer" type="button">${tTool("submit")}</button></div><div class="hint-text" hidden>${challenge.hint[activeLanguage] || challenge.hint.uk}</div><div class="ctf-result">${solved.includes(challenge.id) ? tTool("solved") : ""}</div>`;
    card.querySelector(".hint-btn").addEventListener("click", () => {
      card.querySelector(".hint-text").hidden = false;
    });
    card.querySelector(".submit-answer").addEventListener("click", () => {
      const value = card.querySelector("input").value.trim().toLowerCase();
      const result = card.querySelector(".ctf-result");
      if (value === challenge.answer) {
        const updated = [...new Set([...getSolvedCtf(), challenge.id])];
        setSolvedCtf(updated);
        result.textContent = tTool("ctfCorrect");
        renderCtf();
      } else {
        result.textContent = tTool("ctfWrong");
      }
    });
    list.appendChild(card);
  });
  document.getElementById("ctfPoints").textContent = `${tTool("totalPoints")}: ${total}/100`;
  document.getElementById("ctfProgress").style.width = `${total}%`;
}

function refreshToolLanguage() {
  renderCves();
  const hashFileInfo = document.getElementById("hashFileInfo");
  if (hashFileInfo?.dataset.fileName) {
    hashFileInfo.textContent = `${tTool("fileSelected")} ${hashFileInfo.dataset.fileName} (${hashFileInfo.dataset.fileSize})`;
  }
  if (document.getElementById("cvssExplanation")) {
    const previous = {};
    document.querySelectorAll("[data-cvss]").forEach(select => previous[select.dataset.cvss] = select.value);
    renderCvssControls(previous);
    calculateCvss();
  }
  if (document.getElementById("ctfList")) renderCtf();
  if (quizState && document.getElementById("quizQuestion") && quizState.index < 10) renderQuiz();
  document.querySelectorAll(".copy-btn").forEach(button => {
    if (!button.id || button.id !== "copyDecoderResult") button.textContent = tTool("copy");
  });
}

function initBlogSearch() {
  const search = document.getElementById("blogSearch");
  const cards = [...document.querySelectorAll(".blog-card")];
  const buttons = [...document.querySelectorAll("[data-blog-category]")];
  const status = document.getElementById("blogSearchStatus");

  if (!search || !cards.length) {
    return;
  }

  let category = "All";
  const statusCopy = {
    uk: count => `Показано статей: ${count}`,
    en: count => `Showing articles: ${count}`,
    de: count => `Angezeigte Artikel: ${count}`
  };

  function filterBlog() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach(card => {
      const text = `${card.dataset.title || ""} ${card.dataset.category || ""} ${card.dataset.keywords || ""}`.toLowerCase();
      const matchesQuery = !query || text.includes(query);
      const matchesCategory = category === "All" || card.dataset.category === category;
      const show = matchesQuery && matchesCategory;
      card.hidden = !show;
      if (show) visible++;
    });

    if (status) {
      status.textContent = (statusCopy[activeLanguage] || statusCopy.uk)(visible);
    }
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      category = button.dataset.blogCategory;
      buttons.forEach(item => item.classList.toggle("active", item === button));
      filterBlog();
    });
  });

  if (buttons[0]) {
    buttons[0].classList.add("active");
  }

  search.addEventListener("input", filterBlog);
  filterBlog();
}

function initReadingProgress() {
  const bar = document.getElementById("readingProgressBar");

  if (!bar) {
    return;
  }

  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable <= 0 ? 0 : (window.scrollY / scrollable) * 100;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
}

function initArticleSharing() {
  const links = document.querySelectorAll("[data-share]");

  if (!links.length) {
    return;
  }

  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
    telegram: `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`
  };

  links.forEach(link => {
    link.href = shareUrls[link.dataset.share] || window.location.href;
    link.target = "_blank";
    link.rel = "noopener";
  });
}

window.__cybersecToolsReady = true;
initPasswordChecker();
document.addEventListener("DOMContentLoaded", () => {
  initHashGenerator();
});
initJwtDecoder();
initSecurityQuiz();
initCveFeed();
initCvssCalculator();
initCtfChallenges();
initBlogSearch();
initReadingProgress();
initArticleSharing();
