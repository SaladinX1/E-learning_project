

const exploitants = document.querySelector('#exploitants');
const enseignants = document.querySelector('#enseignants');
const formationX = document.querySelector('#formationX');

const data = localStorage.getItem('formationData');


 exploitants.innerHTML = data;

 enseignants.innerHTML = data;

 formationX.innerHTML = data;