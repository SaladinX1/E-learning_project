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
 const creaFormationBtn = document.querySelector('.creation');

  if( document.URL.includes("formationHub.html") || document.URL.includes("profil.html") || document.URL.includes("formationExploitants.html") || document.URL.includes("formationEnseignants.html") || document.URL.includes("formation3.html") || document.URL.includes("modulesExploitants.html") || document.URL.includes("modulesEnseignants.html") || document.URL.includes("modules3.html") ) {  
     if (admin && admin !== '1') {
         creaFormationBtn.style.display = 'none';
     } else {
         creaFormationBtn.style.display = 'Block';
     }    
 }
 
 function logout() {
     if(confirm('Voulez-vous vraiment vous déconnecter ?')) {
         localStorage.clear();
           sessionStorage.removeItem('token');
           window.location.replace('/index.html');
     }
 }
 
 // Gestion de l'affichage boutons selon connexion
 
    if (token && id) {

        logoutButton.style.display = 'block';
        inscriptionButton.style.display = 'none';
        profil.style.display = 'block';
        connexionButton.style.display = 'none';
            
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

    
    if (nameStorage === 'Normesse') {
     
       userNameDisplay.style.textAlign = 'center';
       userNameDisplay.style.margin = '40px';
       userNameDisplay.style.fontSize = '2.1rem';
       userNameDisplay.textContent = `Bienvenue Administrateur 👨‍✈️`;
       userNameDisplay.style.color = 'red';
    
    } else {
           
       creation.style.display = 'none';
       userNameDisplay.textContent = `Bienvenue à vous, ${nameStorage} 😃 !`;
    
    };
    
// } else if(!nameStorage) {

    //     userNameDisplay.textContent = ` Veuilez vous connecter s'il vous plaît !`;
//     localStorage.clear();


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

accessFormation.addEventListener('click', () => {

    if(!token) {
        alert(` | ! | Veuillez vous connecter s'il vous plaît, merci (Accès non Autorisé)`);
        window.location.reload();
    } else {
        location.replace("./Frontend/pages/formationHub.html");
    }

})








