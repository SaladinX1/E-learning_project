
const displayFileButton = document.querySelector('.displayButton');
const file_group = document.querySelector('.file-group');
let logoutButton = document.querySelector('.deconnexion')

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
        })
        .catch(error => console.error(error))

        lock = true;
        }
 
})
};


// Gestion button affichage files suplémentaires

function displayFileInput() {
    

    if(showFiles == false )  {

            file_group.style.display = 'block';
        displayFileButton.innerText = '-';
        showFiles = true;

        return;

    
    } else  if(showFiles  == true) {

        file_group.style.display = 'none';
        displayFileButton.innerText = '+'
        showFiles = false;

        return;
        
    }

}


// Fonctionnalité de récupération des formation depuis la BDD


(function getAllFormations() {

    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/api/formations', {
        method: 'GET',
        headers: {
            'accept' : 'application/json',
            'content-type' : 'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    .then(data => { return data.json(); })
    .then(res => { 

        let containerFormations = document.querySelector('.recoverAllFormation');

        for(let formation in res) {
            
            containerFormations.innerHTML += ` <h1> ${formation.name} </h1>
                                                <p> ${formation.price} </p>
                                                <p> ${formation.duration} </p>
                                                <p> ${formation.file} </p>
                                                <p> ${formation.file2} </p>
                                                <p> ${formation.file3} </p>
                                                <p> ${formation.file4} </p>
                                                <p> ${formation.file5} </p>
                                                <p> ${formation.file6} </p>
                                                <p> ${formation.file7} </p>
                                                <p> ${formation.file8} </p>
                                                <p> ${formation.file9} </p>
                                                <p> ${formation.file10} </p>
                                                
            ` 
        }
 }).catch(err => console.log(err));

})();