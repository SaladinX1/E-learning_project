
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

const userNameDisplay = document.querySelector('.userNameDisplay');



if (localStorage.key('token') == true) {

     logoutButton.style.display = 'none';
 
     const url = 'http://localhost:3000/api/getuser';
 
     fetch(url, {
         headers: {
             'Content-Type' : 'Application/json',
             'Accept' : 'Application/json'
         }
     })
     .then( data => {
         data.json()
         .then( res => {
             userNameDisplay.textContent = `Bienvenue ${res.name} 😃`;
         })
     })
 } else {
     logoutButton.style.display = 'block';
 }


connexionButton.addEventListener('click', displayOverlayConnexion);
 inscriptionButton.addEventListener('click', displayOverlayInscription);

// gestion des affichages overlay connexion/inscription

function displayOverlayConnexion() {
    overlayConnexion.style.display = 'block';
    overlayInscription.style.display = 'none';
}

function displayOverlayInscription() {   
    overlayInscription.style.display = 'block';
    overlayConnexion.style.display = 'none';
}

 cancelConnexionForm.addEventListener('click', hideFormConnexion);
cancelInscriptionForm.addEventListener('click', hideFormInscription);

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
              .then( (res) => {

                alert('Vous êtes maintenant connecté 👌 !');
                window.location.reload();
                const id = res.id;
               const token = res.token;
                localStorage.setItem('id', id);
               localStorage.setItem('token', token);

              })
            })
            .catch( err => { console.log(err) });
       }
    );

let validationForm = {

    nomValid : false,
    prenomValid : false,
    emailValid : false,
    telValid : false,
    passwordValid : false,
    passwordConfValid : false

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



 formInscription.addEventListener('submit', (e) => {
     e.preventDefault()
     
     //if ( validationForm.nomValid == true && validationForm.prenomValid == true && validationForm.emailValid == true && validationForm.telValid == true && validationForm.passwordValid == true) {
         
         
         
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
                    alert('Vous êtes maintenant inscrit ! Bravo 😃 !')
                    window.location.reload();
                }
                )
                .catch( (err) => {
                    alert('Une erreur est survenue :( !' + err)
                    })
                let el = document.createElement('div');
                el.innerHTML = '';

   // } else {
        
        // el = document.createElement('div');
        // let el2 = document.querySelector('#signup');
        // el2.appendChild(el);
        // el.classList.add('error');
        // el.style.color = 'red';
        // el.style.padding = 'top : 15px';
        // el.textContent = "";
        // el.textContent = "Merci de correctement remplir tous les champs d'informations s'il vous plaît ...";
    //}
 });
 
 
 
 
 // Affichage Prix et redirection page selon click target
 
 let lock = true;
 
 containeroOffer.forEach( a => {
     a.addEventListener('click', (e) => {
         const name2Href = e.target.getAttribute('name');
         e.preventDefault();
         containerPaymentForm.style.display = 'block';
         boxPrice.style.cursor = 'pointer';
         
        if (name2Href == 'enseignants') {
            displayPrice.textContent = '1500 €';
        } else if (name2Href == 'exploitants') {
            displayPrice.textContent = '900 €';
        } else if (name2Href == ' formation3') {
            displayPrice.textContent = '3000 €';
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




    

   

        

 
 