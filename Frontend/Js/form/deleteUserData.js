// const searchIdDelete = window.location.search;
// const paramsIdDelete = new URLSearchParams(searchIdDelete);
// const idDelete = paramsIdDelete.get('id');

const deleteUserButton = document.querySelector('.suppression');



deleteUserButton.addEventListener('click', deleteAccount);


function deleteAccount() {

    confirm('Êtes-vous sûr de vouloir supprimer votre compte ? \b\r Cette action est définitive.');

    fetch( `http://localhost:3000/api/destroyuser`, {method : 'delete',
    headers :  {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }})
    .then( res => {
    alert('Votre compte a bien été supprimé ! ')
    })
    .catch(err =>  console.log(err))
    

}

