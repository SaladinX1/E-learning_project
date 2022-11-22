// const User = require('../../../Backend/Models/User');

let logoutButton = document.querySelector('.deconnexion')
let connexionButton = document.querySelector('.connexion');
let inscriptionButton = document.querySelector('.inscription');

const name = document.querySelector('#name');
const price = document.querySelector('#price');
const duration = document.querySelector('#duration');
const document = document.querySelector('#document');
const document2 = document.querySelector('#document2');
const document3 = document.querySelector('#document3');
const document4 = document.querySelector('#document4');
const document5 = document.querySelector('#document5');
const document6 = document.querySelector('#document6');
const document7 = document.querySelector('#document7');
const document8 = document.querySelector('#document8');
const document9 = document.querySelector('#document9');
const document10 = document.querySelector('#document10');


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



 fetch('http://localhost:3000/api/createFormation')