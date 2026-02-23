const movies = [
  {
    title: "DARK KNIGHT",
    year: "2008",
    imdb: "9.0",
    desc: "Batman s'enfronta al caos absolut encarnat pel Joker.",
    img: "/accio/tdk/main.png",
    link: "/accio/tdk/index.html",
  },
  {
    title: "ENDGAME",
    year: "2019",
    imdb: "8.4",
    desc: "Els herois supervivents intenten revertir el dany de Thanos.",
    img: "/accio/endgame/main.png",
    link: "/accio/endgame/index.html",
  },
  {
    title: "JOHN WICK",
    year: "2014",
    imdb: "7.4",
    desc: "Un assassí surt del retir per venjar la mort del seu gos.",
    img: "/accio/wick/main.png",
    link: "/accio/wick/index.html",
  },
  {
    title: "GLADIATOR",
    year: "2000",
    imdb: "8.5",
    desc: "Un general romà traït busca venjança com a gladiador.",
    img: "/accio/gladiator/main.png",
    link: "/accio/gladiator/index.html",
  },
  {
    title: "TERMINATOR 2",
    year: "1991",
    imdb: "8.6",
    desc: "Un cyborg arriba del futur per protegir el jove John Connor.",
    img: "/accio/terminator/main.png",
    link: "/accio/terminator/index.html",
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
