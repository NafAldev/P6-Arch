const modal = document.querySelector("#modal");
const modalGallery = document.querySelector(".modalGallery");

// Créer une figure avec une icône de suppression
function createFigureWithDeleteIcon(works) {
  const figure = figureCreate(works);

  // Créer une icône de suppression 
  const deleteIcon = document.createElement("a");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  deleteIcon.addEventListener("click", () => {
    deleteProjectById(works.id);
    // Supprimez la figure de la modal
    modalGallery.removeChild(figure);
  });

  figure.appendChild(deleteIcon);
  modalGallery.appendChild(figure);
}

// Créer la galerie modale à partir de datas
function fetchAndCreateGalleryModal() {
  datas.forEach((works) => {
    createFigureWithDeleteIcon(works);
  });
}

// Ouvre et affiche la modale
function openFirstModal() {
  const modal = document.querySelector("#modal");
  modal.style.display = "block";
  fetchAndCreateGalleryModal();
}
  const modifyModal = document.getElementById("modifyModal"); // ancre
  modifyModal.addEventListener("click", () => {
  openFirstModal();
});


// Ferme la modale en cliquant à l'extérieur
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeFirstModal();
    }
});
  
// Ferme la modale en cliquant sur l'icône
function closeFirstModal() {
    modal.style.display = 'none';
}
const close = document.getElementById("closeModal");
close.addEventListener("click", () => {
    closeFirstModal();
});
  
// Supprimer un projet en utilisant l'ID
function deleteProjectById(id) {
    // Récupération du token
const token = sessionStorage.getItem("token");
  
    // Requête pour supprimer le projet
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
        }
    })
    .then(response => {
      if (response.status === 200) {
        // Récupère l'ID qui permettra d'identifier le projet sélectionné
        const projectToDelete = document.querySelector(`figure[data-id="${id}`);
        
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
 


// Ouvrir la seconde modale d'ajout et revenir à la première modale
const secondModal = document.getElementById("modal2");
const firstModal = document.getElementById("modal1");
  
function openSecondModal() {
    secondModal.style.display = "block";
    firstModal.style.display = "none";
}
  
const openSecondModalButton = document.getElementById("addPhotoButton");
const returnArrowBtn = document.getElementById("return");
  
returnArrowBtn.addEventListener("click", () => {
    secondModal.style.display = "none";
    firstModal.style.display = "block";
});
  
openSecondModalButton.addEventListener("click", () => {
    openSecondModal();
});
  

// Preview image 

const uploadImage = document.getElementById("uploadImage");
const uploadedImage = document.getElementById("uploadedImage");
const ajouterPhotosLabel = document.getElementById("ajouterPhotos");
const pFormatData = document.getElementById("formatData");
const imageIcon = document.querySelector(".fa-regular.fa-image");


uploadImage.addEventListener("change", function () {
  const selectedImage = uploadImage.files[0];

  const imgPreview = document.createElement("img");
  imgPreview.src = URL.createObjectURL(selectedImage);
  uploadedImage.src = imgPreview.src; 

  ajouterPhotosLabel.style.display = "none";
  uploadImage.style.display = "none";
  pFormatData.style.display = "none";
  imageIcon.style.display ="none";
  uploadedImage.style.display = "block"; 
})



// Ajouter un nouveau projet 
const form = document.getElementById('form'); 
const btnValiderNewProject = document.getElementById("btnValider");
btnValiderNewProject.addEventListener("click", addNewProject);

 

function addNewProject() {
form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  // Récupérer les données du formulaire
  const title = document.getElementById("titleInputModal").value;
  const category = document.getElementById("selectionCategories").value;
  const image = document.getElementById("uploadImage").files[0];



  // Créez un objet FormData pour les données
  const formData = new FormData(form);

  
// Ajoutez les données au FormData
  formData.append('title', title);
  formData.append('category', category);
  formData.append('image', image);

  console.log(image)

  // Token pour avoir accés au endpoint
  const token = sessionStorage.getItem('token');
  console.log(token)

  //Requête pour envoyer les infos du form
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
        "Authorization": "Bearer " +token
    },
    body: formData
    
  })
  .then(response => response.json())
  .then(works => {
    /*
    const figure = figureCreate(works);
    const gallery = document.querySelector(".gallery");
    gallery.appendChild(figure)

    const figureModal = createFigureWithDeleteIcon(works);
    const modalGallery = document.querySelector(".modalGallery");
    modalGallery.appendChild(figureModal)
    alert("ajouter avec succés")
    */
    console.log(works)
  })
    .catch(error => {
        console.error("Erreur lors de la création:", error.message);
  });
})
}