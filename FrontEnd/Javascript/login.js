////////////// Formulaire de connexion ////////////


//******** Requete de connexion  **********//
const formConnexion = document.getElementById("formConnexion");


formConnexion.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = formConnexion.email;
    const password = formConnexion.password;
    // Stock les valeurs renseignés dans les champs 
    const userData = {
        email: email.value,
        password: password.value,
    };

  // console.log(userData);
  
  fetch("http://localhost:5678/api/users/login", {
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        // Stocke le token dans la session
        sessionStorage.setItem("token", data.token);

        // Redirige l'utilisateur vers la page d'accueil
        window.location.replace("index.html");

      } else {
        alert("Erreur ! Merci de vérifier votre saisie !");
      }
    })
    .catch((error) => {
      // Gérez les erreurs de la requête
      console.error("Erreur lors de la requête Fetch : ", error);
    });
});
