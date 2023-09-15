fetch("http://localhost:5678/api/works")
  .then( response => response.json())
  .then((data) => {
  data.forEach((works) => {
    const figure = figureCreate(works)
    const gallery = document.querySelector(".gallery");
    gallery.appendChild(figure)
    })
  })
  .catch((error) => {
    console.error("Erreur :", error); 
})


function figureCreate(works) {
    const figure = document.createElement("figure"); // créer l'élément figure
    
    const image = document.createElement("img"); // créer l'élément img
    image.src = works.imageUrl; // chemin pour accéder aux images 
    image.alt = works.title;

    const tagline = document.createElement("figcaption"); // créer l'élément fig caption
    tagline.innerHTML = works.title;

    figure.appendChild(image); 
    figure.appendChild(tagline);
    
    return figure
}



