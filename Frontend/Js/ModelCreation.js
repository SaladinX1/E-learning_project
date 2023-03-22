//const { post } = require("../../../Backend/app");

const displayFileButton = document.querySelector('.displayButton');
const file_group = document.querySelector('.file-group');
let logoutButton = document.querySelector('.deconnexion');

const choiceInput = document.querySelector('.choiceInput');
const injection = document.querySelector('.injectChoice');

const moduleCreation = document.querySelector('.creaForm');
const moduleButton = document.querySelector('.button__section--creator');
//const formationsBoxes = document.querySelectorAll('.recoverAllFormation__box');

const DisplayOverlayPut = document.querySelector('#UpdateModuleButton');
const OverlayPut = document.querySelector('.overlayPutModule');

let choiceSelectionLock = false;
let showFiles = false; 
let lockInput = false;

const namePut = document.querySelector('#namePut');
// const pricePut = document.querySelector('#pricePut');
 const durationPut = document.querySelector('#durationPut');
 //const file = document.querySelector('#file');
 const modulePutForm = document.querySelector('#putModule');


 const composition = document.querySelector('.containerGestion__selection--frame');
const validComposition = document.querySelector('#valid-composition');
const total_duration = document.querySelector('.total-duration');

let tabIdModules = [];
let tabTimeModules = [];
let modulePos = [];
let modulesStorage = [];
let modulesObject = {};
let timesmodules = [];
let totalTime;


let allDocs = [];
let posFiles = [];

let finalV = [];
let finalP = [];

let uniqueDocs = [];

let lock;

 

function createModules() {
   
    posFiles.sort((a,b) => {
        return a.position - b.position;
    })

   // console.log(posFiles);

    let items = posFiles.map(function(element) {
        return element.item;
      });


    posFiles.forEach(function(element) {
    delete element.position;
    element.item = items.shift();
    });


    localStorage.setItem('selectionData', JSON.stringify(posFiles));

    const token = localStorage.getItem('token');
    lock = false;

      removeDuplicatesDocs(allDocs);

      localStorage.setItem('allDocs', JSON.stringify(allDocs));

    // if ( allDocs != ' ' ||  allDocs == ' ' ) {
    // }

    moduleCreation.addEventListener('submit', (e) => {
        e.preventDefault();

        if( lock == true) {
            return;
        } else {
            const token = localStorage.getItem('token');
            
                    // allDocsSelection: {documents: allDocs }
            fetch('http://localhost:3000/api/createmodule', {
                method: 'POST',
                body: JSON.stringify({
                    newModule: { nameModule: document.querySelector('#nameF').value,  durationModule: document.querySelector('#duration').value , role: document.querySelector('#role').value },
                    allDocsSelection: {documents: allDocs}
                }),
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                    'authorization' : `Bearer ${token}`
                }
            }).then( res => {
                    alert('Bravo ! Le Module a été crée :)')
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
    
                            return  allDocs, finalV;
                        } else {
                                return;
                            }
                        })
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
    
                           return allDocs, finalP;
                       } else {
                               return;
                           }
                       })
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
              posFiles.push({position: orderValue, item: valuePdf});
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
                posFiles.push({position: orderValue, item: valueVideo}); 
                
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

               // changeOrder(allDocs, allDocs.indexOf(valueVideo), parseInt(orderValue) - 1);

                return posFiles;
          } 
      })
    })  
})


deletionFiles.addEventListener('click', () => {
    allDocs = [];
    localStorage.removeItem('allDocs');
    h4.innerText = ' ';
    injection.innerHTML = '';
    lockInput = false;
    return lockInput;
});

function hideChoice() {
    allDocs = [];
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


function getAllModules() {

    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/api/modules', {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    .then(data => { return data.json() })
    .then(res => { 

        localStorage.removeItem('moduleData');
        localStorage.removeItem('timeModule');
        localStorage.removeItem('allDocs');
        // localStorage.removeItem('filesFormation');

        if( localStorage.getItem('idModules') && localStorage.getItem('timeF') && localStorage.getItem('timeFormation')){
            localStorage.removeItem('idModules');
            localStorage.removeItem('timeF');
            localStorage.removeItem('timeFormation');
        }

        total_duration.style.display = 'none';

for(let modules of res) {


                                                document.querySelector('.recoverAllModules').innerHTML += `
                                                <div class="recoverAllModules__box" data-role="${modules.role}" data-docs="${modules.allDocs}" data-id="${modules.id}" data-time="${modules.durationModule}" >
                                                   <h1  id="moduleName"> ${modules.nameModule} </h1>
                                                   <h3> Module ${modules.role} </h3>
                                                    <h3> ${modules.durationModule} heure(s) </h3>                                               
                                                    <button type="button"  data-id="${modules.id}" data-docs="${modules.allDocs}"  id="deleteModuleButton" >supprimer</button>   
                                                    </div>
                                                    
                                                    `   
                                                    // <button type="button" onclick='OverlayModule()' data-id="${modules.id}" data-docs="${modules.allDocs}" id="UpdateModuleButton" >Modifier</button>
                                                
        //   document.querySelector('.overlayPutModule').innerHTML = `
                                                                    
        //                                                             <form id="putModule" class="formPut apparition"> 
        //                                                                 <h1> Modification Module </h1>
        //                                                                 <label for="namePut">Nom</label>
        //                                                                 <input type="text" id="namePut"/>
        //                                                                 <p id="nameErrMsg"></p>

        //                                                                 <label for="pricePut">Prix (€)</label>
        //                                                                 <input type="number" id="pricePut"/>
        //                                                                 <p id="priceErrMsg"></p>
                                                                        

        //                                                                 <label for="durationPut">heure(s)</label>
        //                                                                 <input type="number" id="durationPut"/>
        //                                                                 <p id="durationErrMsg"></p>
                                

        //                                                                 <div class="files">
        //                                                                 </div>

        //                                                                 <button type="submit"  id="putModuleButton"> Modifier </button>
        //                                                                 <button type="button" id="cancel" onclick='cancelOverlay()' >Annuler</button>
        //                                                             </form>                                       
        //                                                             `  
                                        }

                                       
                                     ////////////////////////////////////////////////////////////
                                        // Gestion getOneFormation Infos 

                                        const modulesBoxes = document.querySelectorAll('.recoverAllModules__box');
                                        modulesBoxes.forEach(box => { 
                                            box.addEventListener('click', (e) => {
                                                e.preventDefault();
                                                composition.style.display = 'block';
                                                let id = box.getAttribute('data-id');
                                                const token = localStorage.getItem('token');
                                                let timeModule = parseInt(box.getAttribute('data-time'));

                                                tabIdModules.push(id);
                                                tabTimeModules.push(timeModule);

                                      ////////// Récupération des documents \\\\\\\\\\\\
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

                                       ///////////////////////////////////////////////////////////////////
                                                 // Récupération des informations pour chaque Module   

                                                fetch(`http://localhost:3000/api/module/${id}`, {
                                                    method: 'GET',
                                                    headers: {
                                                        'accept' : 'application/json',
                                                        'content-type' : 'application/json',
                                                        'authorization' : `Bearer ${token}`
                                                    }
                                                })
                                                .then( res => { return res.json()})
                                                .then( data => {                                                      
                                                      //  if (choiceSelectionLock == false) {
                                                            
                                                            let moduleData = `
                                                            <div class='boxSelected' data-role="${data.role}" data-order=''>
                                                            <h1> Bienvenue dans votre module ${data.nameModule} 😃 ! </h1>
                                                            <p> Dans ce module, vous devrez passer un total de ${data.durationModule} heure(s) pour le valider !</p>
                                                            </div>`;

                                                              
                                                            
                                                            total_duration.style.display = 'block';
                                                            
                                                            localStorage.setItem(`moduleData`, moduleData);
                                                           // localStorage.setItem('timeModule',`${data.durationModule}`);
                                                            
                                                        
                                                          
                                                  let moduleSelected = `<div class='boxSelected' data-role="${data.role}" data-order=''>
                                                  <form class='moduleListSelection'>
                                                  <h4><label for='modulePos'> ${data.nameModule}, \<br> ${data.durationModule} heure(s)</label></h4>
                                                  <input type='number' id='modulePos' placeholder='ordre n°'/>
                                                </form>
                                                </div>`;

                                                
                                            
                                                modulesObject = {
                                                          nameF: data.nameModule,
                                                          durationF: data.durationModule
                                                      }
                                                    //   FormationsStorage.push(formationObject);
                                                    modulesStorage.push(modulesObject);

                                                    if(choiceSelectionLock == true) {
                                                        document.querySelector('.errValidMsg').style.color = 'red';
                                                        document.querySelector('.errValidMsg').style.fontSize = '1.6rem';
                                                         document.querySelector('.errValidMsg').innerText = 'Veuillez recommencer une nouvelle sélection, merci.'

                                                         setTimeout(() => {
                                                            document.querySelector('.errValidMsg').innerText = '';
                                                        },3500)
                                                    }

                                                  if (choiceSelectionLock == false) {
                                                          composition.innerHTML += moduleSelected;
                                                  }
                                                    

                                                   
                                                          return modulesStorage;                                                        
                                                             
                                           //  } else if (choiceSelectionLock == true) {
                                                        // document.querySelector('.errValidMsg').style.color = 'red';
                                                        // document.querySelector('.errValidMsg').innerText = 'Une validation à la fois seulement.'
                                              // return;
                                            // }
                                                })
                                            })
                                        })        
                                        
                                        
                                        //gestion requête Suppression Module
                                        
                                        const deleteModuleButtons = document.querySelectorAll('#deleteModuleButton');
                                        deleteModuleButtons.forEach(a => {
                                            let id = a.getAttribute('data-id');
                                          
                                       
                                            a.addEventListener('click', (e) => {
                                                e.preventDefault();
                                                                                       
                                                    if(confirm('Êtes-vous sûr de vouloir supprimer ce module ?')) {

                                                        const token = localStorage.getItem('token');

                                                       

                        // Envoie requête suppression Module 
                                                    fetch(`http://localhost:3000/api/deletemodule/${id}`, {                                       
                                                    method: 'delete',
                                                    headers: {
                                                        'accept' : 'application/json',
                                                        'content-type' : 'application',
                                                        'authorization' : `Bearer ${token}`
                                                    }
                                                })
                                                .then( data => { return data.json()})
                                                .then( res => {

                                                    localStorage.removeItem('moduleData');
                                                    localStorage.removeItem('timeModule');
                                                    localStorage.removeItem('allDocs');
                                                    localStorage.removeItem('idModules');
                                                    localStorage.removeItem('timeFormation');
                                                    tabIdModules = [];
                                                    tabTimeModules = [];
                                                  
                                                    window.location.reload();                                                
                                                } )
                                                .catch(err => console.log(err));   
                                                    }                                         
                                            })
                                        })

                                    
//                                    // Gestion requête Modification Module
//                                    const overlayModulesButtons = document.querySelectorAll('#UpdateModuleButton');
//                                    const putModuleButtons = document.querySelectorAll('#putModuleButton');
//                                         overlayModulesButtons.forEach(p => {
//                                             p.addEventListener('click', (e) => {
//                                                 e.preventDefault();
//                                                 let id = p.getAttribute('data-id');

//                                                 putModuleButtons.forEach( v => {
                                                
//                                                     v.addEventListener('click', (e) => {
//                                                         e.preventDefault();

//                                                         const token = localStorage.getItem('token');
//                                                        // const data = new FormData();
//                                                     let putInfo = {
//                                                         nameModule : document.querySelector('#namePut').value,
//                                                         priceFormation : document.querySelector('#pricePut').value,
//                                                       //  picture: document.querySelector('#pictureF').value,
//                                                         durationModule : document.querySelector('#durationPut').value
//                                                     }

//                                                     // requête de modification données formation
//                                                     fetch(`http://localhost:3000/api/putmodule/${id}`, {
//                                                         method: 'PUT',
//                                                         body: JSON.stringify(putInfo),
//                                                         headers: {
//                                                             'accept' : 'application/json',
//                                                             'content-type' : 'application/json',
//                                                             'authorization' : `Bearer ${token}`
//                                                         }
//                                                     })
//                                                     .then(res => { return res.json(); })
//                                                     .then(data => {

//                                                         localStorage.removeItem('moduleData');
//                                                         localStorage.removeItem('timeModule');
//                                                         localStorage.removeItem('allDocs');

//                                                             alert('Module Modifié !');
//                                                             window.location.reload();
                                                
//                                                     }).catch(err => console.log(err));
//                                                     })
//                                                 })  
//                                             })                      
//                                         })

//                                         if(document.querySelector('.overlayPutModule').style.display == 'block') {

//                                             modulePutForm.addEventListener('submit', (e) => {
//                                                 e.preventDefault();
//                                             })
    
//                                             //  Put request & Contrôle input saisie regex put 
//                                             namePut.addEventListener('change' , (e) => {
//                                                 let moduleTest = e.target.value;
                                            
//                                                 if(/^[A-Za-z][A-Za-z0-9_ ]/.test(moduleTest) == false) {
                                            
                                                    
//                                                     document.querySelector('#nameErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques";
//                                                     let errorInput = document.querySelector('#name');
//                                                     errorInput.classList.add('border');
//                                                     errorInput.style.border = "2px solid red";
//                                                     errorInput.style.marginBottom = '0px';
//                                                     let errorPrenom = document.querySelector("#nameErrMsg");
//                                                     errorPrenom.style.color = "red";
                                            
//                                                 } else {
                                            
                                                 
//                                                     document.querySelector('#nameErrMsg').textContent = "✅";
//                                                     let errorInput = document.querySelector('#namePut');
//                                                     errorInput.classList.add('border');
//                                                     errorInput.style.border = "2px solid green"
//                                                     errorInput.style.marginBottom = '0px';
//                                                 }
//                                             });
                                            
//                                             pricePut.addEventListener('change', (e) => {
                                            
//                                                 let priceTest = e.target.value;
                                            
//                                                 if(/^[0-9]/g.test(priceTest) == false) {
                                            
                                                    
//                                                     document.querySelector('#priceErrMsg').textContent = "Veuillez ne saisir que des caractères numériques, merci";
//                                                     let errorInput = document.querySelector('#price');
//                                                     errorInput.classList.add('border');
//                                                     errorInput.style.border = '2px solid red';
//                                                     errorInput.style.marginBottom = '0px';
//                                                     let priceError = document.querySelector("#priceErrMsg");
//                                                     priceError.style.color = "red"
                                            
//                                                 } else {
                                                    
//                                                     let errorInput = document.querySelector('#price');
//                                                     errorInput.classList.add('border');
//                                                     errorInput.style.border = '2px solid green';
//                                                     errorInput.style.marginBottom = '0px';
//                                                     let priceError = document.querySelector("#priceErrMsg");
//                                                     priceError.textContent = "✅";
//                                                 }
//                                             })
                                            
//                                             durationPut.addEventListener('change', (e) => {
                                            
//                                                 let durationTest = e.target.value;
                                            
//                                                 if(/^[0-9]/g.test(durationTest) == false) {
                                            
                                                    
//                                                     document.querySelector('#durationErrMsg').textContent = "Veuillez ne saisir que des caractères numériques, merci";
//                                                     let errorInput = document.querySelector('#duration');
//                                                     errorInput.classList.add('border');
//                                                     errorInput.style.border = '2px solid red';
//                                                     errorInput.style.marginBottom = '0px';
//                                                     let priceError = document.querySelector("#durationErrMsg");
//                                                     priceError.style.color = "red"
                                            
//                                                 } else {
                                                    
//                                                     let errorInput = document.querySelector('#duration');
//                                                     errorInput.classList.add('border');
//                                                     errorInput.style.border = '2px solid green';
//                                                     errorInput.style.marginBottom = '0px';
//                                                     let durationError = document.querySelector("#durationErrMsg");
//                                                     durationError.textContent = "✅";
//                                                 }
//                                             })  

//                                         }
                                        
  });

};
        getAllModules();
         

function cancelOverlay() {
    OverlayPut.style.display = 'none';
   }          

function OverlayModule() {
    OverlayPut.style.display = 'flex';

}


function cancelComposition() {

    composition.style.display = 'none';
   // <h3 class="total-duration">Temps total :   heures</h3>
    composition.innerHTML = `<h1> Selection : </h1>
    <form id="formCursusName" action="">
              <label for="cursusName"></label>
              <input type="text" id="cursusName" name="cursusName" placeholder="Nom formation"/>
              <label for="cursusPrice"></label>
              <input type="number" id="cursusPrice" name="cursusPrice" placeholder="Prix formation"/>
    </form>
    <p class="errValidMsg"></p>
    <p class="errValidMsgFormationPost"></p>
  </div>
    <button type="button" id="cancel-composition" onclick="cancelComposition()">Annuler</button>
    <button type="button" id="valid-composition" onclick="validationComposition()">Valider</button>`;
    choiceSelectionLock = false;
    localStorage.removeItem('moduleData');
    localStorage.removeItem('timeModule');
    localStorage.removeItem('videosModule');
    localStorage.removeItem('filesModule');
    localStorage.removeItem('idModules');
    localStorage.removeItem('timeFormation');
    tabIdModules = [];
    tabTimeModules = [];
    tabNamesModules = [];
    tabDocsFormationCodes = [];
    document.querySelector('.errValidMsg').innerText = '';
    total_duration.style.display = 'none';
}



// Récupération prix formation 

function timeManagement() {
    let tabTime = JSON.parse(localStorage.getItem('timeFormation'));
    let somme = tabTime.reduce((acc, curr) => acc + curr, 0);
    console.log(somme);
    localStorage.setItem('timeF', somme);
    return somme;
    //  const time = document.querySelector('.total-duration');
}

// Gestion envoie de séléctionFormation 
////////////////////////////////////////////

let tabNamesModules = [];
let tabDocsFormationCodes = [];
let nameFormation = document.querySelector('#cursusName').value;
let priceFormation =  document.querySelector('#cursusPrice').value;
let durationFormation;

function validationComposition() {
    
 if(choiceSelectionLock == false ) {

        choiceSelectionLock = true;
        
       if(  nameFormation != '' || priceFormation != '' ) {


        localStorage.setItem('timeFormation', JSON.stringify(tabTimeModules));
    timeManagement();

    localStorage.setItem('idModules', JSON.stringify(tabIdModules));

    let idMods = JSON.parse(localStorage.getItem('idModules'));
    let timeF = localStorage.getItem('timeF');

    durationFormation = timeF;
    total_duration.innerText = `Temps total: ${timeF} heure(s)`;
    const token = localStorage.getItem('token');
    



         /////// Récupération des informations pour chaque modules ///////
    ////////////////////////////////////////////////////////////////
    for(let id of idMods ) {
        fetch(`http://localhost:3000/api/module/${id}`, {
            method:'GET',
            headers: {
                'accept': 'application/json',
                'content-type' : 'application/json',
                'authorization' : `Bearer ${token}`
            }
        })
        .then(data => { return data.json()})
        .then(res => { 
            console.log('Res Module data:', res);
            tabNamesModules.push(res.nameModule);
            tabDocsFormationCodes.push(res.allDocs);
           
            return tabNamesModules,tabDocsFormationCodes;
        })
    }


    console.log('namesModules:',tabNamesModules, 'CodesDocs:',tabDocsFormationCodes);

    
    /////////// Envoi information création formation /////////////////
    /////////////////////////////////////////////////////////////////

        let newFormation = {
            nameFormation: nameFormation,
            priceFormation: priceFormation,
            namesModules: tabNamesModules,
            docsFormationCodes: tabDocsFormationCodes
         }
        
        fetch(`http://localhost:3000/api/postformation`, {
            method:'POST',
            body: JSON.stringify(newFormation),
            headers: {
                'accept': 'application/json',
                'content-type' : 'application/json',
                'authorization': `Bearer ${token}`
            }
        })
        .then(data => {return data.json()})
        .then(res => {
            
            console.log(res);

            document.querySelector('.errValidMsg').style.color = 'green';
            document.querySelector('.errValidMsg').style.fontSize = '1.6rem';
            document.querySelector('.errValidMsg').innerText = 'Formation Crée ! ✅.';

            setTimeout(() => {
                document.querySelector('.errValidMsgFormationPost').innerText = '';
            },2800)

        })

    


       }  else {
        document.querySelector('.errValidMsg').innerText = '';
        document.querySelector('.errValidMsgFormationPost').style.color = 'red';
        document.querySelector('.errValidMsgFormationPost').style.fontSize = '1.6rem';
        document.querySelector('.errValidMsgFormationPost').innerText = 'Veuillez recommencer une nouvelle sélection, en précisant le nom et le prix de formation, merci.';
    
        setTimeout(() => {
            document.querySelector('.errValidMsgFormationPost').innerText = '';
        },2800)
    
     } 
      
    

    
    
    
    
    // document.querySelector('.total-duration').textContent = somme + 'Heure(s)';
    // priceManagement();
    // totalDuration.innerHTML = `Temps total : ${totalTime} heures`;
    // console.log(timesFormations);

//    let box = document.querySelector('.boxSelected');
  
//     if (box.getAttribute('data-role') === 'Exploitants') {

//         location.replace('./Formations/reaEx.html');

//     } else if (box.getAttribute('data-role') === 'Enseignants') {

//         location.replace('./Formations/reaTeachers.html');

//     } else if ( box.getAttribute('data-role') === 'FormationX') {

//         location.replace('./Formations/rea3.html');
//     }



     
            return choiceSelectionLock = false;
 }
}