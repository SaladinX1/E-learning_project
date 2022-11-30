// const accessFormation = document.querySelectorAll('.resume__main__module');
// const accessMsg = document.querySelector('#accessMsg');
const token = localStorage.getItem('token');
const profil = document.querySelector('.profil');
const id = localStorage.getItem('id');
const creation = document.querySelector('.creation');
const userNameDisplay = document.querySelector('.userDisplay');
 const admin = localStorage.getItem(localStorage.key('admin'));
 const nameStorage = localStorage.getItem(localStorage.key('name'));
 const accessFormation = document.querySelector('.formations__acces--button');
 

 // Gestion de l'affichage boutons selon connexion

    if (token && id) {

        logoutButton.style.display = 'block';
        connexionButton.style.display = 'none';
        inscriptionButton.style.display = 'none';
        profil.style.display = 'block';
            
        userNameDisplay.style.textAlign = 'center';
        userNameDisplay.style.margin = '40px';
        userNameDisplay.style.fontSize = '2.1rem'; 
        userNameDisplay.textContent = `Bienvenue à vous, ${nameStorage} 😃 !`;

        } else {

        userNameDisplay.style.display = 'none';
        creation.style.display = 'none';
        logoutButton.style.display = 'none';
        connexionButton.style.display = 'block';
        inscriptionButton.style.display = 'block';
        profil.style.display = 'none';
   
    }

// console.log(typeof(admin));
//     if(admin === 'true') {
//         userNameDisplay.style.textAlign = 'center';
//         userNameDisplay.style.margin = '40px';
//         userNameDisplay.style.fontSize = '2.1rem';
//         userNameDisplay.textContent = `Bienvenue Administrateur 👨‍✈️`;
//         userNameDisplay.style.color = 'red';

       
        
//     } else  if(admin !== 'true')  {
      
//         userNameDisplay.style.textAlign = 'center';
//         userNameDisplay.style.margin = '40px';
//         userNameDisplay.style.fontSize = '2.1rem'; 
//         userNameDisplay.textContent = `Bienvenue à vous, ${nameStorage} 😃 !`;
//         creation.style.display = 'none';
//     }
    
   

    // Gestion afichage nom Administrateur et bouton


    if(nameStorage !== 'Normesse') {
            
        userNameDisplay.textContent = `Bienvenue à vous, ${nameStorage} 😃 !`;
        creation.style.display = 'none';
        
    } else if (nameStorage === 'Normesse') {
      
        userNameDisplay.style.textAlign = 'center';
        userNameDisplay.style.margin = '40px';
        userNameDisplay.style.fontSize = '2.1rem';
        userNameDisplay.textContent = `Bienvenue Administrateur 👨‍✈️`;
        userNameDisplay.style.color = 'red';

    }

    // else if (admin === 'true') {
    //     userNameDisplay.style.textAlign = 'center';
    //     userNameDisplay.style.margin = '40px';
    //     userNameDisplay.style.fontSize = '2.1rem';
    //     userNameDisplay.textContent = `Bienvenue Administrateur 👨‍✈️`;
    //     userNameDisplay.style.color = 'red';

    //  }
     
    // if(adminStorage == false) {
            
    //     creation.style.display = 'none';
        
    // } else if (adminStorage == true) {
      
    //     userNameDisplay.style.textAlign = 'center';
    //     userNameDisplay.style.margin = '40px';
    //     userNameDisplay.style.fontSize = '2.1rem';
    //     userNameDisplay.textContent = `Bienvenue Administrateur 👨‍✈️`;
    //     userNameDisplay.style.color = 'red';

    // }



function logout() {

          localStorage.removeItem('token');
          localStorage.removeItem('id');
          localStorage.removeItem('name');
          localStorage.removeItem('admin');
          sessionStorage.removeItem('token');
          window.location.replace('/index.html');
}


accessFormation.addEventListener('click', () => {

    if(!token) {
        alert(` | ! | Veuillez vous connecter s'il vous plaît, merci (Accès non Autorisé)`);
        window.location.reload();
    } else {
        location.replace("./Frontend/pages/formationHub.html");
    }

})





// accessMsg.style.display = 'none';

// accessFormation.forEach(el => {
     
//      el.addEventListener('click', deniedAccess)
     
// });







