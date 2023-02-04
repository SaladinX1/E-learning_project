
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
  
       
    
            profilInfo.innerHTML += 

                        `<h3> Nom : ${res.name} </h3>
                        <h3>Prénom : ${res.secondName}</h3>
                        <h3>E-mail : ${res.email}</h3>
                        <h3>Téléphone : ${res.telephone}</h3>
                        <h3> Attestation enseignement : \<br/>  ${res.documentType}</h3> 
                        `
            // <h3>Mot de passe : ${res.password}</h3>
    })

    } else {

      //  window.location.replace('../pages/index.html')

    }
    
    
    



