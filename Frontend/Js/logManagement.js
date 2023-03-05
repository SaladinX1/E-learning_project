// const accessFormation = document.querySelectorAll('.resume__main__module');
// const accessMsg = document.querySelector('#accessMsg');
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
const profil = document.querySelector('.profil');
const id = localStorage.getItem('id');
const creation = document.querySelector('.creation');
const userNameDisplay = document.querySelector('.userDisplay');
const admin = localStorage.getItem('admin');
let nameStorage = localStorage.getItem('name');

 const accessFormation = document.querySelector('.formations__acces--button');
 const creaFormationBtn = document.querySelector('.creation');


 const connexionButton = document.querySelector('.connexion');
const inscriptionButton = document.querySelector('.inscription');
const logoutButton = document.querySelector('.deconnexion');

const cancelConnexionForm = document.querySelector('.cancelConnexionForm');
const cancelInscriptionForm = document.querySelector('.cancelInscriptionForm');

const overlayConnexion = document.querySelector('.overlay__connexion');
const overlayInscription = document.querySelector('.overlay__inscription');
const formInscription = document.querySelector('#signup');
const formConnexion = document.querySelector('#signin');

const containeroOffer = document.querySelectorAll('.containero__offer');
const containerPaymentForm = document.querySelector('.overlay__paiement');
const cancelPaymentForm = document.querySelector('.cancelOder');
const displayPrice = document.querySelector('.price');
const boxPrice = document.querySelector('.box-price');

const authDocument = document.querySelector('#autorisationDocument');
const typeDocument = document.querySelector('#documentType');
const name = document.querySelector('#name');
const secondName = document.querySelector('#secondName');
const email = document.querySelector('#email');
const tel = document.querySelector('#telephone');
const password = document.querySelector('#password');


let nameClient = document.querySelector('#client-name');
let cardN = document.querySelector('#card-number');
let expirationDate = document.querySelector('#expiration-date');
let codeValidation = document.querySelector('#card-validation-code');

let priceFormation = document.querySelector('#priceFormation');
 let nameFormation = document.querySelector('#formationName');

 //let droit_access;

 const logManagement = document.querySelector('#log-navigation');





 let validationForm = {
     nomValid : false,
     prenomValid : false,
     emailValid : false,
     telValid : false,
     passwordValid : false
 }

 const uri = '/paymentSuccess.html' || '/formationExploitants.html' || '/formationEnseignants.html' || 'formationCreator.html' || '/formation3.html' || '/modulesExploitants.html' || '/modulesEnseignants.html' || '/modules3.html' || '/formationHub.html' || '/profil.html' || '/factures.html' || 'reaEx.html' || '/reaTeachers.html' || '/rea3.html';
 
if( !document.URL.includes(uri) ) {
    // Gestion de la connexion

    if( !document.URL.includes('/profil')) {

         function displayOverlayConnexion() {
            overlayConnexion.style.display = 'block';
            overlayInscription.style.display = 'none';
           }
           function displayOverlayInscription() {   
               overlayInscription.style.display = 'block';
               overlayConnexion.style.display = 'none';
           }
           function hideFormConnexion() {
                   overlayConnexion.style.display = 'none';
           }
           function hideFormInscription() {
               overlayInscription.style.display = 'none';
           }


         

 formConnexion.addEventListener('submit', (e) => {
    e.preventDefault();


        const loginUserInfo = {
               email : document.querySelector('#emailConnexion').value,
               password : document.querySelector('#passwordConnexion').value
        }
   
        fetch(`http://localhost:3000/api/login`, {
                       method : "post",
                       body : JSON.stringify(loginUserInfo),
                       headers :  {
                           'Content-Type' : 'application/json',
                           'Accept' : 'application/json'
                       },
        }).then( data => {
            data.json()
            .then( res => {
                console.log(res);

                let id = res.id;
                let token = res.token;
                let name = res.name;
                let admin = res.admin;

            
                if(token === undefined) {
                    alert(`Une erreur a été repérée dans votre saisie.  \b\r \b\r information(s) incorrect(es) 😥! \b\r \b\r réessayez merci​`)
            } else  {
                alert('Vous êtes maintenant connecté 👌 !');
                localStorage.setItem('id', id);
                localStorage.setItem('token', token);
                localStorage.setItem('name', name);
                localStorage.setItem('admin', admin);

                sessionStorage.setItem('id', id);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('admin', admin);

                
                window.location.reload();
               
            }                
          })
        })
        .catch( err => { console.log(err) });
   }
);


name.addEventListener('change', (e) => {
    let nameTest = e.target.value;

    if (/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(nameTest) == false) {

        validationForm.nomValid = false;
        document.querySelector('#secondNameErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques !";
       let errorInput = document.querySelector('#name');
        errorInput.classList.add("border");
        errorInput.style.border = "2px solid red";
        errorInput.style.marginBottom = '0px';
        let errorName = document.querySelector("#secondNameErrMsg");
        errorName.style.color = "red";

    } else {

        validationForm.nomValid = true;
        document.querySelector('#secondNameErrMsg').textContent = "✅";
         let errorName = document.querySelector('#name');
         errorName.classList.add('border');
         errorName.style.border = " 2px solid green";
         errorName.style.marginBottom = '0px';

    }
})

secondName.addEventListener('change' , (e) => {
    let prenomTest = e.target.value;

    if(/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(prenomTest) == false) {

        validationForm.prenomValid = false;
        document.querySelector('#firstNameErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques";
        let errorInput = document.querySelector('#secondName');
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid red";
        errorInput.style.marginBottom = '0px';
        let errorPrenom = document.querySelector("#firstNameErrMsg");
        errorPrenom.style.color = "red";

    } else {

        validationForm.prenomValid = true;
        document.querySelector('#firstNameErrMsg').textContent = "✅";
        let errorInput = document.querySelector('#secondName');
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid green"
        errorInput.style.marginBottom = '0px';
    }
})

email.addEventListener('change' , (e) => {

    let emailTest = e.target.value

    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailTest) == false) {

        validationForm.emailValid = false;
        document.querySelector('#emailErrMsg').textContent = " Veuillez entrer un email valide"
        let errorInput = document.querySelector('#email')
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid red";
        let errorMail = document.querySelector('#emailErrMsg');
        errorMail.style.color = 'red';

    } else {

        validationForm.emailValid = true;
        let errorInput = document.querySelector('#emailErrMsg')
        errorInput.textContent = "✅";
        let errorMail = document.querySelector('#email');
        errorMail.classList.add('border');
        errorMail.style.border = "2px solid green";
    }
})

tel.addEventListener('change', (e) => {

    let telTest = e.target.value;

    if(/^[0-9]{10}/g.test(telTest) == false) {

        validationForm.telValid = false;
        document.querySelector('#telErrMsg').textContent = "Veuillez remplir un numéro de téléphone valide, s'il vous plaît";
        let errorInput = document.querySelector('#telephone');
        errorInput.classList.add('border');
        errorInput.style.border = '2px solid red';
        errorInput.style.marginBottom = '0px';
        let telError = document.querySelector("#telErrMsg");
        telError.style.color = "red"

    } else {
        validationForm.telValid = true;
        let errorInput = document.querySelector('#telephone');
        errorInput.classList.add('border');
        errorInput.style.border = '2px solid green';
        errorInput.style.marginBottom = '0px';
        let telError = document.querySelector("#telErrMsg");
        telError.textContent = "✅";
    }
})

password.addEventListener('change', (e) => {

    let passTest = e.target.value;

    if(/^[A-Za-z0-9][A-Za-z0-9_ ]{0,40}$/g.test(passTest) == false) {

        validationForm.passwordValid = false;
        document.querySelector('#passwordErrMsg').textContent = "Veuillez entrez seulemtn des caractères alphanumérique valide, sans espace ou cacactères spéciaux s'il vous plaît";
        let errorInput = document.querySelector('#password');
        errorInput.classList.add('border');
        errorInput.style.border = '2px solid red';
        errorInput.style.marginBottom = '0px';
        let passError = document.querySelector("#passwordErrMsg");
        passError.style.color = "red"

    } else {
        validationForm.passwordValid = true;
        let errorInput = document.querySelector('#telephone');
        errorInput.classList.add('border');
        errorInput.style.border = '2px solid green';
        errorInput.style.marginBottom = '0px';
        let passError = document.querySelector("#passwordErrMsg");
        passError.textContent = "✅";
    }
})


let lockMsg = false;


formInscription.addEventListener('submit', (e) => {
    e.preventDefault();
    

    if ( validationForm.nomValid == true && validationForm.prenomValid == true && validationForm.emailValid == true && validationForm.telValid == true && validationForm.passwordValid == true) {
        
        
        
        const registerClient = {
           
           name : document.querySelector('#name').value,
           secondName : document.querySelector('#secondName').value,
           email : document.querySelector('#email').value,
           telephone : document.querySelector('#telephone').value,
           password : document.querySelector('#password').value,
           documentType : document.querySelector('#documentType').value,
           autorisationDocument : document.querySelector('#autorisationDocument').value

       }
       
               fetch(`http://localhost:3000/api/register`, {
                   method : "post",
                   body : JSON.stringify(registerClient),
                   headers :  {
                       'Content-Type' : 'application/json',
                       'Accept' : 'application/json'
                   },
               })
               .then( (res) => {
                   alert(`Vous êtes maintenant inscrit ! Bravo 😃 ! Pensez à vous connecter !`  )

                   window.location.reload();
               }
               )
               .catch( (err) => {
                   alert('Une erreur est survenue :( !' + err)
                   })
               let el = document.createElement('div');
               el.innerHTML = '';

               lockMsg = false;

 } else {

     if(lockMsg == false) {
           
       el = document.createElement('div');
       let el2 = document.querySelector('#signup');
       el2.appendChild(el);
       el.classList.add('error');
       el.style.color = 'red';
       el.style.padding = 'top : 15px';
       el.textContent = "";
       el.textContent = "Merci de correctement remplir tous les champs d'informations s'il vous plaît ...";

       lockMsg = true;
              }
        }

    });


    ////// RECUPERATION NAME POUR INSERTION LOCALSTORAGE


    fetch('http://localhost:3000/api/getuser/:id', {
        method: 'get',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    .then(data => {return data.json()})
    .then(res => {
        
        localStorage.setItem('name', `${res.secondName}`);
        

    })


 if( admin == 'false' || !token) {
         
    localStorage.removeItem('formationData');
    localStorage.removeItem('timeFormation');
    localStorage.removeItem('allDocs');

    // const signInSignUpBtn = `<button type="button" onclick="displayOverlayInscription()"  class="inscription">S'inscrire</button>
    // <button type="button" onclick="displayOverlayConnexion()"  class="connexion">Se connecter</button>`;

    // document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', signInSignUpBtn );

    if (!token) {

      userNameDisplay.style.display = 'none';
    
    //  const singUpNInBtn = ` <button type="button" class="inscription">S'inscrire</button> <button type="button" class="connexion">Se connecter</button> `;
    //  document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', singUpNInBtn );
      
   } else if (token) {

       
       const profilNLogoutBtn = ` <button class="profil"><a href="./Frontend/pages/profil.html">Profil</a></button>
       <button type="button" class="deconnexion" data-toggle="modal" data-target="#exampleModalCenter" >Déconnexion</button>`;
       document.querySelector('#log-navigation').innerHTML = profilNLogoutBtn ;
       
       

       // logoutButton.style.display = 'block';
      //  profil.style.display = 'block';

        inscriptionButton.style.display = 'none';
        connexionButton.style.display = 'none';
            
        userNameDisplay.style.textAlign = 'center';
        userNameDisplay.style.margin = '40px';
        userNameDisplay.style.fontSize = '8rem'; 
       userNameDisplay.style.fontFamily = 'Staatliches';

      // if(userNameDisplay.textContent.includes(!nameStorage)) {
           let nameStorage = localStorage.getItem('name');
           userNameDisplay.textContent = `Bienvenue à toi, ${nameStorage} 😃 !`;
       //}
       
    //    if(userNameDisplay.textContent != nameStorage ) { 
    //     userNameDisplay.textContent = `Bienvenue à toi, ${nameStorage} 😃 !`;
    // }

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

 
} else if(admin == 'true') {


    
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
       
}







    if(document.URL.includes("formationExploitants.html") || document.URL.includes("formationEnseignants.html") || document.URL.includes("formation3.html") || document.URL.includes("modulesExploitants.html") || document.URL.includes("modulesEnseignants.html") || document.URL.includes("modules3.html")) {

    if(admin == 'true') {
        const creationBtn1 = `<button class="creation"><a href="../formationCreator.html">Créer Formation</a></button>`;
        document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', creationBtn1 );
    }
   

    
        } else if (document.URL.includes("formationHub.html") || document.URL.includes("profil.html") || document.URL.includes("factures.html") ) {

            if(admin == 'true') {   
                const creationBtn2 = `<button class="creation"><a href="./formationCreator.html">Créer Formation</a></button>`;
            document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', creationBtn2 ); }
        

        }


  if( document.URL.includes("formationHub.html") || document.URL.includes("profil.html") || document.URL.includes("formationExploitants.html") || document.URL.includes("formationEnseignants.html") || document.URL.includes("formation3.html") || document.URL.includes("modulesExploitants.html") || document.URL.includes("modulesEnseignants.html") || document.URL.includes("modules3.html") || document.URL.includes("factures.html") || document.URL.includes("formationCreator.html")) {

    if (token) {
        const logoutButton = document.querySelector('.deconnexion');
        logoutButton.style.display = 'block';
       // profil.style.display = 'block';
        
        // if(!document.URL.includes('formationCreator.html')) {
        //     connexionButton.style.display = 'none';        
        // }
         }
        if(!token || !id) {
            alert(`| ! | Veuillez vous connecter s'il vous plaît, merci (Accès non Autorisé)`);
             location.replace('/index.html');
    } 
}





           
if(document.URL.includes('profil.html')) {
    ////////////////////////////////////////////////////
    
    // GESTION MODIFICATION INFO UTILISATEUR 
    
    //////////////////////////////////////////////////////////////
    
                const sendUpdateInfo = document.querySelector('#signupdate'); 
    
    const updateButton = document.querySelector('.updateButton');
    const cancelUpdateButton = document.querySelector('.cancelUpdateButton');
    const overlayModification = document.querySelector('.overlay__modification');
    
    const tokenUpdate = localStorage.getItem('token');
    
    
    
    
     updateButton.addEventListener('click', displayOverlayModification);
    
    function displayOverlayModification() {
        overlayModification.style.display = 'block';
    }
    
    cancelUpdateButton.addEventListener('click', hideUpdateForm);
    
    function hideUpdateForm() {
        overlayModification.style.display = 'none'
    }
    
    
        name.addEventListener('change', (e) => {
            let nameTest = e.target.value;
    
            if (/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(nameTest) == false) {
    
                validationForm.nomValid = false;
                document.querySelector('#secondNameErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques !";
               let errorInput = document.querySelector('#name');
                errorInput.classList.add("border");
                errorInput.style.border = "2px solid red";
                errorInput.style.marginBottom = '0px';
                let errorName = document.querySelector("#secondNameErrMsg");
                errorName.style.color = "red";
    
            } else {
    
                validationForm.nomValid = true;
                document.querySelector('#secondNameErrMsg').textContent = "✅";
                 let errorName = document.querySelector('#name');
                 errorName.classList.add('border');
                 errorName.style.border = " 2px solid green";
                 errorName.style.marginBottom = '0px';
    
            }
        })
    
    
        secondName.addEventListener('change' , (e) => {
            let prenomTest = e.target.value;
    
            if(/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(prenomTest) == false) {
    
                validationForm.prenomValid = false;
                document.querySelector('#firstNameErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques";
                let errorInput = document.querySelector('#secondName');
                errorInput.classList.add('border');
                errorInput.style.border = "2px solid red";
                errorInput.style.marginBottom = '0px';
                let errorPrenom = document.querySelector("#firstNameErrMsg");
                errorPrenom.style.color = "red";
    
            } else {
    
                validationForm.prenomValid = true;
                document.querySelector('#firstNameErrMsg').textContent = "✅";
                let errorInput = document.querySelector('#secondName');
                errorInput.classList.add('border');
                errorInput.style.border = "2px solid green"
                errorInput.style.marginBottom = '0px';
            }
        })
    
    
        email.addEventListener('change' , (e) => {
    
            let emailTest = e.target.value
    
            if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailTest) == false) {
    
                validationForm.emailValid = false;
                document.querySelector('#emailErrMsg').textContent = " Veuillez entrer un email valide"
                let errorInput = document.querySelector('#email')
                errorInput.classList.add('border');
                errorInput.style.border = "2px solid red";
                let errorMail = document.querySelector('#emailErrMsg');
                errorMail.style.color = 'red';
    
            } else {
    
                validationForm.emailValid = true;
                let errorInput = document.querySelector('#emailErrMsg')
                errorInput.textContent = "✅";
                let errorMail = document.querySelector('#email');
                errorMail.classList.add('border');
                errorMail.style.border = "2px solid green";
            }
        })
    
        tel.addEventListener('change', (e) => {
    
            let telTest = e.target.value;
    
            if(/^[0-9]{10}/g.test(telTest) == false) {
    
                validationForm.telValid = false;
                document.querySelector('#telErrMsg').textContent = "Veuillez remplir un numéro de téléphone valide, s'il vous plaît";
                let errorInput = document.querySelector('#telephone');
                errorInput.classList.add('border');
                errorInput.style.border = '2px solid red';
                errorInput.style.marginBottom = '0px';
                let telError = document.querySelector("#telErrMsg");
                telError.style.color = "red"
    
            } else {
                validationForm.emailValid = true;
                let errorInput = document.querySelector('#telephone');
                errorInput.classList.add('border');
                errorInput.style.border = '2px solid green';
                errorInput.style.marginBottom = '0px';
                let telError = document.querySelector("#telErrMsg");
                telError.textContent = "✅";
            }
        })
    
    
        sendUpdateInfo.addEventListener('submit', (e) => {
                e.preventDefault()
    
                if ( validationForm.nomValid == true || validationForm.prenomValid == true || validationForm.emailValid == true || validationForm.telValid == true || validationForm.passwordValid == true) {
           
                    const updateData = {
                        
                        name : document.querySelector('#name').value,
                        secondName : document.querySelector('#secondName').value,
                        email : document.querySelector('#email').value,
                        telephone : document.querySelector('#telephone').value,
                        autorisationDocument : document.querySelector('#autorisationDocument').value,
                        documentType : document.querySelector('#documentType').value,
                        password : document.querySelector('#password').value
                    }
            
            
                        const id = localStorage.getItem('id');
            
                            fetch(`http://localhost:3000/api/updateuser/${id}`, {
                                method : "put",
                                body : JSON.stringify(updateData),
                                headers :  {
                                    'Content-Type' : 'Application/json',
                                    'Accept' : 'Application/json',
                                    'authorization' : `Bearer ${tokenUpdate}`
                                },
                            })
                            .then(res => {
                              return res.json()
                               .then( data => {
    
                                localStorage.removeItem('name');
                               
                                alert('Ok ! Vos données ont été modifiés !')
                             window.location.reload();
                               })
                            })
                            .catch( (err) => {
                                alert('Une erreur est survenue :( !' + err)
                                })                
               }
             });
       
    
    
       ////GET INFO USER POUR AFFICHAGE PROFIL
        
       
       const idBis = localStorage.getItem('id');
       const tokenBis = localStorage.getItem('token');
    
       const profilInfo = document.querySelector('.profil__informations');
    
    
       if(idBis) {
    
           fetch( `http://localhost:3000/api/getuser/${idBis}`, {
           method: "GET",
           headers: {
               'content-type': 'application/json',
               'accept': 'application/json',
               'authorization' : `Bearer ${tokenBis}`
            }
           })
       .then( data => {
         return data.json();
       })
       .then( (res) => {
     
          
       
               profilInfo.innerHTML += 
    
                           `<h3> Nom : ${res.name} </h3>
                           <h3>Prénom : ${res.secondName}</h3>
                           <h3>E-mail : ${res.email}</h3>
                           <h3>Téléphone : ${res.telephone}</h3>
                           <h3> Attestation enseignement : \<br/>  ${res.documentType}</h3> 
                           `
               // <h3>Mot de passe : ${res.password}</h3>
       })
    
       } else {
    
         //  window.location.replace('../pages/index.html')
    
             }
    
    
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
    
    
    
            // GESTION AFFICHAGE FORMATION \\
        
        const formationsPanel = document.querySelector('.formationContainerPanel__panel');
    
        // const reaTeachers = localStorage.getItem('reaTeachers');
        // const reaEx = localStorage.getItem('reaEx');
        // const rea3 = localStorage.getItem('rea3');
    
        formationsPanel.addEventListener('click', () => {
    
            let lock = false;
    
            const panelAcces = document.querySelector('.formationContainerPanel__panel--access');
    
    
            panelAcces.style.display = "block";
    
            const reaT = localStorage.getItem('reaTeachers');
            const reaEx = localStorage.getItem('reaEx');
            const rea3 = localStorage.getItem('rea3');
             
                if (reaT == 'true') {
                    if(lock == true) { 
                        panelAcces.innerHTML = '';     
                        return;
                    } 
                    panelAcces.innerHTML += `<h3> <a href='./Formations/reaTeachers.html'>Réactualisation des compétences Enseignants</a> </h3>`;   
                    lock = true;
                    return lock;  
                }
                if (reaEx == 'true') {    
                    if(lock == true) {      
                        return;
                    }    
                    panelAcces.innerHTML += `<h3> <a href='./Formations/reaEx.html'>Réactualisation des compétences Exploitants</a> </h3>`; 
                    lock = true; 
                    return lock;   
                }
                if (rea3 == 'true') {
                    if(lock == true) {      
                        return;
                    } 
                    panelAcces.innerHTML += `<h3> <a href='./Formations/rea3.html'>Réactualisation des compétences Réactualisation 3</a> </h3>`;  
                    lock = true;
                    return lock;  
                }
            
            // if( reaTeachers == true ) {
            //     document.querySelector('.formationsPanel--access').innerHTML = `<h3> <a href='./Formation/formationEnseignants.html'>Réactualisation Enseignants</a> </h3>`;
            // } else if(reaEx == true ) {
            //     document.querySelector('.formationsPanel--access').innerHTML = `<h3> <a href='./Formation/formationEnseignants.html' `;
            // }
              });
    
         }
    
    


 // Gestion des affichages boutons log

//  window.addEventListener('load', () => {


//      if(document.URL.includes("formationExploitants.html") || document.URL.includes("formationEnseignants.html") || document.URL.includes("formation3.html") || document.URL.includes("modulesExploitants.html") || document.URL.includes("modulesEnseignants.html") || document.URL.includes("modules3.html")) {

//         if(admin == 'true') {
//             const creationBtn1 = `<button class="creation"><a href="../formationCreator.html">Créer Formation</a></button>`;
//             document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', creationBtn1 );
//         }
       
    
        
//     } else if (document.URL.includes("formationHub.html") || document.URL.includes("profil.html") || document.URL.includes("factures.html") ) {
    
//         if(admin == 'true') {   
//             const creationBtn2 = `<button class="creation"><a href="./formationCreator.html">Créer Formation</a></button>`;
//         document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', creationBtn2 ); }
      
    
//     } else if( document.URL.includes("formationHub.html") || document.URL.includes("profil.html") || document.URL.includes("formationExploitants.html") || document.URL.includes("formationEnseignants.html") || document.URL.includes("formation3.html") || document.URL.includes("modulesExploitants.html") || document.URL.includes("modulesEnseignants.html") || document.URL.includes("modules3.html") || document.URL.includes("factures.html") || document.URL.includes("formationCreator.html")) {

//         if (token) {
//             const logoutButton = document.querySelector('.deconnexion');
//             logoutButton.style.display = 'block';
//             profil.style.display = 'block';
            
//             // if(!document.URL.includes('formationCreator.html')) {
//             //     connexionButton.style.display = 'none';        
//             // }
//              }
//             if(!token || !id) {
//                 alert(`| ! | Veuillez vous connecter s'il vous plaît, merci (Accès non Autorisé)`);
//                  location.replace('/index.html');
//         } 
//     }
// })



 // GESTION DECONNEXION UTILISATEUR

 function logout() {
    //  if(confirm('Voulez-vous vraiment vous déconnecter ?')) {
         localStorage.clear();
           sessionStorage.clear();
           window.location.replace('/index.html');
    //  }
 }

