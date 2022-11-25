
const displayFileButton = document.querySelector('.displayButton');
const file_group = document.querySelector('.file-group');
let logoutButton = document.querySelector('.deconnexion');

const choiceInput = document.querySelector('.choiceInput');

const formulaireCreation = document.querySelector('.creaForm');

let showFiles = false; 

const price = document.querySelector('#price');


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
            alert('Bravo ! La Formation a été crée :)')
            window.location.reload();
        })
        .catch(error => console.error(error))

        lock = true;
        }
 
})
};


// Gestion button affichage files suplémentaires

function displayFileInput() {
    
    choiceInput.innerHTML = '';
    
    choiceInput.style.display = 'block';
    choiceInput.style.border = '1px solid black';
    choiceInput.style.margin = '0 10px';
    choiceInput.style.padding = '10px';
    choiceInput.style.borderRadius = '10px';
    choiceInput.innerHTML +=  
    
    ` <h3>Veuillez chosir combien de fichier(s) à ajouter :</h3>
    <label>Vidéo : </label>
    <input id='videoNumber' type='number'/>
    <label>Pdf : </label>
    <input id='pdfNumber' type='number'/> 
    `;

    //let idVideoNb = document.querySelector('   #videoNumber');
    //let idPdfNb = document.querySelector('#pdfNumber');

  //  choiceInput.append()


    let nbVideos = document.querySelector('#videoNumber').value;
    let nbPdfs = document.querySelector('#pdfNumber').value;

    choiceInput.innerHTML += `<button onclick='hideChoice()' ">Annuler</button> <button id="validationFilesAdded" onclick='displayFilesSelected(${nbVideos, nbPdfs})' >Valider</button>`;                        

    // if(showFiles == false )  {

    //         file_group.style.display = 'block';
    //     displayFileButton.innerText = '-';
    //     showFiles = true;

    //     return;

    
    // } else  if(showFiles  == true) {

    //     file_group.style.display = 'none';
    //     displayFileButton.innerText = '+'
    //     showFiles = false;

    //     return;
        
    // }

}

function hideChoice() {

    choiceInput.style.display = 'none';

}


document.querySelector('#validationFilesAdded').addEventListener('click', displayFilesSelected);


function displayFilesSelected(nbv, nbf) {

    

    if (nbv > 0) {

        let inputVideo = formulaireCreation.innerHTML += ` 
         <div class="input-group">
        <label for="video">Vidéo :</label>
        <input id="video" type="file">
         </div> 
         `;
         
       let inputVideoCreated =  nbv * inputVideo;
      
       let inputVideoDisplayed = formulaireCreation.appendChild(inputVideoCreated);

       return inputVideoDisplayed;
    } else if (nbf > 0) {

        let inputPdf = formulaireCreation.innerHTML += ` 
        <div class="input-group">
        <label for="document">PDF :</label>
        <input class="doc" name="file"  id="document" type="file" >
      </div>
        `;

        let inputPdfCreated =  nbf * inputPdf;
      
        let inputpdfDisplayed = formulaireCreation.appendChild(inputPdfCreated);
 
        return inputpdfDisplayed;

    }

}



// Fonctionnalité de récupération des formation depuis la BDD


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
    .then(data => { return data.json(); })
    .then(res => { 
console.log(res.body);
        for(let formation in res) {


            
            
            
            //  for(let i; i < formation.length ; i++) {
                
                document.querySelector('.recoverAllFormation').innerHTML += `
                
                                                <div>
                                                   <h1> ${formation.name} </h1>
                                                    <p> ${formation.price} </p>
                                                    <p> ${formation.duration} </p>
                                                    <p> ${formation.file} </p>
                                                    <p> ${formation.file2} </p>
                                                    <p> ${formation.file3} </p>
                                                    <p> ${formation.file4} </p>
                                                    <p> ${formation.file5} </p>
                                                    <p> ${formation.file6}</p>
                                                    <p> ${formation.file7}</p>
                                                    <p> ${formation.file8}</p>
                                                    <p> ${formation.file9}</p>
                                                    <p> ${formation.file10} </p>
                                                 </div>
                                                    
                ` 
         // }
        }
        
 }).catch(err => console.log(err));

};

getAllFormations();