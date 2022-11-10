// const accessFormation = document.querySelectorAll('.resume__main__module');
// const accessMsg = document.querySelector('#accessMsg');
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
const profil = document.querySelector('.profil');
const id = localStorage.getItem('id');
const creation = document.querySelector('.creation');
const nameStorage = localStorage.getItem(localStorage.key('name'));
  const userNameDisplay = document.querySelector('.userDisplay');

 // Gestion de l'affichage boutons selon connexion

    if (token && id) {

        logoutButton.style.display = 'block';
        connexionButton.style.display = 'none';
        inscriptionButton.style.display = 'none';
        profil.style.display = 'block';
            
            userNameDisplay.style.textAlign = 'center';
            userNameDisplay.style.margin = '40px';
            userNameDisplay.style.fontSize = '2.1rem';
            
        } else {

        userNameDisplay.style.display = 'none';
        creation.style.display = 'none';
        logoutButton.style.display = 'none';
        connexionButton.style.display = 'block';
        inscriptionButton.style.display = 'block';
        profil.style.display = 'none';
   
    }


    // Gestion afichage nom Administrateur et bouton

    if(nameStorage !== 'Normesse') {
            
        userNameDisplay.textContent = `Bienvenue à toi, ${nameStorage} 😃 !`;
        creation.style.display = 'none';
        
    } else if (nameStorage === 'Normesse') {
      
        userNameDisplay.style.textAlign = 'center';
        userNameDisplay.style.margin = '40px';
        userNameDisplay.style.fontSize = '2.1rem';
        userNameDisplay.textContent = `Bienvenue Administrateur !`;

    }



function logout() {

          localStorage.removeItem('token');
          localStorage.removeItem('id');
          localStorage.removeItem('name');
          sessionStorage.removeItem('token');
          window.location.replace('/index.html');
}


















// accessMsg.style.display = 'none';

// accessFormation.forEach(el => {
     
//      el.addEventListener('click', deniedAccess)
     
// });



// function deniedAccess() {
     
//      if (!token) {

//           accessMsg.style.display = 'inline';
//           accessMsg.style.textAlign = 'center';
//           accessMsg.style.fontSize = '1.5rem';
//         accessMsg.style.color = 'red';
//         accessMsg.style.paddingTop = '0px';
         
//      setTimeout(() => {
//           window.location.replace('../formationHub.html');
//      }, 1600)
   
//    } else {

//         window.location.replace('../formationRea.html');

//    }
   
// }






