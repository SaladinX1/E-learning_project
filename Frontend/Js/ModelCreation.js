//const { post } = require("../../../Backend/app");

const displayFileButton = document.querySelector('.displayButton');
const file_group = document.querySelector('.file-group');
let logoutButton = document.querySelector('.deconnexion');

const choiceInput = document.querySelector('.choiceInput');
const injection = document.querySelector('.injectChoice');

const formulaireCreation = document.querySelector('.creaForm');
const formulaireButton = document.querySelector('.button__section--creator');
//const formationsBoxes = document.querySelectorAll('.recoverAllFormation__box');

const DisplayOverlayPut = document.querySelector('#UpdateFormationButton');
const OverlayPut = document.querySelector('.overlayPutFormation');

let choiceSelectionLock = false;
let showFiles = false; 

const namePut = document.querySelector('#namePut');
 const pricePut = document.querySelector('#pricePut');
 const durationPut = document.querySelector('#durationPut');
 //const file = document.querySelector('#file');
 const FormationPutForm = document.querySelector('#putFormation');


 const composition = document.querySelector('.containerGestion__selection--frame');
const validComposition = document.querySelector('#valid-composition');
const total_duration = document.querySelector('.total-duration');

let FormationsStorage = [];
let formationObject = {};
let timesFormations = [];
let totalTime;


let lock;

function createFormation() {

    lock = false;

    let videosSelection = {
        videos: videosFilesTab
    };

    if ( videosFilesTab != ' ') {

        const token = localStorage.getItem('token');

        fetch('http://localhost:3000/api/videofolder', {
            method: 'POST',
            body: JSON.stringify(videosSelection),
            headers : {
                'accept' : 'application/json',
                'content-type' : 'application/json',
                'authorization' : `Bearer ${token}`
            }
        })
        .then(res => {return res.json()})
        .then(data => {
            console.log('vidéos stockées');
        })
        .catch(err => console.log(err))

    }

  

    formulaireCreation.addEventListener('submit', (e) => {
        e.preventDefault();

        if( lock == true) {
            return;
        } else {

            const token = localStorage.getItem('token');
           // const data = new FormData();
            const newFormation = {
                nameFormation: document.querySelector('#nameF').value,
                priceFormation: document.querySelector('#price').value,
                durationFormation: document.querySelector('#duration').value,
                picture: document.querySelector('#pictureF').value,
                role: document.querySelector('#role').value,
                pdfs: JSON.stringify(pdfsFilesTab)
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
                 pdfsFilesTab = [];

            
          
                alert('Bravo ! La Formation a été crée :)')
                window.location.reload();
            })
            .catch(error => console.error(error))
            
            lock = true;
        }  
    });        
};


// formulaireCreation.addEventListener('submit', () => {

    


// })


// Gestion button affichage files suplémentaires

(() => {
    
    choiceInput.style.display = 'none';
    choiceInput.innerHTML +=  
    
    ` <h3>Veuillez chosir le type et/ou le nombre de fichier(s) à ajouter :</h3>
    <label>Vidéo : </label>
    <input id='videoNumber' type='number'/>
    <label>Pdf : </label>
    <input id='pdfNumber' type='number' /> 
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
    videosFilesTab = [];
    pdfsFilesTab = [];
    injection.innerHTML = '';

});

function hideChoice() {
    videosFilesTab = [];
    pdfsFilesTab = [];
    choiceInput.style.display = 'none';
}


// gestion des messages en fonction des saisies champs fichiers ajouts
let videosFilesTab = [];

function displayVideoInputs(nbVideosValue) {

  for(let i = 0; i < nbVideosValue; i++) {

    
    injection.innerHTML += ` 
    <div class="input-group">
   <label for="video">Vidéo :</label>
   <input id="video" type="file">
    </div> 
    `;


  }

  let videosFiles = document.querySelectorAll('#video');

  videosFiles.forEach(video => {
    video.addEventListener('change', (e) => {

       let value = e.target.value; 
       
            // let pdfValue = document.querySelector('#pdfs').value;
          
              if (value != ' ') {
                  
                videosFilesTab.push(value);
                  console.log(videosFilesTab);
                      return videosFilesTab;
              
                  } else {
                          return;
                      }
                  
                  })
  
            //  console.log(videosFiles);
}) 
     
    return injection, videosFilesTab;
};

let pdfsFilesTab = [];
    

    function displayPdfInputs(nbPdfsValue) {

       for(let i = 0; i < nbPdfsValue; i++) {


        injection.innerHTML += `<div class="input-group">
        <label for="pdfs">PDF :</label>
        <input class="doc" name="file"  id="pdfs" type="file" >
        </div>`;
       }
        

        let pdfFiles = document.querySelectorAll('#pdfs');

        pdfFiles.forEach(pdf => {
            pdf.addEventListener('change', (e) => {

               let value = e.target.value; 
               
                    // let pdfValue = document.querySelector('#pdfs').value;
                  
                      if (value != ' ') {
                          
                          pdfsFilesTab.push(value);
                          console.log(pdfsFilesTab);
                              return pdfsFilesTab;
                      
                          } else {
                                  return;
                              }
                          
                          })
          
                    //  console.log(pdfsFiles);
        }) 
            return injection, pdfsFilesTab;
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

        localStorage.removeItem('formationData');
        localStorage.removeItem('timeFormation');
        total_duration.style.display = 'none';

for(let formations of res) {

   // const pdfsFiles = JSON.parse( 'pdfs' ,formations.pdfs)
   //<p> Pdfs: ${pdfsFiles}  </p>

    // Tentative de récupération des prix pour insetion dans le localStorage

    // for(let i = 0; i < res.priceFormation; i++) {

    //     localStorage.setItem('price', `${formations.priceFormation}`);
     
    // };
                             
    

    document.querySelector('.recoverAllFormation').innerHTML += `
                                                <div class="recoverAllFormation__box" data-role="${formations.role}" data-id="${formations.id}" >
                                                <img alt='Image représentant la formation' class="pictureF" src='${formations.picture}'/>
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

                                                                        <label for="pictureFPut">Image: </label>
                                                                        <input type="file" id="pictureFPut"/>
                                                                        <p id="pictureErrMsg"></p>

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
                                                        
                                                        if (choiceSelectionLock == false) {
                                                            
                                                
                                                 
                                                 let formationData = `
                                                 <div class='boxSelected' data-role="${data.role}" data-order=''>
                                                 <h1> Bienvenue dans votre formation ${data.nameFormation} 😃 ! </h1>
                                                 <p> Dans cette formation, vous devrez passer un total de ${data.durationFormation} heure(s) pour valider votre cursus !</p>
                                                 //<img alt='Image représentant la formation' src='${data.picture}/> </br>'   
                                                 </div>`;
                                                 
                                                
                                            //    localStorage.setItem(`timeFormation`, `${data.durationFormation}`);
                                            total_duration.style.display = 'block';
                                            total_duration.innerText = `Temps total: ${data.durationFormation} heure(s)`;
                                                                    localStorage.setItem(`formationData`, formationData);
                                                                    localStorage.setItem('timeFormation',`${data.durationFormation}`);

                                                
                                                  
            
                                                  let formationSelected = `<div class='boxSelected' data-role="${data.role}" data-order=''>
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
                                                    choiceSelectionLock = true;

                                                          return FormationsStorage; 
                                                          
                                                          // timesFormations;
                                                                                         
                                                   //   }
                                                       
                                                //    for(let i = 1 ; i <= document.querySelectorAll('.boxSelected').length; i++) {
                                                //        document.querySelector('boxSelected').setAttribute('data-order', `${i}`);
                                                //     }     

                                                
                                             } else if (choiceSelectionLock == true) {

                                                        document.querySelector('.errValidMsg').style.color = 'red';
                                                        document.querySelector('.errValidMsg').innerText = 'Une validation à la fois seulement.'
        
                                               return;
                                             }

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

                                                    localStorage.removeItem('formationData');
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
                                                       // const data = new FormData();
                                                    let putInfo = {
                                                        nameFormation : document.querySelector('#namePut').value,
                                                        priceFormation : document.querySelector('#pricePut').value,
                                                        picture: document.querySelector('#pictureF').value,
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
   // <h3 class="total-duration">Temps total :   heures</h3>
    composition.innerHTML = `<h1> Selection : </h1>

    <button type="button" id="cancel-composition" onclick="cancelComposition()" >Annuler</button>
    <button type="button" id="valid-composition" onclick="validationComposition()" >Valider</button>`;
    choiceSelectionLock = false;
    localStorage.removeItem('formationData');
    localStorage.removeItem('timeFormation');
    total_duration.style.display = 'none';
  

}



// Récupération prix formation 

function timeManagement() {
    
    // for(let i = 0; i < FormationsStorage.length; i++) {
    //    console.log(FormationsStorage[i].durationF);
    //     timesFormations.push(parseInt(FormationsStorage[i].durationF));
    //      JSON.stringify(localStorage.setItem(`timesFormations`, `${timesFormations}`)); 
  // const timeFormation = localStorage.getItem('timeFormation');
       
    //    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    //    totalTime = timesFormations.reduce(reducer);
    //    console.log(totalTime);
    // }
    // console.log(totalTime);



}



// Gestion envoie de séléctionFormation 


function validationComposition() {

   // priceManagement();
   // totalDuration.innerHTML = `Temps total : ${totalTime} heures`;
   // console.log(timesFormations);
   let box = document.querySelector('.boxSelected');
  
    if (box.getAttribute('data-role') === 'Exploitants') {

        location.replace('./Formations/formationExploitants.html');

    } else if (box.getAttribute('data-role') === 'Enseignants') {

        location.replace('./Formations/formationEnseignants.html');

    } else if ( box.getAttribute('data-role') === 'FormationX') {

        location.replace('./Formations/formation3.html');
    }

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
