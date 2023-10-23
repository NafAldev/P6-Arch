////////////// First modal ////////////


//******** Ouverture et création de la galerie modal**********//

// Récupération des éléments de la modale
const modal = document.querySelector("#modal");
const modalGallery = document.querySelector(".modalGallery");
const gallery = document.querySelector(".gallery");

// Fonction pour ouvrir la première modale et charger son contenu
function openFirstModal() {
    modal.style.display = "block";
    modalGallery.innerHTML ="";
    fetchAndCreateGalleryModal();
}
const modifyModal = document.getElementById("modifyModal"); //Lien pour ouvrir la première modale
modifyModal.addEventListener("click", () => {
    openFirstModal();
});

// Fonction pour créer une figure avec une icône de suppression
function createFigureWithDeleteIcon(works) {
    const figure = figureCreate(works);
  
    // Créer une icône de suppression 
    const deleteIcon = document.createElement("a");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  
        // Gestionnaire d'événement pour supprimer un projet lors du clic sur l'icône
    deleteIcon.addEventListener("click", (e) => {
      e.preventDefault()
      deleteProjectById(works.id);
      // Supprimez la figure de la modal
      modalGallery.removeChild(figure);
    });
  
    figure.appendChild(deleteIcon);
    modalGallery.appendChild(figure);
  }

// Fonction pour créer la galerie modale à partir des données
function fetchAndCreateGalleryModal() {
    datas.forEach((works) => {
      createFigureWithDeleteIcon(works);
    });
}

//******** Fermeture de la modal **********//

// Ferme la modale en cliquant à l'extérieur de celle-ci
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeFirstModal();
    }
});

  
// Fonction pour fermer la première modale
function closeFirstModal() {
    modal.style.display = 'none';
}
const close = document.getElementById("closeModal");
close.addEventListener("click", () => {
    closeFirstModal();
});
  
//******** Supprimer un projet en utilisant l'ID  **********//

// Fonction pour supprimer un projet du DOM
function removeProjectFromDOM(id) {
  const projectToDelete = document.querySelector(`figure[data-id="${id}"]`);
  if (projectToDelete) {
      projectToDelete.remove();
  }
}

// Fonction pour supprimer un projet par ID
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
      if (response.status === 204) {
          removeProjectFromDOM(id);
          datas = datas.filter(work => work.id !== id);
          secondModal.style.display = "none";
          firstModal.style.display = "block";
          alert("Projet supprimé avec succès!");
      }
  })
  .catch(error => {
      
      console.error("Erreur lors de la suppression :", error);
  });
}

 
  
////////////// Second modal ////////////

//******** Ouverture de la seconde modal **********//
const secondModal = document.getElementById("modal2");
const firstModal = document.getElementById("modal1");
const openSecondModalButton = document.getElementById("addPhotoButton");  
function openSecondModal() {
    secondModal.style.display = "block";
    firstModal.style.display = "none";
    previewImage();
    addEmptyOption();
}
openSecondModalButton.addEventListener("click", () => {
    openSecondModal();
});

// Fonction pour ajouter une option vide dans la liste déroulante
function addEmptyOption() {
  
  const selectionCategories = document.getElementById("selectionCategories");

  // Créez une option vide
  const emptyOption = document.createElement('option');
  emptyOption.value = ''; // Valeur vide
  emptyOption.text = '';  // Texte vide

  emptyOption.selected = true;

  // Ajoutez l'option vide à l'élément 'select'
  selectionCategories.appendChild(emptyOption);
}



//******** Retour à la première modal **********//

const returnArrowBtn = document.getElementById("return");
  
returnArrowBtn.addEventListener("click", () => {
    secondModal.style.display = "none";
    firstModal.style.display = "block";
});

//******** Prévisualisation de l'image **********//

// Fonction pour afficher une prévisualisation de l'image sélectionnée
function previewImage() {
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
}

// Fonction pour réinitialiser le champ de téléchargement d'image
function resetUploadImageField(){
  const uploadImage = document.getElementById("uploadImage");
  const uploadedImage = document.getElementById("uploadedImage");
  const ajouterPhotosLabel = document.getElementById("ajouterPhotos");
  const pFormatData = document.getElementById("formatData");
  const imageIcon = document.querySelector(".fa-regular.fa-image");
  const btnValiderNewProject = document.getElementById("btnValider");
  
  ajouterPhotosLabel.style.display = "flex";
  uploadImage.style.display = "block";
  pFormatData.style.display = "block";
  imageIcon.style.display = "block";
  uploadedImage.style.display = "none";
  

}


//******** Ajout d'un nouveau projet **********//

const btnValiderNewProject = document.getElementById("btnValider");
btnValiderNewProject.addEventListener("click", handleFormSubmit);

// Fonction pour réinitialiser le formulaire
function resetForm() {
  form.reset();
  resetUploadImageField();
}

const form = document.getElementById('form');
form.addEventListener('submit', handleFormSubmit);

// Gestionnaire d'événement pour soumettre le formulaire d'ajout de projet
function handleFormSubmit(event) {
  event.preventDefault();

  // Récupération des valeurs du formulaire
  const title = document.getElementById("titleInputModal").value;
  const category = document.getElementById("selectionCategories").value;
  const image = document.getElementById("uploadImage").files[0];

  if (!title || !category || !image) {
    alert("Veuillez remplir tous les champs du formulaire.");
    return;
  }
  // Création d'un objet FormData pour envoyer les données du formulaire
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', category);
  formData.append('image', image);

  const token = sessionStorage.getItem('token');

  fetch("http://localhost:5678/api/works", {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then(response => {
      if (response.status === 201) {
        return response.json();
      }
    })
    .then(works => {
      gallery.innerHTML = "";
      createFigureWithDeleteIcon(works);
      fetchAndCreateGallery(works);
      alert("Projet ajouté avec succès!");
      secondModal.style.display = "none";
      firstModal.style.display = "block";
      resetForm();
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout :", error);
    });
}