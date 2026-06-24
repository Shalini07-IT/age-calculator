/* ==========================
   DOM Elements
========================== */
const ageForm = document.getElementById("ageForm");
const dobInput = document.getElementById("dob");
const errorMsg = document.getElementById("errorMsg");
const loader = document.getElementById("loader");
const results = document.getElementById("results");
const resetBtn = document.getElementById("resetBtn");
const mouseGlow = document.getElementById("mouseGlow");
const card = document.getElementById("mainCard");

/* Result Elements */
const bigYears = document.getElementById("bigYears");
const bigMonths = document.getElementById("bigMonths");
const bigDays = document.getElementById("bigDays");

const statMonths = document.getElementById("statMonths");
const statWeeks = document.getElementById("statWeeks");
const statDays = document.getElementById("statDays");
const statHours = document.getElementById("statHours");

/* ==========================
   Mouse Glow Effect
========================== */
document.addEventListener("mousemove", (e) => {
  mouseGlow.style.left = `${e.clientX}px`;
  mouseGlow.style.top = `${e.clientY}px`;
});

/* ==========================
   Tilt Card Effect
========================== */
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = ((x / rect.width) - 0.5) * 14;
  const rotateX = ((y / rect.height) - 0.5) * -14;

  card.style.transform =
    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", () => {
  card.style.transform =
    "perspective(1000px) rotateX(0deg) rotateY(0deg)";
});

/* ==========================
   Floating Particles
========================== */
const particlesContainer = document.getElementById("particles");

function createParticle() {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  const size = Math.random() * 6 + 2;

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  particle.style.left = `${Math.random() * 100}%`;
  particle.style.bottom = `-10px`;

  const colors = [
    "#a855f7",
    "#3b82f6",
    "#22d3ee",
    "#ec4899"
  ];

  particle.style.background =
    colors[Math.floor(Math.random() * colors.length)];

  particle.style.setProperty(
    "--drift",
    `${Math.random() * 80 - 40}px`
  );

  particle.style.animationDuration =
    `${10 + Math.random() * 15}s`;

  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 25000);
}

setInterval(createParticle, 250);

/* ==========================
   Error Handler
========================== */
function showError(message) {
  errorMsg.textContent = message;

  errorMsg.classList.remove("show");

  void errorMsg.offsetWidth;

  errorMsg.classList.add("show");
}

function clearError() {
  errorMsg.textContent = "";
  errorMsg.classList.remove("show");
}

/* ==========================
   Count Up Animation
========================== */
function animateValue(el, start, end, duration = 1200) {
  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min(
      (currentTime - startTime) / duration,
      1
    );

    const value = Math.floor(
      start + (end - start) * easeOutCubic(progress)
    );

    el.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = end.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/* ==========================
   Exact Age Calculation
========================== */
function calculateAge(dob) {
  const today = new Date();

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;

    const previousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    );

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = today - dob;

  const totalDays = Math.floor(
    diffMs / (1000 * 60 * 60 * 24)
  );

  const totalWeeks = Math.floor(totalDays / 7);

  const totalHours = Math.floor(
    diffMs / (1000 * 60 * 60)
  );

  const totalMonths =
    years * 12 + months;

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours
  };
}

/* ==========================
   Display Results
========================== */
function displayResults(data) {

  animateValue(bigYears, 0, data.years);
  animateValue(bigMonths, 0, data.months);
  animateValue(bigDays, 0, data.days);

  animateValue(statMonths, 0, data.totalMonths);
  animateValue(statWeeks, 0, data.totalWeeks);
  animateValue(statDays, 0, data.totalDays);
  animateValue(statHours, 0, data.totalHours);

  results.classList.add("show");

  launchConfetti();
}

/* ==========================
   Form Submit
========================== */
ageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  clearError();

  const dobValue = dobInput.value;

  if (!dobValue) {
    showError("Please select your date of birth.");
    return;
  }

  const dob = new Date(dobValue);

  const today = new Date();

  if (dob > today) {
    showError("Birth date cannot be in the future.");
    return;
  }

  results.classList.remove("show");

  loader.classList.add("show");

  setTimeout(() => {
    loader.classList.remove("show");

    const ageData = calculateAge(dob);

    displayResults(ageData);

  }, 1800);
});

/* ==========================
   Reset
========================== */
resetBtn.addEventListener("click", () => {

  ageForm.reset();

  results.classList.remove("show");

  clearError();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* ==========================
   Confetti Celebration
========================== */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchConfetti() {

  const confetti = [];

  const colors = [
    "#a855f7",
    "#3b82f6",
    "#22d3ee",
    "#ec4899",
    "#ffffff"
  ];

  for (let i = 0; i < 180; i++) {
    confetti.push({
      x: canvas.width / 2,
      y: canvas.height / 3,

      size: Math.random() * 8 + 4,

      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],

      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -10 - 5,

      gravity: 0.18,

      rotation: Math.random() * 360,
      rotationSpeed:
        (Math.random() - 0.5) * 12
    });
  }

  let animation;

  function render() {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    confetti.forEach((c, index) => {

      c.x += c.vx;
      c.y += c.vy;

      c.vy += c.gravity;

      c.rotation += c.rotationSpeed;

      ctx.save();

      ctx.translate(c.x, c.y);

      ctx.rotate(
        c.rotation * Math.PI / 180
      );

      ctx.fillStyle = c.color;

      ctx.fillRect(
        -c.size / 2,
        -c.size / 2,
        c.size,
        c.size
      );

      ctx.restore();

      if (c.y > canvas.height + 50) {
        confetti.splice(index, 1);
      }
    });

    if (confetti.length > 0) {
      animation =
        requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animation);
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
  }

  render();
}

/* ==========================
   Initial Animation
========================== */
window.addEventListener("load", () => {

  setTimeout(() => {
    createParticle();
  }, 500);

});
