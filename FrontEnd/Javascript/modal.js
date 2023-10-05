// fonction pour ouvrir et recuperer la galerie de la première modal

const modal = document.querySelector("#modal");
const modalGallery = document.querySelector(".modalGallery");
function fetchAndCreateGalleryModal(){

    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then((data) => {
      data.forEach((works) => {
        const figure = figureCreate(works);

        const deleteIcon = document.createElement("a");
        deleteIcon.classList.add("delete-icon");
        deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        // Ajoutez l'icône de suppression à la figure
        figure.appendChild(deleteIcon);

        modalGallery.appendChild(figure);
      });
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
}

// ouvrir la modale 
function openFirstModal (){
    //console.log("Ouverture");
    const modal = document.querySelector("#modal");
    modal.style.display = "block"; // Affichez la modale
    fetchAndCreateGalleryModal()
}
const modifyModal = document.getElementById("modifyModal"); // ancre
modifyModal.addEventListener("click", () => {
    openFirstModal();
    // console.log(openFirstModal)
});


// fermer la modale 
function closeFirstModal () {
    modal.style.display = 'none';
}
const close = document.getElementById("closeModal");
close.addEventListener("click", () => {
    closeFirstModal();
})