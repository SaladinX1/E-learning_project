
    const id = localStorage.getItem('id');


    const profilInfo = document.querySelector('.profil__informations');


    if(id) {

        fetch( `http://localhost:3000/api/getuser/${id}`)
    .then( data => {
        console.log(data);
      return data.json();
    })
    .then( (res) => {
        console.log(res);
    
    
        for ( let info in res) {
    
            profilInfo.innerHTML += `<h3>Nom : ${info.name} </h3>
            <h3>Prénom : ${info.secondName}</h3>
            <h3>email : ${info.email}</h3>
            <h3>Tél : ${info.telephone}</h3>
            <h3>Mot de passe : ${info.password}</h3>
            <h3>Document type : ${info.documentType}</h3> 
    `
    
        }
    
    })

    } else {

        window.location.replace('../pages/index.html')

    }
    
    
    



