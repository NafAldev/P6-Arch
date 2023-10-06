function fetchAndCreateGallery() {
  const gallery = document.querySelector(".gallery");
 //console.log("Avant la requête fetch");

  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then((data) => {
      // console.log("Données récupérées depuis l'API :", data);
      data.forEach((works) => {
        const figure = figureCreate(works);
        gallery.appendChild(figure);
      });
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
     //console.log("Après la requête fetch");
}

// Fonction pour créer une figure à partir des données d'un projet
function figureCreate(works) {
  const figure = document.createElement("figure");
  figure.setAttribute("data-category", works.categoryId);
  figure.setAttribute("data-id", works.id);

  const image = document.createElement("img");
  image.src = works.imageUrl;
  image.alt = works.title;

  const tagline = document.createElement("figcaption");
  tagline.innerHTML = works.title;

  figure.appendChild(image);
  figure.appendChild(tagline);

  return figure;
}

fetchAndCreateGallery();



// Récupération des catégories via la requête
fetch("http://localhost:5678/api/categories")
  .then(response => response.json()) 
  .then(categories => {
    const portfolio = document.getElementById("portfolio"); 
    const filterContainer = document.querySelector(".filters");

    // Crée le bouton "Tous"
    categories.unshift({
      "id": 0,
      "name": "Tous"
    });

    // Crée un bouton pour chaque catégorie restante
    categories.forEach(category => {
      //console.log(category)
      const button = document.createElement("button"); 
      button.classList = "btn"; 
      button.textContent = category.name; 
      button.addEventListener("click", () => {
        filterByCategory(category.id); 
      });
      
      filterContainer.appendChild(button); 
      let firstChild = filterContainer.firstChild; 
    });

    let secondChild = portfolio.children[1];
    portfolio.insertBefore(filterContainer, secondChild); // Insère le conteneur de filtres avant le deuxième enfant
  })
  .catch((error) => {
    console.error("Erreur :", error); 
  });

// Fonction pour filtrer les œuvres par catégorie
function filterByCategory(categoryId) {
  console.log(categoryId)
  const galleryFigure = document.querySelectorAll("div.gallery figure"); // Sélectionne la galerie
  galleryFigure.forEach(item => {
    const itemCategory = item.getAttribute("data-category"); // Récupère la catégorie correspondante de chaque figure

    if (parseInt(itemCategory) === categoryId || categoryId === 0) {
      // Affiche l'élément s'il correspond à la catégorie sélectionnée ou si "Tous" est sélectionné
      item.style.display = "block";
    } else {
      // Masque la catégorie sélectionnée si ne correspond pas
      item.style.display = "none";
    }
  });
}

const loginDisplay = document.getElementById("login");
const logoutDisplay = document.getElementById("logout");
const modifyElementsDisplay = document.getElementById("modify");
const filterContainer = document.querySelector(".filters");



if (sessionStorage.getItem("token")) {
  loginDisplay.style.display = "none";
  logoutDisplay.style.display = "block";
  filterContainer.style.display = "none";
  modifyElementsDisplay.style.display = "block";
    
} else {
  loginDisplay.style.display = "block";
  logoutDisplay.style.display = "none";
  filterContainer.style.display = "block";
  modifyElementsDisplay.style.display = "none";
}

