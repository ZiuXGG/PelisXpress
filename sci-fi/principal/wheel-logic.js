const movies = [
  {
    title: "INTERSTELLAR",
    year: "2014",
    imdb: "8.7",
    desc: "Un viatge èpic a través de l'espai i el temps.",
    img: "/sci-fi/interstellar/main.png",
    link: "/sci-fi/interstellar/index.html",
  },
  {
    title: "INCEPTION",
    year: "2010",
    imdb: "8.8",
    desc: "Una odissea mental que desafia la realitat.",
    img: "/sci-fi/origen/main.png",
    link: "/sci-fi/origen/index.html",
  },
  {
    title: "TENET",
    year: "2020",
    imdb: "7.3",
    desc: "Un oficial descobreix un secret que podria canviar-ho tot.",
    img: "/sci-fi/tenet/main.png",
    link: "/sci-fi/tenet/index.html",
  },
  {
    title: "DUNE",
    year: "2021",
    imdb: "8.0",
    desc: "Paul Atreides viatja al planeta més perillós de l'univers.",
    img: "/sci-fi/dune/main.png",
    link: "/sci-fi/dune/index.html",
  },
  {
    title: "ARRIVAL",
    year: "2016",
    imdb: "7.9",
    desc: "La humanitat intenta desxifrar un missatge alienígena.",
    img: "/sci-fi/arrival/main.png",
    link: "/sci-fi/arrival/index.html",
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
