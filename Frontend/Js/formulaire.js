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

 window.addEventListener('load', () => {


 if(document.URL.includes('index.html')) {


     connexionButton.addEventListener('click', displayOverlayConnexion);
      inscriptionButton.addEventListener('click', displayOverlayInscription);

      cancelConnexionForm.addEventListener('click', hideFormConnexion);
      cancelInscriptionForm.addEventListener('click', hideFormInscription);

      // gestion des affichages overlay connexion/inscription

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

 // Gestion de la connexion



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

                    if(name == 'Normesse') {
                        localStorage.setItem('master', '1');
                    }
                
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

    let lockMsg = false;

    formInscription.addEventListener('submit', (e) => {
        e.preventDefault()
        
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
 


let validationForm = {

    nomValid : false,
    prenomValid : false,
    emailValid : false,
    telValid : false,
    passwordValid : false

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

 }
});
   

 // Affichage Prix et redirection page selon click target
 
 let lock = true;


 let itemFormation;
 let soldPrice;
 
 containeroOffer.forEach( a => {
     a.addEventListener('click', (e) => {
         const name2Href = e.target.getAttribute('name');
         e.preventDefault();
         containerPaymentForm.style.display = 'block';
         boxPrice.style.cursor = 'pointer';
         if (name2Href == 'enseignants') {
             displayPrice.textContent = '1500 €';
             itemFormation = 'enseignants';
             soldPrice = 1500;
            nameFormation.textContent = 'Réactualisation connaissances Enseignants';
             console.log(soldPrice);

            //return itemFormation, soldPrice;

        } else if (name2Href == 'exploitants') {
            displayPrice.textContent = '900 €';
           itemFormation = 'exploitants';
           soldPrice = 900;
           nameFormation.textContent = 'Réactualisation connaissances Exploitants';
           console.log(soldPrice);

         //   return itemFormation, soldPrice;

        } else if (name2Href == 'formation3') {
            displayPrice.textContent = '3000 €';
            itemFormation = 'formation3';
            soldPrice = 3000;
            nameFormation.textContent = 'Formation Bateau';
            console.log(soldPrice);

          //  return itemFormation, soldPrice;
        }

        cancelPaymentForm.addEventListener('click', () => {
            containerPaymentForm.style.display = 'none';
            
            lock = false;

            if (lock == false) {

                switch (name2Href) {
        
                    case 'enseignants':
                        
                        window.location.replace('./descFormations/modulesEnseignants.html');
                        break;  
                
                    case 'exploitants':
                            
                        window.location.replace('./descFormations/modulesExploitants.html');
                        break;  
        
                    case 'formation3':
                                
                        window.location.replace('./descFormations/modules3.html');
                        break;  
            
                    default:
                        break;
                }   
                lock = true;
            }
        })
    })
})

////////////////////////////////////////////////////

// GESTION MODIFICATION INFO UTILISATEUR 

//////////////////////////////////////////////////////////////

        if(document.URL.includes('profil.html')) {


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


    

    function update() {

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
                           res.json()
                           .then( data => {
                            alert('Ok ! Vos données ont été modifiés !')

                            localStorage.removeItem('name');
                            localStorage.setItem('name', data.name);
                            sessionStorage.removeItem('name');
                            sessionStorage.setItem('name', data.name);

                            window.location.reload();
                           })
                        })
                        .catch( (err) => {
                            alert('Une erreur est survenue :( !' + err)
                            })                
           }
         });
   }

    
   
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
    }





