
const enseignants = document.querySelector('#enseignants');
const timer = document.querySelector('.formation__barProgression--timer');
const id = localStorage.getItem('id');
const token = localStorage.getItem('token');
const logoutButton = document.querySelector('.deconnexion');
const titleFormationHead = document.querySelector('.announcement > h2');
const titleFormation = document.querySelector('.titleFormation');
const reaTeachers = localStorage.getItem('reaTeachers');
const formationId = localStorage.getItem('idFormation');

let timerId;
let timeElapsed = 0;

const overlayPayment = document.querySelector('.overlay__paiement');
let priceSet = document.querySelector('.paymentBtn > span');
let paymentBtn = document.querySelector('.paymentBtn');
let cancelOverlay = document.querySelector('.cancelOder');
let cpfBtn = document.querySelector('#cpf_button');
const cbButton = document.querySelector('#cb_button');

const quizz = document.querySelector('.quizz_display');

function getTimeElapsed() {
  return timeElapsed;
}


function timeDecreasing() {
  let timePassed = setInterval(() => {
    timeElapsed += 1000;
  }, 1000);

}

function timeFlux(time2countDown, timeCountUp) {
  let initialTime = parseInt(time2countDown) * 60 * 60 * 1000;
  const timeConsumed = parseInt(timeCountUp);
 // let remainingTime = initialTime - totalTime;

  const formattedTime = (time) => {
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  let timerId = setInterval(() => {
    if (initialTime > 0) {
      quizz.style.display = 'none';
      initialTime -= 1000;
      timer.textContent = formattedTime(initialTime - timeConsumed);
    } else  if (initialTime == 0){
      quizz.style.display = 'block';
      timer.textContent = "Vous avez passé le temps requis pour tester vos connaissances avec un quizz, bravo !";
      clearInterval(timerId);
    }
  }, 1000);

 // let remainTotalTime = 
};

let currentContent = 0;

///////////// //////////////////////////////////// //////////////////////////

 if( document.URL.includes("reaTeachers.html")) {
  /////////////////////////////////////////////////////////////////////

  timeDecreasing();

  const main = document.querySelector('main');
  main.style.backgroundColor = '#f1f1f1';
  // main.style.backgroundImage = 'url(../../images/plot_auto.jfif)';
  // main.style.backgroundRepeat = 'no-repeat';
  // main.style.backgroundSize = 'cover';
  // main.style.backgroundPosition = 'Center';

  const profilNLogoutBtn = ` <button class="profil"><a href="../../pages/profil.html">Profil</a></button>
  <button type="button" class="deconnexion" onclick='logout()' data-toggle="modal" data-target="#reaModalCenter" >Sauver et quitter session</button>`;

  document.querySelector('#log-navigation').innerHTML = profilNLogoutBtn ;

 
    fetch(`http://localhost:3000/api/getuser/${id}/formations`, {
      method: 'GET',
      headers: {
        'accept' : 'application/json',
        'content-type' : 'application/json',
        'authorization' : `Bearer ${token}`
      }
    })
    .then(data => {return data.json()})
    .then(res => {
    console.log(res);

      let admin = res.admin;

      if(admin || !admin) {        
        for(let i of res.Formations) {
        

          console.log(i.nameFormation);
         if(i.id == localStorage.getItem('itemSoldId') || i.id == localStorage.getItem('idFormation') || i.id == localStorage.getItem('idF') ) {
         
          titleFormationHead.innerHTML = `<h2> Formation ${i.nameFormation} </h2>`;
         
          if (!localStorage.getItem('idFormation')) {
            localStorage.setItem('idFormation', i.id);
          } else {
            localStorage.setItem('idFormation', i.id);
          }

          const nbOfModules = i.modulesCompo.length;
         
            let mapModules = document.createElement('div');
            mapModules.style.width = 'auto';
            mapModules.classList.add('opaque');
            mapModules.style.position = 'fixed';
            mapModules.style.right = '10px';
            mapModules.style.top = '7%';
            mapModules.style.height = 'auto';
            mapModules.style.zIndex = '1000';
            mapModules.style.margin = '20px';
            mapModules.style.padding = '7px';
            mapModules.style.borderRadius = '10px';
            mapModules.style.backgroundColor = 'lightblue';
            mapModules.style.color = 'black';
          

            // let barProgression = document.querySelector('.formation__barProgression--user > div');

            // barProgression.style.height = '10px';
            // barProgression.style.backgroundColor = 'lightblue';
           
            // let curseur = document.createElement('div');
            
            // curseur.style.width = '10%';
            // curseur.classList.add('curseur');
            
            // barProgression.appendChild(curseur);

            let containerGlobal = document.createElement('div');


            let slider = document.createElement('div');
            slider.classList.add('slider');

        
            let contentsDiv = document.createElement('div');
            contentsDiv.style.display = 'flex';
            contentsDiv.style.flexDirection = 'row';
            contentsDiv.classList.add('contents');
           contentsDiv.id = 'contents';

           
            titleFormation.style.fontSize = '1.5rem';
            titleFormation.innerHTML = `<h1> Bienvenue dans votre Formation ${i.nameFormation}. Durée, ${i.durationFormation} heure(s)</h1>
            <h3><i> Vous devrez passer un total de 7 Heures Minimum pour valider votre cursus 😃 !</i></h3>`;


            fetch(`http://localhost:3000/api/getuser/${id}/getformationprogress/${formationId}`, {
              method: 'GET',
              headers: {
                'content-type' : 'application/json',
                'accept' : 'application/json',
                'authorization' : `Bearer ${token}`
              }
            })
            .then( data => { return data.json() })
            .then( res => { 

              console.log(res);

              function timeDecreasingLogout() {

                let timePassed = setInterval(() => {
                  
                  if (!localStorage.getItem('tempsProgress')) {
                    localStorage.setItem('tempsProgress', getTimeElapsed() + res.progressTime);           
                  } else if(localStorage.getItem('tempsProgress')) {
                    localStorage.removeItem('tempsProgress');
                    localStorage.setItem('tempsProgress', getTimeElapsed() + res.progressTime);
                  } else if(timeElapsed > i.durationFormation*60*60*1000 ) {
                    clearInterval(timePassed);
                  }
                }, 1000); 
              } 
              timeDecreasingLogout()

              if( res.progressTime &&  res.progressTime > 0) {
                
                timeFlux(i.durationFormation, res.progressTime);
              } else {
               timeFlux(i.durationFormation, 0)
             }

             if (res.progressTime >= 25200000 ) {

              document.querySelector('.quizz_display').style.display = 'block';

             }



            })


           
            let count = 0;
            let nbModule = 1;
            let currentModule = 0;
            let currentPdf = 0;

            let btnSlide = document.createElement('button');
            btnSlide.style.height = '10%';
            btnSlide.style.position = 'fixed';
            btnSlide.style.left = '5%';
            btnSlide.style.top = '50%';
            btnSlide.style.zIndex = '1000';
            btnSlide.style.borderRadius = '10%';
            btnSlide.setAttribute('id', 'next-btn');
            btnSlide.style.color = 'red';
            btnSlide.style.backgroundColor = 'lightblue';
            btnSlide.textContent = 'Module Suivant';
           

            Promise.all(i.modulesCompo.map(async (doc) => {
              
              const data = await fetch(`/Frontend/docs/${doc.docs}`, {
                method: 'GET',
                headers: {
                  'accept': 'application/json',
                  'content-type': 'application/json'
                }
              });
              const res = await data.json();
              // le code à exécuter pour chaque module
              currentPdf++
              currentModule++;
                
               // console.log(currentModule);

              const mapItemModule = document.createElement('div');
              mapItemModule.style.margin = '2px';
              mapItemModule.style.zIndex = '10';
              mapItemModule.style.cursor = 'pointer';
              mapItemModule.setAttribute('name', doc.name);
              mapItemModule.classList.add('hoverMapModule');
              mapItemModule.innerHTML = `<h3>${nbModule++} : ${doc.name}</h3>`;

              mapModules.appendChild(mapItemModule); 

              let divModule = document.createElement('div');
              divModule.setAttribute('name', doc.name);
              divModule.classList.add('content');
              divModule.classList.add('active');
              divModule.style.height = 'auto';
              divModule.setAttribute('data-module-id', `${currentModule}`);
              mapItemModule.setAttribute('data-map-id', `${currentModule}`);
             
              

              
              let titleModule = document.createElement('h2');
              titleModule.textContent = `${doc.name}`;
              titleModule.style.fontSize = '4rem';
              titleModule.style.margin = '3% auto';
              titleModule.style.color = 'red';
              titleModule.style.textAlign = 'left';
              titleModule.style.padding = '10px';
              titleModule.style.fontFamily = `'Staatliches', Arial, Helvetica, sans-serif`;
              divModule.appendChild(titleModule);

            
              divModule.appendChild(btnSlide);

              for (let i in res) {

                if (i.startsWith('VIDEO')) {

                  let formatPath = i.replace('C:\\fakepath\\', '/Frontend/videosData/');
                  let fixedPath = formatPath.replace(formatPath.slice(0, 6), ' ');
                  let pathVideos = fixedPath.concat('.mp4');
                  let videoInput = document.createElement('video');  
                  videoInput.controlsList.add('nodownload');
                  videoInput.classList.add('resizeVideo');
                  videoInput.src = pathVideos;
                  videoInput.style.margin = '0 auto';
                  videoInput.style.borderRadius = '10%';
                  videoInput.style.border = '1ps solid red';
                  videoInput.style.borderRadius = '10px';
                  videoInput.controls = true;
                  videoInput.volume;

               
                  divModule.appendChild(videoInput);
                 


                } else if (i.startsWith('PDF')) {

                  let pdfDiv = document.createElement('div');
                  pdfDiv.style.display = 'flex';
                  pdfDiv.style.justifyContent = 'flex-start';
                  pdfDiv.style.alignItems = 'center';

                  
                  let formatPath_1 = i.replace('C:\\fakepath\\', '/Frontend/pdfsData/');
                  let fixedPath_1 = formatPath_1.replace(formatPath_1.slice(0, 4), ' ');
                  let pathPdfs = fixedPath_1.concat('.pdf');
                  let pdfInput = document.createElement('iframe');
                  pdfInput.src = pathPdfs;
                  pdfInput.classList.add('pdf');
                  
                                  // Ajouter le bouton "Lecture audio"
                  let text2speechBtn = document.createElement('button');
                   text2speechBtn.classList.add('pdfSpeech');
                   text2speechBtn.style.margin = '5px';
                  text2speechBtn.style.backgroundColor = 'lightgreen';
                  text2speechBtn.style.height = '60px';
                  text2speechBtn.style.width = '60px';
                  text2speechBtn.style.borderRadius = '50%';
                  text2speechBtn.textContent = '▶';
                  // text2speechBtn.addEventListener('click', function() {
                  //   // Extraire le texte du PDF avec pdf.js
                  //   pdfjsLib.getDocument(pathPdfs).promise.then(function(pdf) {
                  //     let pages = [];
                  //     for (let i = 1; i <= pdf.numPages; i++) {
                  //       pages.push(pdf.getPage(i));
                  //     }
                  //     Promise.all(pages).then(function(pageObjs) {
                  //       let texts = [];
                  //       for (let i = 0; i < pageObjs.length; i++) {
                  //         texts.push(pageObjs[i].getTextContent());
                  //       }
                  //       Promise.all(texts).then(function(textArrs) {
                  //         let fullText = "";
                  //         for (let i = 0; i < textArrs.length; i++) {
                  //           fullText += textArrs[i].items.map(function(s) { return s.str; }).join(" ");
                  //         }
                  //         // Lire le texte à voix haute avec la synthèse vocale
                  //         let synth = window.speechSynthesis;
                  //         let utterance = new SpeechSynthesisUtterance(fullText);
                  //         synth.speak(utterance);
                  //       });
                  //     });
                  //   });
                  // });
                //  document.querySelector('.pdf').parentNode.insertBefore(document.querySelector('.pdf') , document.querySelector('.pdf').nextSibling);

                pdfDiv.appendChild(pdfInput);
                pdfDiv.appendChild(text2speechBtn);
                
                  divModule.appendChild(pdfDiv);
                } else {
                }

              }
//////////////////////////////////////////// INTEGRATION HTML ///////////////////////////////////////////////////////////////////////////////
              

              



             // contentsDiv.appendChild(mapModules);
              contentsDiv.appendChild(divModule);
              contentsDiv.insertBefore(btnSlide, contentsDiv.firstChild);
              slider.appendChild(mapModules)
              slider.appendChild(contentsDiv);
              containerGlobal.appendChild(slider);
              
              
              
              
              
              enseignants.innerHTML = containerGlobal.outerHTML;
             
            

              let quizzOn = false;
             // const qAccess = false;

              
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              let formationId = localStorage.getItem('idFormation');

                fetch(`http://localhost:3000/api/getuser/${id}/getformationprogress/${formationId}`, {
                  method: 'GET',
                  headers: {
                    'content-type' : 'application/json',
                    'accept' : 'application/json',
                    'authorization' : `Bearer ${token}`
                  }
                })
                .then( data => { return data.json() })
                .then( res => { 

                  

                  if(res.autoUnblockAt > res.blockedAt) {

                   
                    let qA = {
                      idFormationN: formationId,
                      isQuizzBlocked: 0,
                    }
                
                    fetch(`http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`, {
                      method:'PATCH',
                      body: JSON.stringify(qA),
                      headers: {
                        'accept' : 'application/json',
                        'content-type' : 'application/json',
                        'authorization' : `Bearer ${token}`
                      }
                    } )
                    .then( data => { return data.json()})
              
                  } else if (res.isQuizzBlocked) {

                    let quizzMsg = document.querySelector('.msgErrQuizz');
                      quizzMsg.style.position = 'fixed';
                    quizzMsg.style.top = '25%';
                    quizzMsg.style.zIndex = '3';
                    quizzMsg.style.color = 'yellow';
                    quizzMsg.style.backgroundColor = 'cyan';
                    quizzMsg.style.backgroundColor = 'black';
                    quizzMsg.style.borderRadius = '10px';
                    quizzMsg.style.left = '2%';
                    quizzMsg.style.padding = '10px';
                    quizzMsg.style.margin = '20px';
                    quizzMsg.style.fontSize = '4rem';
                    quizzMsg.style.textAlign = 'center';
                    quizzMsg.textContent = `Vous devez attendre ${res.blockTime/60/60/1000}Heures pour passer de nouveau l'examen .`;
                    setTimeout(() => {
                      quizzMsg.textContent = '';
                        quizzMsg.style.backgroundColor = 'transparent';
                       // minimapSpot();
                      }, 9000);
              
                    document.querySelector('.quizz_display').style.display = 'none';
   
  } else {

    let qA = {
      idFormationN: formationId,
      isQuizzBlocked: 0,
    }

    fetch(`http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`, {
      method:'PATCH',
      body: JSON.stringify(qA),
      headers: {
        'accept' : 'application/json',
        'content-type' : 'application/json',
        'authorization' : `Bearer ${token}`
      }
    } )
    .then( data => { return data.json()})
  }

              ////////////////////////////// Faire une forEach pour contrôler si chaque video de chaque divModule est visioné ... /////////////////////////////////////
              
              document.querySelectorAll('.content').forEach( (content, index) => {

                  document.querySelector('.quizz_display').addEventListener('click', () => {
                    
                    document.querySelector('.contents').style.display = 'none';

                    content.querySelectorAll('.resizeVideo').forEach(video => {
                      video.muted = true;
                    })

                    document.querySelector('.quizz_display').style.display = 'none';

                    if (count == 0 ) {

                      content.style.display = 'none';
                      document.querySelector('.global-container').style.display = 'block';
                      
                      quizzOn = true;
                      
                      const firstQuizz = document.querySelectorAll('.global-container')[0];
                       console.log('btn cible:', firstQuizz.childNodes);
                             firstQuizz.querySelector('button').addEventListener('click', (e) => {
                             e.preventDefault();
                               e.stopPropagation();
                             
                             const responses = ["b", "a", "c", "c", "a","b","a","b","b","c"];
                             
                             const results = [];
                           
                             const radioButtons = firstQuizz.querySelectorAll("input[type='radio']:checked");
  
                           console.log(radioButtons);
  
                             radioButtons.forEach((radioButton, index) => {
                               if (radioButton.value === responses[index]) {
                                 results.push(true);
                               } else {
                                 results.push(false);
                               }
                             });
                           
                            // const emojis = ["✔️", "✨", "👀", "😭", "👎"];
  
                                   const titleResult = document.querySelector(".results h2");
                                   const markResult = document.querySelector(".mark");
                                   const helpResult = document.querySelector(".help");
                                   
                                 //  const errorsNumber = results.filter(el => el === false).length;
                                   const rightNumber = results.filter(el => el === true).length;
  
                                   nbOfResponse = results.length;
  
                                  
                                   function showResults(results) {
  
                                     
  
  
                                     const note = 100 * (rightNumber * 10) / 100;
                                     
                                     
  
                                     if (note <= 30) {
  
                                        const grade = document.querySelector('.grade');
                                         titleResult.textContent = `😭Malheureusement, vous devrez repasser l'épreuve ... 😭 `;
                                         helpResult.textContent = "Veuillez noter de bien devoir attendre 5 Heures avant de pouvoir repasser le test !";
                                         helpResult.style.display = "block";
                                         markResult.innerHTML = `<span> ${note}% de réussite , seulement </span>`;
                                         markResult.style.display = "block";
  
                                         const BLOCK_TIME_IN_MS = 18000000;
  
                                         let notation = {
                                           idFormationN: formationId,
                                           note : note,
                                           isQuizzBlocked: 1,
                                           blockedAt: new Date(),
                                           blockTime: BLOCK_TIME_IN_MS,
                                           autoUnblockAt: new Date(Date.now() + BLOCK_TIME_IN_MS),
                                           //barProgress : parseInt(localStorage.getItem('barProgress')),
                                           tempsProgress : localStorage.getItem('tempsProgress'),
                                           notation : localStorage.getItem('notation'),
                                           idModule : parseInt(localStorage.getItem('moduleId')),
                                         }
  
                                         fetch(`http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`, {
                                           method:'PATCH',
                                           body: JSON.stringify(notation),
                                           headers: {
                                             'accept' : 'application/json',
                                             'content-type' : 'application/json',
                                             'authorization' : `Bearer ${token}`
                                           },
                                           body: JSON.stringify(notation)
                                         } )
                                         .then( data => { return data.json()})
                                         .then(res => {
                                           console.log(res,'patch Note');
                                           grade.style.display = 'none';
                                         setTimeout(() => {
                                            location.reload();
                                         }, 5000)
  
                                         })
                                       
  
                                        
                                     } else if (note > 30) {
  
                                       const grade = document.querySelector('.grade');
                                     
                                       console.log(grade);
                                         titleResult.textContent = ` ✔️ // Bravo, c'est dans la poche ! ✔️`;
                                         helpResult.textContent = "Vos efforts ont été récompensés !";
                                         helpResult.style.display = "block";
                                         markResult.innerHTML = `<span> ${rightNumber/nbOfResponse * 100}% de réussite !</span>`;
                                         markResult.style.display = "block";
                                        
  
                                         let notation = {
                                           idFormationN: formationId,
                                           note : note,
                                          // barProgress : parseInt(localStorage.getItem('barProgress')),
                                           tempsProgress : localStorage.getItem('tempsProgress'),
                                           notation : localStorage.getItem('notation'),
                                           idModule : parseInt(localStorage.getItem('moduleId')),
                                         }
  
                                         fetch(`http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`, {
                                           method: 'PATCH',
                                           body: JSON.stringify(notation),
                                           headers: {
                                             'accept' : 'application/json',
                                             'content-type' : 'application/json',
                                             'authorization' : `Bearer ${token}`
                                           },
                                           body: JSON.stringify(notation)
                                         } )
                                         .then( data => { return data.json()})
                                         .then(res => {
                                         //  console.log(res);
                                           grade.style.display = 'block';
                                          
                                        
                                          ////  DELIVRABILITE DIPLOME
                                         })
  
  
                                         fetch(`http://localhost:3000/api/getuser/${id}/formations`, {
                                                method: 'GET',
                                                headers: {
                                                  'accept' : 'application/json',
                                                  'content-type' : 'application/json',
                                                  'authorization' : `Bearer ${token}`
                                                }
                                              })
                                              .then(data => {return data.json()})
                                              .then(res => {
  
                                              
                                     
                                                  grade.addEventListener('click', (e) => {
                                      
                                                    // Création d'un objet Blob à partir des données du fichier que vous souhaitez télécharger
                                                    
                                                              const modeleHtml = `<!DOCTYPE html>
                    
                                                                            <html>
                                                                            <head>
                                                                              <meta charset="UTF-8">
                                                                              <title>Facture | NFC Normesse Formations</title>
                                                                              <style>
                                                                                /* Styles pour le contenu du template */
                                                                                .sample_facture {
                                                                                  position: relative;
                                                                                  background-color: #f1f1f1;
                                                                                  margin: 200px auto;
                                                                                  padding: 15px;
                                                                                  border: none;
                                                                                  border-radius: 10px; 
                                                                                  height: 600px;
                                                                                  border: 2px outset gray;
                                                                                  font-family: 'Cinzel Decorative', Arial, Helvetica, sans-serif;
                                                                                  font-size: 1.1rem;                                                                 
                                                                                  border: 2px outset gray;  
                                                                                  line-height: 0.9;
                                                                                }
                                                                                h1 {
                                                                                  font-size: 24px;
                                                                                  font-weight: bold;
                                                                                  margin-bottom: 20px;
                                                                                }
                                                                                h2 {
                                                                                  margin-bottom: 10px;
                                                                                  line-height: 0.5cm;
                                                                                }
                                                                                /* Styles pour l'image du logo */
                                                                                .logoF {
                                                                                  display: block;
                                                                                  margin: 10px auto;
                                                                                  width: 10%;
                                                                                  height: 100px;
                                                                                  border-radius: 10px;
                                                                                  background-size: contain;
                                                                                  background-repeat: no-repeat;
                                                                                }
                                                                                .logoFA {
                                                                                  position: absolute;
                                                                                  bottom: 5px;
                                                                                  right: 10px;
                                                                                  display: block;
                                                                                  margin: 10px auto;
                                                                                  width: 25%;
                                                                                  height: 100px;
                                                                                  border-radius: 10px;
                                                                                  background-size: contain;
                                                                                  background-repeat: no-repeat;
                                                                                }

                                                                                .messageCertif {
                                                                                  font-size : 2rem;
                                                                                  text-align: center;

                                                                                }
                                                                              </style>
                                                                            </head>
                                                                            
                                                                            <body>
                                                                            <div class='sample_facture'>
                                                                            <img class='logoF' src="http://localhost:5500/Frontend/images/NEW LOGO NORMESSE - NCF ES.jpg" alt="Logo NFC NORMESSE FORMATION Mobilité">
                                                                    <h1> Certification d'apprentissage :</h1>
                                                                    <p class='messageCertif'><strong> Normesse Formation Mobilité, \</br>\ atteste que, l'apprenant ${res.name} ${res.secondName}, de l'établissement ${res.company}, \</br>\ à bien acquis les compétences et le savoir nécéssaire à la qualification de ce titre. </p> </strong> \</br>\ \</br>\ 
                                                                    <h2> Directeur de formation : M.Nuguet Daniel </h2>
                                                                    <img class='logoFA' src="http://localhost:5500/Frontend/images/signature_normesse.png" alt="Logo NFC NORMESSE FORMATION Mobilité">
                                                                   </div>
                                                                  </body>
                                                             </html>`   
                    
                                                          //   let pathImg = document.querySelector('.sample_facture > img');  `Frontend/images/NEW LOGO NORMESSE - NCF ES.jpg`;
                    
                                                    const blob = new Blob([modeleHtml], { type: 'text/html' });
                    
                                                    // Création d'une URL de téléchargement à partir de l'objet Blob
                                                    const url = URL.createObjectURL(blob);
                    
                                                    // Création d'un élément de lien pour télécharger le fichier
                                                    const lienTelechargement = document.createElement('a');
                                                    lienTelechargement.href = url;
                                                    lienTelechargement.download = `NCF Normesse Formation, Certification ${i.nameFormation}.html`;
                    
                                                    // Clic sur le lien de téléchargement
                                                    lienTelechargement.click();
                    
                                                    // Nettoyage de l'URL de téléchargement
                                                    URL.revokeObjectURL(url);
                                                  });
                                                // } else {
                                                //   return;
                                                // }
                                          
      
                                           
                                    
                                       });
  
                                    }
                                      
                                 }
                                   
                                   const questions = document.querySelectorAll(".question-block");
  
                                   const radioInputs = document.querySelectorAll("input[type='radio']")
  
                                   radioInputs.forEach(radioInput => radioInput.addEventListener('input', resetColor))
  
                                   function resetColor(e) {
  
                                     const index = e.target.getAttribute("name").slice(1) - 1;
                                     const parentQuestionBlock = questions[index];
  
                                     parentQuestionBlock.style.backgroundColor = "#f1f1f1";
                                     parentQuestionBlock.style.backgroundImage = "none";
  
                                   }
  
                             showResults(results);
                          
                           })
                         
                      count++;
                    } else {
                      return;
                    }

                   
                       })
               // }

                let moduleId = content.getAttribute('data-module-id');
                let pourcentageProgression = Math.floor(moduleId * 100); 
                // /nbOfModules
                               if (index === 0) {
                                 if(localStorage.getItem('moduleId')) {
                                   localStorage.removeItem('moduleId');
                                   localStorage.setItem('moduleId', moduleId); 
                                 } else {  
                                   console.log(moduleId);
                                   localStorage.setItem('moduleId', moduleId);
                                 }
                               }
              
                if (res.idModuleProgress && res.idModuleProgress > 0) {
                  if (res.idModuleProgress == content.getAttribute('data-module-id')) {
                    if (localStorage.getItem('moduleId') < res.idModuleProgress) {
                      localStorage.removeItem('moduleId');
                      localStorage.setItem('moduleId', res.idModuleProgress);
                    }
                  //  localStorage.setItem('moduleId', moduleId);
                    content.style.display = 'block';
                    // if (res.barProgress && res.barProgress > localStorage.getItem('barProgress')) {
                    //  // curseur.style.transform = `translateX(${res.barProgress}%)`;
                    // } else {
                    // //  curseur.style.transform = `translateX(${res.idModuleProgress * 100}%)`;
                    // }
                  } else  {
                    content.style.display = 'none';
                  }
                }

                
                let lastVideoContent = content.querySelectorAll('.resizeVideo')[content.querySelectorAll('.resizeVideo').length - 1];

                    function minimapSpot(e) { 
                      document.querySelectorAll('.hoverMapModule').forEach((mapM , index )=> {

                        
                        if(localStorage.getItem('.moduleId') == document.querySelectorAll('.hoverMapModule').length ) {
                         // document.querySelectorAll('.hoverMapModule').forEach((mapM, index) => {
                            mapM.style.backgroundColor = 'Yellow';
                         // })
                        }  
                        else if (mapM.getAttribute('data-map-id') == localStorage.getItem('moduleId')) {
                          // let idMatch = mapM.getAttribute('data-map-id') == localStorage.getItem('moduleId');
                            mapM.style.backgroundColor = 'Yellow';
                            mapM.style.borderRadius = '10px';
                         }  
                            
                            
                            // Gestion affichage module selon Map ID minimap
                            
                            mapM.addEventListener('click', (e) => {

                               if (quizzOn) {
                                let errVideo = document.querySelector('.msgErrVideo');
                                errVideo.style.color = 'red';
                                errVideo.style.zIndex = '5000';
                                errVideo.style.fontSize = '3rem';
                                errVideo.style.top = '20%';
                                errVideo.style.left = '2%';
                                errVideo.style.padding = '10px';
                                errVideo.style.position = 'fixed';
                                errVideo.style.textAlign = 'center';
                                errVideo.style.backgroundColor = 'black';
                                errVideo.style.borderRadius = '10px';
                                errVideo.style.animation ='slide .800s ease-in-out 0s forwards';
                                errVideo.textContent = 'Vous êtes en éxamen ! Vous ne pouvez pas accédez aux ressources...';
                                setTimeout(() => {
                                 errVideo.textContent = '';
                                 errVideo.style.backgroundColor = 'transparent';
                                }, 2800);
                                  return;

                               } else {

                                const mapId = mapM.getAttribute('data-map-id');

                                if (localStorage.getItem('moduleId') >= mapId) {
  
                                 

                                  // Parcourez tous les éléments "content"
                                  document.querySelectorAll('.content').forEach(content => {
                                    // Trouvez l'élément "content" dont la valeur de l'attribut "data-module-id" correspond à la valeur de l'attribut "data-map-id" de l'élément "mapM" qui a été cliqué
                                    if (content.getAttribute('data-module-id') === mapId) {
                                      // Pour chaque élément "content", masquez-le en définissant son style "display" sur "none"
                                      document.querySelectorAll('.content').forEach(c => c.style.display = 'none');
    
                                      // Affichez la div qui correspond à l'élément "content" trouvé en définissant son style "display" sur "block"
                                      content.style.display = 'block';
                                    }
                                  });
                                  
                                } else { 
                                  let errVideo = document.querySelector('.msgErrVideo');
                                  errVideo.style.color = 'red';
                                  errVideo.style.zIndex = '5000';
                                  errVideo.style.fontSize = '3rem';
                                  errVideo.style.top = '20%';
                                  errVideo.style.left = '2%';
                                  errVideo.style.padding = '10px';
                                  errVideo.style.position = 'fixed';
                                  errVideo.style.textAlign = 'center';
                                  errVideo.style.backgroundColor = 'black';
                                  errVideo.style.borderRadius = '10px';
                                  errVideo.style.animation ='slide .800s ease-in-out 0s forwards';
                                  errVideo.textContent = 'Vous devez visionner intégralement toutes les vidéos du module, et prendre connaissance des ressources avant de passer suivant !';
                                  setTimeout(() => {
                                   errVideo.textContent = '';
                                   errVideo.style.backgroundColor = 'transparent';
                                  }, 2800);
                                }

                               }
                            })
                        })
                    }
                    minimapSpot();
                          
                           content.querySelectorAll('.resizeVideo').forEach(video => {
                             
                             video.setAttribute('data-ended', 'false');
                             
                             if ( video.getAttribute('data-ended') == 'false') {

                               video.addEventListener('timeupdate', () => {
                                 document.querySelector("#next-btn").addEventListener("click", (e) => {

                                   console.log('FALSE !');
                                   let errVideo = document.querySelector('.msgErrVideo');
                        errVideo.style.position = 'fixed';
                        errVideo.style.top = '20%';
                        errVideo.style.zIndex = '5000';
                        errVideo.style.color = 'red';
                        errVideo.style.margin = '20px';
                        errVideo.style.left = '2%';
                        errVideo.style.padding = '10px';
                        errVideo.style.zIndex = '2000';
                        errVideo.style.backgroundColor = 'black';
                        errVideo.style.borderRadius = '10px';
                        errVideo.style.fontSize = '4rem';
                        errVideo.style.textAlign = 'center';
                        errVideo.style.animation ='slide .800s ease-in-out 0s forwards';
                        errVideo.textContent = 'Vous devez visionner intégralement toutes les vidéos du module, et prendre connaissance des ressources avant de passer suivant !';
                        setTimeout(() => {
                         errVideo.textContent = '';
                         errVideo.style.backgroundColor = 'transparent';
                        }, 2800);
                      }); 
                  })                
                 }      
                

                 let moduleActuVideo = video.parentElement;

                
                  video.addEventListener('ended', () => {
                
                    video.setAttribute('data-ended', 'true')

                      if(moduleId == nbOfModules && lastVideoContent.getAttribute('data-ended') == 'true') {
                       // curseur.style.transform = `translateX(${pourcentageProgression}%)`;

                        localStorage.removeItem('moduleId');
                            localStorage.setItem('moduleId', moduleId);

                        // if (localStorage.getItem('barProgress')) {
                        //   localStorage.removeItem('barProgress');
                        //   localStorage.setItem('barProgress', pourcentageProgression);
                        // } else {
                        //   localStorage.setItem('barProgress', pourcentageProgression);
                        // }

                        document.querySelector("#next-btn").style.display = 'none';
                        

                        if (document.querySelectorAll('.resizeVideo')[document.querySelectorAll('.resizeVideo').length - 1] ) {
                          
                          if (!res.autoUnblockAt || res.autoUnblockAt > res.blockedAt) {
                            
                            let errVideo = document.querySelector('.msgErrVideo');
                            errVideo.style.position = 'fixed';
                          errVideo.style.top = '25%';
                          errVideo.style.zIndex = '3';
                          errVideo.style.color = 'yellow';
                          errVideo.style.backgroundColor = 'cyan';
                          errVideo.style.backgroundColor = 'black';
                          errVideo.style.borderRadius = '10px';
                          errVideo.style.left = '2%';
                          errVideo.style.padding = '10px';
                          errVideo.style.margin = '20px';
                          errVideo.style.fontSize = '4rem';
                          errVideo.style.textAlign = 'center';
                          errVideo.style.animation ='slide .800s ease-in-out 0s forwards';
                          errVideo.textContent = `Félicitations ! Vous avez terminé votre session d'apprentissage Vous pouvez maintenant passer à l'éxamen !`;
                          setTimeout(() => {
                            errVideo.textContent = '';
                              errVideo.style.backgroundColor = 'transparent';
                              minimapSpot();
                            }, 5000);
                            

                            document.querySelector('.quizz_display').style.display = 'block';
  
  
                           
      
                          
                       
  
                            }  else if (res.isQuizzBlocked) {
                            document.querySelector('.quizz_display').style.display = 'none';

                            let quizzMsg = document.querySelector('.msgErrQuizz');
                            quizzMsg.style.position = 'fixed';
                          quizzMsg.style.top = '25%';
                          quizzMsg.style.zIndex = '3';
                          quizzMsg.style.color = 'yellow';
                          quizzMsg.style.backgroundColor = 'cyan';
                          quizzMsg.style.backgroundColor = 'black';
                          quizzMsg.style.borderRadius = '10px';
                          quizzMsg.style.left = '2%';
                          quizzMsg.style.padding = '10px';
                          quizzMsg.style.margin = '20px';
                          quizzMsg.style.fontSize = '4rem';
                          quizzMsg.style.textAlign = 'center';
                          quizzMsg.textContent = `Vous devez attendre ${res.blockTime/60/60/1000}Heures pour passer de nouveau l'examen .`;
                          setTimeout(() => {
                            quizzMsg.textContent = '';
                              quizzMsg.style.backgroundColor = 'transparent';
                             // minimapSpot();
                            }, 9000);

                          }

                        }
  
                       ///////// CODE CI DESSOUS À CHANGER /////////////
  
                      } else if (lastVideoContent.getAttribute('data-ended') == 'true')  {  
                                                


                        let errVideo = document.querySelector('.msgErrVideo');
                        errVideo.style.position = 'fixed';
                        errVideo.style.top = '20%';
                        errVideo.style.zIndex = '3';
                        errVideo.style.color = 'cyan';
                        errVideo.style.padding = '20px';
                        errVideo.style.backgroundColor = 'black';
                        errVideo.style.borderRadius = '10px';
                        errVideo.style.margin = '20px';
                        errVideo.style.fontSize = '6rem';
                        errVideo.style.textAlign = 'center';
                        errVideo.style.animation ='slide .800s ease-in-out 0s forwards';
                        errVideo.textContent = 'Bravo ! Vous pouvez passer au module suivant.';
                        console.log('LOG !!!!!!');
                
                      setTimeout(()=> {
                        errVideo = '';
                      },3500)
                        
                        
                        document.querySelector("#next-btn").addEventListener("click", (e) => {


                          let moduleIdNext = content.nextElementSibling.getAttribute('data-module-id')
                          console.log(moduleIdNext);
                       

                            if (localStorage.getItem('moduleId')) {

                              localStorage.removeItem('moduleId');
                              localStorage.setItem('moduleId',  moduleIdNext);
                              console.log('LOPRTER', moduleIdNext);

                            }

                            let tempsP = localStorage.getItem('tempsProgress');
                            let idM = localStorage.getItem('moduleId');
                            let idFormation = parseInt(localStorage.getItem('idFormation'));
                            
                            const progress = {
                              // barProgress : parseInt(barP),
                               tempsProgress : parseInt(tempsP),
                               idModule : parseInt(idM),
                               idFormation: idFormation
                           }
                   
                             fetch(`http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`, {
                               method: 'PATCH',
                               body: JSON.stringify(progress),
                               headers: {
                                   'accept': 'application/json',
                                   'content-type' : 'application/json',
                                   'authorization' : `Bearer ${token}`
                               }
                           })
                           .then(data => { return data.json()})
                           .then(res => {
                               console.log('Heyy !', res,  progress);
                   
                              // localStorage.removeItem('tempsProgress');
                              // localStorage.removeItem('barProgress');
                              // localStorage.removeItem('notation');
                               //localStorage.removeItem('itemSoldId');
                              // localStorage.removeItem('moduleId');
                              // localStorage.removeItem('progressTime');
                   
                              // location.replace('../profil.html');
                           })
                       //   }

                           // Affichage surlignement module minimap
                           minimapSpot();
                         

                          // if (localStorage.getItem('barProgress')) {
                          //   localStorage.removeItem('barProgress');
                          //   localStorage.setItem('barProgress', pourcentageProgression);

                          // } else {
                          //   localStorage.setItem('barProgress', pourcentageProgression);

                          // }

                          content.querySelectorAll('.resizeVideo').forEach(video => {
                            video.muted = true;
                          })

                          //curseur.style.transform = `translateX(${pourcentageProgression}%)`;

                           masqueModuleActu(moduleActuVideo, moduleIdNext);
                           

                          }); 

                        console.log('EXCEPTION !');  

                      } else {
                        document.querySelector("#next-btn").addEventListener("click", (e) => {
                          content.querySelectorAll('.resizeVideo').forEach(video => {
                            // if (video.getAttribute('data-ended') == 'false') {
                            //   console.log("Veuillez visioner toutes les vidéos pour passer au module suivant, merci.");
                            //   let errVideo = document.querySelector('.msgErrVideo');
                            //   errVideo.style.color = 'red';
                            //   errVideo.style.fontSize = '3rem';
                            //   errVideo.style.padding = '10px';
                            //   errVideo.style.left = '2%';
                            //   errVideo.style.textAlign = 'center';
                            //   errVideo.style.backgroundColor = 'black';
                            //   errVideo.style.borderRadius = '10px';
                            //   errVideo.style.animation ='apparition .300s ease-in-out 0s forwards';
                            //   errVideo.textContent = 'Vous devez visionner intégralement toutes les vidéos du module, et prendre connaissance des ressources avant de passer suivant !';
                            //   console.log(errVideo);
                            //   setTimeout(() => {
                            //    errVideo.textContent = '';
                            //    errVideo.style.backgroundColor = 'transparent';
                            //   }, 2800);
                            // } else {

                            // }
                          });
                          console.log('FALSE !');
                       }); 
                     }
                      /////////////////////////////////////////////////////
                    
                  });
                  
                  
                  function afficherModuleSuivant(nextModule) {
                     nextModule = content.nextElementSibling;
                    console.log(nextModule);
                    
                    if (nextModule) {
                      nextModule.style.display = 'block';
                    }
                     else {
                      console.log('ça marche pas !');
                    } 
                  }
   
                   function masqueModuleActu(moduleActuVideo, moduleIdNext) {
                  //  let moduleId = content.getAttribute('data-module-id');
                  if (moduleActuVideo) {
                     
                      moduleActuVideo.style.display = 'none';
             
                    afficherModuleSuivant(moduleIdNext);
                    } else {
                
                    }
                    // code pour afficher le module suivant
                  }

                });
              })

           })
              
              
             
              
              
              
              ///////////////////////////////////   GESTION QUIZZ ////////////////////////////////////////////////////////////
              /////////////////////////////////////////////////////////////////////////////////////////////////
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////
              /////////////////////////////////////////////////////////////////////////////////////////////////
              
            }))
            .then(() => {
              //  le code à exécuter une fois que toutes les promesses ont été résolues
           
              // document.querySelectorAll('.pdf').forEach(pdf => {
              //   let text2speechBtn = document.createElement('button');
              //      text2speechBtn.classList.add('pdfSpeech');
              //     text2speechBtn.style.backgroundColor = 'red';
              //     text2speechBtn.textContent = 'Lecture audio';
                 // text2speechBtn.addEventListener('click', function() {
                    // Extraire le texte du PDF avec pdf.js
                  //   pdfjsLib.getDocument(pathPdfs).promise.then(function(pdf) {
                  //     let pages = [];
                  //     for (let i = 1; i <= pdf.numPages; i++) {
                  //       pages.push(pdf.getPage(i));
                  //     }
                  //     Promise.all(pages).then(function(pageObjs) {
                  //       let texts = [];
                  //       for (let i = 0; i < pageObjs.length; i++) {
                  //         texts.push(pageObjs[i].getTextContent());
                  //       }
                  //       Promise.all(texts).then(function(textArrs) {
                  //         let fullText = "";
                  //         for (let i = 0; i < textArrs.length; i++) {
                  //           fullText += textArrs[i].items.map(function(s) { return s.str; }).join(" ");
                  //         }
                  //         // Lire le texte à voix haute avec la synthèse vocale
                  //         let synth = window.speechSynthesis;
                  //         let utterance = new SpeechSynthesisUtterance(fullText);
                  //         synth.speak(utterance);
                  //       });
                  //     });
                  //   });
                  // });
               //   pdf.appendChild(text2speechBtn);
                 console.log('BTNSPDF',document.querySelectorAll('.pdfSpeech'));
                  // if(document.querySelectorAll('.pdf').length - 1) {   
                  // }
             // })



              containerGlobal.appendChild(quizz);
             enseignants.innerHTML = containerGlobal.outerHTML;
              
             })
            .catch(error => console.log(error));
          
         }
        }
  
        } 
    })

    

/////////////////////////////////////////////////////

  } else if ( document.URL.includes("formationHub.html")) {

  localStorage.removeItem ('idFormation');
  localStorage.removeItem ('itemSoldId');
  localStorage.removeItem('idEnseignant');

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
  console.log(items);

  for( let item of items) {
    for(let properties in item) {
      console.log(item);
      if( properties == 'nameFormation') {
        if(item.nameFormation == 'Réactualisation Enseignants') { 
          localStorage.setItem('idEnseignant', item.id);
       }
      }
    }
  }

    for(let formation of items) {
      console.log(formation);
        document.querySelector('.pannelFormationsHub--content').innerHTML += `
            <h3 class='pannelFormationsHub--contentDesc'> ${formation.nameFormation} </h3>
        `;
    }
    
    document.querySelector('.displayPannelFormationsBtn').addEventListener('click', (e) => {
      document.querySelector('.pannelFormationsHub').classList.toggle('hidden');
    })


    document.querySelectorAll('.pannelFormationsHub--contentDesc').forEach(formDesc => {
      formDesc.addEventListener('click', (e) => {
        console.log(e);
        document.querySelector('.pannelFormationsHub--Description').classList.toggle('hidden');
        document.querySelector('.pannelFormationsHub--Description').innerHTML = `
        
            <img src='/Frontend/images/employees-at-corporate-meeting.jpg' />
            <h2> Formation Réactualisation des compétences Enseignants de la conduite </h2>
            <img  src='/Frontend/images/descriptif Rea Enseignant.jpg' />

            <div class='foot__desc'>
              <div class='foot__desc--Duration'>
                <p> Durée : </p>
                <p> 1 </p>
                <p> Jour(s) </p>
               </div>
              <div class='foot__desc--text'>
                <p> NCF NORMESSE est conventionné par l'ANFA ET L'OPCO mobilités et conventionnés aux normes Qualiopi. </p>
                <img  src='/Frontend/images/' />
                <img  src='/Frontend/images/' />
               </div>
              <div class='foot__desc--logo'>
              <img  src='/Frontend/images/NEW LOGO NORMESSE - NCF ES.jpg' />
               </div>

            </div>

        `;

      })
    })


const idEnseignant = localStorage.getItem('idEnseignant');

  const idF = localStorage.getItem('idF'); 

  fetch(`http://localhost:3000/api/formation/${idF || idEnseignant}`, {
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

document.querySelector('.mainRoad__tarif').textContent = `Tarif : ${itemPrice} €`;
  
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
  .then(({ sessionId, url, type, itemName , montant, idFormation }) => {

    localStorage.setItem('Produit Type', type);
    localStorage.setItem('session_id', sessionId);
    localStorage.setItem('idFormation', idFormation);

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

  
  // // Gestion appel validation Paiement

  const clientId = localStorage.getItem('id');
  const formationId = localStorage.getItem('idFormation');
  const token = localStorage.getItem('token');
  
  fetch(`http://localhost:3000/api/formation/${formationId}`, {
    method: 'GET',
    headers: {
      'content-type' : 'application/json',
      'accept' : 'application/json',
      'authorization' : `Bearer ${token}`
    }
  })
  .then( res => { return res.json() })
  .then( data0 => { 
    
                  console.log(data0);
                  
                  const priceF = data0.priceFormation;
                  const nameF = data0.nameFormation;
                  const dateAchat = new Date();
                  
                  document.querySelector('.pay-success').textContent = `Félicitations 😃 ! Vous êtes maintenant bénéficiaire de votre nouvelle formation ${nameF} ! On te souhaite un bel apprentissage`;
             

                  const data = {
                    dateAchat: dateAchat.toISOString(),
                  priceF: priceF, 
                    nameF, nameF,
                    userId: clientId,
                    formationId: formationId
                  }

                  async function getItemSold() {
                 return await fetch(`http://localhost:3000/api/getuser/${clientId}/formation`, {
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
                }

                getItemSold();

                });

           
              setTimeout(() => {
                // insertion du param de la formation pour redirection 
                      location.replace('./profil.html');
                  }, 3000)

           } else if ( document.URL.includes("formationsStore.html")) {
                    
                  
                    const token = localStorage.getItem('token');

              fetch('http://localhost:3000/api/formations', {
                method: 'GET',
                headers: {
                  'content-type': 'application/json',
                  'accept': 'application/json',
                  'authorization': `Bearer ${token}`
                }
              })
                .then(res => {
                  return res.json();
                })
                .then(items => {

                  for( let item of items) {
                    document.querySelector('.containero').innerHTML += ` <div class="itemStore" data-id="${item.id}" data-role="${item.role}" data-price="${item.priceFormation}" data-name="${item.nameFormation}">
                    <h2>${item.nameFormation}</h2>
                    <h2>${item.priceFormation}€</h2>
                                                     </div>   `;
                  }


                  console.log(items);
                  const allBoxes = document.querySelectorAll('.itemStore');
                  for (let box of allBoxes) {
                    let itemId = box.getAttribute("data-id");
                    let itemName = box.getAttribute("data-name");
                    let itemPrice = box.getAttribute("data-price");
                    let typeFormation = box.getAttribute("data-role");

                    box.addEventListener('click', (e) => {
                      e.preventDefault();
                      overlayPayment.style.display = 'block';
                      cpfBtn.style.fontSize = '1.2rem';
                      cbButton.style.fontSize = '1.2rem';

                      cancelOverlay.style.type = 'button';

                      cancelOverlay.addEventListener('click', () => {
                        overlayPayment.style.display = 'none';
                      });

                      const btnPayment = document.querySelector('#paymentBtn');

                      btnPayment.addEventListener('click', () => {

                        localStorage.setItem('idFormation', itemId);

                        fetch('http://localhost:3000/create-checkout-session', {
                          method: 'POST',
                          headers: {
                            'content-type': 'application/json',
                            'accept': 'application/json'
                          },
                          body: JSON.stringify({
                            items: [
                              { id: itemId, quantity: 1 }
                            ],
                            infoTransaction: { itemName: itemName, montant: itemPrice, id: itemId, type: typeFormation },
                          }),
                        })
                          .then(res => {
                            if (res.ok) return res.json();
                            return res.json().then(json => Promise.reject(json));
                          })
                          .then(({ url, type, priceFormation, nameFormation }) => {
                            console.log(url, type);
                            let productType = type;
                            localStorage.setItem('Produit Type', productType);
                            localStorage.setItem('nameF', nameFormation);
                            localStorage.setItem('priceF', priceFormation);
                            window.location = url;
                          })
                          .catch(e => {
                            console.error(e.error);
                          });
                      });
                    });
                  }
                });

      }  else if ( document.URL.includes("factures.html")) {

          fetch(`http://localhost:3000/api/getuser/${id}/formations`, {
            method: 'GET',
            headers: {
              'accept' : 'application/json',
              'content-type' : 'application/json',
              'authorization': `Bearer ${token}`
            }
          })
          .then(data => {return data.json()})
          .then( res => {
            console.log(res);

            for(let i of res.Formations) {

                document.querySelector('.containerFactures').innerHTML += `
    
                <div class='containerFactures__facture'>
                <p> Reçu : </p>
                      <p>Produit : ${i.nameFormation} </p>
                      <p>Prix : ${i.priceFormation} </p>
                      <p>Date achat : ${i.produits_achetes.date_achat.slice(0 ,i.produits_achetes.date_achat.length -5)} </p>
                      <p> ${i.durationFormation} heures </p>
                </div>
                
                `;

                                              // Récupération de l'élément à rendre téléchargeable
                              const downloadFactureBtns = document.querySelectorAll('.containerFactures__facture');

                              // Ajout du gestionnaire d'événements de clic sur l'élément
                              downloadFactureBtns.forEach(btn => {

                                btn.addEventListener('click', (e) => {

                                  // Création d'un objet Blob à partir des données du fichier que vous souhaitez télécharger
                                  
                                            const modeleHtml = `<!DOCTYPE html>
  
                                                          <html>
                                                          <head>
                                                            <meta charset="UTF-8">
                                                            <title>Facture | NCF Normesse Formations</title>
                                                            <style>
                                                              /* Styles pour le contenu du template */
                                                              .sample_facture {
                                                                display: flex;
                                                                flex-direction: column;
                                                                justify-content: center;
                                                                background-color: #f1f1f1;
                                                                text-align: center;
                                                                margin: 200px auto;
                                                                padding: 15px;
                                                                border: none;
                                                                width: 80%;
                                                                border: 2px outset gray;
                                                                font-family: 'Cinzel Decorative', Arial, Helvetica, sans-serif;
                                                                font-family: Arial, sans-serif;
                                                                font-size: 1.1rem;
                                                                line-height: 0.9;
                                                              }
                                                              h1 {
                                                                font-size: 24px;
                                                                font-weight: bold;
                                                                margin-bottom: 20px;
                                                              }
                                                              p {
                                                                margin-bottom: 10px;
                                                              }
                                                              /* Styles pour l'image du logo */
                                                              .logoF {
                                                                display: block;
                                                                margin: 0 auto;
                                                                width: 200px;
                                                                height: 150px;
                                                                border: 1px solid pink;
                                                                background-image: url('');
                                                                background-size: contain;
                                                                background-repeat: no-repeat;
                                                              }
                                                            </style>
                                                          </head>
                                                          
                                                          <body>
                                                          <div class='sample_facture'>
                                                          <img class='logoF' src="http://localhost:5500/Frontend/images/NEW LOGO NORMESSE - NCF ES.jpg" alt="Logo NCF NORMESSE FORMATION Mobilité" alt="Logo NCF NORMESSE FORMATION Mobilité">
                                                  <h1> Facture achat :</h1>
                                                  <h2> Formation ${i.nameFormation}</h2>
                                                  <h2>Prix : ${i.priceFormation} €</h2>
                                                  <h2>${i.durationFormation} heures</h2>
                                                  <h2>Date achat : ${i.produits_achetes.date_achat.slice(0 ,i.produits_achetes.date_achat.length -5)}</h2>
                                                  <h2>Client : ${res.name} ${res.secondName}</h2>
                                                  <h2>Entreprise/Établissement : ${res.company}</h2>
                                                  </div>
                                                </body>
                                           </html>`   
  
                                        //   let pathImg = document.querySelector('.sample_facture > img');  `Frontend/images/NEW LOGO NORMESSE - NCF ES.jpg`;
  
                                  const blob = new Blob([modeleHtml], { type: 'text/html' });
  
                                  // Création d'une URL de téléchargement à partir de l'objet Blob
                                  const url = URL.createObjectURL(blob);
  
                                  // Création d'un élément de lien pour télécharger le fichier
                                  const lienTelechargement = document.createElement('a');
                                  lienTelechargement.href = url;
                                  lienTelechargement.download = `NCF Normesse Formation, facture ${i.nameFormation}.html`;
  
                                  // Clic sur le lien de téléchargement
                                  lienTelechargement.click();
  
                                  // Nettoyage de l'URL de téléchargement
                                  URL.revokeObjectURL(url);
                                });
                              }) 
              
            }
          } )  
      }
});


 // GESTION DECONNEXION UTILISATEUR

 function logout() {
  if(document.URL.includes('/reaTeachers.html')) {

    const token = localStorage.getItem('token');
    let idFormation = parseInt(localStorage.getItem('idFormation'));

    
    fetch(`http://localhost:3000/api/getuser/${id}/formations`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'content-type' : 'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    .then(data => { return data.json()})
    .then(res => {

      for( let i of res.Formations) {

        let idM;

        if ( localStorage.getItem('idModule') == i.idModuleProgress) {
            idM = localStorage.getItem('moduleId');
    
        } else if (localStorage.getItem('idModule') > i.idModuleProgress) {
            idM = parseInt(localStorage.getItem('moduleId'));
        } else {
            idM = parseInt(i.idModuleProgress);
        }
    
        let note;
    
        if (!localStorage.getItem('notation')) {
            note = null;
        } else if (localStorage.getItem('notation')) {
            note = localStorage.getItem('notation');
        }
    
        // let barP;
    
        // if (!localStorage.getItem('barProgress')) {
        //     barP = null;
        // } else if (localStorage.getItem('barProgress')) {
        //     barP = parseInt(localStorage.getItem('barProgress') );
        // }
    
        let tempsP;
    
        if (localStorage.getItem('tempsProgress')) {
          
            tempsP = localStorage.getItem('tempsProgress');

        } 
        // else if (localStorage.getItem('tempsProgress')) {
        //     tempsP = localStorage.getItem('tempsProgress');
        // }
    
        const progress = {
           // barProgress : parseInt(barP),
            tempsProgress : parseInt(tempsP),
            notation : parseInt(note),
            idModule : parseInt(idM),
            idFormation: idFormation
        }


          fetch(`http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`, {
            method: 'PATCH',
            body: JSON.stringify(progress),
            headers: {
                'accept': 'application/json',
                'content-type' : 'application/json',
                'authorization' : `Bearer ${token}`
            }
        })
        .then(data => { return data.json()})
        .then(res => {
            console.log(res,  progress);

            localStorage.removeItem('tempsProgress');
           // localStorage.removeItem('barProgress');
            localStorage.removeItem('notation');
            localStorage.removeItem('itemSoldId');
            localStorage.removeItem('moduleId');
           // localStorage.removeItem('progressTime');

            location.replace('../profil.html');
        })
      }
    })

    } else {

    localStorage.clear();
      sessionStorage.clear();
      window.location.replace('./index.html');
    
}
}
