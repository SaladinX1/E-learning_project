
const deleteUserButton = document.querySelector('.suppression');

deleteUserButton.addEventListener('click', deleteAccount);


deleteUserButton.addEventListener('click', deleteAccount);

function deleteAccount() {

    confirm('Êtes-vous sûr de vouloir supprimer votre compte ? \b\r Cette action est définitive.');

    fetch( `http://localhost:3000/api/destroyuser/${id}`, 
    {method : 'delete',
    headers :  {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }})
    .then( res => {
    alert('Votre compte a bien été supprimé ! ')
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    window.location.replace('../../index.html');
    })
    .catch(err =>  console.log(err))
    

}

