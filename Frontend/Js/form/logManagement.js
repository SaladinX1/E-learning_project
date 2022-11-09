// const accessFormation = document.querySelectorAll('.resume__main__module');
// const accessMsg = document.querySelector('#accessMsg');
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
const profil = document.querySelector('.profil');
const id = localStorage.getItem('id');




 // Gestion de l'affichage boutons selon connexion

    if (token && id) {

        logoutButton.style.display = 'block';
        connexionButton.style.display = 'none';
        inscriptionButton.style.display = 'none';
        profil.style.display = 'block';
   
       //  const id = localStorage.getItem('id');
    
       //  const url = `http://localhost:3000/api/getuser/${id}`;
    
       //  fetch(url, {
       //      headers: {
       //          'Content-Type' : 'Application/json',
       //          'Accept' : 'Application/json'
       //      }
       //  })
       //  .then( data => {
       //      data.json()
       //      .then( res => {
       //          userNameDisplay.textContent = `Bienvenue ${res.name} 😃`;
       //      })
       //  })
    } else  {
        logoutButton.style.display = 'none';
        connexionButton.style.display = 'block';
        inscriptionButton.style.display = 'block';
        profil.style.display = 'none';
   
    }



function logout() {

          localStorage.removeItem('token');
          localStorage.removeItem('id');
          sessionStorage.removeItem('token');
          window.location.replace('/index.html');
}


















// accessMsg.style.display = 'none';

// accessFormation.forEach(el => {
     
//      el.addEventListener('click', deniedAccess)
     
// });



// function deniedAccess() {
     
//      if (!token) {

//           accessMsg.style.display = 'inline';
//           accessMsg.style.textAlign = 'center';
//           accessMsg.style.fontSize = '1.5rem';
//         accessMsg.style.color = 'red';
//         accessMsg.style.paddingTop = '0px';
         
//      setTimeout(() => {
//           window.location.replace('../formationHub.html');
//      }, 1600)
   
//    } else {

//         window.location.replace('../formationRea.html');

//    }
   
// }






