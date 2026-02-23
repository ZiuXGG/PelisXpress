const movies = [
  {
    title: "LOTR",
    year: "2001",
    imdb: "8.9",
    desc: "Un hòbit jove ha de destruir un anell poderós per salvar el món, endinsant-se en una èpica aventura.",
    img: "/aventures/lotr/main.png",
    link: "/aventures/lotr/index.html",
  },
  {
    title: "INDIANA JONES",
    year: "1981",
    imdb: "8.4",
    desc: "Un arqueòleg busca l'Arca de l'Aliança pels Estats Units abans que els nazis.",
    img: "/aventures/indianajones/main.png",
    link: "/aventures/indianajones/index.html",
  },
  {
    title: "PIRATES",
    year: "2003",
    imdb: "8.1",
    desc: "El capità Jack Sparrow intenta recuperar el seu vaixell maleït, acompanyat d'un inusual amic.",
    img: "/aventures/pirates/main.png",
    link: "/aventures/pirates/index.html",
  },
  {
    title: "JURASSIC PARK",
    year: "1993",
    imdb: "8.2",
    desc: "Un parc amb dinosaures reals es converteix en un malson de supervivència.",
    img: "/aventures/jurassicpark/main.png",
    link: "/aventures/jurassicpark/index.html",
  },
  {
    title: "STAR WARS",
    year: "1977",
    imdb: "8.6",
    desc: "Un jove granger s'uneix a la rebel·lió contra un imperi galàctic. El principi d'una saga històrica",
    img: "/aventures/starwars/main.png",
    link: "/aventures/starwars/index.html",
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
