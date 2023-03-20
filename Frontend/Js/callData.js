
const exploitants = document.querySelector('#exploitants');
const enseignants = document.querySelector('#enseignants');
const formationX = document.querySelector('#formationX');
const timer = document.querySelector('.timer');
 let time2countDown = localStorage.getItem('timeModule');

const data = localStorage.getItem('moduleData');

//let DataStorageBeforeTransaction = [];

const reaTeachers = localStorage.getItem('reaTeachers');
    const reaEx = localStorage.getItem('reaEx');
   // const rea3 = localStorage.getItem('rea3');


let timerId;

const overlayPayment = document.querySelector('.overlay__paiement');
let priceSet = document.querySelector('.paymentBtn > span');
let paymentBtn = document.querySelector('.paymentBtn');
let cancelOverlay = document.querySelector('.cancelOder');
let cpfBtn = document.querySelector('#cpf_button');
const cbButton = document.querySelector('#cb_button');

const quizz = document.querySelector('.quizz_display');


// function injectionFormation() {

  

// }



function timeFlux() {
  
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
};



if ( document.URL.includes("rea3.html") ) {

  const main = document.querySelector('main');
  main.style.backgroundImage = 'linear-gradient(90deg,yellow , white, cyan)';
  
  timeFlux();
 
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
      videoInput.classList.add('resizeVideo');
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
     pdfInput.classList.add('resizePdf');
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
      document.querySelector('.errDataFormation').textContent = ` Certains fichiers ne sont pas disponibles dans le pdfsData ou videosData`;
    } 
}


quizz.addEventListener('click', () => {
  document.querySelector('.global-container').style.display = 'block';
  document.querySelector('.quizz_display').style.display = 'none';
})

      formationX.innerHTML += divMain.outerHTML;




///////////////////////////////////////////////////////////////////////

} else if( document.URL.includes("reaTeachers.html")) {

  /////////////////////////////////////////////////////////////////////

   if(admin == 'true' || admin == 'false') {


    if(admin = 'false') {
      
      fetch(`http://localhost:3000/api/getuser/${id}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'authorization': `Bearer ${token}`
        }
       })
       .then(res => {return res.json()})
       .then( data => {

        console.log('DATA User:',data);

        if( data.reaTeachers == true) {

          let id = localStorage.getItem('Réactualisation Enseignants'); 

          fetch(`http://localhost:3000/api/module/${id}`, {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'content-type': 'application/json',
              'authorization': `Bearer ${token}`
            }
           })
           .then( res => { return res.json()})
           .then(data => {
            console.log('DATA MODULE:', data.allDocs);



         //  enseignants.innerHTML += divMain.outerHTML;



           })
        }

                
      
        
        
       })
       
      }

                      const main = document.querySelector('main');
                        main.style.backgroundImage = 'linear-gradient(90deg,yellow , white, cyan)';


                        timeFlux();


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
                          videoInput.classList.add('resizeVideo');
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
                        pdfInput.classList.add('resizePdf');
                        pdfInput.src = pathPdfs;
                        pdfInput.classList.add('pdf');
                        pdfInput.margin = '40px auto';    
                        divMain.appendChild(pdfInput);

                        } else {

                          timer.style.display = 'none';
                          enseignants.style.display = 'none';

                          document.querySelector('.errDataModule').style.color = 'red';
                          document.querySelector('.errDataModule').style.fontSize = '1.5rem';
                    document.querySelector('.errDataModule').style.textAlign = 'center';
                    document.querySelector('.errDataModule').style.margin = '30% auto';
                          document.querySelector('.errDataModule').textContent = ` Certains fichiers ne sont pas disponibles dans le pdfsData ou videosData`;
                        } 
                    } 

                    quizz.addEventListener('click', () => {
                      document.querySelector('.global-container').style.display = 'block';
                      document.querySelector('.quizz_display').style.display = 'none';
                    })


                    enseignants.innerHTML += divMain.outerHTML;


                    };





/////////////////////////////////////////////////////


} else if ( document.URL.includes("reaEx.html")) {


//////////////////////////////////////////////////////////////


const main = document.querySelector('main');
main.style.backgroundImage = 'linear-gradient(90deg,yellow , white, cyan)';

timeFlux();

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
      videoInput.classList.add('resizeVideo');
      videoInput.src = pathVideos;
      videoInput.width = '1000';
      videoInput.height = '580';

      

      videoInput.style.margin = '80px auto';
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
     pdfInput.classList.add('resizePdf');
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
      document.querySelector('.errDataFormation').textContent = ` Certains fichiers ne sont pas disponibles dans le pdfsData ou videosData`;
      
  } 
 }

 quizz.addEventListener('click', () => {
   document.querySelector('.global-container').style.display = 'block';
   document.querySelector('.quizz_display').style.display = 'none';
 })

      exploitants.innerHTML += divMain.outerHTML;
    


  }  else if ( document.URL.includes("formationHub.html")) {

    // Récupération des formations disponibles 

   // console.log(DataStorageBeforeTransaction);


 const token = localStorage.getItem('token');

 fetch('http://localhost:3000/api/modules', {
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

      localStorage.setItem(item.nameModule ,item.id);
    
         document.querySelector('.containero').innerHTML += `
                                             <div id='boxFormation' class="vignet" data-role="${item.role}" data-id="${item.id}" data-name="${item.nameModule}" data-price="${item.priceFormation * 100}" >
                                                <h1  id="formationName"> ${item.nameModule} </h1>
                                                <h5> Formation ${item.role} </h5>
                                                <div class="pop">
                                                <p>Programme : ${item.nameModule} </p><br>
                                                <p>${item.priceFormation}€</p><br>
                                                <p> ${item.durationModule} heures</p><br>
                                                <span>Éligible au CPF !</span>
                                                </div>                                       
                                                </div>                        
                                                `   
                                                
     const allBoxes = document.querySelectorAll('#boxFormation');
     allBoxes.forEach(box => {
      box.addEventListener('click', (e) => {
        e.preventDefault();
        let itemName = box.getAttribute("data-name");
        let itemPrice = box.getAttribute("data-price");
        let itemId = box.getAttribute("data-id");
        let typeFormation = box.getAttribute("data-role");
     

      overlayPayment.style.display = 'block';
      
     // nameFormationOverlay.textContent = `${item.nameFormation}`;
     cpfBtn.style.fontSize = '1.2rem';
     cbButton.style.fontSize = '1.2rem';
     // priceSet.textContent = `${item.priceFormation}`;

     cancelOverlay.style.type = 'button';

      cancelOverlay.addEventListener('click', () => {
        overlayPayment.style.display = 'none';  
      } )

      const btnPayment = document.querySelector('#paymentBtn');
   
      btnPayment.addEventListener('click', () => {

        let valuesStorage = [];

        for(let val in localStorage) {
          valuesStorage.push([localStorage.key(val)])
          // :localStorage.getItem(val)
          console.log(valuesStorage);
          //return valuesStorage;
        }
       // console.log(valuesStorage);
     
        fetch('http://localhost:3000/create-checkout-session', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
              items: [
                {id: itemId, quantity: 1}
            ], infoTransaction: { itemName:itemName, montant:itemPrice, id: itemId, type: typeFormation },
          }),
        })
        .then(res => {
          
            if(res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        })
        .then(({ url, type }) => {
          console.log(url, type);
          let productType = type;
          localStorage.setItem('Produit Type', productType);
         
         //  DataStorageBeforeTransaction.push(Object.entries(localStorage));
       //  console.log(DataStorageBeforeTransaction);
          window.location = url;

       //   return DataStorageBeforeTransaction;
         // let productBought = nameProduct;
        //  localStorage.setItem(productBought, false);
           
        })
        .catch(e => {
            console.error(e.error)
        })
      })   
     })
   })
     }
  })
}


// Gestion appel validation Paiement.

window.addEventListener('load', () => {

  if ( document.URL.includes("/paymentSuccess.html")) {

    
    let id = localStorage.getItem('id');
    

    let productTypeUnlocked = localStorage.getItem('Produit Type');
   // let productUnlockedSession = sessionStorage.getItem('Produit Débloqué');
  // || productUnlockedSession == 'Réactualisation Enseignants'

    if(productTypeUnlocked == 'Enseignants') {
       
      localStorage.removeItem(reaTeachers);
      localStorage.setItem('reaTeachers', 'true');

      document.querySelector('.pay-success').textContent = 'Félicitations 😃 ! Vous êtes maintenant bénéficiaire de votre nouvelle formation Réactualisation des compétences Enseignants de la conduite';

      // Gestion appel validation Paiement
            
        let putAccessFormation = {
          reaTeachers: 1,
        };
                                          
          fetch(`http://localhost:3000/api/updateaccess/${id}`, {
              method: 'PUT',
              body: JSON.stringify(putAccessFormation),
              headers: {
                  'accept': 'application/json',
                  'content-type': 'application/json',
                  'authorization' : `Bearer ${token} `
              }
          })
          .then(data => {return data.json()})
          .then( res => {
            console.log(res);
          })

              setTimeout(() => {
                // insertion du param de la formation pour redirection 
                      location.replace('./Formations/reaTeachers.html');
                  }, 3000)

    } else if( productTypeUnlocked == 'Exploitants') {

      localStorage.removeItem(reaEx);
      localStorage.setItem('reaEx', 'true');

      document.querySelector('.pay-success').textContent = 'Félicitations 😃 ! Vous êtes maintenant bénéficiaire de votre nouvelle formation Réactualisation des compétences Exploitants';

      let putAccessFormation = {
        reaEx: 1,
      };

        fetch(`http://localhost:3000/api/updateaccess/${id}`, {
            method: 'PUT',
            body: JSON.stringify(putAccessFormation),
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        })
        .then(data => {return data.json()})
        .then( res => {
          console.log(res);
        })

      setTimeout(() => {
   // insertion du param de la formation pour redirection 
          location.replace('./Formations/reaEx.html');
      }, 3000)
    }

    //  else if( productUnlocked == 'Réactualisation Exploitants') {

    //   document.querySelector('.pay-success').textContent = 'Félicitations 😃 ! Vous êtes maintenant bénéficiaire de votre nouvelle formation Réactualisation des compétences 3';

    //   let putAccessFormation = {
    //     rea3: true
    //   };

    //     fetch(`http://localhost:3000/api/updateaccess/${id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(putAccessFormation),
    //         headers: {
    //             'accept': 'application/json',
    //             'content-type': 'application/json'
    //         }
    //     })

    //   setTimeout(() => {
    //     // insertion du param de la formation pour redirection 
    //            location.replace('./Formations/rea3.html');
    //        }, 3000)

    // }

  }
});