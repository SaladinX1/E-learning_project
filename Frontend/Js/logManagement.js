// const accessFormation = document.querySelectorAll('.resume__main__module');
// const accessMsg = document.querySelector('#accessMsg');
//
const profil = document.querySelector('.profil');
//const id = localStorage.getItem('id');
const creation = document.querySelector('.creation');
const userNameDisplay = document.querySelector('.userDisplay');

 const accessFormation = document.querySelector('.formations__acces--button');
 const creaFormationBtn = document.querySelector('.creation');

 const connexionButton = document.querySelector('.connexion');
const inscriptionButton = document.querySelector('.inscription');
//const logoutButton = document.querySelector('.deconnexion');

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
const company = document.querySelector('#company');
const email = document.querySelector('#email');
const tel = document.querySelector('#telephone');
const password = document.querySelector('#password');


let nameClient = document.querySelector('#client-name');
let cardN = document.querySelector('#card-number');
let expirationDate = document.querySelector('#expiration-date');
let codeValidation = document.querySelector('#card-validation-code');

let priceFormation = document.querySelector('#priceFormation');
 let nameFormation = document.querySelector('#formationName');

 const logManagement = document.querySelector('#log-navigation');

 let validationForm = {
     nomValid : false,
     prenomValid : false,
     emailValid : false,
     telValid : false,
     passwordValid : false
 }

 const uri = '/paymentSuccess.html'  || 'formationCreator.html' || '/formationHub.html' || '/profil.html' || '/factures.html' || '/reaTeachers.html';
 
if( !document.URL.includes(uri) ) {

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    // Gestion de la connexion

    if( !document.URL.includes('/profil') && !document.URL.includes('/formationHub.html') && !document.URL.includes('/formationsStore.html') && !document.URL.includes('/factures.html') && !document.URL.includes('/formationCreator.html') ) {

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

                // Gestion images carroussel 

                let slideIndex = 0;
                slideCarousel();
                
                function slideCarousel() {
                let i;
                let slides = document.getElementsByClassName("carousel-slide");
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                slideIndex++;
                if (slideIndex > slides.length) {
                    slideIndex = 1;
                }
                slides[slideIndex - 1].style.display = "block";
                setTimeout(slideCarousel, 4000); // Change image every 2 seconds
                }

                localStorage.removeItem('Produit Débloqué');
                // localStorage.removeItem('idFormations');

         

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
        }).then( data => { return data.json()})
            .then( res => {
                console.log(res);

                localStorage.removeItem('name');

                let id = res.id;
                let token = res.token;
               // let name = res.name;

            
                if(token === undefined) {
                    alert(`Une erreur a été repérée dans votre saisie.  \b\r \b\r information(s) incorrect(es) 😥! \b\r \b\r réessayez merci​`)
            } else  {
                alert('Vous êtes maintenant connecté 👌 !');
                localStorage.setItem('id', id);
                localStorage.setItem('token', token);
              // localStorage.setItem('name', name);

                sessionStorage.setItem('id', id);
                sessionStorage.setItem('token', token);
              //  sessionStorage.setItem('name', name);

                
                window.location.reload();
               
            }                
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

company.addEventListener('change' , (e) => {
    let companyTest = e.target.value;

    if(/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(companyTest) == false) {

        validationForm.prenomValid = false;
        document.querySelector('#companyErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques";
        let errorInput = document.querySelector('#company');
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid red";
        errorInput.style.marginBottom = '0px';
        let errorPrenom = document.querySelector("#companyErrMsg");
        errorPrenom.style.color = "red";

    } else {

        validationForm.prenomValid = true;
        document.querySelector('#companyErrMsg').textContent = "✅";
        let errorInput = document.querySelector('#company');
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
        

        let admin;
         document.querySelector('#name').value == 'NormesseAdmin' ? admin = 1 : admin = 0;


        const registerClient = {
           
           name : document.querySelector('#name').value,
           secondName : document.querySelector('#secondName').value,
           company : document.querySelector('#company').value,
           email : document.querySelector('#email').value,
           telephone : document.querySelector('#telephone').value,
           password : document.querySelector('#password').value,
           documentType : document.querySelector('#documentType').value,
           autorisationDocument : document.querySelector('#autorisationDocument').value,
           admin: admin

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

    if (token) {

    /////// CONTROL IDENTIFICATION ADMIN ////////////////////////////////////////////////////
    const id = localStorage.getItem('id');
    fetch(`http://localhost:3000/api/getuser/${id}`, {
        method: 'get',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    .then(data => {return data.json()})
    .then(res => { 
console.log(res);
      let admin = res.admin;
      let nameStorage = res.secondName;

      if( !admin || !token) {
         
        localStorage.removeItem('moduleData');
        localStorage.removeItem('timeModule');
        localStorage.removeItem('allDocs');
        localStorage.removeItem('timeFormation');
        localStorage.removeItem('itemSoldId');
        localStorage.removeItem('idFormation');

    
        if (!token) {
    
          userNameDisplay.style.display = 'none';
     
       } else if (token) {
    
           const profilNLogoutBtn = ` <button class="profil"><a href="./Frontend/pages/profil.html">Profil</a></button>
           <button type="button" class="deconnexion" data-toggle="modal" data-target="#exampleModalCenter" >Déconnexion</button>`;

           document.querySelector('#log-navigation').innerHTML = profilNLogoutBtn ;
           
        ////// RECUPERATION NAME POUR INSERTION LOCALSTORAGE
    
        fetch(`http://localhost:3000/api/getuser/${id}`, {
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
    
            inscriptionButton.style.display = 'none';
            connexionButton.style.display = 'none';
            userNameDisplay.style.display = 'inline';
            userNameDisplay.style.textAlign = 'center';
            userNameDisplay.style.margin = '5px';
            userNameDisplay.style.fontSize = '2.5rem'; 
            userNameDisplay.style.fontWeight = 'bold'; 
           userNameDisplay.style.fontFamily = 'Staatliches';
               userNameDisplay.textContent = `Bienvenue, ${nameStorage} 😃 !`;
        userNameDisplay.style.color = '#02eeff';

      }
     
       // contrôle accès Menu hub formation 
    
            accessFormation.addEventListener('click', () => {
                if(!token) {
             document.querySelector('#exampleModalLongTitleAccess').textContent = `Redirection ...`;
                } else {
                    location.replace("./Frontend/pages/formationHub.html");
                }
            })
    
    } else if(admin) {
    
        localStorage.removeItem('moduleData');
        localStorage.removeItem('timeModule');
        localStorage.removeItem('allDocs');
        localStorage.removeItem('idModules');
        localStorage.removeItem('timeFormation');
        localStorage.removeItem('itemSoldId');
        localStorage.removeItem('idFormation');
    
            const creationBtn3 = `<button class="creation"><a href="./Frontend/pages/formationCreator.html">Créer Formation</a></button>`;
            document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', creationBtn3 );
            
    
        if(userNameDisplay.textContent != nameStorage ) { 
            userNameDisplay.textContent = `Bienvenue Administrateur`      
        }

    
        let profilNLogoutBtn = ` <button class="profil"><a href="./Frontend/pages/profil.html">Profil</a></button>
        <button type="button" class="deconnexion" data-toggle="modal" data-target="#exampleModalCenter" >Déconnexion</button>`;
        document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', profilNLogoutBtn );

    
                inscriptionButton.style.display = 'none';
                connexionButton.style.display = 'none';
                userNameDisplay.style.display = 'inline';
                userNameDisplay.style.textAlign = 'center';
                userNameDisplay.style.margin = '5px';
                userNameDisplay.style.fontSize = '1.8rem'; 
                userNameDisplay.style.fontWeight = 'bold'; 
                userNameDisplay.style.fontFamily = 'Cinzel Decorative';
                userNameDisplay.style.color = 'red';
                userNameDisplay.textContent = `Bienvenue Administrateur`;
    
      // contrôle accès Menu hub formation 
    
      accessFormation.addEventListener('click', () => {
            location.replace("./Frontend/pages/formationHub.html");
             });
           }  
        })     
      }
    }    
}



  if (document.URL.includes("formationHub.html") || document.URL.includes("profil.html") || document.URL.includes("factures.html") ) {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/getuser/${id}`, {
            method: 'GET',
            headers: {
              'accept' : 'application/json',
              'content-type' : 'application/json',
              'authorization' : `Bearer ${token}`
            }
          })
          .then(data => {return data.json()})
          .then(res => {
            let admin = res.admin;
            if(admin) {   
                const creationBtn2 = `<button class="creation"><a href="./formationCreator.html">Créer Formation</a></button>`;
            document.querySelector('#log-navigation').insertAdjacentHTML('beforeend', creationBtn2 ); }
          })

    }


  if( document.URL.includes("formationHub.html") || document.URL.includes("profil.html") || document.URL.includes("factures.html") || document.URL.includes("formationCreator.html") ) {
   
    if (!document.URL.includes("formationCreator.html")) {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
    
        if (token) {
            const logoutButton = document.querySelector('.deconnexion');
            logoutButton.style.display = 'block';
             }
            if(!token || !id) {
                alert(`| ! | Veuillez vous connecter s'il vous plaît, merci (Accès non Autorisé)`);
                 location.replace('/index.html');
        } 
    }
}


if(document.URL.includes('profil.html')) {
    ////////////////////////////////////////////////////
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
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

        company.addEventListener('change' , (e) => {
            let companyTest = e.target.value;
        
            if(/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(companyTest) == false) {
        
                validationForm.prenomValid = false;
                document.querySelector('#companyErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques";
                let errorInput = document.querySelector('#company');
                errorInput.classList.add('border');
                errorInput.style.border = "2px solid red";
                errorInput.style.marginBottom = '0px';
                let errorPrenom = document.querySelector("#companyErrMsg");
                errorPrenom.style.color = "red";
        
            } else {
        
                validationForm.prenomValid = true;
                document.querySelector('#companyErrMsg').textContent = "✅";
                let errorInput = document.querySelector('#company');
                errorInput.classList.add('border');
                errorInput.style.border = "2px solid green"
                errorInput.style.marginBottom = '0px';
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
    
                if ( validationForm.nomValid == true || validationForm.prenomValid == true || validationForm.telValid == true || validationForm.passwordValid == true) {
           
                    let admin;
                    document.querySelector('#name').value == 'NormesseAdmin' ? admin = 1 : admin = 0;

                    const updateData = {        
                        name : document.querySelector('#name').value,
                        secondName : document.querySelector('#secondName').value,
                        company : document.querySelector('#company').value,
                        telephone : document.querySelector('#telephone').value,
                        autorisationDocument : document.querySelector('#autorisationDocument').value,
                        documentType : document.querySelector('#documentType').value,
                        password : document.querySelector('#password').value,
                        admin: admin
                    }
            
            
                        const id = localStorage.getItem('id');
            
                            fetch(`http://localhost:3000/api/updateuser/${id}`, {
                                method : "PATCH",
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
       
       ////GET INFO USER POUR AFFICHAGE PROFIL//////////////////////////////////
       ////////////////////////////////////////////////////////////////////////////
       const profilInfo = document.querySelector('.profil__informations');

       if(token) {
    
           fetch( `http://localhost:3000/api/getuser/${id}`, {
           method: "GET",
           headers: {
               'content-type': 'application/json',
               'accept': 'application/json',
               'authorization' : `Bearer ${token}`
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
                           <h3>Établissement : ${res.company}</h3>
                           <h3>Téléphone : ${res.telephone}</h3>
                           <h3> Attestation enseignement : \<br/>  ${res.documentType}</h3> 
                         `
       })
    
       } else {
    
           window.location.replace('/index.html')
    
             }
    
               // GESTION SUPPRESSION COMPTE UTILISATEUR 
            const deleteUserButton = document.querySelector('.finalDeletion');  
          //  deleteUserButton.addEventListener('click', deleteAccount);
          
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
    



       //////////////// GESTION AFFICHAGE FORMATION ///////
        
        const formationsPanel = document.querySelector('.formationContainerPanel');
    
        formationsPanel.addEventListener('click', () => {
    
    
            const panelAcces = document.querySelector('.formationContainerPanel--access');
           
            panelAcces.classList.toggle('hidden');
            
            if(!panelAcces.classList.contains('hidden')) {

                const token = localStorage.getItem('token');
                const id = localStorage.getItem('id');

                fetch(`http://localhost:3000/api/getuser/${id}/formations`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'content-type' : 'application/json',
                        'authorization' : `Bearer ${token}`
                    }
                })
                .then( res => { return res.json()})
                .then( data => {

    
                    for( let i of data.Formations ) {

                        document.querySelector('.formationContainerPanel--access').innerHTML = `<h3 class='itemAchat'> ${i.nameFormation} </h3>`;

                        let itemAchat = document.querySelector('.itemAchat');
                        

                        itemAchat.addEventListener('click', (e) => {
    
                            e.preventDefault()
                            console.log(i.id);
                            localStorage.setItem('itemSoldId', i.id );

                            location.replace('/Frontend/pages/Formations/reaTeachers.html');
    
    
                        })
                    }
                })
            }
         });
     }
    

 // GESTION DECONNEXION UTILISATEUR

 function logout() {
    if(document.URL.includes('/reaTeachers.html')) {

        const token = localStorage.getItem('token');
        let idFormation = parseInt(localStorage.getItem('idFormation'));
    
        
        fetch(`http://localhost:3000/api/getuser/${id}/formations`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-type' : 'application/json',
                'authorization' : `Bearer ${token}`
            }
        })
        .then(data => { return data.json()})
        .then(res => {
    
          for( let i of res.Formations) {
    
            let idM;
    
            if ( localStorage.getItem('idModule') == i.idModuleProgress) {
                idM = localStorage.getItem('moduleId');
        
            } else if (localStorage.getItem('idModule') > i.idModuleProgress) {
                idM = parseInt(localStorage.getItem('moduleId'));
            } else {
                idM = parseInt(localStorage.getItem('moduleId'));
            }
        
            let note;
        
            if (!localStorage.getItem('notation')) {
                note = null;
            } else if (localStorage.getItem('notation')) {
                note = localStorage.getItem('notation');
            }
        
            let barP;
        
            if (!localStorage.getItem('barProgress')) {
                barP = null;
            } else if (localStorage.getItem('barProgress')) {
                barP = parseInt(localStorage.getItem('barProgress') );
            }
        
            let tempsP;
        
            if (!localStorage.getItem('tempsProgress')) {
                tempsP = null;
            } else if (localStorage.getItem('tempsProgress')) {
                tempsP = localStorage.getItem('tempsProgress');
            }
        
            const progress = {
                barProgress : parseInt(barP),
                tempsProgress : parseInt(tempsP),
                notation : parseInt(note),
                idModule : parseInt(idM),
                idFormation: idFormation
            }
        
        //    if (idM > i.idModuleProgress && barP > i.barProgress && tempsP > i.progressTime) {
    
              fetch(`http://localhost:3000/api/getuser/${id}/formationprogress`, {
                method: 'PATCH',
                body: JSON.stringify(progress),
                headers: {
                    'accept': 'application/json',
                    'content-type' : 'application/json',
                    'authorization' : `Bearer ${token}`
                }
            })
            .then(data => { return data.json()})
            .then(res => {
                console.log(res,  progress);
    
                localStorage.removeItem('tempsProgress');
                localStorage.removeItem('barProgress');
                localStorage.removeItem('notation');
                localStorage.removeItem('itemSoldId');
    
               // location.replace('/profil.html');
            })
    
          // location.replace('/profil.html');
            // } else {
            //   console.log("hahaha");
            // }
          }
        })
    
        } else {
    
        localStorage.clear();
          sessionStorage.clear();
          window.location.replace('/index.html');
        
    }
}

