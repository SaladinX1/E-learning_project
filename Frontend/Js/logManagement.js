// const accessFormation = document.querySelectorAll('.resume__main__module');
// const accessMsg = document.querySelector('#accessMsg');
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
const master = localStorage.getItem('master');
const profil = document.querySelector('.profil');
const id = localStorage.getItem('id');
const creation = document.querySelector('.creation');
const userNameDisplay = document.querySelector('.userDisplay');
 let admin = localStorage.getItem('admin');
 const nameStorage = localStorage.getItem(localStorage.key('name'));
 const accessFormation = document.querySelector('.formations__acces--button');
 const creaFormationBtn = document.querySelector('.creation');

 //let h2UserName = document.querySelector('.homeContent > h2');

 let droit_access;
 //if(droit_access == false) {

 const logManagement = document.querySelector('#log-navigation');
 //<button class="creation"><a href="./formationCreator.html">Créer Formation</a></button>


 window.addEventListener('load', () => {

    if( admin == 'false') {

 if( document.URL.includes('index.html')) {

    localStorage.removeItem('formationData');
    localStorage.removeItem('timeFormation');
    localStorage.removeItem('allDocs');

    if (!token) {

      userNameDisplay.style.display = 'none';
    
    //  const singUpNInBtn = ` <button type="button" class="inscription">S'inscrire</button> <button type="button" class="connexion">Se connecter</button> `;
    //  document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', singUpNInBtn );
      
   } else if (token) {

        const profilNLogoutBtn = ` <button class="profil"><a href="./Frontend/pages/profil.html">Profil</a></button>
        <button type="button" class="deconnexion" data-toggle="modal" data-target="#exampleModalCenter" >Déconnexion</button>`;
        document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', profilNLogoutBtn );



       // logoutButton.style.display = 'block';
      //  profil.style.display = 'block';

        inscriptionButton.style.display = 'none';
        connexionButton.style.display = 'none';
            
        userNameDisplay.style.textAlign = 'center';
        userNameDisplay.style.margin = '40px';
        userNameDisplay.style.fontSize = '8rem'; 
       userNameDisplay.style.fontFamily = 'Staatliches';
       userNameDisplay.textContent = `Bienvenue à toi, ${nameStorage} 😃 !`;
       
       if(userNameDisplay.textContent != nameStorage ) { 
        userNameDisplay.textContent = `Bienvenue à toi, ${nameStorage} 😃 !`;
    }

    userNameDisplay.style.color = '#02eeff';

        // Récupération valeur Formation pour contrôle accès formation suite au paiement 

        fetch('http://localhost:3000/api/getuser/:id', {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                    'authorization' : `Bearer ${token}`
                }
            }).then(data => {return data.json()})
            .then( res => {

                console.log(res);

                    localStorage.setItem(`reaTeachers`, res.reaTeachers);
                    localStorage.setItem(`reaEx`, res.reaEx);
                    localStorage.setItem(`rea3`, res.rea3);

            })

  }
 
   // contrôle accès Menu hub formation 

   accessFormation.addEventListener('click', () => {
    if(!token) {

        document.querySelector('#exampleModalLongTitleAccess').textContent = `Redirection ...`;
      //  alert(` | ! | Veuillez vous connecter s'il vous plaît, merci (Accès non Autorisé)`);
    } else {
        location.replace("./Frontend/pages/formationHub.html");
    }
})

      
}


    } else if(admin == 'true') {

       

        if(document.URL.includes("formationExploitants.html") || document.URL.includes("formationEnseignants.html") || document.URL.includes("formation3.html") || document.URL.includes("modulesExploitants.html") || document.URL.includes("modulesEnseignants.html") || document.URL.includes("modules3.html")) {

            const creationBtn1 = `<button class="creation"><a href="../formationCreator.html">Créer Formation</a></button>`;
            document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', creationBtn1 );

            
        } else if (document.URL.includes("formationHub.html") || document.URL.includes("profil.html") || document.URL.includes("factures.html") ) {

            const creationBtn2 = `<button class="creation"><a href="./formationCreator.html">Créer Formation</a></button>`;
            document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', creationBtn2 );

        } else if ( document.URL.includes("index.html")) {

            localStorage.removeItem('formationData');
        localStorage.removeItem('timeFormation');
        localStorage.removeItem('allDocs');


            const creationBtn3 = `<button class="creation"><a href="./Frontend/pages/formationCreator.html">Créer Formation</a></button>`;
            document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', creationBtn3 );
            

        if(userNameDisplay.textContent != nameStorage ) { 
            userNameDisplay.textContent = `Bienvenue Administrateur`      
        }
        //  else {
        //     userNameDisplay.textContent = nameStorage;
        //     let profilNLogoutBtn = ` <button class="profil"><a href="./Frontend/pages/profil.html">Profil</a></button>
        //     <button type="button" class="deconnexion" data-toggle="modal" data-target="#exampleModalCenter" >Déconnexion</button>`;
        //     document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', profilNLogoutBtn );
        // }

        let profilNLogoutBtn = ` <button class="profil"><a href="./Frontend/pages/profil.html">Profil</a></button>
        <button type="button" class="deconnexion" data-toggle="modal" data-target="#exampleModalCenter" >Déconnexion</button>`;
        document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', profilNLogoutBtn );
              //  logoutButton.style.display = 'block';
              //  profil.style.display = 'block';

                inscriptionButton.style.display = 'none';
                connexionButton.style.display = 'none';
                    
                userNameDisplay.style.textAlign = 'center';
                userNameDisplay.style.margin = '40px';
                userNameDisplay.style.fontSize = '7rem'; 
                userNameDisplay.style.fontFamily = 'Cinzel Decorative';
                userNameDisplay.style.color = 'red';
                userNameDisplay.textContent = `Bienvenue Administrateur`;

      // contrôle accès Menu hub formation 

      accessFormation.addEventListener('click', () => {
            location.replace("./Frontend/pages/formationHub.html");
    });

 }   
   
}

    //  if ( document.URL.includes("formationExploitants.html") || document.URL.includes("formationEnseignants.html") || document.URL.includes("formation3.html") || document.URL.includes("modulesExploitants.html") || document.URL.includes("modulesEnseignants.html") || document.URL.includes("modules3.html")) {
      
    //     if(master) {
    //         console.log('ok !');
    //     }

    //     else if(!localStorage.getItem('formationData') || !localStorage.getItem('timeFormation') || !localStorage.getItem('allDocs')) {

    //             alert('|!| Accès non autorisé !');
    //             location.replace('/index.html');
    //     }
    // }
 })



 // Gestion des affichages boutons log

 window.addEventListener('load', () => {
    
    if( document.URL.includes("formationHub.html") || document.URL.includes("profil.html") || document.URL.includes("formationExploitants.html") || document.URL.includes("formationEnseignants.html") || document.URL.includes("formation3.html") || document.URL.includes("modulesExploitants.html") || document.URL.includes("modulesEnseignants.html") || document.URL.includes("modules3.html") || document.URL.includes("factures.html") || document.URL.includes("formationCreator.html")) {

        if (token) {
            const logoutButton = document.querySelector('.deconnexion');
            logoutButton.style.display = 'block';
            profil.style.display = 'block';
            
            // if(!document.URL.includes('formationCreator.html')) {
            //     connexionButton.style.display = 'none';        
            // }
             }
            if(!token || !id) {
                alert(`| ! | Veuillez vous connecter s'il vous plaît, merci (Accès non Autorisé)`);
                 location.replace('/index.html');
        } 
    }
})




 // GESTION DECONNEXION UTILISATEUR

 function logout() {
    //  if(confirm('Voulez-vous vraiment vous déconnecter ?')) {
         localStorage.clear();
           sessionStorage.clear();
           window.location.replace('/index.html');
    //  }
 }


window.addEventListener('load', ()  => {
    if ( document.URL.includes('profil.html')) {

        // GESTION SUPPRESSION COMPTE UTILISATEUR 
        
        const deleteUserButton = document.querySelector('.finalDeletion');
        
        deleteUserButton.addEventListener('click', deleteAccount);
        
    
    function deleteAccount() {
    
            fetch( `http://localhost:3000/api/destroyuser/${id}`, 
            {method : 'delete',
            headers :  {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'authorization' : `Bearer ${token}`
            }})
            .then( res => {
            alert('Votre compte a bien été supprimé ! ')
            localStorage.clear();
                sessionStorage.clear();
            window.location.replace('../../index.html');
        })
        .catch(err =>  console.log(err))
    }  
  }
})