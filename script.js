const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

menuBtn?.addEventListener("click", () =>
  sidebar.classList.toggle("open")
);

document.querySelectorAll(".nav-link").forEach((a) =>
  a.addEventListener("click", () =>
    sidebar.classList.remove("open")
  )
);


// Typing Animation

const roles = [
  "AI & ML Engineer",
  "Frontend Developer",
  "Python Developer",
  "Creative Problem Solver"
];

let role = 0;
let pos = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeLoop() {

  const word = roles[role];

  typing.textContent = deleting
    ? word.slice(0, pos--)
    : word.slice(0, pos++);

  let delay = deleting ? 45 : 85;

  if (!deleting && pos > word.length) {
    deleting = true;
    delay = 1200;
  }

  if (deleting && pos < 0) {
    deleting = false;
    role = (role + 1) % roles.length;
    pos = 0;
    delay = 250;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();


// Scroll Reveal Animation

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((e) => {

      if (e.isIntersecting) {
        e.target.classList.add("show");
      }

    });

  },
  {
    threshold: 0.12
  }
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => observer.observe(el));


// Active Navigation Link

const sections = [
  ...document.querySelectorAll("main section")
];

const navs = [
  ...document.querySelectorAll(".nav-link")
];

const sectionObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        navs.forEach((n) =>
          n.classList.toggle(
            "active",
            n.getAttribute("href") ===
              "#" + entry.target.id
          )
        );

      }

    });

  },
  {
    rootMargin: "-35% 0px -55% 0px"
  }
);

sections.forEach((s) =>
  sectionObserver.observe(s)
);


// Cursor Glow

const glow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", (e) => {

  glow.style.left = e.clientX + "px";

  glow.style.top = e.clientY + "px";

});


// =================================
// EMAILJS CONTACT FORM
// =================================

// Initialize EmailJS

emailjs.init({
  publicKey: "D7wCY_qLRBVK5KRYt"
});


// Get Form

const contactForm = document.getElementById("contactForm");

const sendBtn = document.getElementById("sendBtn");


contactForm.addEventListener("submit", function (event) {

  event.preventDefault();

  sendBtn.textContent = "Sending...";


  const templateParams = {

    name: document.getElementById("name").value,

    email: document.getElementById("email").value,

    message: document.getElementById("message").value,

    title: "New Portfolio Message"

  };


  emailjs.send(

    "service_akb1i7f",

    "template_ie6p5jv",

    templateParams

  )

  .then(function () {

    alert(
      "Message sent successfully! Thank you for contacting me."
    );

    contactForm.reset();

    sendBtn.textContent = "Send Message ↗";

  })

    .catch(function (error) {

    console.error("EmailJS Error:", error);

    alert(
      "Failed to send message.\n\n" +
      "Status: " + error.status + "\n" +
      "Text: " + error.text
    );

    sendBtn.textContent = "Send Message ↗";

  });

});