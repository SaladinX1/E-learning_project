
const displayFileButton = document.querySelector('.displayButton');
const file_group = document.querySelector('.file-group');
let logoutButton = document.querySelector('.deconnexion');

const choiceInput = document.querySelector('.choiceInput');
const injection = document.querySelector('.injectChoice');

const formulaireCreation = document.querySelector('.creaForm');




let showFiles = false; 

// const price = document.querySelector('#price');

 const deleteFormationButon = document.querySelector('#deleteFormationButton');



// price.addEventListener('change', () => {

//     if( document.querySelector('#price').value < 0) {
//         return document.querySelector('#price').textContent = 0;
//     }

// })




// Fonctionnalité de creation formation

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
                name: document.querySelector('#name').value,
                price: document.querySelector('#price').value,
                duration: document.querySelector('#duration').value,
                file: document.querySelector('#document').value,
                file2: document.querySelector('#document2').value,
                file3: document.querySelector('#document3').value,
                file4: document.querySelector('#document4').value,
                file5: document.querySelector('#document5').value,
                file6: document.querySelector('#document6').value,
                file7: document.querySelector('#document7').value,
                file8: document.querySelector('#document8').value,
                file9: document.querySelector('#document9').value,
                file10: document.querySelector('#document10').value,
                
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

               // const id = res.id;
              //  localStorage.setItem('IdFormation', id);
                alert('Bravo ! La Formation a été crée :)')
                window.location.reload();
            })
            .catch(error => console.error(error))
            
            lock = true;
        }
        
    })
};






// Gestion button affichage files suplémentaires

(() => {
    
    choiceInput.style.display = 'none';
    choiceInput.innerHTML +=  
    
    ` <h3>Veuillez chosir quel fichier à ajouter :</h3>
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
    // choiceInput.innerHTML = '';
    
    if(showFiles == false )  {
        
        choiceInput.style.display = 'block';
        displayFileButton.innerText = '-';
        showFiles = true;
        
    } else if(showFiles  == true) {
        
        //file_group.style.display = 'none';
        displayFileButton.innerText = '+'
        hideChoice();
        showFiles = false;

    }
};

let Pdfs = document.querySelector('#pdfNumber');
let Videos = document.querySelector('#videoNumber');
let h4 = document.createElement('h4');
choiceInput.appendChild(h4);

Pdfs, Videos;

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
    
    
    if ( value < 0) {
        validationValues.videos = false;
        if(block == false) {
            h4.innerText = "Vous ne pouvez pas choisir une valeur inférieur à 1";
            block = true;
            return value = '';
        }
        
    } else {
        
        validationValues.videos = true;
        h4.innerText = '';
        return nbVideosValue + value;
    };
    
    
    
})

nbPdfs.addEventListener('change', (e) => {
    
    let block = false;
    
    let value = parseInt(e.target.value);

    if ( value < 0) {
        validationValues.pfds = false;
        if(block == false) {
            
            h4.innerText = "Vous ne pouvez pas choisir une valeur inférieur à 1";
            block = true;
            return value = '';
        } else {
       // nbPdfsValue = value;
        validationValues.pfds = true;
        h4.innerText = '';
        
        return nbPdfsValue + value;
        };
    }
})



let validationFiles = document.querySelector('#validationFilesAdded');
let deletionFiles = document.querySelector('#validationFilesDeleted');
validationFiles.addEventListener('click', () => {

    if( validationValues.videos == true && validationValues.pfds == false ) {
        displayVideoInputs(nbVideosValue);
    } else if(nbVideosValue < 0 || nbPdfsValue < 0) {
        h4.innerText = "Vous ne pouvez pas choisir une valeur inférieur à 1";
        return;
    }
    
    else if(validationValues.pfds == true && validationValues.videos == false){
     displayPdfInputs(nbPdfsValue);
 }
        
    else if(validationValues.pfds == true && validationValues.videos == true){
     displayVideoInputs(nbVideosValue);
     displayPdfInputs(nbPdfsValue);
 }
   
    else  {
        
        
        h4.innerText = 'Veuillez saisir une valeur, une valeur positive, merci';
        console.log('error');
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


function displayVideoInputs(value) {

  
        
    let inputVideo = injection.innerHTML += ` 
     <div class="input-group">
    <label for="video">Vidéo :</label>
    <input id="video" type="file">
     </div> 
     `;
  
    return inputVideo.repeat(parseInt(value));

};
    

    function displayPdfInputs(value) {

       

        let inputPdf = injection.innerHTML += ` 
        <div class="input-group">
        <label for="document">PDF :</label>
        <input class="doc" name="file"  id="document" type="file" >
        </div>
        `;
    
        return inputPdf.repeat(parseInt(value));
 
        
    }

// Fonctionnalité de récupération des formation depuis la BDD


let formationsId = [];

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

        console.log(res);

        // for(let IdFormation of res.id) {

        //     formationsId.push(IdFormation);

        //     return formationsId;
        // }

      //  console.log(formationsId); 

        for(let formations of res) {

           
                
                document.querySelector('.recoverAllFormation').innerHTML += `
                
                                                <div class="recoverAllFormation__box">
                                                   <h1  id="formationName"> ${formations.name} </h1>
                                                    <p>  ${formations.price} € </p>
                                                    <p> ${formations.duration} Heure(s) </p>
                                                    <p> ${formations.file} </p>
                                                    <p> ${formations.file2} </p>
                                                    <p> ${formations.file3} </p>
                                                    <p> ${formations.file4} </p>
                                                    <p> ${formations.file5} </p>
                                                    <p> ${formations.file6}</p>
                                                    <p> ${formations.file7}</p>
                                                    <p> ${formations.file8}</p>
                                                    <p> ${formations.file9}</p>
                                                    <p> ${formations.file10} </p>
                                                    <button type="button" id="UpdateFormationButton" >Modifier</button>
                                                    <button type="button"  onclick='callFormationDelete()' id="deleteFormationButton" >supprimer</button>
                                                 </div>
                                        ` 
                                        
                                    }

                                    
                                    
                           
 }).catch(err => {
    alert('Une erreur est survenue !');
 });
};
getAllFormations();


                                



// Envoie requête suppression formation 





   
    

//    box.addEventListener('click', () => {
//     let target = box.getAttribute('name');

//     if(confirm('Êtes-vous sûr de vouloir supprimer cette formation ? \b\r Cette action est définitive.')) {
         
//         for( let i of nameFormationTab) {

            
//             if(i == target) {
                
//                     let formationDestroyed = {
//                         name: i
//                     };

//                     deleteFormation(formationDestroyed);
//                     console.log(formationDestroyed);               
//                 }
//         }
//     }
//    })

 

// function callDeleteFormation(e) {
    
    
  
    
//     let formationTarget = e.target.getAttribute('name')

   
   
    
    
// }

function deleteFormation(formationDestroyed) {
    
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/api/deleteFormation', {

    method: 'delete',
    body: JSON.stringify(formationDestroyed),
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





