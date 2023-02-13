// const accessFormation = document.querySelectorAll('.resume__main__module');
// const accessMsg = document.querySelector('#accessMsg');
const token = localStorage.getItem('token');
const master = localStorage.getItem('master');
const profil = document.querySelector('.profil');
const id = localStorage.getItem('id');
const creation = document.querySelector('.creation');
const userNameDisplay = document.querySelector('.userDisplay');
 let admin = localStorage.getItem('admin');
 const nameStorage = localStorage.getItem(localStorage.key('name'));
 const accessFormation = document.querySelector('.formations__acces--button');
 const creaFormationBtn = document.querySelector('.creation');

 let droit_access;
 //if(droit_access == false) {

 const logManagement = document.querySelector('#log-navigation');
 //<button class="creation"><a href="./formationCreator.html">Créer Formation</a></button>


 window.addEventListener('load', () => {

    if(master) {

        if(document.URL.includes("formationExploitants.html") || document.URL.includes("formationEnseignants.html") || document.URL.includes("formation3.html") || document.URL.includes("modulesExploitants.html") || document.URL.includes("modulesEnseignants.html") || document.URL.includes("modules3.html")) {

            const creationBtn1 = `<button class="creation"><a href="../formationCreator.html">Créer Formation</a></button>`;
            document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', creationBtn1 );

        } else if (document.URL.includes("formationHub.html") || document.URL.includes("profil.html") || document.URL.includes("factures.html") ) {

            const creationBtn2 = `<button class="creation"><a href="./formationCreator.html">Créer Formation</a></button>`;
            document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', creationBtn2 );

        } else if ( document.URL.includes("index.html")) {

            const creationBtn3 = `<button class="creation"><a href="./Frontend/pages/formationCreator.html">Créer Formation</a></button>`;
            document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', creationBtn3 );


        }
    }

     if ( document.URL.includes("formationExploitants.html") || document.URL.includes("formationEnseignants.html") || document.URL.includes("formation3.html") || document.URL.includes("modulesExploitants.html") || document.URL.includes("modulesEnseignants.html") || document.URL.includes("modules3.html")) {
      

        if(master) {

            console.log('ok !');

        }

        else if(!localStorage.getItem('formationData') || !localStorage.getItem('timeFormation') || !localStorage.getItem('allDocs')) {

                alert('|!| Accès non autorisé !');
                location.replace('/index.html');
            
        }
    }

 })

 // Gestion des affichages boutons log


 window.addEventListener('load', () => {

    if( document.URL.includes("formationHub.html") || document.URL.includes("profil.html") || document.URL.includes("formationExploitants.html") || document.URL.includes("formationEnseignants.html") || document.URL.includes("formation3.html") || document.URL.includes("modulesExploitants.html") || document.URL.includes("modulesEnseignants.html") || document.URL.includes("modules3.html") || document.URL.includes("factures.html") || document.URL.includes("paymentSuccess.html") || document.URL.includes("formationCreator.html")) {

       
        if (token) {
            const logoutButton = document.querySelector('.deconnexion');
            logoutButton.style.display = 'block';
            profil.style.display = 'block';
            
            if(!document.URL.includes('formationCreator.html')) {
                const inscriptionButton = document.querySelector('.inscription');
                inscriptionButton.style.display = 'none';
                connexionButton.style.display = 'none';        
            }
             } 
            
            if(!token || !id) {
                alert(`| ! | Veuillez vous connecter s'il vous plaît, merci (Accès non Autorisé)`);
                 location.replace('/index.html');
            } 
        
  

    } else if( document.URL.includes('index.html') ) {
        
        if(userNameDisplay.textContent != nameStorage ) {
            if(master) {
            userNameDisplay.textContent = `Bienvenue Administrateur 👨‍✈️`      
            }
        } else {
            userNameDisplay.textContent = nameStorage;
        }


        localStorage.removeItem('formationData');
        localStorage.removeItem('timeFormation');
        localStorage.removeItem('allDocs');


        if (token && master ) {
        
                logoutButton.style.display = 'block';
                profil.style.display = 'block';
                inscriptionButton.style.display = 'none';
                connexionButton.style.display = 'none';
                    
                userNameDisplay.style.textAlign = 'center';
                userNameDisplay.style.margin = '40px';
                userNameDisplay.style.fontSize = '2.1rem'; 
                userNameDisplay.style.color = 'red';
                userNameDisplay.textContent = `Bienvenue Administrateur 👨‍✈️`;
                
             } else if (token && !master) {

                logoutButton.style.display = 'block';
                profil.style.display = 'block';
                inscriptionButton.style.display = 'none';
                connexionButton.style.display = 'none';
              //  creation.style.display = 'none';
                    
                userNameDisplay.style.textAlign = 'center';
                userNameDisplay.style.margin = '40px';
                userNameDisplay.style.fontSize = '2.1rem'; 
                userNameDisplay.textContent = `Bienvenue à vous, ${nameStorage} 😃 !`;

                // Récupération valeur Formation pour contrôle accès formation suite au paiement 

                fetch('http://localhost:3000/api/formations', {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'authorization' : `Bearer ${token}`
        }
    }).then(data => {return data.json()})
    .then(res => {

        for(let formations of res) {

            localStorage.setItem(`${formations.nameFormation}`, false)

        }
    })
             } else if (!token) {
                userNameDisplay.style.display = 'none';
                logoutButton.style.display = 'none';
                profil.style.display = 'none';
               // creation.style.display = 'none';
                    connexionButton.style.display = 'block';
                    inscriptionButton.style.display = 'block';
             }

             
        // contrôle accès Menu hub formation 

        accessFormation.addEventListener('click', () => {
            if(!token) {
                alert(` | ! | Veuillez vous connecter s'il vous plaît, merci (Accès non Autorisé)`);
                window.location.reload();
            } else {
                location.replace("./Frontend/pages/formationHub.html");
            }
        })
  } 
 })


 // GESTION DECONNEXION UTILISATEUR
 
 function logout() {
     if(confirm('Voulez-vous vraiment vous déconnecter ?')) {
         localStorage.clear();
           sessionStorage.removeItem('token');
           window.location.replace('/index.html');
     }
 }


 if ( document.URL.includes('profil.html')) {

    // GESTION SUPPRESSION COMPTE UTILISATEUR 
 
const deleteUserButton = document.querySelector('.suppression');

deleteUserButton.addEventListener('click', deleteAccount);


function deleteAccount() {

    if(confirm('Êtes-vous sûr de vouloir supprimer votre compte ? \b\r \b\r Cette action est définitive.')) {
         

        fetch( `http://localhost:3000/api/destroyuser/${id}`, 
        {method : 'delete',
        headers :  {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'authorization' : `Bearer ${tokenBis}`
        }})
        .then( res => {
        alert('Votre compte a bien été supprimé ! ')
        localStorage.removeItem('id'),
            localStorage.removeItem('token'),
            sessionStorage.removeItem('token')
        window.location.replace('../../index.html');
        })
        .catch(err =>  console.log(err))

    }
  

}

 }
 


// Gestion appel validation Paiement.

window.addEventListener('load', () => {

    if ( document.URL.includes("/paymentSuccess.html")) {
   
       setTimeout(() => {
    // insertion du param de la formation pour redirection 
           location.replace('./Formations/formationExploitants.html');
   
       }, 3000)
   
   
    }
  
  });