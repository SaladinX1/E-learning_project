
const exploitants = document.querySelector('#exploitants');
const enseignants = document.querySelector('#enseignants');
const formationX = document.querySelector('#formationX');
const timer = document.querySelector('.timer');
 let time2countDown = localStorage.getItem('timeFormation');

const data = localStorage.getItem('formationData');

if ( document.URL.includes("formation3.html") ) {

    
    const time = parseInt(time2countDown);
    console.log(typeof(time)); 

  setTimeout( () => {

    time - 1;
    timer.innerText = time;

 }, 1000);
    timer.innerHTML = timer;
    
    formationX.innerHTML = data;

} else if( document.URL.includes("formationEnseignants.html")) {

    const time = parseInt(time2countDown);

    setTimeout( () => {
  
      time - 1;
      timer.innerText = time;
  
   }, 1000)
      timer.innerHTML = timer;

    enseignants.innerHTML = data;

} else if ( document.URL.includes("formationExploitants.html")) {

    const time = parseInt(time2countDown);

    setTimeout( () => {
  
      time - 1;
      timer.innerText = time;
  
   }, 1000)
      timer.innerHTML = timer;

    exploitants.innerHTML = data;
}




