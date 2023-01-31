
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



} else if( document.URL.includes("formationEnseignants.html")) {


  


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

  //  const videoDiv = document.querySelector('.videosSet')
    const videos = JSON.parse(localStorage.getItem('videosFormation'));
    

    let videoFiles = [];

    let divMain = document.createElement('div');

    divMain.style.display = 'flex';
    divMain.style.flexDirection = 'column';
    divMain.style.justifyContent = 'flex-start';
    divMain.style.margin = '15px';
    divMain.style.width = 'auto';
    divMain.style.height = 'auto';

       

      for(let i in videos) {
        
    let formatPath = i.replace('C:\\fakepath\\', '/Frontend/videosData/');
     let pathVideos = formatPath.concat('.mp4');
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
        videoFiles.push(i);
      }

      // Creation des input pour les fichiers pdfs
   const pdfFiles = JSON.parse(localStorage.getItem('filesFormation'));
   
   for( let pdf in pdfFiles) {
     
     let formatPath = pdf.replace('C:\\fakepath\\', '/Frontend/pdfsData/');

     let pathVideos = formatPath.concat('.pdf');

       console.log(formatPath);
     
     let pdfInput = document.createElement('iframe');
     pdfInput.src = pathVideos;
     pdfInput.classList.add('pdf');
     pdfInput.margin = '40px auto';
     
     divMain.appendChild(pdfInput);
    }


    enseignants.innerHTML += divMain.outerHTML;

} else if ( document.URL.includes("formationExploitants.html")) {



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

      //  <img alt='Image représentant la formation' class="pictureF" src='${item.picture}'/>

         document.querySelector('.containero').innerHTML += `
                                             <div id='boxFormation' class="vignet" data-role="${item.role}" data-videos="${item.videos}" data-id="${item.id}" >
                                                <h1  id="formationName"> ${item.nameFormation} </h1>
                                                <h5> Formation ${item.role} </h5>
                                                <div class="pop">
                                                <p>Programme : ${item.nameFormation} </p><br>
                                                <p>Prix : ${item.priceFormation}€</p><br>
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

      let infoTransaction = {
        name: item.nameFormation,
        price: item.priceFormation
      }
      
        fetch('http://localhost:3000/create-checkout-session', {
          method: 'post',
          headers: {
              'content-type' : 'application/json'
          },
          body: JSON.stringify({
                        items: [
                            {id: item.id, name: item.nameFormation, price: item.priceFormation, quantity: 1}
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
   })


                                                


     }




  })

}




