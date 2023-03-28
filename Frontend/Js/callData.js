
//const exploitants = document.querySelector('#exploitants');
const enseignants = document.querySelector('#enseignants');
//const formationX = document.querySelector('#formationX');
const timer = document.querySelector('.timer');
const id = localStorage.getItem('id');
const token = localStorage.getItem('token');
// let time2countDown = localStorage.getItem('timeModule');
//const data = localStorage.getItem('moduleData');
const titleFormation = document.querySelector('.announcement > h2');
//let DataStorageBeforeTransaction = [];
const reaTeachers = localStorage.getItem('reaTeachers');

let timerId;

const overlayPayment = document.querySelector('.overlay__paiement');
let priceSet = document.querySelector('.paymentBtn > span');
let paymentBtn = document.querySelector('.paymentBtn');
let cancelOverlay = document.querySelector('.cancelOder');
let cpfBtn = document.querySelector('#cpf_button');
const cbButton = document.querySelector('#cb_button');

const quizz = document.querySelector('.quizz_display');

function timeFlux(time2countDown) {
  
            let initialTime = parseInt(time2countDown);
            let Minutes = 59;
            let time2Seconds = 59;
            
            initialTime--;
            function formatedTime(timeHour, timeMinutes, timeSeconds) {
              return `${timeHour} : ${timeMinutes}: ${timeSeconds % 60 < 10 ? `0${timeSeconds % 60}`: timeSeconds % 60}`;
            };
            
            timerId = setInterval( (() => {

                if(initialTime > 0 && Minutes > 0 && time2Seconds > 0) {
                  quizz.style.display = 'none';
                time2Seconds--;
                  timer.textContent = formatedTime(initialTime,Minutes, time2Seconds);
                  return time2Seconds;

                }else if( time2Seconds == 0) {
                  quizz.style.display = 'none';
                  Minutes--;
                  time2Seconds = 59
                timer.textContent = formatedTime(initialTime, Minutes, time2Seconds);
              return Minutes, time2Seconds;


                }else if(initialTime > 0 && Minutes == 0 && time2Seconds == 0) {
                  quizz.style.display = 'none';
                  initialTime--;
                  Minutes = 59;
                  time2Seconds = 59;
                  timer.textContent = formatedTime(initialTime, Minutes, time2Seconds);
                  return initialTime ,Minutes, time2Seconds;


                } else if( initialTime == 0 && time2Seconds == 0) {
                  quizz.style.display = 'block';
                  timer.textContent = ' Vous avez passé le temps requis pour tester vos connaissances avec un quizz, bravo !';
                  clearInterval(timerId);
                }
  }), 1000);
};

 if( document.URL.includes("reaTeachers.html")) {
  /////////////////////////////////////////////////////////////////////
  const main = document.querySelector('main');
  main.style.backgroundColor = '#f1f1f1';
  //setTimeout(() => {
 
    fetch(`http://localhost:3000/api/getuser/${id}`, {
      method: 'GET',
      headers: {
        'accept' : 'application/json',
        'content-type' : 'application/json',
        'authorization' : `Bearer ${token}`
      }
    })
    .then(data => {return data.json()})
    .then(res => {

      let admin = res.admin;
     // console.log('DATA User:',res);

      if(admin) {

          if( res.reaTeachers == true) {
  
           let idF = localStorage.getItem('idF');

           fetch(`http://localhost:3000/api/formation/${idF}`, {
            method: 'GET',
            headers: {
              'accept' : 'application/json',
              'content-type' : 'application/json',
              'authorization' : `Bearer ${token}`
            }
           })
           .then(data => { return data.json()})
           .then( res => {
            console.log(res);

            for( let doc of res.modulesCompo) {

              fetch(`/Frontend/docs/${doc.docs}`, {
                method: 'GET',
                headers: {
                  'accept':'application/json',
                  'content-type':'application/json'
                }                
              })
              .then(data => { return data.json() })
              .then(res => {
                console.log(res);

                let divModule = document.createElement('div');
                          divModule.style.margin = '15px';
                          divModule.style.width = 'auto';
                          divModule.style.height = 'auto';
                let titleModule = document.createElement('h2');
                titleModule.textContent = `Module ${doc.name}`;
                titleModule.fontSize = '2.5rem';
                titleModule.fontFamily = `'Staatliches', Arial, Helvetica, sans-serif`;
                divModule.appendChild(titleModule);



                          for(let i in doc.docs) {
                            
                            if( i.startsWith('VIDEO')) {
    
                              let formatPath = i.replace('C:\\fakepath\\', '/Frontend/videosData/');
                              let fixedPath = formatPath.replace(formatPath.slice(0,6), ' ') 
                              let pathVideos = fixedPath.concat('.mp4');                   
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
                              
                              divModule.appendChild(videoInput);
    
                            } else if( i.startsWith('PDF')) {
                              
                              let formatPath = i.replace('C:\\fakepath\\', '/Frontend/pdfsData/');
                              let fixedPath = formatPath.replace(formatPath.slice(0,4), ' ') 
                              let pathPdfs = fixedPath.concat('.pdf');
    
                            let pdfInput = document.createElement('iframe');
                            pdfInput.classList.add('resizePdf');
                            pdfInput.src = pathPdfs;
                            pdfInput.classList.add('pdf');
                            pdfInput.margin = '40px auto';    
                            divModule.appendChild(pdfInput);
    
                            } else {
    
                             // timer.style.display = 'none';
                             // enseignants.style.display = 'none';
                            //  document.querySelector('.errDataModule').style.color = 'red';
                            //  document.querySelector('.errDataModule').style.fontSize = '1.5rem';
                            //  document.querySelector('.errDataModule').style.textAlign = 'center';
                            //  document.querySelector('.errDataModule').style.margin = '30% auto';
                             // document.querySelector('.errDataModule').textContent = ` Certains fichiers ne sont pas disponibles dans le fichier pdfsData ou videosData`;
                            } 
                        } 

                        enseignants.innerHTML += divModule.outerHTML;
              })        

             }


            console.log(res.modulesCompo);

            

            
  
                          titleFormation.textContent = `Formation ${res.nameFormation}`;
  
                          timeFlux(res.durationFormation);
  
  
                         // enseignants.innerHTML = data;
  
                        //  const documents = JSON.parse(localStorage.getItem('allDocs'));
                          //console.log(documents);
                          
                          // let divModule = document.createElement('div');
                          // divModule.style.margin = '15px';
                          // divModule.style.width = 'auto';
                          // divModule.style.height = 'auto';
  
                         // divMain.style.display = 'flex';
                         // divMain.style.flexDirection = 'column';
                        //  divMain.style.justifyContent = 'flex-start';
  
                          
                      quizz.addEventListener('click', () => {
                        document.querySelector('.global-container').style.display = 'block';
                        document.querySelector('.quizz_display').style.display = 'none';
                      })
                      
            })

          //   let idF = JSON.parse(localStorage.getItem('idFormations'));
          //  // let id = localStorage.getItem('Réactualisation Enseignants'); 

          // const formations = idF.map(id => {
          //   return fetch(`http://localhost:3000/api/formation/${id}`, {
          //     method: 'GET',
          //     headers: {
          //       'accept': 'application/json',
          //       'content-type': 'application/json',
          //       'authorization': `Bearer ${token}`
          //     }
          //    })
          //    .then( res => { return res.json()})
          //    .then(data => {
          //     console.log('DATA FORMATION:', data);
          //     //  enseignants.innerHTML += divMain.outerHTML;
          //    })
          //   })
            
          //   Promise.all(formations)
          //   .then(() => { 
          //     console.log( 'formations:', formations);
          //   });
            
          
  
          } 
        } 
    })
    
      
                      //   const main = document.querySelector('main');
                      //     main.style.backgroundImage = 'linear-gradient(90deg,yellow , white, cyan)';
  
  
                      //     timeFlux();
  
  
                      //     enseignants.innerHTML = data;
  
                      //     const documents = JSON.parse(localStorage.getItem('allDocs'));
                      //     //console.log(documents);
                          
                      //     let divMain = document.createElement('div');
  
                      //     divMain.style.display = 'flex';
                      //     divMain.style.flexDirection = 'column';
                      //     divMain.style.justifyContent = 'flex-start';
                      //     divMain.style.margin = '15px';
                      //     divMain.style.width = 'auto';
                      //     divMain.style.height = 'auto';
  
                      //       for(let i in documents) {
                            
                      //     if( i.startsWith('VIDEO')) {
  
                      //       let formatPath = i.replace('C:\\fakepath\\', '/Frontend/videosData/');
                      //       let fixedPath = formatPath.replace(formatPath.slice(0,6), ' ') 
                      //       let pathVideos = fixedPath.concat('.mp4');                   
                      //       let videoInput = document.createElement('video');
                      //       videoInput.classList.add('resizeVideo');
                      //       videoInput.src = pathVideos;
                      //       videoInput.width = '1000';
                      //       videoInput.height = '800';
                      //       videoInput.style.margin = '0 auto';
                      //       videoInput.style.borderRadius = '10%';
                      //       videoInput.style.border = '1ps solid red';
                      //       videoInput.style.borderRadius = '10px';
                      //       videoInput.controls = true;
                      //       videoInput.volume;
                            
                      //       divMain.appendChild(videoInput);
  
                      //     } else if( i.startsWith('PDF')) {
                            
                      //       let formatPath = i.replace('C:\\fakepath\\', '/Frontend/pdfsData/');
                      //       let fixedPath = formatPath.replace(formatPath.slice(0,4), ' ') 
                      //       let pathPdfs = fixedPath.concat('.pdf');
  
                      //     let pdfInput = document.createElement('iframe');
                      //     pdfInput.classList.add('resizePdf');
                      //     pdfInput.src = pathPdfs;
                      //     pdfInput.classList.add('pdf');
                      //     pdfInput.margin = '40px auto';    
                      //     divMain.appendChild(pdfInput);
  
                      //     } else {
  
                      //       timer.style.display = 'none';
                      //       enseignants.style.display = 'none';
  
                      //       document.querySelector('.errDataModule').style.color = 'red';
                      //       document.querySelector('.errDataModule').style.fontSize = '1.5rem';
                      //       document.querySelector('.errDataModule').style.textAlign = 'center';
                      //       document.querySelector('.errDataModule').style.margin = '30% auto';
                      //       document.querySelector('.errDataModule').textContent = ` Certains fichiers ne sont pas disponibles dans le pdfsData ou videosData`;
                      //     } 
                      // } 
  
                      // quizz.addEventListener('click', () => {
                      //   document.querySelector('.global-container').style.display = 'block';
                      //   document.querySelector('.quizz_display').style.display = 'none';
                      // })

                      // enseignants.innerHTML += divMain.outerHTML;
                  
  //},1500)

/////////////////////////////////////////////////////


  }  else if ( document.URL.includes("formationHub.html")) {

    // Récupération des formations disponibles 

   // console.log(DataStorageBeforeTransaction);


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

      localStorage.setItem(item.nameModule ,item.id);
    
         document.querySelector('.containero').innerHTML += `
                                             <div id='boxFormation' class="vignet"  data-id="${item.id}" data-name="${item.nameFormation}" data-price="${item.priceFormation * 100}" >
                                                <h1  id="formationName"> ${item.nameFormation} </h1>
                                                <div class="pop">
                                                <p>Programme : \<br> \<br> ${item.nameFormation} </p> \<br>
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