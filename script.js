const dobInput = document.getElementById("dob");
const button = document.getElementById("calculateBtn");
const results = document.getElementById("results");
const error = document.getElementById("error");
const loader = document.getElementById("loader");

const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");

createParticles();
mouseLight();
tiltCards();

button.addEventListener("click", calculateAge);

function calculateAge() {

    error.textContent = "";

    const dobValue = dobInput.value;

    if (!dobValue) {
        showError("Please select your date of birth.");
        return;
    }

    const birthDate = new Date(dobValue);
    const today = new Date();

    if (birthDate > today) {
        showError("Future dates are not allowed.");
        return;
    }

    results.style.display = "none";
    loader.style.display = "flex";

    setTimeout(() => {

        loader.style.display = "none";

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            );
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const diffMs = today - birthDate;

        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;
        const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

        results.style.display = "block";

        animateNumber(yearsEl, years);
        animateNumber(monthsEl, months);
        animateNumber(daysEl, days);

        animateNumber(
            document.getElementById("totalMonths"),
            totalMonths
        );

        animateNumber(
            document.getElementById("totalWeeks"),
            totalWeeks
        );

        animateNumber(
            document.getElementById("totalDays"),
            totalDays
        );

        animateNumber(
            document.getElementById("totalHours"),
            totalHours
        );

        document
            .querySelectorAll(".stat-card")
            .forEach((card, index) => {

                card.classList.remove("show");

                setTimeout(() => {
                    card.classList.add("show");
                }, index * 200);
            });

        launchConfetti();

    }, 1200);
}

function showError(message) {

    error.textContent = message;

    error.classList.remove("shake");

    void error.offsetWidth;

    error.classList.add("shake");
}

function animateNumber(element, target) {

    let start = 0;

    const duration = 1500;

    const increment = target / (duration / 16);

    const timer = setInterval(() => {

        start += increment;

        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent =
            Math.floor(start).toLocaleString();
        }

    }, 16);
}

function createParticles() {

    const container =
    document.getElementById("particles");

    for (let i = 0; i < 50; i++) {

        const particle =
        document.createElement("div");

        particle.classList.add("particle");

        const size = Math.random() * 6 + 2;

        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left =
        Math.random() * 100 + "%";

        particle.style.animationDuration =
        Math.random() * 10 + 8 + "s";

        particle.style.opacity = Math.random();

        container.appendChild(particle);
    }
}

function mouseLight() {

    const light =
    document.querySelector(".mouse-light");

    document.addEventListener("mousemove", e => {

        light.style.left = e.clientX + "px";
        light.style.top = e.clientY + "px";
    });
}

function tiltCards() {

    document.addEventListener("mousemove", e => {

        document
        .querySelectorAll(".tilt-card")
        .forEach(card => {

            const rect =
            card.getBoundingClientRect();

            const x =
            e.clientX - rect.left;

            const y =
            e.clientY - rect.top;

            const rotateY =
            (x - rect.width/2) / 25;

            const rotateX =
            -(y - rect.height/2) / 25;

            card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;
        });
    });
}

function launchConfetti() {

    const canvas =
    document.getElementById("confetti");

    const ctx =
    canvas.getContext("2d");

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const pieces = [];

    for (let i = 0; i < 200; i++) {

        pieces.push({
            x: Math.random() * canvas.width,
            y: -20,
            size: Math.random() * 8 + 4,
            speed: Math.random() * 4 + 2,
            color: [
                "#00f5ff",
                "#9d4dff",
                "#ffffff",
                "#5d6bff"
            ][Math.floor(Math.random()*4)]
        });
    }

    let frame = 0;

    function animate() {

        frame++;

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        pieces.forEach(p => {

            p.y += p.speed;

            ctx.fillStyle = p.color;

            ctx.fillRect(
                p.x,
                p.y,
                p.size,
                p.size
            );
        });

        if(frame < 180){
            requestAnimationFrame(animate);
        }
        else{
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );
        }
    }

    animate();
}
