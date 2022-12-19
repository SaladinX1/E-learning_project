
const displayFileButton = document.querySelector('.displayButton');
const file_group = document.querySelector('.file-group');
let logoutButton = document.querySelector('.deconnexion');

const choiceInput = document.querySelector('.choiceInput');
const injection = document.querySelector('.injectChoice');

const formulaireCreation = document.querySelector('.creaForm');
const formationsBoxes = document.querySelectorAll('.recoverAllFormation__box');

const DisplayOverlayPut = document.querySelector('#UpdateFormationButton');
const OverlayPut = document.querySelector('.overlayPutFormation');

let showFiles = false; 

const namePut = document.querySelector('#namePut');
 const pricePut = document.querySelector('#pricePut');
 const durationPut = document.querySelector('#durationPut');
 const file = document.querySelector('#file');
 const FormationPutForm = document.querySelector('#putFormation');


 const composition = document.querySelector('.containerGestion__selection--frame');
const validComposition = document.querySelector('#valid-composition');

let FormationsStorage = [];
let formationObject = {};
let timesFormations = [];
let totalTime;
let totalDuration = document.querySelector('.total-duration');

let lock;

function createFormation() {

    lock = false;

    formulaireCreation.addEventListener('submit', (e) => {
        e.preventDefault();

        if( lock == true) {
            return;
        } else {

            const token = localStorage.getItem('token');

            const newFormation = {
                nameFormation: document.querySelector('#nameF').value,
                priceFormation: document.querySelector('#price').value,
                durationFormation: document.querySelector('#duration').value
            }
            
            fetch('http://localhost:3000/api/createFormation', {
                method: 'POST',
                body: JSON.stringify(newFormation),
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                    'authorization' : `Bearer ${token}`
                }
            }).then( res => {

                alert('Bravo ! La Formation a été crée :)')
                window.location.reload();
            })
            .catch(error => console.error(error))
            
            lock = true;
        }

        // gestion video et pdf pour envoi front 

        let videoFront = document.querySelectorAll('#pdf');
        let pdfFront = document.querySelectorAll('#video');

        videoFront.forEach(vFile => {
            vFile.addEventListener('click', (e) => {
                let token = localStorage.getItem('token');
                let value = e.target.value

            //if() {}

                fetch(`http://localhost:3000/api/videofolder`, {
                    method: 'POST',
                    body: JSON.stringify(value),
                    headers: {
                        'accept' : 'application/json',
                        'content-type' : 'application/json',
                        'authorization' : `Bearer ${token}`
                    }
                })
                .then(res => {return res.json()})
                .then( data => {
                    console.log('fichier vidéo stocké');
                }).catch(err => console.log(err))

            })
        })

        pdfFront.forEach(pdfFile => {
            pdfFile.addEventListener('click', (e) => {

                let value = e.target.value
                let token = localStorage.getItem('token');

                fetch(`http://localhost:3000/api/pdfsfolder`, {
                    method: 'POST',
                    body: JSON.stringify(value),
                    headers: {
                        'accept' : 'application/json',
                        'content-type' : 'application/json',
                        'authorization' : `Bearer ${token}`
                    }
                })
                .then(res => {return res.json()})
                .then( data => {
                    console.log('fichier pdf stocké');
                }).catch(err => console.log(err))


            })
        })


        
    })
};




// Gestion button affichage files suplémentaires

(() => {
    
    choiceInput.style.display = 'none';
    choiceInput.innerHTML +=  
    
    ` <h3>Veuillez chosir le type et/ou le nombre de fichier(s) à ajouter :</h3>
    <label>Vidéo : </label>
    <input id='videoNumber' type='number'/>
    <label>Pdf : </label>
    <input id='pdfNumber' type='number'/> 
    `;
    choiceInput.style.border = '1px solid black';
    choiceInput.style.margin = '10px 10px';
    choiceInput.style.padding = '10px';
    choiceInput.style.borderRadius = '10px';
    choiceInput.innerHTML += `<button type="button" id="validationFilesAdded" >Valider</button>`;
    choiceInput.innerHTML += `<button type="button" id="validationFilesDeleted" >supprimer</button>`;
    
})();



displayFileButton.addEventListener('click' , displayFileInput);


function displayFileInput() {
    
    
    if(showFiles == false )  {
        
        choiceInput.style.display = 'block';
        displayFileButton.innerText = '-';
        showFiles = true;
        
    } else if(showFiles  == true) {
        
        
        displayFileButton.innerText = '+'
        hideChoice();
        showFiles = false;

    }
};


let h4 = document.createElement('h4');
choiceInput.appendChild(h4);

let nbPdfs = document.querySelector('#pdfNumber');
let nbVideos = document.querySelector('#videoNumber');

let nbVideosValue = document.querySelector('#videoNumber').value;
 let nbPdfsValue = document.querySelector('#pdfNumber').value;


let validationValues = {
    videos : false,
    pfds : false
};


nbVideos.addEventListener('change', (e) => {

    let value = parseInt(e.target.value);
    
    let block = false;

    nbVideosValue = value;
    
    

    if ( nbVideosValue <= 0 || nbVideosValue == ' ') {
        validationValues.videos = false;
        if(block == false) {
            h4.innerText = "Choisissez une valeur et supérieur à 1";
            block = true;
           
        }
        
    } else {
        
        validationValues.videos = true;
        h4.innerText = '';
 
        return nbVideosValue;
    };
})



nbPdfs.addEventListener('change', (e) => {
    
    let value = parseInt(e.target.value);
    
    let block = false;

    nbPdfsValue = value;



    if ( nbPdfsValue <= 0 || nbPdfsValue == ' ' ) {
        validationValues.pfds = false;
        if(block == false) {
            
            h4.innerText = "Choisissez une valeur et supérieur à 1";
            block = true;
            
        } 
        } else {
            validationValues.pfds = true;
            h4.innerText = '';

        
        return nbPdfsValue;
        };
})






let validationFiles = document.querySelector('#validationFilesAdded');
let deletionFiles = document.querySelector('#validationFilesDeleted');
validationFiles.addEventListener('click', () => {

    if( validationValues.videos == true || validationValues.pfds == true ) {
        displayVideoInputs(nbVideosValue);
        displayPdfInputs(nbPdfsValue);
    } else if(validationValues.videos == false || validationValues.pfds == true ) {
        displayPdfInputs(nbPdfsValue);
    }   else if(validationValues.videos == true || validationValues.pfds == false ) {
        displayVideoInputs(nbVideosValue);
    }
    else if(validationValues.pfds == false && validationValues.videos == false){
        h4.innerText = 'Veuillez saisir une valeur, une valeur positive, merci';

        return;
 }
    
})



deletionFiles.addEventListener('click', () => {

    injection.innerHTML = '';

});

function hideChoice() {
    choiceInput.style.display = 'none';
}


// gestion des messages en fonction des saisies champs fichiers ajouts


function displayVideoInputs(nbVideosValue) {

  for(let i = 0; i < nbVideosValue; i++) {

    injection.innerHTML += ` 
     <div class="input-group">
    <label for="video">Vidéo :</label>
    <input id="video" type="file">
     </div> 
     `;
  }
     
    return injection;

};
    

    function displayPdfInputs(nbPdfsValue) {

       for(let i = 0; i < nbPdfsValue; i++) {

        injection.innerHTML += ` 
        <div class="input-group">
        <label for="pdf">PDF :</label>
        <input class="doc" name="file"  id="pdf" type="file" >
        </div>
        `;

       }
        return injection;
    }



    ////////////////**************\\\\\\\\\\\\\\\\\



// Fonctionnalité de récupération des formations depuis la BDD pour gestions spécifiques

function getAllFormations() {

    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/api/formations', {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    .then(data => { return data.json() })
    .then(res => { 

for(let formations of res) {


    // Tentative de récupération des prix pour insetion dans le localStorage

    // for(let i = 0; i < res.priceFormation; i++) {

    //     localStorage.setItem('price', `${formations.priceFormation}`);
    // };
                             

    document.querySelector('.recoverAllFormation').innerHTML += `
                                                <div class="recoverAllFormation__box" data-id="${formations.id}" >
                                                   <h1  id="formationName"> ${formations.nameFormation} </h1>
                                                    <p>  ${formations.priceFormation} € </p>
                                                    <p> ${formations.durationFormation} heure(s) </p>
                                                    <button type="button" onclick='OverlayFormation()' data-id="${formations.id}" id="UpdateFormationButton" >Modifier</button>
                                                    <button type="button"  data-id="${formations.id}"  id="deleteFormationButton" >supprimer</button>   
                                                 </div>

                                                `    
                                                               
          document.querySelector('.overlayPutFormation').innerHTML = `
                                                                    
                                                                    <form id="putFormation" class="formPut apparition"> 
                                                                        <h1> Modification Formation </h1>
                                                                        <label for="namePut">Nom</label>
                                                                        <input type="text" id="namePut"/>
                                                                        <p id="nameErrMsg"></p>

                                                                        <label for="pricePut">Prix (€)</label>
                                                                        <input type="number" id="pricePut"/>
                                                                        <p id="priceErrMsg"></p>

                                                                        <label for="durationPut">heure(s)</label>
                                                                        <input type="number" id="durationPut"/>
                                                                        <p id="durationErrMsg"></p>

                                                                        <div class="files">
                                                                        </div>

                                                                        <button type="submit"  id="putFormationButton"> Modifier </button>
                                                                        <button type="button" id="cancel" onclick='cancelOverlay()' >Annuler</button>
                                                                    </form>                                       
                                                                    `  
                                        }

                                       

                                        // Gestion getOneFormation Infos 

                                        const formationsBoxes = document.querySelectorAll('.recoverAllFormation__box');
                                        formationsBoxes.forEach(box => { 
                                            box.addEventListener('click', (e) => {
                                                e.preventDefault();
                                                composition.style.display = 'block';
                                                let id = box.getAttribute('data-id');
                                                const token = localStorage.getItem('token');

                                                fetch(`http://localhost:3000/api/formation/${id}`, {
                                                    method: 'GET',
                                                    headers: {
                                                        'accept' : 'application/json',
                                                        'content-type' : 'application/json',
                                                        'authorization' : `Bearer ${token}`
                                                    }
                                                })
                                                .then( res => { return res.json()})
                                                .then( data => {   

                                              //    function storageFormation() {
            
                                                  let formationSelected = `<div class='boxSelected' data-order=''>
                                                  <h3> ${data.nameFormation}</h3>
                                                  <span>Prix: ${data.priceFormation} €</span>
                                                <span>Durée: ${data.durationFormation} heure(s)</span> 
                                                </div>`;
                                               
                                                       formationObject = {
                                                          nameF: data.nameFormation,
                                                          priceF: data.priceFormation,
                                                          durationF: data.durationFormation
                                                      }
                                                      
                                                    //   FormationsStorage.push(formationObject);
                                                    FormationsStorage.push(formationObject);
                                                          composition.innerHTML += formationSelected;
                                                          
                                                   



                                                    //   for(let i = 0; i < FormationsStorage.length; i++) {

                                                    // //    console.log(FormationsStorage[i].durationF);
                                                    // timesFormations.push(FormationsStorage[i].durationF);
                                                    // }
                      
                                                    // console.log(timesFormations);

                                                          return FormationsStorage; 
                                                          
                                                          // timesFormations;
                                                                                         
                                                   //   }
                                                       
                                                //    for(let i = 1 ; i <= document.querySelectorAll('.boxSelected').length; i++) {
                                                //        document.querySelector('boxSelected').setAttribute('data-order', `${i}`);
                                                //     }     
                                                })
                                            })
                                        })           

                                        //gestion requête Suppression Formation
                                        
                                        const deleteFormationButtons = document.querySelectorAll('#deleteFormationButton');
                                        deleteFormationButtons.forEach(a => {
                                            let id = a.getAttribute('data-id');
                                            a.addEventListener('click', (e) => {
                                                e.preventDefault();
                                                                                       
                                                    if(confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
  
                                                        const token = localStorage.getItem('token');
                                                        
                                                           // Envoie requête suppression formation 
                                                    fetch(`http://localhost:3000/api/deleteFormation/${id}`, {
                                                
                                                    method: 'delete',
                                                    headers: {
                                                        'accept' : 'application/json',
                                                        'content-type' : 'application',
                                                        'authorization' : `Bearer ${token}`
                                                    }
                                                })
                                                .then( data => { return data.json()})
                                                .then( res => {
                                                    alert("Formation Supprimée !");
                                                    window.location.reload();                                                
                                                } )
                                                .catch(err => console.log(err));   
                                                    }                                         
                                            })
                                        })

                                    
                                   // Gestion requête Modification Formation
                                   const overlayFormationsButtons = document.querySelectorAll('#UpdateFormationButton');
                                   const putFormationButtons = document.querySelectorAll('#putFormationButton');
                                        overlayFormationsButtons.forEach(p => {
                                            p.addEventListener('click', (e) => {
                                                e.preventDefault();
                                                let id = p.getAttribute('data-id');

                                                putFormationButtons.forEach( v => {
                                                
                                                    v.addEventListener('click', (e) => {
                                                        e.preventDefault();
    
                                                        const token = localStorage.getItem('token');
          
                                                    let putInfo = {
                                                        nameFormation : document.querySelector('#namePut').value,
                                                        priceFormation : document.querySelector('#pricePut').value,
                                                        durationFormation : document.querySelector('#durationPut').value
                                                    }

                                                    // requête de modification données formation
                                                    fetch(`http://localhost:3000/api/putFormation/${id}`, {
                                                        method: 'PUT',
                                                        body: JSON.stringify(putInfo),
                                                        headers: {
                                                            'accept' : 'application/json',
                                                            'content-type' : 'application/json',
                                                            'authorization' : `Bearer ${token}`
                                                        }
                                                    })
                                                    .then(res => { return res.json(); })
                                                    .then(data => {
                                                
                                                            alert('Formation Modifié !');
                                                            window.location.reload();
                                                
                                                    }).catch(err => console.log(err));
                                                    })
                                                })  
                                            })                      
                                        })

                                        FormationPutForm.addEventListener('submit', (e) => {
                                            e.preventDefault();
                                        })

                                        //  Put request & Contrôle input saisie regex put 
                                        namePut.addEventListener('change' , (e) => {
                                            let formationTest = e.target.value;
                                        
                                            if(/^[A-Za-z][A-Za-z0-9_ ]/.test(formationTest) == false) {
                                        
                                                
                                                document.querySelector('#nameErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques";
                                                let errorInput = document.querySelector('#name');
                                                errorInput.classList.add('border');
                                                errorInput.style.border = "2px solid red";
                                                errorInput.style.marginBottom = '0px';
                                                let errorPrenom = document.querySelector("#nameErrMsg");
                                                errorPrenom.style.color = "red";
                                        
                                            } else {
                                        
                                             
                                                document.querySelector('#nameErrMsg').textContent = "✅";
                                                let errorInput = document.querySelector('#namePut');
                                                errorInput.classList.add('border');
                                                errorInput.style.border = "2px solid green"
                                                errorInput.style.marginBottom = '0px';
                                            }
                                        });
                                        
                                        pricePut.addEventListener('change', (e) => {
                                        
                                            let priceTest = e.target.value;
                                        
                                            if(/^[0-9]/g.test(priceTest) == false) {
                                        
                                                
                                                document.querySelector('#priceErrMsg').textContent = "Veuillez ne saisir que des caractères numériques, merci";
                                                let errorInput = document.querySelector('#price');
                                                errorInput.classList.add('border');
                                                errorInput.style.border = '2px solid red';
                                                errorInput.style.marginBottom = '0px';
                                                let priceError = document.querySelector("#priceErrMsg");
                                                priceError.style.color = "red"
                                        
                                            } else {
                                                
                                                let errorInput = document.querySelector('#price');
                                                errorInput.classList.add('border');
                                                errorInput.style.border = '2px solid green';
                                                errorInput.style.marginBottom = '0px';
                                                let priceError = document.querySelector("#priceErrMsg");
                                                priceError.textContent = "✅";
                                            }
                                        })
                                        
                                        durationPut.addEventListener('change', (e) => {
                                        
                                            let durationTest = e.target.value;
                                        
                                            if(/^[0-9]/g.test(durationTest) == false) {
                                        
                                                
                                                document.querySelector('#durationErrMsg').textContent = "Veuillez ne saisir que des caractères numériques, merci";
                                                let errorInput = document.querySelector('#duration');
                                                errorInput.classList.add('border');
                                                errorInput.style.border = '2px solid red';
                                                errorInput.style.marginBottom = '0px';
                                                let priceError = document.querySelector("#durationErrMsg");
                                                priceError.style.color = "red"
                                        
                                            } else {
                                                
                                                let errorInput = document.querySelector('#duration');
                                                errorInput.classList.add('border');
                                                errorInput.style.border = '2px solid green';
                                                errorInput.style.marginBottom = '0px';
                                                let durationError = document.querySelector("#durationErrMsg");
                                                durationError.textContent = "✅";
                                            }
                                        })  


                                        // for(let price of res.priceFormation) {
                                        //     localStorage.setItem('price', `${price}`);
                                        //     }

 });

};
        getAllFormations();
         

function cancelOverlay() {
    OverlayPut.style.display = 'none';
   }          

function OverlayFormation() {
    OverlayPut.style.display = 'flex';

}

function cancelComposition() {

    composition.style.display = 'none';
    composition.innerHTML = `<h1> Selection : </h1>

    <h3 class="total-duration">Temps total :   heures</h3>
    <button type="button" id="cancel-composition" onclick="cancelComposition()" >Annuler</button>
    <button type="button" id="valid-composition" >Valider</button>`;
}



// Récupération prix formation 

function priceManagement() {
    
    for(let i = 0; i < FormationsStorage.length; i++) {
    //    console.log(FormationsStorage[i].durationF);
        timesFormations.push(parseInt(FormationsStorage[i].durationF));
       //  JSON.stringify(localStorage.setItem(`timesFormations`, `${timesFormations}`)); 
       
       
       const reducer = (accumulator, currentValue) => accumulator + currentValue;
       totalTime = timesFormations.reduce(reducer);
       console.log(totalTime);
    }
    console.log(totalTime);

    totalDuration.innerHTML += `Temps total : ${totalTime} heures`;



}



// Gestion envoie de séléctionFormation 


function validationComposition() {
    
    priceManagement();
   // totalDuration.innerHTML = `Temps total : ${totalTime} heures`;
   // console.log(timesFormations);
}










/// Espace gestion selection Modulable 


// function selectionFormation(name, price, duration) {

    

//     composition.innerHtml = `
//                         <h5>Nom: ${name}</h5>
//                         <span>Prix: ${price}</span>
//                         <span>Durée: ${duration}</span> 
//                             `
//       //  return composition;
// }


// nameF.addEventListener('focus', () => {
//     composition.style.display = 'block'
// })


// nameF.addEventListener('focusout', () => {
//     Composition.style.display = 'none'
// })
