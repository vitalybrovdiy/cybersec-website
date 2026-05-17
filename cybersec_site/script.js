const matrix = document.getElementById("matrix");
const ctx = matrix.getContext("2d");

function resizeMatrix() {
  matrix.width = window.innerWidth;
  matrix.height = window.innerHeight;
}

resizeMatrix();
window.addEventListener("resize", resizeMatrix);

const alphabet = "0101011010010110CYBERSECURITY";
const fontSize = 16;
let columns = Math.floor(matrix.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, matrix.width, matrix.height);

  ctx.fillStyle = "#19ff35";
  ctx.font = fontSize + "px JetBrains Mono";

  columns = Math.floor(matrix.width / fontSize);

  if (drops.length !== columns) {
    drops = Array(columns).fill(1);
  }

  for (let i = 0; i < drops.length; i++) {
    const text = alphabet[Math.floor(Math.random() * alphabet.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > matrix.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 45);

const chartCanvas = document.getElementById("threatChart");

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

const terminalText = {
  uk: [
    "> Система запущена...",
    "> Захищене з'єднання встановлено",
    "> Сканування загроз...",
    "> Загроз не виявлено",
    "> Firewall: ACTIVE",
    "> Ти захищений",
    "> Stay safe!",
    "> _"
  ],
  en: [
    "> System initialized...",
    "> Secure connection established",
    "> Scanning for threats...",
    "> No threats detected",
    "> Firewall: ACTIVE",
    "> You are protected",
    "> Stay safe!",
    "> _"
  ]
};

const terminal = document.getElementById("terminalLines");
let terminalTimer;

function printTerminal(lang) {
  terminal.innerHTML = "";
  clearTimeout(terminalTimer);

  let line = 0;
  const lines = terminalText[lang];

  function printLine() {
    if (line < lines.length) {
      terminal.innerHTML += lines[line] + "<br>";
      line++;
      terminalTimer = setTimeout(printLine, 420);
    }
  }

  printLine();
}

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-uk]");

  elements.forEach(element => {
    element.textContent = element.getAttribute(`data-${lang}`);
  });

  document.documentElement.lang = lang;
  localStorage.setItem("site-language", lang);

  document.getElementById("btn-uk").classList.toggle("active-lang", lang === "uk");
  document.getElementById("btn-en").classList.toggle("active-lang", lang === "en");

  printTerminal(lang);
}

const savedLanguage = localStorage.getItem("site-language") || "uk";
setLanguage(savedLanguage);
