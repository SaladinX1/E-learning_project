const connexionButton = document.querySelector('.connexion');
const inscriptionButton = document.querySelector('.inscription');
const cancelConnexionForm = document.querySelector('.cancelConnexionForm');
const cancelInscriptionForm = document.querySelector('.cancelInscriptionForm');

const overlayConnexion = document.querySelector('.overlay__connexion');
const overlayInscription = document.querySelector('.overlay__inscription');

const formInscription = document.querySelector('#signup');
const formConnexion = document.querySelector('#signin');
const secondName = document.querySelector('#nom');
const firstName = document.querySelector('#prenom');
const email = document.querySelector('#email');
const tel = document.querySelector('#telephone');
const password = document.querySelector('#password');


connexionButton.addEventListener('click', displayOverlayConnexion);
inscriptionButton.addEventListener('click', displayOverlayInscription);



function displayOverlayConnexion() {
    overlayConnexion.style.display = 'block';
    overlayConnexion.style.position = 'fixed';
    overlayConnexion.style.top = ' 0px';
    overlayInscription.style.display = 'none';
}

function displayOverlayInscription() {
    
    overlayInscription.style.display = 'block';
    overlayInscription.style.position = 'fixed';
    overlayInscription.style.top = ' -60px';
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





let validationForm = {

    nomValid : false,
    prenomValid : false,
    emailValid : false,
    telValid : false,
    passwordValid : false,
    passwordConfValid : false


}


    secondName.addEventListener('change', (e) => {
        let nameTest = e.target.value;

        if (/^[a-zA-Z]+[^0-9]/.test(nameTest) == false) {

            validationForm.nomValid = false;
            document.querySelector('#secondNameErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques !";
           let errorInput = document.querySelector('#nom');
            errorInput.classList.add("border");
            errorInput.style.border = "2px solid red";
            errorInput.style.marginBottom = '0px';
            let errorName = document.querySelector("#secondNameErrMsg");
            errorName.style.color = "red";

        } else {

            validationForm.nomValid = true;
            document.querySelector('#secondNameErrMsg').textContent = "✅";
             let errorName = document.querySelector('#nom');
             errorName.classList.add('border');
             errorName.style.border = " 2px solid green";
             errorInput.style.marginBottom = '0px';

        }
    })


    firstName.addEventListener('change' , (e) => {
        let prenomTest = e.target.value;

        if(/^[a-zA-Z]+[^0-9]/.test(prenomTest) == false) {

            validationForm.prenomValid = false;
            document.querySelector('#firstNameErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques";
            let errorInput = document.querySelector('#prenom');
            errorInput.classList.add('border');
            errorInput.style.border = "2px solid red";
            errorInput.style.marginBottom = '0px';
            let errorPrenom = document.querySelector("#firstNameErrMsg");
            errorPrenom.style.color = "red";

        } else {

            validationForm.prenomValid = true;
            document.querySelector('#firstNameErrMsg').textContent = "✅";
            let errorInput = document.querySelector('#prenom');
            errorInput.classList.add('border');
            errorInput.style.border = "2px solid green"
            errorInput.style.marginBottom = '0px';
        }
    })


    email.addEventListener('change' , (e) => {

        let emailTest = e.target.value

        if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-].+$/.test(emailTest) == false) {

            validationForm.emailValid = false;
            document.querySelector('#emailErrMsg').textContent = " Veuillez respecter le schéma suivant ( lettres/chiffres + @ + lettres + . + .com/fr ect ... )"
            let errorInput = document.querySelector('#email')
            errorInput.classList.add('border');
            errorInput.style.border = "2px solid red";
            let errorMail = document.querySelector('#email');
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

    if ( validationForm.nomValid && validationForm.prenomValid && validationForm.emailValid && validationForm.telValid && validationForm.passwordValid) {


        

    }

 });





 