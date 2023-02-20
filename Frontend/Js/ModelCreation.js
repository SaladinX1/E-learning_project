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
let lockInput = false;

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

let pdfsFilesTab = [];
let videosFilesTab = [];
let allDocs = [];
let posFiles = [];

let finalV = [];
let finalP = [];

let uniqueDocs = [];

let lock;

 

function createFormation() {
   
    posFiles.sort((a,b) => {
        return a - b;
    })

    console.log(posFiles);


   //console.log('PositionOrderValues :',posFiles);

    localStorage.setItem('selectionData', JSON.stringify(posFiles));

    const token = localStorage.getItem('token');
    lock = false;

      removeDuplicatesDocs(allDocs);

    //  localStorage.setItem('allDocs', JSON.stringify(allDocs));
      
    let allDocsSelection = {
        documents: allDocs
    }


    if ( allDocs != ' ' ||  allDocs == ' ' ) {

        fetch('http://localhost:3000/api/docsFolder', {
            method: 'POST',
            body: JSON.stringify(allDocsSelection),
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

            //  let data = new FormData();
            // data.append('pictureF', document.querySelector('#pictureF').value);
             
            const newFormation = {
                nameFormation: document.querySelector('#nameF').value,
                priceFormation: document.querySelector('#price').value,
                durationFormation: document.querySelector('#duration').value,
              //  picture: document.querySelector('#pictureF').value,
                role: document.querySelector('#role').value
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
    });        
};

// Gestion button affichage files suplémentaires

(() => {
    choiceInput.style.display = 'none';
    choiceInput.innerHTML +=  
    
    ` <h3>Veuillez chosir, le nombre de champs puis, DANS l'ORDRE, le nom de chaque fichier à ajouter :</h3>
    <br/>
    <label class="labVideo" for='videoNumber'>Vidéo : </label><br/>
    <input id='videoNumber' type='number'/> <br/><br/>
    <label class="labPdf" for='pdfNumber'>Pdf : </label><br/>
    <input id='pdfNumber' type='number' /> 
    `;

    let inputV = document.querySelector('#videoNumber');
    let inputP = document.querySelector('#pdfNumber');
    let labelP = document.querySelector('.labPdf');
    let labelV = document.querySelector('.labVideo');
 
    labelP.style.fontSize = '1.7rem';
    labelV.style.fontSize = '1.7rem';

    labelP.style.color = 'blue';
    labelV.style.color = 'blue';

    labelP.style.margin = '0 auto';
    labelV.style.margin = '0 auto';

    inputV.style.padding = '3px';
    inputP.style.padding = '3px';

    inputV.style.width = '50%';
    inputP.style.width = '50%';

    inputV.style.borderRadius = '5px';
    inputP.style.borderRadius = '5px';

    inputV.style.fontWeight = 'bold';
    inputP.style.fontWeight = 'bold';

    inputV.style.textAlign = 'center';
    inputP.style.textAlign = 'center';

    choiceInput.style.border = '1px solid black';
    choiceInput.style.margin = '10px 10px';
    choiceInput.style.padding = '10px';
    choiceInput.style.borderRadius = '10px';
    let buttonDiv = document.createElement('div');
    buttonDiv.style.display = 'flex';
    buttonDiv.style.flexDirection = 'row';
    choiceInput.appendChild(buttonDiv);
    buttonDiv.innerHTML = `<button type="button" id="validationFilesAdded" >Valider</button> <button type="button" id="validationFilesDeleted" >supprimer</button>`
    // choiceInput.innerHTML += `<button type="button" id="validationFilesAdded" >Valider</button>`;
    // choiceInput.innerHTML += `<button type="button" id="validationFilesDeleted" >supprimer</button>`;
    
})();

displayFileButton.addEventListener('click' , displayFileInput);

function displayFileInput() {
    
    if(showFiles == false )  {
        allDocs = [];
        localStorage.removeItem('allDocs');
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

//////////////////////////////////////////


function removeDuplicatesDocs(arr) {
    arr.forEach(element => {
        if (!uniqueDocs.includes(element)) {
            uniqueDocs.push(element);
        }
     //   console.log(uniquePdfs);
        return uniqueDocs;
    });
}

//////////////////////////////////////////    Affichage Input et Établissement de l'ordre \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


let valueVideo;
let valuePdf;
let popUp = document.querySelector('.popUp');
let cancelPopUp = document.querySelector('.cancelPopUp');

function getDisplayedInput() {
    
    let videosFiles = document.querySelectorAll('#video');

    videosFiles.forEach(video => {

        video.addEventListener('click', () => {

            video.addEventListener('change', (e) => {
  
                 valueVideo = e.target.value; 
    
              if (valueVideo != ' ') {

                let V = 'VIDEO';

                finalV = [V , valueVideo];

                
                console.log(allDocs);
                        allDocs.push(finalV);
    
                            return videosFilesTab, allDocs, finalV;
                        } else {
                                return;
                            }
                        })

   
    
            // cancelPopUp.addEventListener('click', () => {
            //     popUp.style.display = 'none';
            // })
    

        });
  })   
  
  let pdfFiles = document.querySelectorAll('#pdfs');
  
  pdfFiles.forEach(pdf => {
      
      pdf.addEventListener('click', ()=> {
          
        pdf.addEventListener('change', (e) => {
             valuePdf = e.target.value; 
                       
                   if (valuePdf != ' ') {

                    let P = 'PDF';

                    finalP = [P , valuePdf]
                   
                       allDocs.push(finalP);
                       console.log(allDocs);
    
                           return pdfsFilesTab, allDocs, finalP;
                       } else {
                               return;
                           }
                       })
                 //  console.log(pdfsFiles)
        // cancelPopUp.addEventListener('click', () => {
        // })

    });
    
  }) 
}

let validationFiles = document.querySelector('#validationFilesAdded');
let deletionFiles = document.querySelector('#validationFilesDeleted');

validationFiles.addEventListener('click', () => {


    if(lockInput == true) {

        h4.style.color = 'red';
        h4.innerText = ' Veuillez recommencer une nouvelle sélection, merci';
        setTimeout(() =>  {
            h4.innerText = ' ';
        },1800)
        return;

    } else if( validationValues.videos == true || validationValues.pfds == true ) {
        
        displayInputs(nbVideosValue, nbPdfsValue);
       setTimeout(() => {
        getDisplayedInput();
       },1000)
        lockInput = true;

    } else if(validationValues.videos == false || validationValues.pfds == true ) {
        displayInputs(null, nbPdfsValue);
        setTimeout(() => {
            getDisplayedInput();
           },1000)
        lockInput = true;
    }   else if(validationValues.videos == true || validationValues.pfds == false ) {
        displayInputs(nbVideosValue, null);
        setTimeout(() => {
            getDisplayedInput();
           },1000)
        lockInput = true;
    }
    else if(validationValues.pfds == false && validationValues.videos == false){
        h4.innerText = 'Veuillez saisir une valeur, une valeur positive, merci';
        return;
 }


document.querySelectorAll('.popUp').forEach(pop => {
    pop.style.display = 'block';
})


 document.querySelectorAll('.cancelPopUp').forEach( cancel => {

    cancel.addEventListener('click', (e) => {
        e.stopPropagation();
        cancel.parentNode.style.display = 'block';
    })
 })

 
function changeOrder(arr, from, to) {

    arr.splice(to, 0, arr.splice(from,1)[0])
    
    return arr
}



    document.querySelectorAll('#ordre').forEach(order => {
        order.addEventListener('input', (e) => {
            e.preventDefault();
            e.stopPropagation();
    
           
            let orderValue = e.target.value;

            if(orderValue > allDocs.length || orderValue <= 0) {

                document.querySelector('.validPopUp').style.display = 'block';
                document.querySelector('.validPopUp').style.color = 'red';
                document.querySelector('.validPopUp').style.padding = '10px';
                    document.querySelector('.validPopUp').textContent = `Les valeurs nulles, négatives ou plus grandes que le nombre de fichiers sélectionnés ne sont pas valables`; 

                    setTimeout(() => {
                        document.querySelector('.validPopUp').textContent = ``;
                    },2300)
  
             } else if(order.getAttribute('name') == 'pdf') {

                document.querySelector('.pdfLabel').textContent = `Pdf N° ${orderValue}`;
              //  changeOrder(allDocs, allDocs.indexOf(valuePdf), parseInt(orderValue) - 1);
              posFiles.push({orderValue, valueVideo});
            //   valuePdf
              console.log(posFiles);
              console.log(changeOrder(allDocs, allDocs.indexOf(valuePdf), parseInt(orderValue) - 1));
              //  console.log(allDocs.indexOf(valuePdf));

                localStorage.removeItem('allDocs');
                localStorage.setItem('allDocs', JSON.stringify(allDocs));
                console.log(allDocs);
                document.querySelector('.validPopUp').style.display = 'block';
                document.querySelector('.validPopUp').textContent = `✅ Choix éffectué !`; 

                setTimeout(() => {
                document.querySelector('.validPopUp').style.display = 'none';
            },2500);
            
            // changeOrder(allDocs, allDocs.indexOf(valuePdf), parseInt(orderValue) - 1);
            return posFiles;
            
        } else if (order.getAttribute('name') == 'video') {
               
          //  console.log(allDocs);
                document.querySelector('.videoLabel').textContent = `Vidéo N° ${orderValue}`;
                posFiles.push({orderValue,valueVideo});
                // valueVideo
                console.log(posFiles);
                console.log(changeOrder(allDocs, allDocs.indexOf(valueVideo), parseInt(orderValue) - 1));
              //  changeOrder(allDocs, allDocs.indexOf(valueVideo), parseInt(orderValue) - 1 );
               // console.log(allDocs.indexOf(valueVideo));
        
                localStorage.removeItem('allDocs');
                localStorage.setItem('allDocs', JSON.stringify(allDocs));
               // console.log(allDocs);
                document.querySelector('.validPopUp').style.display = 'block';
                document.querySelector('.validPopUp').textContent = `✅ Choix éffectué !`; 
                
                setTimeout(() => {
                    document.querySelector('.validPopUp').style.display = 'none';
                },2500); 

                changeOrder(allDocs, allDocs.indexOf(valueVideo), parseInt(orderValue) - 1);

                return posFiles;
          } 
      })
    })  
})


deletionFiles.addEventListener('click', () => {
    videosFilesTab = [];
    pdfsFilesTab = [];
    allDocs = [];
    localStorage.removeItem('allDocs');
    h4.innerText = ' ';
    injection.innerHTML = '';
    lockInput = false;
    return lockInput;
});

function hideChoice() {
    videosFilesTab = [];
    allDocs = [];
    pdfsFilesTab = [];
    choiceInput.style.display = 'none';
}


// gestion des messages en fonction des saisies champs fichiers ajouts


function displayInputs(nbVideosValue, nbPdfsValue) {

    if(nbVideosValue > 0 || nbPdfsValue > 0 ) {

        for(let i = 0; i < nbVideosValue; i++) {

            injection.innerHTML += `
            <div class="input-group" data-id="${i}">
           <label for="video" class="videoLabel">Vidéo N° ${i+1}:</label>
           <input id="video" type="file"/>
           </div> 
           <div class="popUp" data-id='${i}'>
            <label for="ordre" >Ordre Vidéo : </label> 
                <input type="number" id="ordre" name='video'/>
                <p class='validPopUp'></p>
                </div>
                `;
                // <button class="cancelPopUp">Annuler</button>
          }
        //   <button class="validPopUp">Valider</button>
        for(let i = 0; i < nbPdfsValue; i++) {

            injection.innerHTML += `<div class="input-group" data-id="${i}">
            <label for="pdfs" class='pdfLabel'>PDF N° ${i+1} :</label>
            <input class="doc" name="file" id="pdfs" type="file"/>
            </div>
            <div class="popUp" data-id='${i}'> <label for="ordre" >Ordre Pdf: </label> 
                    <input type="number" id="ordre" name='pdf'/>
                    <p class='validPopUp'></p>
                    </div>`
                    // <button class="cancelPopUp">Annuler</button>  
        }
                return injection;
    }
};

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
        localStorage.removeItem('allDocs');
        // localStorage.removeItem('filesFormation');

        total_duration.style.display = 'none';

for(let formations of res) {


                                                document.querySelector('.recoverAllFormation').innerHTML += `
                                                <div class="recoverAllFormation__box" data-role="${formations.role}" data-docs="${formations.allDocs}" data-id="${formations.id}" >
                                                   <h1  id="formationName"> ${formations.nameFormation} </h1>
                                                   <h5> Formation ${formations.role} </h5>
                                                    <p>  ${formations.priceFormation} € </p>
                                                    <p> ${formations.durationFormation} heure(s) </p>                                               
                                                    <button type="button" onclick='OverlayFormation()' data-id="${formations.id}" data-docs="${formations.allDocs}" id="UpdateFormationButton" >Modifier</button>
                                                    <button type="button"  data-id="${formations.id}" data-docs="${formations.allDocs}"  id="deleteFormationButton" >supprimer</button>   
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




                                      // Récupération des documents

                                      let idDocsSet = box.getAttribute('data-docs');

                                      fetch(`../docs/${idDocsSet}`, {
                                          method: 'GET',
                                          headers: {
                                               'accept' : 'application/json',
                                               'content-type' : 'application/json',
                                               'authorization' : `Bearer ${token}`
                                          }
                                       })
                                       .then(data => {return data.json()})
                                       .then( docs => {

                                           const docsSet = docs;
                                           

                                         if( docsSet == ' ') {
                                          return;
                                         } else {

                                          localStorage.setItem('allDocs', JSON.stringify(docsSet));   

                                         }
                                       })

                                                 // Récupération des informations pour chaque formation                                           
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
                                                        if (choiceSelectionLock == false) {
                                                            
                                                            let formationData = `
                                                            <div class='boxSelected' data-role="${data.role}" data-order=''>
                                                            <h1> Bienvenue dans votre formation ${data.nameFormation} 😃 ! </h1>
                                                            <p> Dans cette formation, vous devrez passer un total de ${data.durationFormation} heure(s) pour valider votre cursus !</p>
                                                            </div>`;

                                                            // <img alt='Image représentant la formation' src='${data.picture}'/> </br>'   
                                                            
                                                            total_duration.style.display = 'block';
                                                            total_duration.innerText = `Temps total: ${data.durationFormation} heure(s)`;
                                                            localStorage.setItem(`formationData`, formationData);
                                                            localStorage.setItem('timeFormation',`${data.durationFormation}`);
                                                            
                                                           // console.log();
                                                          
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

                                                    // idVideoSet = data.videos;
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
                                                    localStorage.removeItem('timeFormation');
                                                    localStorage.removeItem('allDocs');
                                                  
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
                                                      //  picture: document.querySelector('#pictureF').value,
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

                                                        localStorage.removeItem('formationData');
                                                        localStorage.removeItem('timeFormation');
                                                        localStorage.removeItem('allDocs');

                                                            alert('Formation Modifié !');
                                                            window.location.reload();
                                                
                                                    }).catch(err => console.log(err));
                                                    })
                                                })  
                                            })                      
                                        })

                                        if(document.querySelector('.overlayPutFormation').style.display == 'block') {

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

                                        }
                                        
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

    <button type="button" id="cancel-composition" onclick="cancelComposition()">Annuler</button>
    <button type="button" id="valid-composition" onclick="validationComposition()">Valider</button>`;
    choiceSelectionLock = false;
    localStorage.removeItem('formationData');
    localStorage.removeItem('timeFormation');
    localStorage.removeItem('videosFormation');
    localStorage.removeItem('filesFormation');
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

//    removeDuplicatesPdf(pdfsFilesTab);
//    removeDuplicatesVideo(videosFilesTab);
        
//    console.log(uniquePdfs, uniqueVideos); 


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