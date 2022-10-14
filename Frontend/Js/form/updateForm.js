const authDocument = document.querySelector('#enseignement');
const typeDocument = document.querySelector('#diplome');
const name = document.querySelector('#nom');
const secondName = document.querySelector('#prenom');
const email = document.querySelector('#email');
const tel = document.querySelector('#telephone');
const password = document.querySelector('#password');

const updateButton = document.querySelector('.updateButton');
const cancelUpdateButton = document.querySelector('.cancelUpdateButton');
const overlayModification = document.querySelector('.overlay__modification');

updateButton.addEventListener('click', displayOverlayModification);

function displayOverlayModification() {
    overlayModification.style.display = 'block';
}

cancelUpdateButton.addEventListener('click', hideUpdateForm);

function hideUpdateForm() {
    overlayModification.style.display = 'none'
}


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
             errorName.style.marginBottom = '0px';

        }
    })


    secondName.addEventListener('change' , (e) => {
        let prenomTest = e.target.value;

        if(/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(prenomTest) == false) {

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

    if ( validationForm.nomValid == true && validationForm.prenomValid == true && validationForm.emailValid == true && validationForm.telValid == true && validationForm.passwordValid == true) {


        const registerClient = {
            
            name : document.querySelector('#nom').value,
            secondName : document.querySelector('#prenom').value,
            email : document.querySelector('#email').value,
            telephone : document.querySelector('#telephone').value,
            autorisationDocument : document.querySelector('#enseignement').value,
            documentType : document.querySelector('#diplome'),
            password : document.querySelector('#password').value
        }
        
        function sendInscription(url) {

                fetch(`${url}`, {
                    method : "post",
                    body : JSON.stringify(registerClient),
                    headers :  {
                        'Content-Type' : 'Application/json',
                        'Accept' : 'Application/json'

                    },
                })
                .then(res => {
                   return res.json()
                })
                .then(data => {
                    alert('Félicitations ! Votre inscription a été enregistrée 🙂');
                })
                .catch( (err) => {
                    alert('Une erreur est survenue :( !' + err)
                    })
                    
                }

               

                let el = document.createElement('div');
                el.innerHTML = '';

    } else {

        let el = document.createElement('div');
        let el2 = document.querySelector('#signup');
        el2.appendChild(el);
        el.classList.add('error');
        el.style.color = 'red';
        el.style.padding = 'top : 15px';
        el.textContent = "Merci de correctement remplir tous les champs d'informations s'il vous plaît ...";
    }

    sendInscription('http://localhost:3000/api/register');

 });