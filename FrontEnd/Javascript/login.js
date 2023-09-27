const formConnexion = document.getElementById("formConnexion")
  
formConnexion.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = formConnexion.email; 
    const password = formConnexion.password

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
        //stocke le token et redirige l'utilisateur vers la page d'accueil
        sessionStorage.setItem("token", data.token);
        window.location.replace("index.html");
      } else {
        // affiche un message d'erreur
        alert("Erreur dans l'identifiant ou le mot de passe");
      }
    })
    .catch((error) => {
      // Gérez les erreurs de la requête
      console.error("Erreur lors de la requête Fetch : ", error);
    });
});
