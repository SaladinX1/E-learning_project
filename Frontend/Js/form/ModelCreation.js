// const User = require('../../../Backend/Models/User');

let logoutButton = document.querySelector('.deconnexion')
let connexionButton = document.querySelector('.connexion');
let inscriptionButton = document.querySelector('.inscription');

if (token && id) {

    logoutButton.style.display = 'block';
    connexionButton.style.display = 'none';
    inscriptionButton.style.display = 'none';
    profil.style.display = 'block';

} else{

    logoutButton.style.display = 'none';
    connexionButton.style.display = 'block';
    inscriptionButton.style.display = 'block';
    profil.style.display = 'none';

}