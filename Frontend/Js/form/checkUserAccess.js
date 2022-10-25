const accessFormation = document.querySelectorAll('.resume__main__module');
const accessMsg = document.querySelector('#accessMsg');


 accessMsg.style.display = 'none';

accessFormation.forEach(el => {

     el.addEventListener('click', deniedAccess)
     
});




function deniedAccess() {

 
    const token = localStorage.getItem('token');
 
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

        accessFormation.href = '../formationRea.html';
   }

}


