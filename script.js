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
const terminalText = [
  "> System initialized...",
  "> Secure connection established",
  "> Scanning for threats...",
  "> No threats detected",
  "> Firewall: ACTIVE",
  "> You are protected",
  "> Stay safe!",
  "> _"
];

if (terminal) {
  let line = 0;

  function printLine() {
    if (line < terminalText.length) {
      terminal.innerHTML += `${terminalText[line]}<br>`;
      line++;
      setTimeout(printLine, 420);
    }
  }

  printLine();
}

document.querySelectorAll(".contact-form").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const status = form.querySelector(".form-status");

    if (status) {
      status.textContent = "Transmission queued. CYBERSEC team will contact you soon.";
    }

    form.reset();
  });
});

const translations = {
  uk: {
    show: "Показати",
    hide: "Сховати",
    levels: ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"],
    crackTimes: ["instantly", "few minutes", "several hours", "several years", "millions of years"],
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

let activeLanguage = localStorage.getItem("cybersec-language") || "uk";

function applyLanguage(lang) {
  activeLanguage = translations[lang] ? lang : "uk";
  document.documentElement.lang = activeLanguage;
  localStorage.setItem("cybersec-language", activeLanguage);

  document.querySelectorAll("[data-uk][data-en][data-de]").forEach(element => {
    element.textContent = element.dataset[activeLanguage];
  });

  document.querySelectorAll("[data-lang]").forEach(button => {
    button.classList.toggle("active-lang", button.dataset.lang === activeLanguage);
  });

  if (togglePassword && passwordInput) {
    togglePassword.textContent = passwordInput.type === "password"
      ? translations[activeLanguage].show
      : translations[activeLanguage].hide;
  }

  updatePasswordAnalysis();
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

applyLanguage(activeLanguage);
