
const exploitants = document.querySelector('#exploitants');
const enseignants = document.querySelector('#enseignants');
const formationX = document.querySelector('#formationX');
const timer = document.querySelector('.timer');
 let time2countDown = localStorage.getItem('timeFormation');

const data = localStorage.getItem('formationData');

let timerId;

const overlayPayment = document.querySelector('.overlay__paiement');
let priceSet = document.querySelector('.paymentBtn > span');
let paymentBtn = document.querySelector('.paymentBtn');
let cancelOverlay = document.querySelector('.cancelOder');
let cpfBtn = document.querySelector('#cpf_button');
const cbButton = document.querySelector('#cb_button');

const quizz = document.querySelector('.quizz_display');

if ( document.URL.includes("formation3.html") ) {
  
  let initialTime = parseInt(time2countDown);
  let Minutes = 59;
  let time2Seconds = 59;
  
  initialTime--;
  function formatedTime(timeHour, timeMinutes, timeSeconds) {
    return `${timeHour} : ${timeMinutes}: ${timeSeconds % 60 < 10 ? `0${timeSeconds % 60}`: timeSeconds % 60}`;
  };
  
  timerId = setInterval( (() => {

      if(initialTime > 0 && Minutes > 0 && time2Seconds > 0) {
       // initialTime--;
       time2Seconds--;
        timer.textContent = formatedTime(initialTime,Minutes, time2Seconds);
        return time2Seconds;

      }else if( time2Seconds == 0) {
    
        Minutes--;
        time2Seconds = 59
       timer.textContent = formatedTime(initialTime, Minutes, time2Seconds);
    return Minutes, time2Seconds;


      }else if(initialTime > 0 && Minutes == 0 && time2Seconds == 0) {
        initialTime--;
        Minutes = 59;
        time2Seconds = 59;
        timer.textContent = formatedTime(initialTime, Minutes, time2Seconds);
        return initialTime ,Minutes, time2Seconds;


      } else if( initialTime == 0 && time2Seconds == 0) {
        timer.textContent = ' Vous avez passé le temps requis pour tester vos connaissances avec un quizz, bravo !';
        clearInterval(timerId);
      }
    

  }), 1000);
    
    formationX.innerHTML = data;


    
    const documents = JSON.parse(localStorage.getItem('allDocs'));
    console.log(documents);
    
    let divMain = document.createElement('div');

    divMain.style.display = 'flex';
    divMain.style.flexDirection = 'column';
    divMain.style.justifyContent = 'flex-start';
    divMain.style.margin = '15px';
    divMain.style.width = 'auto';
    divMain.style.height = 'auto';

      for(let i in documents) {


    if( i.startsWith('VIDEO')) {

      let formatPath = i.replace('C:\\fakepath\\', '/Frontend/videosData/');

      let fixedPath = formatPath.replace(formatPath.slice(0,6), ' ') 
    
      let pathVideos = fixedPath.concat('.mp4');
     
      console.log(pathVideos);
      
      let videoInput = document.createElement('video');
      videoInput.src = pathVideos;
      videoInput.width = '1000';
      videoInput.height = '800';
  
      videoInput.style.margin = '0 auto';
      videoInput.style.borderRadius = '10%';
      videoInput.style.border = '1ps solid red';
      videoInput.style.borderRadius = '10px';
      videoInput.controls = true;
      videoInput.volume;
      
      divMain.appendChild(videoInput);
     

    } else if( i.startsWith('PDF')) {
      
      let formatPath = i.replace('C:\\fakepath\\', '/Frontend/pdfsData/');

      let fixedPath = formatPath.replace(formatPath.slice(0,4), ' ') 
    
      let pathPdfs = fixedPath.concat('.pdf');

      console.log(pathPdfs);

     let pdfInput = document.createElement('iframe');
     pdfInput.src = pathPdfs;
     pdfInput.classList.add('pdf');
     pdfInput.margin = '40px auto';    
     divMain.appendChild(pdfInput);

    } else  {

      timer.style.display = 'none';
      exploitants.style.display = 'none';

      document.querySelector('.errDataFormation').style.color = 'red';
      document.querySelector('.errDataFormation').style.fontSize = '1.5rem';
document.querySelector('.errDataFormation').style.textAlign = 'center';
document.querySelector('.errDataFormation').style.margin = '30% auto';
      document.querySelector('.errDataFormation').textContent = ` Certaines Données ne sont pas disponibles dans le répertoire Data`;
    } 
}


quizz.addEventListener('click', () => {
  document.querySelector('.global-container').style.display = 'block';
  document.querySelector('.quizz_display').style.display = 'none';
})

      formationX.innerHTML += divMain.outerHTML;

///////////////////////////////////////////////////////////////////////

} else if( document.URL.includes("formationEnseignants.html")) {

  /////////////////////////////////////////////////////////////////////

  let initialTime = parseInt(time2countDown);
  let Minutes = 59;
  let time2Seconds = 59;
  
  initialTime--;
  function formatedTime(timeHour, timeMinutes, timeSeconds) {
    return `${timeHour} : ${timeMinutes} : ${timeSeconds % 60 < 10 ? `0${timeSeconds % 60}`: timeSeconds % 60}`;
  };
  

  timerId = setInterval( (() => {

      if(initialTime > 0 && Minutes > 0 && time2Seconds > 0) {
       // initialTime--;
       time2Seconds--;
        timer.textContent = formatedTime(initialTime,Minutes, time2Seconds);
        return time2Seconds;

      }else if( time2Seconds == 0) {
    
        Minutes--;
        time2Seconds = 59
       timer.textContent = formatedTime(initialTime, Minutes, time2Seconds);
    return Minutes, time2Seconds;


      }else if(initialTime > 0 && Minutes == 0 && time2Seconds == 0) {
        initialTime--;
        Minutes = 59;
        time2Seconds = 59;
        timer.textContent = formatedTime(initialTime, Minutes, time2Seconds);
        return initialTime ,Minutes, time2Seconds;


      } else if( initialTime == 0 && time2Seconds == 0) {
        timer.textContent = ' Vous avez passé le temps requis pour tester vos connaissances avec un quizz, bravo !';
        clearInterval(timerId);
      }
    

  }), 1000);


    enseignants.innerHTML = data;

    const documents = JSON.parse(localStorage.getItem('allDocs'));
    //console.log(documents);
    
    let divMain = document.createElement('div');

    divMain.style.display = 'flex';
    divMain.style.flexDirection = 'column';
    divMain.style.justifyContent = 'flex-start';
    divMain.style.margin = '15px';
    divMain.style.width = 'auto';
    divMain.style.height = 'auto';

      for(let i in documents) {
      
    if( i.startsWith('VIDEO')) {

      let formatPath = i.replace('C:\\fakepath\\', '/Frontend/videosData/');

      let fixedPath = formatPath.replace(formatPath.slice(0,6), ' ') 
    
      let pathVideos = fixedPath.concat('.mp4');
     
      console.log(pathVideos);
      
      let videoInput = document.createElement('video');
      videoInput.src = pathVideos;
      videoInput.width = '1000';
      videoInput.height = '800';
  
      videoInput.style.margin = '0 auto';
      videoInput.style.borderRadius = '10%';
      videoInput.style.border = '1ps solid red';
      videoInput.style.borderRadius = '10px';
      videoInput.controls = true;
      videoInput.volume;
      
      divMain.appendChild(videoInput);
     

    } else if( i.startsWith('PDF')) {
      
      let formatPath = i.replace('C:\\fakepath\\', '/Frontend/pdfsData/');

      let fixedPath = formatPath.replace(formatPath.slice(0,4), ' ') 
    
      let pathPdfs = fixedPath.concat('.pdf');

      console.log(pathPdfs);

     let pdfInput = document.createElement('iframe');
     pdfInput.src = pathPdfs;
     pdfInput.classList.add('pdf');
     pdfInput.margin = '40px auto';    
     divMain.appendChild(pdfInput);

    } else {

      timer.style.display = 'none';
      enseignants.style.display = 'none';

      document.querySelector('.errDataFormation').style.color = 'red';
      document.querySelector('.errDataFormation').style.fontSize = '1.5rem';
document.querySelector('.errDataFormation').style.textAlign = 'center';
document.querySelector('.errDataFormation').style.margin = '30% auto';
      document.querySelector('.errDataFormation').textContent = ` Certaines Données ne sont pas disponibles dans le répertoire Data`;
    } 
 } 

 quizz.addEventListener('click', () => {
  document.querySelector('.global-container').style.display = 'block';
  document.querySelector('.quizz_display').style.display = 'none';
})

    enseignants.innerHTML += divMain.outerHTML;


/////////////////////////////////////////////////////


} else if ( document.URL.includes("formationExploitants.html")) {


//////////////////////////////////////////////////////////////

  let initialTime = parseInt(time2countDown);
  let Minutes = 59;
  let time2Seconds = 59;
  
  initialTime--;
  function formatedTime(timeHour, timeMinutes, timeSeconds) {
    return `${timeHour} : ${timeMinutes} : ${timeSeconds % 60 < 10 ? `0${timeSeconds % 60}`: timeSeconds % 60}`;
  };
  

  timerId = setInterval( (() => {


      if(initialTime > 0 && Minutes > 0 && time2Seconds > 0) {
       // initialTime--;
       time2Seconds--;
        timer.textContent = formatedTime(initialTime,Minutes, time2Seconds);
        return time2Seconds;

      }else if( time2Seconds == 0) {
    
        Minutes--;
        time2Seconds = 59
       timer.textContent = formatedTime(initialTime, Minutes, time2Seconds);
    return Minutes, time2Seconds;


      }else if(initialTime > 0 && Minutes == 0 && time2Seconds == 0) {
        initialTime--;
        Minutes = 59;
        time2Seconds = 59;
        timer.textContent = formatedTime(initialTime, Minutes, time2Seconds);
        return initialTime ,Minutes, time2Seconds;


      } else if( initialTime == 0 && time2Seconds == 0) {
        timer.textContent = ' Vous avez passé le temps requis pour tester vos connaissances avec un quizz, bravo !';
        clearInterval(timerId);
      }
    

  }), 1000);

    exploitants.innerHTML = data;

    const documents = JSON.parse(localStorage.getItem('allDocs'));
    console.log(documents);
    
    let divMain = document.createElement('div');

    divMain.style.display = 'flex';
    divMain.style.flexDirection = 'column';
    divMain.style.justifyContent = 'flex-start';
    divMain.style.margin = '15px';
    divMain.style.width = 'auto';
    divMain.style.height = 'auto';

      for(let i in documents) {

    if( i.startsWith('VIDEO')) {

      let formatPath = i.replace('C:\\fakepath\\', '/Frontend/videosData/');

      let fixedPath = formatPath.replace(formatPath.slice(0,6), ' ') 
    
      let pathVideos = fixedPath.concat('.mp4');
     
      console.log(pathVideos);
      
      let videoInput = document.createElement('video');
      videoInput.src = pathVideos;
      videoInput.width = '1000';
      videoInput.height = '800';
  
      videoInput.style.margin = '0 auto';
      videoInput.style.borderRadius = '10%';
      videoInput.style.border = '1ps solid red';
      videoInput.style.borderRadius = '10px';
      videoInput.controls = true;
      videoInput.volume;
      
      divMain.appendChild(videoInput);
     

    } else if( i.startsWith('PDF')) {
      
      let formatPath = i.replace('C:\\fakepath\\', '/Frontend/pdfsData/');

      let fixedPath = formatPath.replace(formatPath.slice(0,4), ' ') 
    
      let pathPdfs = fixedPath.concat('.pdf');

      console.log(pathPdfs);

     let pdfInput = document.createElement('iframe');
     pdfInput.src = pathPdfs;
     pdfInput.classList.add('pdf');
     pdfInput.margin = '40px auto';    
     divMain.appendChild(pdfInput);

    } else {

      timer.style.display = 'none';
      exploitants.style.display = 'none';

      document.querySelector('.errDataFormation').style.color = 'red';
      document.querySelector('.errDataFormation').style.fontSize = '1.5rem';
      document.querySelector('.errDataFormation').style.textAlign = 'center';
      document.querySelector('.errDataFormation').style.margin = '30% auto';
      document.querySelector('.errDataFormation').textContent = ` Certaines Données ne sont pas disponibles dans le répertoire Data`;
      
  } 
 }

 quizz.addEventListener('click', () => {
   document.querySelector('.global-container').style.display = 'block';
   document.querySelector('.quizz_display').style.display = 'none';
 })

      exploitants.innerHTML += divMain.outerHTML;
    


  }  else if ( document.URL.includes("formationHub.html")) {


    // Récupération des formations disponibles 


 const token = localStorage.getItem('token');

 fetch('http://localhost:3000/api/formations', {
 method: 'GET',
 headers: {
     'content-type' : 'application/json',
     'accept' : 'application/json',
     'authorization' : `Bearer ${token}`
 }
 })
 .then( res => { return res.json()})
 .then( items => {

     for (let item of items) {
    
         document.querySelector('.containero').innerHTML += `
                                             <div id='boxFormation' class="vignet" data-role="${item.role}" data-id="${item.id}" >
                                                <h1  id="formationName"> ${item.nameFormation} </h1>
                                                <h5> Formation ${item.role} </h5>
                                                <div class="pop">
                                                <p>Programme : ${item.nameFormation} </p><br>
                                                <p>${item.priceFormation}€</p><br>
                                                <p> ${item.durationFormation} heures</p><br>
                                                <span>Éligible au CPF !</span>
                                                </div>                                       
                                                </div>                        
                                                `   
                                                
     const allBoxes = document.querySelectorAll('#boxFormation');
     allBoxes.forEach(box => {
      box.addEventListener('click', (e) => {
        e.preventDefault();
      //  const id = box.getAttribute('data-id');

      overlayPayment.style.display = 'block';
      
     // nameFormationOverlay.textContent = `${item.nameFormation}`;
     cpfBtn.style.fontSize = '1.2rem';
     cbButton.style.fontSize = '1.2rem';
     // priceSet.textContent = `${item.priceFormation}`;

     cancelOverlay.style.type = 'button';

      cancelOverlay.addEventListener('click', () => {
        overlayPayment.style.display = 'none';  
      } )
      // let infoTransaction = {
      //   name: item.nameFormation,
      //   price: item.priceFormation
      // }
      //   fetch('http://localhost:3000/create-checkout-session', {
      //     method: 'post',
      //     headers: {
      //         'content-type' : 'application/json'
      //     },
      //     body: JSON.stringify({
      //                   items: [
      //                       {id: 1, quantity: 1},
      //                       {id: 2, quantity: 1}
      //                   ],
      //               }),
      // })
      // .then(res => {
      //     if(res.ok) return res.json()
      //     return res.json().then(json => Promise.reject(json))
      // })
      // .then(({ url }) => {
      //     window.location = url;
      //     console.log(url);
      // })
      // .catch(e => {
      //     console.error(e.error)
      // })
     })
   })
     }
  })
}


// Gestion appel validation Paiement.

window.addEventListener('load', () => {

  if ( document.URL.includes("/paymentSuccess.html")) {
 
     setTimeout(() => {
  // insertion du param de la formation pour redirection 
         location.replace('./Formations/reaEx.html');
     }, 3000)
  }
});


if(document.URL.includes('formationHub.html')) {

  const btnPayment = document.querySelector('#paymentBtn');

btnPayment.addEventListener('click', () => {
  
  fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
          'content-type' : 'application/json'
      },
      body: JSON.stringify({
          items: [
              {id: 1, quantity: 3},
              {id: 2, quantity: 1},
          ],
      }),
  })
  .then(res => {
      if(res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
  })
  .then(({ url }) => {
      window.location = url;
      console.log(url);
  })
  .catch(e => {
      console.error(e.error)
  })
})
}

