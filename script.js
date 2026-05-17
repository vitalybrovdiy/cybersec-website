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
  ["[data-page-link='password-checker']", "ПЕРЕВІРКА ПАРОЛЯ", "PASSWORD CHECKER", "PASSWORT-CHECK"],
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
  ["body[data-page='password-checker'] .future-tool-card .status-badge", "СКОРО", "COMING SOON", "BALD VERFÜGBAR"],
  ["body[data-page='password-checker'] .future-tool-card:nth-child(1) h3", "Детектор email phishing", "Email Phishing Detector", "Email-Phishing-Detektor"],
  ["body[data-page='password-checker'] .future-tool-card:nth-child(2) h3", "Перевірка IP репутації", "IP Reputation Checker", "IP-Reputationsprüfung"],
  ["body[data-page='password-checker'] .future-tool-card:nth-child(3) h3", "Dark Web Breach Checker", "Dark Web Breach Checker", "Dark-Web-Leak-Prüfung"],
  ["body[data-page='password-checker'] .future-tool-card:nth-child(4) h3", "Browser Extension", "Browser Extension", "Browser-Erweiterung"],
  ["body[data-page='password-checker'] .scan-history .panel-title", "// Демо історія сканувань", "// Scan History Demo", "// Scan-Verlauf Demo"],
  ["body[data-page='password-checker'] .history-head span:nth-child(2)", "Дата", "Date", "Datum"],
  ["body[data-page='password-checker'] .history-head span:nth-child(3)", "Ризик", "Risk level", "Risiko"],
  ["body[data-page='password-checker'] .history-head span:nth-child(4)", "Статус", "Status", "Status"],
  ["body[data-page='password-checker'] .history-row:nth-child(2) .risk-low", "НИЗЬКИЙ", "LOW", "NIEDRIG"],
  ["body[data-page='password-checker'] .history-row:nth-child(2) .status-badge", "ЧИСТО", "CLEAN", "SAUBER"],
  ["body[data-page='password-checker'] .history-row:nth-child(3) .risk-high", "ВИСОКИЙ", "HIGH", "HOCH"],
  ["body[data-page='password-checker'] .history-row:nth-child(3) .status-badge", "ЗАБЛОКОВАНО", "BLOCKED", "BLOCKIERT"],
  ["body[data-page='password-checker'] .history-row:nth-child(4) .risk-medium", "СЕРЕДНІЙ", "MEDIUM", "MITTEL"],
  ["body[data-page='password-checker'] .history-row:nth-child(4) .status-badge", "ПЕРЕВІРКА", "REVIEW", "PRÜFUNG"]
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

  setTimeout(() => document.body.classList.remove("language-changing"), 220);
}

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
const strengthBar = document.getElementById("strengthBar");
const strengthLabel = document.getElementById("strengthLabel");
const entropyValue = document.getElementById("entropyValue");
const crackTime = document.getElementById("crackTime");
const recommendationsList = document.getElementById("recommendations");
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

if (passwordInput) {
  passwordInput.addEventListener("input", updatePasswordAnalysis);
}

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePassword.textContent = isHidden
      ? translations[activeLanguage].hide
      : translations[activeLanguage].show;
  });
}

hydrateStaticTranslations();
applyLanguage(activeLanguage);

if (progressBar) {
  runHomeScanner();
  animateCounters();
  setInterval(runHomeScanner, 5200);
  setInterval(addThreatFeedItem, 2300);
}
