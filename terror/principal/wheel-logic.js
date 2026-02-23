const movies = [
  {
    title: "FNAF",
    year: "2023",
    imdb: "5.5",
    desc: "Un vigilant nocturn intenta sobreviure a uns animatrònics assassins.",
    img: "/terror/fnaf/main.png",
    link: "/terror/fnaf/index.html",
  },
  {
    title: "HEREDITARY",
    year: "2018",
    imdb: "7.3",
    desc: "Una família comença a ser assetjada per secrets terrorífics del seu passat.",
    img: "/terror/hereditary/main.png",
    link: "/terror/hereditary/index.html",
  },
  {
    title: "ALIEN",
    year: "1979",
    imdb: "8.5",
    desc: "A l'espai, ningú pot sentir els teus crits davant d'una criatura perfecta.",
    img: "/terror/alien/main.png",
    link: "/terror/alien/index.html",
  },
  {
    title: "THE SHINING",
    year: "1980",
    imdb: "8.4",
    desc: "L'aïllament en un hotel solitari porta un escriptor a la bogeria extrema.",
    img: "/terror/shining/main.png",
    link: "/terror/shining/index.html",
  },
  {
    title: "A QUIET PLACE",
    year: "2018",
    imdb: "7.5",
    desc: "Si et senten, et cacen. Si et cacen, moriràs. Una família sobreviu en el silenci absolut.",
    img: "/terror/quietplace/main.png",
    link: "/terror/quietplace/index.html",
  },
];

let currentIndex = 0;
const wheel = document.getElementById("wheel");

function init() {
  movies.forEach((movie, i) => {
    const item = document.createElement("div");
    item.className = "wheel-item";
    item.style.backgroundImage = `url(${movie.img})`;

    item.addEventListener('click', () => {
      if (item.classList.contains('active')){
        window.location.href = movie.link;
      }
    });

    wheel.appendChild(item);
  });
  update();
}

function update() {
  const items = document.querySelectorAll(".wheel-item");
  items.forEach((item, i) => {
    let diff = i - currentIndex;

    // Lògica de roda infinita
    if (diff > movies.length / 2) diff -= movies.length;
    if (diff < -movies.length / 2) diff += movies.length;

    const y = diff * 330;
    const z = Math.abs(diff) * -250;
    const rotX = diff * -25;

    item.style.transform = `translateY(${y}px) translateZ(${z}px) rotateX(${rotX}deg)`;

    if (diff === 0) {
      item.classList.add("active");
      // Actualitzar text de l'esquerra
      document.getElementById("active-title").innerText = movies[i].title;
      document.getElementById("active-year").innerText = movies[i].year;
      document.getElementById("active-imdb").innerText =
        movies[i].imdb + " IMDB";
      document.getElementById("active-desc").innerText = movies[i].desc;
    } else {
      item.classList.remove("active");
    }
  });
}

// Controls
window.addEventListener(
  "wheel",
  (e) => {
    if (e.deltaY > 0) currentIndex = (currentIndex + 1) % movies.length;
    else currentIndex = (currentIndex - 1 + movies.length) % movies.length;
    update();
  },
  { passive: true },
);

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") currentIndex = (currentIndex + 1) % movies.length;
  if (e.key === "ArrowUp")
    currentIndex = (currentIndex - 1 + movies.length) % movies.length;
  update();
});

document.addEventListener("DOMContentLoaded", init);
