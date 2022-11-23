

let logoutButton = document.querySelector('.deconnexion')
 //const token = localStorage.getItem('token');
 //const id = localStorage.getItem('id');
const formulaireCreation = document.querySelector('.creaForm');


const price = document.querySelector('#price');


price.addEventListener('change', () => {

    if( document.querySelector('#price').value < 0) {
        return document.querySelector('#price').textContent = 0;
    }

})





if (token && id) {

    logoutButton.style.display = 'block';
    profil.style.display = 'block';

} else{

    logoutButton.style.display = 'none';
    profil.style.display = 'none';

}




 



formulaireCreation.addEventListener('submit', (e) => {
         e.preventDefault();


         function createFormation () {



            const newFormation = {
                name: document.querySelector('#name').value,
                price: document.querySelector('#price').value,
                duration:  document.querySelector('#duration').value,
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
                'authorization' : `Bearer ${token}`
            }
        }).then( res => {
            alert('Bravo ! La Formation a été crée :)')
        })
        .catch(error => console.error(error))
        
        
        
        }

        
})

