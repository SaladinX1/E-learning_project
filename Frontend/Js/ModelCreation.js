
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
let choiceSelectionFLock = false;
let showFiles = false; 
let lockInput = false;

const namePut = document.querySelector('#namePut');
// const pricePut = document.querySelector('#pricePut');
 const durationPut = document.querySelector('#durationPut');
 //const file = document.querySelector('#file');
 const modulePutForm = document.querySelector('#putModule');


 const composition = document.querySelector('.containerGestion__selection--frame');
 const compositionF = document.querySelector('.containerGestion__selection--frameF');
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
let finalP2 = [];
let finalV2 = [];

let uniqueDocs = [];

let formationsDocs = [];


let lock;


function trierFichier(arr) {
    const filteredArr = arr.filter(item => item[0] === 'PDF' || item[0] === 'VIDEO'); // Filtrage des sous-tableaux contenant uniquement V et P
    filteredArr.sort((a, b) => a[2] - b[2]); // Tri en fonction de l'élément à l'index 2 de chaque sous-tableau
  
    const items = filteredArr.map((obj) => [obj[0], obj[1]]); // Récupération de l'élément à l'index 0 et à l'index 1.name de chaque sous-tableau
  
    return items;
  }
  

function createModules() {
    
  // Utiliser les valeurs de 'item' sélectionnées comme souhaité
  
  const sortedItems = trierFichier(posFiles);

   console.log(sortedItems);

    localStorage.setItem('selectionData', JSON.stringify(posFiles));

   
    lock = false;

      removeDuplicatesDocs(allDocs);

      localStorage.setItem('allDocs', JSON.stringify(allDocs));

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
                    newModule: { nameModule: document.querySelector('#nameF').value,  durationModule: document.querySelector('#duration').value},
                    allDocsSelection: {documents: sortedItems}
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
    
    ` <h3>Veuillez chosir, le nombre de champs puis, donner un ordre de selection à chacun d'eux :</h3>
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
                 
                 console.log(document.querySelectorAll('.input-groupB').length);

                 if(allDocs.length <= document.querySelectorAll('.input-groupB').length - 1) {
    
                     if (valueVideo != ' ') {
       
                       let V = 'VIDEO';
       
                       finalV = [V , valueVideo];
       
                       console.log(valueVideo);
                       console.log(allDocs);
                               allDocs.push(finalV);
           
                                   return  allDocs, finalV;
                               } else {
                                       return;
                                   }
                } else {
                    h4.style.color = 'red';
                    h4.textContent = 'Tableau rempli, recomencez une nouvelle selection !';
                    setTimeout(() => {
                        h4.textContent = '';
                    }, 2000);
                }
    
                        })
        });
  })   
  
  let pdfFiles = document.querySelectorAll('#pdfs');
  
  pdfFiles.forEach(pdf => {
      
      pdf.addEventListener('click', ()=> {
          
        pdf.addEventListener('change', (e) => {
             valuePdf = e.target.value; 

             console.log(document.querySelectorAll('.input-groupB').length);
          
            
                // if(allDocs.length <= document.querySelectorAll('.input-groupB').length)
             if(allDocs.length <= document.querySelectorAll('.input-groupB').length - 1) {

                 if (valuePdf != ' ') {
     
                  let P = 'PDF';
     
                  finalP = [P , valuePdf]
                 
                     allDocs.push(finalP);
                     console.log(allDocs);
     
                         return allDocs, finalP;
                     } else {
                             return;
                         }
            } else {
                h4.style.color = 'red';
                h4.textContent = 'Tableau rempli, recomencez une nouvelle selection !'
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


    document.querySelectorAll('#ordre').forEach(order => {
        order.addEventListener('change', (e) => {
            e.preventDefault();

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
                

                document.querySelector('.pdfLabel').textContent = `Document N° ${orderValue}`;
              if(posFiles.length <= document.querySelectorAll('#ordre').length - 1) {
                let P = 'PDF';
                finalP2 = [P , order.previousElementSibling.previousElementSibling.value, orderValue]
                posFiles.push(finalP2); 
                  console.log(posFiles);
                } else if (posFiles.length > document.querySelectorAll('#ordre').length - 1) {  ///////////////////////////// 
                    h4.textContent = `Toutes les positions ont été établi ! Recommencez votre sélection.`;
                    h4.style.color = 'red';
                    setTimeout(() => {
                        h4.textContent = '';
                    }, 2000);
                } 
            
                localStorage.removeItem('allDocs');
                localStorage.setItem('allDocs', JSON.stringify(allDocs));
               
                document.querySelector('.validPopUp').style.display = 'block';
                document.querySelector('.validPopUp').textContent = `✅ Choix éffectué !`; 

                setTimeout(() => {
                document.querySelector('.validPopUp').style.display = 'none';
            },2500);

            return posFiles;
            
        } else if (order.getAttribute('name') == 'video') {
               
                document.querySelector('.videoLabel').textContent = `Document N° ${orderValue}`;
    
                if(posFiles.length <= document.querySelectorAll('#ordre').length - 1) {
                    let V = 'VIDEO';
                    finalV2 = [V , order.previousElementSibling.previousElementSibling.value, orderValue];
                    posFiles.push(finalV2); 
                    console.log(posFiles);
                } else if (posFiles.length > document.querySelectorAll('#ordre').length - 1) {  ///////////////////////////// 
                    h4.textContent = `Toutes les positions ont été établi ! Recommencez votre sélection.`;
                    h4.style.color = 'red';
                    setTimeout(() => {
                        h4.textContent = '';
                    }, 2000);
                } 
          
                localStorage.removeItem('allDocs');
                localStorage.setItem('allDocs', JSON.stringify(allDocs));
                document.querySelector('.validPopUp').style.display = 'block';
                document.querySelector('.validPopUp').textContent = `✅ Choix éffectué !`; 
                
                setTimeout(() => {
                    document.querySelector('.validPopUp').style.display = 'none';
                },2500); 

                return posFiles;
          } 

      })
    })  
})


deletionFiles.addEventListener('click', () => {
    allDocs = [];
    posFiles = [];
    items = [];
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
            <div class="input-groupB" data-id="${i}">
           <label for="video" class="videoLabel">Vidéo N° ${i+1}:</label>
           <input id="video"  type="file"/>
           <label for="ordre" >Ordre Vidéo : </label> 
               <input type="number" id="ordre" name='video'/>
           </div> 
           <div class="popUp" data-id='${i}'>
                <p class='validPopUp'></p>
                </div>
                `;
                // <button class="cancelPopUp">Annuler</button>
          }
        //   <button class="validPopUp">Valider</button>
        for(let i = 0; i < nbPdfsValue; i++) {

            injection.innerHTML += `<div class="input-groupB" data-id="${i}">
            <label for="pdfs" class='pdfLabel'>PDF N° ${i+1} :</label>
            <input class="doc"  id="pdfs" type="file"/>
            <label for="ordre" >Ordre Pdf: </label> 
            <input type="number" id="ordre" name='pdf'/>
            </div>
            <div class="popUp" data-id='${i}'> 
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
        localStorage.removeItem('selectionData');
        localStorage.removeItem('Produit Type');
        localStorage.removeItem('formationData');
        localStorage.removeItem('DocsFormation');
        localStorage.removeItem('idFormations');
        localStorage.removeItem('priceF');
        localStorage.removeItem('nameF');

        if( localStorage.getItem('idModules') && localStorage.getItem('timeF') && localStorage.getItem('timeFormation')){
            localStorage.removeItem('idModules');
            localStorage.removeItem('timeF');
            localStorage.removeItem('timeFormation');
        }

        total_duration.style.display = 'none';

for(let modules of res) {


                                                document.querySelector('.recoverAllModules').innerHTML += `
                                                <div class="recoverAllModules__box"  data-docs="${modules.allDocs}" data-id="${modules.id}" data-time="${modules.durationModule}" >
                                                   <h1  id="moduleName">Module ${modules.nameModule} </h1>
                                                    <h3> ${modules.durationModule} heure(s) </h3>                                               
                                                    <button type="button"  data-id="${modules.id}" data-docs="${modules.allDocs}"  id="deleteModuleButton" >supprimer</button>   
                                                    </div>
                                                    `                                             
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
                                                            
                                               
                                                              
                                                            
                                                            total_duration.style.display = 'block';
                                                            
                                                          //  localStorage.setItem(`moduleData`, moduleData);
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

  });

};
        getAllModules();



function cancelComposition() {

    composition.style.display = 'none';
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
let durationFormation;
let modulesCompo = [];

function validationComposition() {

    let nameCursus = document.querySelector('#cursusName').value;
    let priceCursus =  document.querySelector('#cursusPrice').value;
    //let descCursus =  document.querySelector('#cursusDesc').value;
   //let roleCursus =  document.querySelector('#cursusRole').value;

    
 if(choiceSelectionLock == false ) {
        choiceSelectionLock = true;

        localStorage.setItem('timeFormation', JSON.stringify(tabTimeModules));
    timeManagement();

    localStorage.setItem('idModules', JSON.stringify(tabIdModules));

    let idMods = JSON.parse(localStorage.getItem('idModules'));
    let timeF = localStorage.getItem('timeF');

    durationFormation = parseInt(timeF);
    total_duration.innerText = `Temps total: ${timeF} heure(s)`;
    const token = localStorage.getItem('token');

   // && roleCursus != ''
        if ( nameCursus != '' && priceCursus != '' ) {

            /////// Récupération des informations pour chaque modules ///////
    ////////////////////////////////////////////////////////////////
    const moduleRequests = idMods.map(id => {
        return fetch(`http://localhost:3000/api/module/${id}`, {
            method:'GET',
            headers: {
                'accept': 'application/json',
                'content-type' : 'application/json',
                'authorization' : `Bearer ${token}`
            }
        })
        .then(data => data.json())
        .then(res => { 
            console.log('Res Module data:', res);

            modulesCompo.push({name: res.nameModule, docs: res.allDocs})
            console.log('modulesCompo:',modulesCompo);
            tabNamesModules.push(res.nameModule);
            tabDocsFormationCodes.push(res.allDocs);
        });

    });

    console.log('modulesCompo:', modulesCompo);

    Promise.all(moduleRequests)
    .then(() => {
        console.log('modulesCompo:', modulesCompo);
    
    /////////// Envoi information création formation /////////////////
    /////////////////////////////////////////////////////////////////
    let newFormation = {
        nameFormation: nameCursus,
        priceFormation: priceCursus,
       // descFormation: descCursus,
        durationFormation: durationFormation,
        namesModules: tabNamesModules,
      //  role: roleCursus,
        modulesCompo: modulesCompo,
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

        alert('Formation crée !')
        console.log(res);

      
        document.querySelector('.errValidMsg').style.color = 'green';
        document.querySelector('.errValidMsg').style.fontSize = '2rem';
        document.querySelector('.errValidMsg').innerText = 'Formation Crée ! ✅.';
        
        setTimeout(() => {
            document.querySelector('.errValidMsg').innerText = '';
        },2800)

        location.reload();
    })
    return choiceSelectionLock = false;
});


        } else {

            document.querySelector('.errValidMsg').innerText = '';
            document.querySelector('.errValidMsgFormationPost').style.color = 'red';
            document.querySelector('.errValidMsgFormationPost').style.fontSize = '1.6rem';
            document.querySelector('.errValidMsgFormationPost').innerText = 'Veuillez préciser le nom, le prix de formation, ainsi que son type, merci.';
        
            setTimeout(() => {
                document.querySelector('.errValidMsgFormationPost').innerText = '';
            },2800)

        }
            return choiceSelectionLock = false;
 } else {
    document.querySelector('.errValidMsg').innerText = '';
    document.querySelector('.errValidMsgFormationPost').style.color = 'red';
    document.querySelector('.errValidMsgFormationPost').style.fontSize = '1.6rem';
    document.querySelector('.errValidMsgFormationPost').innerText = 'Veuillez recommencer une nouvelle sélection, en précisant le nom et le prix de formation, merci.';

    setTimeout(() => {
        document.querySelector('.errValidMsgFormationPost').innerText = '';
    },2800)

 } 
}


////////////////////////////  RECUPERATION FORMATIONS ////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let tabIdFormations = [];

const btnGetFormations = document.querySelector('.btnGetFormations');
btnGetFormations.addEventListener('click', () => {
    document.querySelector('.btnGetFormations').style.display = 'none';
    document.querySelector('.recoverAllFormations').style.display = 'block';
    document.querySelector('.btnHideFormations').style.display = 'block'; 
    document.querySelector('.btnHideFormations').addEventListener('click', () => {
        document.querySelector('.recoverAllFormations').style.display = 'none';
        document.querySelector('.btnHideFormations').style.display = 'none';
        document.querySelector('.btnGetFormations').style.display = 'block';
    })
})

function cancelFormation() {
    compositionF.style.display = 'none';
     compositionF.innerHTML = `<h1> Selection : </h1>
     <h4 class="msgFormationSelected"></h4>
   </div>
   <button type="button" id="cancel-formation" onclick="cancelFormation()" >Annuler</button>
   <button type="button" id="valid-formation"  onclick="validationFormation()" >Valider</button>`;
     choiceSelectionFLock = false;
     localStorage.removeItem('idFormations');
     localStorage.removeItem('idF');
     tabIdFormations = [];
     document.querySelector('.msgFormationSelected').innerText = '';
};

function validationFormation() {
    location.replace('/Frontend/pages/profil.html');
}

const token = localStorage.getItem('token');

fetch('http://localhost:3000/api/formations', {
    method: 'GET',
    headers: {
        'accept' : 'application/json',
        'content-type' : 'application/json',
        'authorization' : `Bearer ${token}`
    }
})
.then(data => { return data.json()})
.then(res => {

    localStorage.removeItem('idFormations');
    localStorage.removeItem('idF');
console.log(res);
   // console.log('formations:', res);
//    <h2  id="formationType"> ${formation.role} </h2>
   
   for(let formation of res) {
       
       document.querySelector('.recoverAllFormations').innerHTML += `
       <div class="recoverAllFormations__box" data-docs="${formation.docsFormationCodes}" data-id="${formation.id}" data-time="${formation.durationFormation}" >
       <h1  id="formationName"> ${formation.nameFormation} </h1>
        <h3> Prix: ${formation.priceFormation}€ </h3>
         <h3> ${formation.durationFormation} heure(s) </h3>                                               
         <button type="button"  data-id="${formation.id}" data-docs="${formation.docsFormationCodes}"  id="deleteFormationBtn" >supprimer</button>   
         </div>  
        `;

        tabIdFormations.push(parseInt(formation.id));
       
    }

  


    ////////////////////////  //////////   TRAITEMENT GET ONE FORMATIONS //////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
                                        // Gestion getOneFormation Infos 
   ///////////////////////////////////////////////////////////////////
   const formationsBoxes = document.querySelectorAll('.recoverAllFormations__box');
   formationsBoxes.forEach(box => { 
       box.addEventListener('click', (e) => {
           e.preventDefault();
           compositionF.style.display = 'block';
           let id = box.getAttribute('data-id');
      
           localStorage.setItem('idF', id);
       ////////// Récupération des informations pour chaque formation ///////////

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
            console.log(data); 

                   if (choiceSelectionFLock == false) {

                       ////////// Récupération des documents formations \\\\\\\\\\\\
    ///////////////////////////////////////////////////////////////////
    
                    let idDocsCodes = box.getAttribute('data-docs');
                    console.log('idDocsCodes:',idDocsCodes);
                   console.log(idDocsCodes.split(',')); 
                   for( let code of idDocsCodes.split(',')) {

                        fetch(`../docs/${code}`, {
                            method: 'GET',
                            headers: {
                                 'accept' : 'application/json',
                                 'content-type' : 'application/json',
                                 'authorization' : `Bearer ${token}`
                            }
                         })
                         .then(data => {return data.json()})
                         .then( docs => {
                          console.log(docs);           
                         })
                    }
                       
                      
                      let formationSelected = `<div class='boxSelected' data-role="" data-order=''>
                                                  <h4><label for='modulePos'> ${data.nameFormation}, \<br> ${data.durationFormation} heure(s)</label></h4>
                                                </div>`;
                                                compositionF.innerHTML += formationSelected;


                     return choiceSelectionFLock = true;

                    } else if(choiceSelectionFLock == true) {
                   document.querySelector('.msgFormationSelected').style.color = 'red';
                    document.querySelector('.msgFormationSelected').innerText = 'Une validation à la fois seulement.'
                    setTimeout(() => {
                       document.querySelector('.errValidMsg').innerText = '';
                   },2800)
               }
           })
       })
   }) 

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   /////////////////////////////////////////////// TRAITEMENT REQUÊTE DELETE ////////////////////////////////////////////////////////////////



   const deleteFormationButtons = document.querySelectorAll('#deleteFormationBtn');
   deleteFormationButtons.forEach(a => {
       let id = a.getAttribute('data-id');
     
       a.addEventListener('click', (e) => {
           e.preventDefault();
                                                  
               if(confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {

                   const token = localStorage.getItem('token');

                   
                   
                   
                   // Envoie requête suppression relation Formation utilisateurs
                   fetch(`http://localhost:3000/api/formationdelete/${id}`, {                                       
                       method: 'delete',
                       headers: {
                        'accept' : 'application/json',
                        'content-type' : 'application',
                        'authorization' : `Bearer ${token}`
                    }
                })
                .then( data => { return data.json()})
                .then( res => {
                    
                    ///removerelation
                    fetch(`http://localhost:3000/api/removerelation/${id}`, {                                       
                       method: 'delete',
                       headers: {
                           'accept' : 'application/json',
                           'content-type' : 'application',
                           'authorization' : `Bearer ${token}`
                        }
                    })
                    .then( data => { return data.json()})
                    .then(res => {

                            // Envoie requête suppression Formation 
                            console.log(res);
                            localStorage.removeItem('DocsFormation');
                            localStorage.removeItem('formationData');
                           window.location.reload();                                                

                        }).catch(err => console.log(err));
                } )
                .catch(err => console.log(err));  
                   
                   

               }                                         
       })
   })
})

