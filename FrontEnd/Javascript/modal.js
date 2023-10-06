
const modal = document.querySelector("#modal");
const modalGallery = document.querySelector(".modalGallery");

// fonction pour ouvrir et recuperer la galerie de la première modal
function fetchAndCreateaAndDeleteGalleryModal() {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then((data) => {
            data.forEach((works) => {
                const figure = figureCreate(works);

                // Créer une icône de suppression 
                const deleteIcon = document.createElement("a");
                deleteIcon.classList.add("delete-icon");
                deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                
                // evénement pour supprimer le projet sélectionné
                deleteIcon.addEventListener("click", () => {
                    deleteProjectById(works.id);
                });

                // Ajoute l'icône de suppression à chaque figure
                figure.appendChild(deleteIcon);

                modalGallery.appendChild(figure);
            });
        })
        .catch((error) => {
            console.error("Erreur :", error);
        });
}


// Ouvre et affiche la modale 
function openFirstModal (){
    //console.log("Ouverture");
    const modal = document.querySelector("#modal");
    modal.style.display = "block"; 
    fetchAndCreateaAndDeleteGalleryModal()
}
modifyModal = document.getElementById("modifyModal"); // ancre
modifyModal.addEventListener("click", () => {
    openFirstModal();
    // console.log(openFirstModal)
});


// Ferme la modale en cliquant à l'exterieur
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeFirstModal();
    }
});


// Ferme la modale  en cliquant sur l'icone
function closeFirstModal () {
    modal.style.display = 'none';
}
const close = document.getElementById("closeModal");
close.addEventListener("click", () => {
    closeFirstModal();
})


// supprimer un projet en utilsant l'id
function deleteProjectById(id) {
    // récuperation du token
    const token = sessionStorage.getItem("token");

    // Requete pour supprimer le projet 
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,  
            "Content-Type": "application/json"
          }
    })
    .then(response => {
        if (response.status === 200 ) {
            // console.log("réussie");

            // récupere l'id qui permettra d'identifier le projet sélectionnée
            const projectToDelete = document.querySelector(`figure[data-id="${id}"]`);
            
            // Puis le supprime
            if (projectToDelete) {
                projectToDelete.remove();
            }
        } else {
            
            console.error("Échec de la suppression côté serveur");
        }
    })
    .catch(error => {
        // Gérez les erreurs de la requête
        console.error("Erreur lors de la suppression :", error);
    });
}

