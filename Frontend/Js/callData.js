const enseignants = document.querySelector('#enseignants');
const timer = document.querySelector('.timer');
const id = localStorage.getItem('id');
const token = localStorage.getItem('token');
const logoutButton = document.querySelector('.deconnexion');
const titleFormationHead = document.querySelector('.announcement > h2');
const titleFormation = document.querySelector('.titleFormation');
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


let currentContent = 0;

function nextSlide() {
  const contents = document.querySelectorAll(".content");
            
  contents[currentContent].classList.remove("active");
  contents[currentContent].classList.add("previous");
  currentContent++;

  if (currentContent < contents.length) {
    contents[currentContent].classList.add("active");
  }

  if (currentContent === contents.length) {
    nextBtn.disabled = true;
    currentContent = 0;
  }
}

///////////// //////////////////////////////////// //////////////////////////

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

      if(admin || !admin) {

          if( res.reaTeachers == true || res.reaTeachers == false ) {
  
            timer.insertAdjacentHTML('afterend', `<img src='../../images/clock.png' alt='image horloge temps Frmation NFC'>`);
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
            console.log(res.nameFormation);


            let mapModules = document.createElement('div');
            mapModules.style.width = 'auto';
            mapModules.style.position = 'absolute';
            mapModules.style.right = '10px';
            mapModules.style.top = '15%';
            mapModules.style.height = 'auto';
            mapModules.style.margin = '20px';
            mapModules.style.padding = '7px';
            mapModules.style.borderRadius = '10px';
            mapModules.style.border = '1px solid black';
            mapModules.style.backgroundColor = 'lightblue';
            mapModules.style.color = 'black';


            titleFormationHead.textContent = `${res.nameFormation}`;

            


            let slider = document.createElement('div');
            slider.classList.add('slider');
        
            let contentsDiv = document.createElement('div');
            contentsDiv.classList.add('contents');
           contentsDiv.id = 'contents';
            
            titleFormation.innerHTML = `<h1> Bienvenue dans votre Formation ${res.nameFormation} 😃 ! </h1>
            <p> Vous devrez passer un total de ${res.durationFormation} heure(s) pour valider votre cursus. </p>`;
  
            timeFlux(res.durationFormation);

            let nbModule = 1;
            const mapItemModules = []; 

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

           
                  const mapItemModule = document.createElement('div');
                  mapItemModule.style.margin = '2px';
                  mapItemModule.setAttribute('idModule', doc.name);
                 mapItemModule.classList.add('hoverMapModule');

                 mapItemModule.innerHTML = `
                 <h3>${nbModule++} : ${doc.name}</h3>
                 `;
                 
                 mapModules.appendChild(mapItemModule);
                 // mapItemModules.push(eventModule); 
                 
                 
                 mapItemModule.addEventListener('click', (e) => {
                   console.log(e);
                 })
               

                
                    
                    console.log(mapItemModule);
                
                    mapItemModule.addEventListener('click', (e) => {
                      console.log(e);
                    })

                
                let divModule = document.createElement('div');
                divModule.setAttribute('idModule', doc.name);
                divModule.classList.add('content');
                divModule.classList.add('active');

                let titleModule = document.createElement('h2');
                titleModule.textContent = `Module ${doc.name}`;
                titleModule.style.fontSize = '4rem';
                titleModule.style.margin = '25px auto';
                titleModule.style.borderRadius = '10px';
                titleModule.style.width = '50%';
                titleModule.style.color = 'blue';
                titleModule.style.border = '2px solid red';
                titleModule.style.padding = '10px';
                titleModule.style.fontFamily = `'Staatliches', Arial, Helvetica, sans-serif`;
                divModule.appendChild(titleModule);

                
                for(let i in res) {
                  
                  if( i.startsWith('VIDEO')) {
    
                                let formatPath = i.replace('C:\\fakepath\\', '/Frontend/videosData/');
                                let fixedPath = formatPath.replace(formatPath.slice(0,6), ' ') 
                                let pathVideos = fixedPath.concat('.mp4');                   
                                let videoInput = document.createElement('video');
                                videoInput.classList.add('resizeVideo');
                                videoInput.src = pathVideos;
                                videoInput.width = '880';
                                videoInput.height = '500';
                                videoInput.style.margin = '0 auto';
                                videoInput.style.borderRadius = '10%';
                                videoInput.style.border = '1ps solid red';
                                videoInput.style.borderRadius = '10px';
                                videoInput.controls = true;
                                videoInput.volume;
                                
                                divModule.appendChild(videoInput);
                                
      
                              } else if( i.startsWith('PDF')) {
                                
                                let formatPath = i.replace('C:\\fakepath\\', '/Frontend/pdfsData/');
                                let fixedPath = formatPath.replace(formatPath.slice(0,4), ' '); 
                                let pathPdfs = fixedPath.concat('.pdf');
                              let pdfInput = document.createElement('iframe');
                              pdfInput.classList.add('resizePdf');
                              pdfInput.src = pathPdfs;
                              pdfInput.classList.add('pdf');
                              pdfInput.margin = '40px auto';    
                              pdfInput.height = '500px';    
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
                            
                            console.log(mapItemModules);
                          //  console.log(document.querySelectorAll('.hoverMapModule'));

                            
                          mapItemModules.forEach(mapM => {
                            mapM.addEventListener('click', (e) => {
                              console.log(e);
                            })
                            })
                            

                            contentsDiv.appendChild(mapModules);
                            contentsDiv.appendChild(divModule); 
                            slider.appendChild(contentsDiv); 
                            enseignants.innerHTML = slider.outerHTML;
                          })        
                        }

                          


                        contentsDiv.innerHTML += `<button id="next-btn" onclick='nextSlide()'> Suivant </button>`;

                       document.querySelectorAll('.content').forEach(content => {
                          content.querySelector("#next-btn").addEventListener("click", () => {
                            content.classList.add("finished");
                            if (content.classList.contains("active")) {
                              nextBtn.click();
                            }
                          });
                        })                    

            console.log(res.modulesCompo);
                          
                      quizz.addEventListener('click', () => {
                        document.querySelector('.global-container').style.display = 'block';
                        document.querySelector('.quizz_display').style.display = 'none';
                      })
                })

                
          } 
        } 
    })

/////////////////////////////////////////////////////


  } else if ( document.URL.includes("formationHub.html")) {

  
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
  
  for( let item of items) {
    for(let properties in item) {
      console.log();
      if( properties == 'id') {
        if(item.role == 'Enseignant') { 
          localStorage.setItem('idEnseignant', item.id);
       }
      }
    }
  }

  const idF = localStorage.getItem('idF'); 

  fetch(`http://localhost:3000/api/formation/${idF}`, {
method: 'GET',
headers: {
   'content-type' : 'application/json',
   'accept' : 'application/json',
   'authorization' : `Bearer ${token}`
}
})
.then( res => { return res.json()})
.then( data => {

console.log(data);
let itemName = data.nameFormation;
let itemPrice = data.priceFormation;
 let typeFormation = data.role;
let itemId = data.id;

 
  
 const btnOverlayPay = document.querySelector('.pannelPayBtn');
  
 btnOverlayPay.addEventListener('click', () => {
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
 
     // Stocker les valeurs dans le localStorage
//localStorage.setItem('mesDonnees', JSON.stringify({ itemPrice:itemPrice, itemName:itemName, itemId:itemId, typeFormation: typeFormation }));

fetch('http://localhost:3000/create-checkout-session', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
  },
  body: JSON.stringify({
    items: [{ id: itemId, quantity: 1 }],
    infoTransaction: {
      itemName: itemName,
      montant: itemPrice,
      id: itemId,
      type: typeFormation,
    },
  }),
})
  .then((res) => {
    if (res.ok) return res.json();
    return res.json().then((json) => Promise.reject(json));
  })
  .then(({ sessionId, url, type, itemName , montant }) => {

    localStorage.setItem('Produit Type', type);
    localStorage.setItem('session_id', sessionId);
    

    window.location = url;
  })
  .catch((e) => {
    console.error(e.error);
  });

    })   
 })




 })


});
} 



// Gestion appel validation Paiement.

window.addEventListener('load', () => {

  if ( document.URL.includes("/paymentSuccess.html")) {


  const nameProduct = localStorage.getItem('nameFormation');
   

      document.querySelector('.pay-success').textContent = `Félicitations 😃 ! Vous êtes maintenant bénéficiaire de votre nouvelle formation ${nameProduct} ! On te souhaite un bel apprentissage`;

      // // Gestion appel validation Paiement
            const clientId = localStorage.getItem('id');
            const formationId = localStorage.getItem('idF');


            fetch(`http://localhost:3000/api/formation/${formationId}`, {
                method: 'GET',
                headers: {
                  'content-type' : 'application/json',
                  'accept' : 'application/json',
                  'authorization' : `Bearer ${token}`
                }
                })
                .then( res => { return res.json()})
                .then( data0 => { 

                  console.log(data0);

                  const priceF = data0.priceFormation;
                  const nameF = data0.nameFormation;
                  const dateAchat = new Date();

                  const data = {
                    formationId: formationId,
                    dateAchat: dateAchat.toISOString(),
                    userId: clientId,
                    priceF: priceF, 
                    nameF, nameF,
                  }

                  fetch(`http://localhost:3000/api/getuser/${clientId}/formation`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                      'accept' : 'application/json',
                      'content-type': 'application/json',
                      'authorization': `Bearer ${token}`
                    }
                  })
                  .then(res => {
                    console.log(res);
                  })





                });

           
              // setTimeout(() => {
              //   // insertion du param de la formation pour redirection 
              //         location.replace('./Formations/reaTeachers.html');
              //     }, 3000)

    } else if ( document.URL.includes("formationsStore.html")) {

    
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
            
           
           cpfBtn.style.fontSize = '1.2rem';
           cbButton.style.fontSize = '1.2rem';
          
      
           cancelOverlay.style.type = 'button';
      
            cancelOverlay.addEventListener('click', () => {
              overlayPayment.style.display = 'none';  
            } )
      
            const btnPayment = document.querySelector('#paymentBtn');
         
            btnPayment.addEventListener('click', () => {
      
           
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
              .then(({ url, type,  priceFormation, nameFormation }) => {
                console.log(url, type);
                let productType = type;
                localStorage.setItem('Produit Type', productType);
                localStorage.setItem('nameF', nameFormation);
                localStorage.setItem('priceF', priceFormation);
               
            
                window.location = url;
      
            
                 
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

});


 // GESTION DECONNEXION UTILISATEUR

 function logout() {
  //  if(confirm('Voulez-vous vraiment vous déconnecter ?')) {
       localStorage.clear();
         sessionStorage.clear();
         window.location.replace('/index.html');
  //  }
}