////////////// First modal ////////////


//******** Ouverture et création de la galerie modal**********//

// Récuperation de nos élements (modal)
const modal = document.querySelector("#modal");
const modalGallery = document.querySelector(".modalGallery");

// Ouverture de la premiere modal et charge le contenu de la galerie
function openFirstModal() {
    modal.style.display = "block";
    fetchAndCreateGalleryModal();
}
const modifyModal = document.getElementById("modifyModal"); // ancre
modifyModal.addEventListener("click", () => {
    openFirstModal();
});

// Créer une figure avec une icône de suppression
function createFigureWithDeleteIcon(works) {
    const figure = figureCreate(works);
  
    // Créer une icône de suppression 
    const deleteIcon = document.createElement("a");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  
    deleteIcon.addEventListener("click", (e) => {
      e.preventDefault()
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

//******** Fermeture de la modal **********//

// Ferme la modale en cliquant à l'extérieur de celle-ci
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
  
//******** Supprimer un projet en utilisant l'ID  **********//

function deleteProjectById(id) {
    // Récupération du token
    console.log("Fonction deleteProjectById appelée avec l'ID :", id);
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
        return response.json();
      }
    })
    .then(works => {
      console.log("Success block");
      if(works) {
      removeProjectFromDOM(id);
      displaySuccessMessage();
      redirectToIndexPage()
      }
    })
    .catch(error => {
      // Gérez les erreurs de la requête
      console.error("Erreur lors de la suppression :", error);
    });
  }
  
  // Fonction pour supprimer un projet du DOM
  function removeProjectFromDOM(id) {
    const projectToDelete = document.querySelector(`figure[data-id="${id}`);
    if (projectToDelete) {
      projectToDelete.remove();
    }
  }
  
  // Fonction pour afficher un message de succès
  function displaySuccessMessage() {
    setTimeout(() => {
      alert("Projet supprimé avec succès!");
    }, 3000);
  }
  
  // Fonction pour rediriger vers la page index.html
  function redirectToIndexPage() {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 4000);
  }
  
  
////////////// Second modal ////////////

//******** Ouverture de la seconde modal **********//
const secondModal = document.getElementById("modal2");
const firstModal = document.getElementById("modal1");
const openSecondModalButton = document.getElementById("addPhotoButton");  
function openSecondModal() {
    secondModal.style.display = "block";
    firstModal.style.display = "none";
}
openSecondModalButton.addEventListener("click", () => {
    openSecondModal();
});

//******** Retour à la première modal **********//

const returnArrowBtn = document.getElementById("return");
  
returnArrowBtn.addEventListener("click", () => {
    secondModal.style.display = "none";
    firstModal.style.display = "block";
});

//******** Prévisualisation de l'image **********//

function PreviewImage() {
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

//******** Ajout d'un nouveau projet **********//

const btnValiderNewProject = document.getElementById("btnValider");
btnValiderNewProject.addEventListener("click", addNewProject);
const form = document.getElementById('form'); 

function addNewProject() {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById("titleInputModal").value;
    const category = document.getElementById("selectionCategories").value;
    const image = document.getElementById("uploadImage").files[0];

    if (!title || !category || !image) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }

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
        if (works) {
          createFigureWithDeleteIcon(works);
          alert("Projet ajouté avec succès !");
          window.location.href = "index.html";
        }
      })
      .catch(error => {
        console.error("Erreur lors de la création:", error.message);
        alert("Erreur lors de la création du projet.");
      });
  });
}


