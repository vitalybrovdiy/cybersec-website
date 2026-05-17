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
