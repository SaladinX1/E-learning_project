
const profilInfo = document.querySelector('.profil__informations');

const id = localStorage.getItem('id');



fetch( `http://localhost:3000/api/getuser/${id}`,
 {
    method : 'get',
    headers : {
        'Content-type' : 'application/json',
        'Accept' : 'application/json' 
    },
})
.then( data => {
     data.json()
    .then( res => {
        console.log(res.json);
        

        profilInfo.innerHTML += `<h3>Nom : ${res.name} </h3>
                                <h3>Prénom : ${res.secondName}</h3>
                                <h3>email : ${res.email}</h3>
                                <h3>Tél : ${res.telephone}</h3>
                                <h3>Mot de passe : ${res.password}</h3>
                                <h3>Document type : ${res.documentType}</h3> 
                                `
    }).catch(err => console.log(err))
})
.catch( err => { throw err })