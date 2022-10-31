const accessFormation = document.querySelectorAll('.resume__main__module');
const accessMsg = document.querySelector('#accessMsg');
const token = localStorage.getItem('token');
const logoutButton = document.querySelector('.deconnexion');

if(!token) {
     
     logoutButton.style.display = 'none';
}



accessMsg.style.display = 'none';

accessFormation.forEach(el => {
     
     el.addEventListener('click', deniedAccess)
     
});





function deniedAccess() {
     
 
     
     
     if (!token) {

      
          accessMsg.style.display = 'inline';
          accessMsg.style.textAlign = 'center';
          accessMsg.style.fontSize = '1.5rem';
        accessMsg.style.color = 'red';
        accessMsg.style.paddingTop = '0px';
       
        
     setTimeout(() => {
          window.location.replace('../formationHub.html');
     }, 1600)
   
   } else {

        window.location.replace('../formationRea.html');

   }
   
}






