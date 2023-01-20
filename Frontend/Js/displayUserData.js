
    const idBis = localStorage.getItem('id');
    const tokenBis = localStorage.getItem('token');

    const profilInfo = document.querySelector('.profil__informations');


    if(idBis) {

        fetch( `http://localhost:3000/api/getuser/${idBis}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'authorization' : `Bearer ${tokenBis}`
         }
        })
    .then( data => {
      return data.json();
    })
    .then( (res) => {
  
       
    
            profilInfo.innerHTML += `<h3>Nom : ${res.name} </h3>
            <h3>Prénom : ${res.secondName}</h3>
            <h3>email : ${res.email}</h3>
            <h3>Tél : ${res.telephone}</h3>
            <h3>Mot de passe : ${res.password}</h3>
            <h3>Document type : ${res.documentType}</h3> 
    `
    
    })

    } else {

      //  window.location.replace('../pages/index.html')

    }
    
    
    



