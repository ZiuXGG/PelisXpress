const movies = [
  {
    title: "SPIDER-VERSE",
    year: "2018",
    imdb: "8.4",
    desc: "Miles Morales descobreix que no és l'únic Spider-Man al multivers.",
    img: "/animacio/spiderverse/main.png",
    link: "/animacio/spiderverse/index.html",
  },
  {
    title: "WALL-E",
    year: "2008",
    imdb: "8.4",
    desc: "Un petit robot de neteja s'embarca en un viatge espacial que decidirà el futur.",
    img: "/animacio/walle/main.png",
    link: "/animacio/walle/index.html",
  },
  {
    title: "COCO",
    year: "2017",
    imdb: "8.4",
    desc: "Un jove músic viatja a la Terra dels Morts per descobrir el secret de la seva família.",
    img: "/animacio/coco/main.png",
    link: "/animacio/coco/index.html",
  },
  {
    title: "TOY STORY",
    year: "1995",
    imdb: "8.3",
    desc: "Les joguines cobren vida quan els humans no miren. Una història d'amistat i aventures.",
    img: "/animacio/toystory/main.png",
    link: "/animacio/toystory/index.html",
  },
  {
    title: "TANGLED",
    year: "2010",
    imdb: "7.7",
    desc: "Rapunzel escapa de la seva torre amb l'ajuda d'un lladre encantador.",
    img: "/animacio/tangled/main.png",
    link: "/animacio/tangled/index.html",
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
