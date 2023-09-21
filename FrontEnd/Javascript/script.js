// Requête pour créer la galerie à partir de l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json()) 
  .then((data) => {
    data.forEach((works) => {
      const figure = figureCreate(works); 
      const gallery = document.querySelector(".gallery"); 
      gallery.appendChild(figure); 
    });
  })
  .catch((error) => {
    console.error("Erreur :", error); // renvoies les erreurs 
  });

// Fonction pour créer la galerie
function figureCreate(works) {
  const figure = document.createElement("figure");
  figure.setAttribute("data-category", works.category.name); // Définit l'attribut data-category qui servira pour le filtrage 

  const image = document.createElement("img"); 
  image.src = works.imageUrl; 
  image.alt = works.title; 

  const tagline = document.createElement("figcaption");
  tagline.innerHTML = works.title;

  figure.appendChild(image); 
  figure.appendChild(tagline); 

  return figure;
}


// Récupération des catégories via la requête
fetch("http://localhost:5678/api/categories")
  .then(response => response.json()) 
  .then(categories => {
    const portfolio = document.getElementById("portfolio"); 
    const filterContainer = document.createElement("div"); 
    filterContainer.classList = "filters"; // Ajoute une classe pour le css

    // Crée le bouton "Tous"
    const buttonAll = document.createElement("button"); 
    buttonAll.textContent = "Tous"; 
    buttonAll.classList = "btn"; 
    buttonAll.addEventListener("click", () => {
      filterByCategory("all");
    });

    // Crée un bouton pour chaque catégorie restante
    categories.forEach(category => {
      const button = document.createElement("button"); 
      button.classList = "btn"; 
      button.textContent = category.name; 
      button.addEventListener("click", () => {
        filterByCategory(category.name); 
      });
      filterContainer.appendChild(button); 
      let firstChild = filterContainer.firstChild; 
      filterContainer.insertBefore(buttonAll, firstChild); // Insère le bouton "Tous" avant le premier enfant
    });

    let secondChild = portfolio.children[1];
    portfolio.insertBefore(filterContainer, secondChild); // Insère le conteneur de filtres avant le deuxième enfant
  })
  .catch((error) => {
    console.error("Erreur :", error); 
  });

// Fonction pour filtrer les œuvres par catégorie
function filterByCategory(categoryName) {
  const galleryData = document.querySelectorAll("div.gallery figure"); // Sélectionne la galerie
  galleryData.forEach(item => {
    const itemCategory = item.getAttribute("data-category"); // Récupère la catégorie de chaque figure

    if (itemCategory === categoryName || categoryName === "all") {
      // Affiche l'élément s'il correspond à la catégorie sélectionnée ou si "Tous" est sélectionné
      item.style.display = "block";
    } else {
      // Masque la catégorie sélectionnée si ne correspond pas
      item.style.display = "none";
    }
  });
}
