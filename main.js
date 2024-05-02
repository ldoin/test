// Récupérer l'élément HTML pour le bouton de changement de thème
const changeThemeButton = document.getElementById('change-theme-button');

// Fonction pour changer le thème de la page
const changeTheme = () => {
  document.body.classList.toggle("theme-sombre");
};

// Gérer le clic sur le bouton de changement de thème
changeThemeButton.addEventListener('click', () => {
  changeTheme();
});
