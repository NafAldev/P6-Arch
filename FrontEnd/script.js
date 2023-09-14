// fonction pour envoyer une requete 
function callApi() {
    const url = "http://localhost:5678/api/works";
    fetch(url)
        .then((response) => { 
            return response.json(); // recupération de la réponse 
        })
        .catch((error) => {
            console.error("Erreur :", error); 
        })

}

callApi();



// tableau des travaux 
const galleryTab = [ 
    {
        "image":"abajour-tahina.png",
        "tagline" :"Abajour Tahina"
    },
    {
        "image":"appartement-paris-v.png",
        "tagline": "Appartement Paris V"        
    },
    {
        "image" : "restaurant-sushisen-londres.png",
        "tagline" : "Restaurant Sushisen - Londres"
    },
    {
        "image" : "la-balisiere.png",
        "tagline" : "Villa “La Balisiere” - Port Louis"
    },
    {
        "image" : "structures-thermopolis.png",
        "tagline" : "Structures Thermopolis"
    },
    {
        "image" : "appartement-paris-x.png",
        "tagline" : "Appartement Paris X"
        
    },
    {
        "image":"le-coteau-cassis.png", 
        "tagline":  "Pavillon “Le coteau” - Cassis"  
    },
    {
        "image": "villa-ferneze.png",
        "tagline" : "Villa Ferneze - Isola d’Elba"
    },
    {
        "image" : "appartement-paris-xviii.png",
        "tagline": "Appartement Paris XVIII"
    },
    {
        "image" : "bar-lullaby-paris.png",
        "tagline" : "Bar “Lullaby” - Paris"
    }, 
    {
        "image": "hotel-first-arte-new-delhi.png",
        "tagline" : "Hotel First Arte - New Delhi"
    }    
]



// boucle affichant les élèments du tableau en se basant sur la structure html pré-définie

const gallery = document.querySelector(".gallery");

for (let i = 0; i < galleryTab.length; i++) {
    const figure = document.createElement("figure"); // créer l'élément figure

    const image = document.createElement("img"); // créer l'élément img
    image.src = `assets/images/${galleryTab[i].image}`; // lien
    image.alt = galleryTab[i].tagline;

    const tagline = document.createElement("figcaption"); // créer l'élément fig caption
    tagline.innerHTML = galleryTab[i].tagline;

    figure.appendChild(image); 
    figure.appendChild(tagline);
    gallery.appendChild(figure);
}
