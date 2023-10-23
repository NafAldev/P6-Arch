///***** Récupération des données de l'Api *****///


let datas = [];
let OptionCategories = [];

////////////// Accueil ////////////

//******** La galerie d'accueil **********//

// Fonction pour créer une figure
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

// Fonction pour récupérer et créer la galerie
function fetchAndCreateGallery() {
  const gallery = document.querySelector(".gallery");

  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then((data) => {
      datas = data;
      // Crée une figure pour chaque élément et l'ajoute à la galerie
      data.forEach((works) => {
        const figure = figureCreate(works);
        gallery.appendChild(figure);
      });
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
}

fetchAndCreateGallery();

//******** Les filtres **********//

// Récupération des catégories via la requête
fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(categories => {
    const portfolio = document.getElementById("portfolio");
    const filterContainer = document.querySelector(".filters");
    const selectionCategories = document.getElementById("selectionCategories");
    
    // Crée des options de sélection pour les catégories
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      selectionCategories.appendChild(option);
    });

   // Crée le bouton "Tous" pour afficher toutes les catégories
    categories.unshift({
      "id": 0,
      "name": "Tous"
    });

    // Crée un bouton pour chaque catégorie restante
    categories.forEach(category => {
      const button = document.createElement("button");
      button.classList = "btn";
      button.textContent = category.name;
      // Ajoute un gestionnaire d'événement pour filtrer par catégorie
      button.addEventListener("click", () => {
        filterByCategory(category.id);
      });

      filterContainer.appendChild(button);
      let firstChild = filterContainer.firstChild;
    });

    let secondChild = portfolio.children[1];
     // Insère le conteneur de filtres avant le deuxième enfant de portfolio
    portfolio.insertBefore(filterContainer, secondChild); 
  })
  .catch((error) => {
    console.error("Erreur :", error);
  });

// Fonction pour filtrer les œuvres par catégorie
function filterByCategory(categoryId) {
  const galleryFigure = document.querySelectorAll("div.gallery figure");
  galleryFigure.forEach(item => {
    const itemCategory = item.getAttribute("data-category");

    if (parseInt(itemCategory) === categoryId || categoryId === 0) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Fonction pour mettre à jour l'interface utilisateur en fonction de la connexion
function updateUI() {
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
}

updateUI();

//******** Déconnexion **********//

// Fonction de déconnexion
function logout() {
  sessionStorage.removeItem("token");
  window.location.replace("index.html");
}

const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", logout);
