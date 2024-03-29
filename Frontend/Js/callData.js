const enseignants = document.querySelector("#enseignants");
const timer = document.querySelector(".formation__barProgression--timer");
const id = localStorage.getItem("id");
const token = localStorage.getItem("token");
const logoutButton = document.querySelector(".deconnexion");
const titleFormationHead = document.querySelector(".announcement > h2");
const titleFormation = document.querySelector(".titleFormation");
const reaTeachers = localStorage.getItem("reaTeachers");
const formationId = localStorage.getItem("idFormation");

//const pdfjsLib = require('pdfjs-dist/build/pdf');

let timerId;
let timeElapsed = 0;

const overlayPayment = document.querySelector(".overlay__paiement");
let priceSet = document.querySelector(".paymentBtn > span");
let paymentBtn = document.querySelector(".paymentBtn");
let cancelOverlay = document.querySelector(".cancelOder");
let cpfBtn = document.querySelector("#cpf_button");
const cbButton = document.querySelector("#cb_button");

const quizz = document.querySelector(".quizz_display");

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
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  let timerId = setInterval(() => {
    if (initialTime > 0) {
      quizz.style.display = "none";
      initialTime -= 1000;
      timer.textContent = formattedTime(initialTime - timeConsumed);
    } else if (initialTime == 0) {
      quizz.style.display = "block";
      timer.textContent =
        "Vous avez passé le temps requis pour tester vos connaissances avec un quizz, bravo !";
      clearInterval(timerId);
    }
  }, 1000);

  // let remainTotalTime =
}

let currentContent = 0;

///////////// //////////////////////////////////// //////////////////////////

if (document.URL.includes("reaTeachers.html")) {
  /////////////////////////////////////////////////////////////////////

  timeDecreasing();

  // main.style.backgroundImage = 'url(../../images/plot_auto.jfif)';
  // main.style.backgroundRepeat = 'no-repeat';
  // main.style.backgroundSize = 'cover';
  // main.style.backgroundPosition = 'Center';

  const profilNLogoutBtn = ` <button class="profil"><a href="../../pages/profil.html">Profil</a></button>
  <button type="button" class="deconnexion" onclick='logout()' data-toggle="modal" data-target="#reaModalCenter" >Sauver et quitter session</button>`;

  document.querySelector("#log-navigation").innerHTML = profilNLogoutBtn;

  fetch(`http://localhost:3000/api/getuser/${id}/formations`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      let admin = res.admin;

      if (admin || !admin) {
        for (let i of res.Formations) {
          if (
            i.id == localStorage.getItem("itemSoldId") ||
            i.id == localStorage.getItem("idFormation") ||
            i.id == localStorage.getItem("idF")
          ) {
            titleFormationHead.innerHTML = `<h2> Formation ${i.nameFormation} </h2>`;

            if (!localStorage.getItem("idFormation")) {
              localStorage.setItem("idFormation", i.id);
            } else {
              localStorage.setItem("idFormation", i.id);
            }

            const nbOfModules = i.modulesCompo.length;
            let curseur = document.createElement("div");
            curseur.style.width = `${nbOfModules * 100}px`;

            let mapModules = document.createElement("div");
          //  mapModules.style.width = "auto";
            mapModules.classList.add("opaque");
            mapModules.style.position = "fixed";
            mapModules.style.right = "10px";
            mapModules.style.top = "7%";
            mapModules.style.height = "auto";
            mapModules.style.zIndex = "1000";
            mapModules.style.margin = "20px";
            mapModules.style.padding = "7px";
            mapModules.style.borderRadius = "10px";
            mapModules.style.backgroundColor = "#6ca0fb";
            mapModules.style.color = "black";

            let barProgression = document.querySelector(
              ".formation__barProgression--user > div"
            );
            barProgression.style.width = "500px";
            let barProgUserName = document.querySelector(
              ".formation__barProgression--user > h3"
            );
            barProgUserName.style.fontSize = "4rem";
            barProgUserName.style.fontWeight = "800";
            barProgUserName.style.color = "#6ca0fb";

            barProgUserName.textContent = `${res.secondName}`;

            barProgression.style.height = "10px";
            barProgression.style.backgroundColor = "lightblue";

            curseur.style.width = "10%";
            curseur.classList.add("curseur");
            barProgression.appendChild(curseur);

            let containerGlobal = document.createElement("div");

            let slider = document.createElement("div");
            slider.classList.add("slider");

            let contentsDiv = document.createElement("div");
            contentsDiv.style.display = "flex";
            contentsDiv.style.flexDirection = "row";
            contentsDiv.classList.add("contents");
            contentsDiv.id = "contents";

            titleFormation.style.fontSize = "1.5rem";
            titleFormation.innerHTML = `<h1> Bienvenue dans votre Formation ${i.nameFormation}. Durée, ${i.durationFormation} heure(s)</h1>
            <h3><i> Vous devrez passer un total de 7 Heures Minimum pour valider votre cursus 😃 !</i></h3>`;

            fetch(
              `http://localhost:3000/api/getuser/${id}/getformationprogress/${formationId}`,
              {
                method: "GET",
                headers: {
                  "content-type": "application/json",
                  accept: "application/json",
                  authorization: `Bearer ${token}`,
                },
              }
            )
              .then((data) => {
                return data.json();
              })
              .then((res) => {
                console.log(res.barProgress);

                function timeDecreasingLogout() {
                  let timePassed = setInterval(() => {
                    if (!localStorage.getItem("tempsProgress")) {
                      localStorage.setItem(
                        "tempsProgress",
                        getTimeElapsed() + res.progressTime
                      );
                    } else if (localStorage.getItem("tempsProgress")) {
                      localStorage.removeItem("tempsProgress");
                      localStorage.setItem(
                        "tempsProgress",
                        getTimeElapsed() + res.progressTime
                      );
                    } else if (
                      timeElapsed >
                      i.durationFormation * 60 * 60 * 1000
                    ) {
                      clearInterval(timePassed);
                    }
                  }, 1000);
                }
                timeDecreasingLogout();

                if (res.progressTime && res.progressTime > 0) {
                  timeFlux(i.durationFormation, res.progressTime);
                } else {
                  timeFlux(i.durationFormation, 0);
                }

                if (res.progressTime >= 25200000) {
                  document.querySelector(".quizz_display").style.display =
                    "block";
                }
              });

            let count = 0;
            let nbModule = 1;
            let currentModule = 0;
            let currentPdf = 0;

            let btnSlide = document.createElement("button");
            btnSlide.style.height = "10%";
            btnSlide.style.position = "fixed";
            btnSlide.style.left = "5%";
            btnSlide.style.top = "50%";
            btnSlide.style.zIndex = "1000";
            btnSlide.style.borderRadius = "10%";
            btnSlide.setAttribute("id", "next-btn");
            btnSlide.style.color = "red";
            btnSlide.style.backgroundColor = "lightblue";
            btnSlide.textContent = "Module Suivant";

            // Créez un tableau pour stocker les promesses d'extraction
            const extractionPromises = [];
            const textContainers = [];
            const imageContainers = [];


            Promise.all(
              i.modulesCompo.map(async (doc) => {
                const data = await fetch(`/Frontend/docs/${doc.docs}`, {
                  method: "GET",
                  headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                  },
                });
                const res = await data.json();
                // le code à exécuter pour chaque module

                currentModule++;

                // console.log(currentModule);

                const mapItemModule = document.createElement("div");
                mapItemModule.style.margin = "2px";
                mapItemModule.style.zIndex = "10";
                mapItemModule.style.cursor = "pointer";
                mapItemModule.setAttribute("name", doc.name);
                mapItemModule.classList.add("hoverMapModule");
                mapItemModule.innerHTML = `<h3>${nbModule++} : ${
                  doc.name
                }</h3>`;

                mapModules.appendChild(mapItemModule);

                let divModule = document.createElement("div");
                divModule.setAttribute("name", doc.name);
                divModule.classList.add("content");
                divModule.classList.add("active");
                divModule.style.height = "auto";
                divModule.setAttribute("data-module-id", `${currentModule}`);
                mapItemModule.setAttribute("data-map-id", `${currentModule}`);

                let titleModule = document.createElement("h2");
                titleModule.textContent = `${doc.name}`;
                titleModule.style.fontSize = "4rem";
                titleModule.style.margin = "3% auto";
                titleModule.style.color = "#6ca0fb";
                titleModule.style.textAlign = "left";
                titleModule.style.padding = "10px";
                titleModule.style.fontFamily = `'Staatliches', Arial, Helvetica, sans-serif`;
                divModule.appendChild(titleModule);

                divModule.appendChild(btnSlide);

                for (let i in res) {
                  if (i.startsWith("VIDEO")) {
                    let formatPath = i.replace(
                      "C:\\fakepath\\",
                      "/Frontend/videosData/"
                    );
                    let fixedPath = formatPath.replace(
                      formatPath.slice(0, 6),
                      " "
                    );
                    let pathVideos = fixedPath.concat(".mp4");
                    let videoInput = document.createElement("video");
                    videoInput.controlsList.add("nodownload");
                    videoInput.classList.add("resizeVideo");
                    videoInput.src = pathVideos;
                    videoInput.style.margin = "10% auto";
                    videoInput.style.zIndex = "1000";
                    videoInput.style.borderRadius = "10%";
                    videoInput.style.border = "1ps solid red";
                    videoInput.style.borderRadius = "10px";
                    videoInput.controls = true;
                    videoInput.volume;

                    divModule.appendChild(videoInput);

                  } else if (i.startsWith("PDF")) {
                    currentPdf++;

                    let pdfDiv = document.createElement("div");

                    pdfDiv.style.display = "flex";
                    pdfDiv.style.justifyContent = "flex-start";
                    pdfDiv.style.alignItems = "center";

                    pdfDiv.classList.add("pdf");
                  pdfDiv.style.maxWidth = "100%";
                 // pdfDiv.style.Width = "100%";
                  

                    // Créez un élément p pour le contenu du PDF
                    // let contentText = document.createElement("p");
                    // contentText.style.display = "inline-block";
                    // contentText.style.width = "100%";
                    // contentText.style.fontSize = "2.5rem";
                    
          

                   // pdfDiv.appendChild(contentText);
              //    pdfDiv.appendChild(contentImage);

                    // Générez un ID unique pour le contenu
                   // let contentId = `pdf-content-${currentPdf}-${currentModule}`;
                   // contentText.id = contentId;

                    let formatPath_1 = i.replace(
                      "C:\\fakepath\\",
                      "/Frontend/pdfsData/"
                    );
                    let fixedPath_1 = formatPath_1.replace(
                      formatPath_1.slice(0, 4),
                      " "
                    );
                    let pathPdfs = fixedPath_1.concat(".pdf");
                   // contentText.setAttribute("pdf", pathPdfs);

                    let iframe = document.createElement('iframe');
                    iframe.src = pathPdfs;

                    iframe.style.display = "flex";
                    iframe.style.zIndex = "1000";
                    iframe.style.justifyContent = "center";
                    iframe.style.alignItems = "center";
                    iframe.style.width = "100%";
                    iframe.style.height = "53%";
                    iframe.style.border = "3px solid #6ca0fb";
                    iframe.style.borderRadius = "5px";
                 

                  //                     // Créez une promesse pour l'extraction du texte
                  // extractionPromises.push(
                  //   new Promise((resolve) => {
                  //     extractAndDisplayData(pathPdfs, true)
                  //       .then((extractedText) => {
                  //         textContainers.push({
                  //           id: contentText.id,
                  //           text: extractedText.join(' '), // Joindre le texte extrait
                  //         });
                  //         console.log('Texte extrait !');
                  //         resolve();
                  //       })
                  //       .catch((error) => {
                  //         console.error('Erreur lors de l\'extraction du texte', error);
                  //         resolve(); // Vous pouvez ajuster cela en fonction de votre logique de gestion d'erreur
                  //       });
                  //   })
                  // );

                

                        
                      pdfDiv.appendChild(iframe)
                    divModule.appendChild(pdfDiv);

                    

                    // Ajouter le bouton "Lecture audio"
                    let text2speechBtn = document.createElement("button");
                    text2speechBtn.classList.add("pdfSpeech");
                    text2speechBtn.style.margin = "5px";
                    text2speechBtn.style.backgroundColor = "lightgreen";
                    text2speechBtn.style.height = "60px";
                    text2speechBtn.style.width = "60px";
                    text2speechBtn.style.borderRadius = "50%";
                    text2speechBtn.textContent = "▶";

                    pdfDiv.appendChild(text2speechBtn);
                  }
                }

                      // // Utilisez Promise.all pour attendre que toutes les promesses soient résolues
                      // Promise.all([textPromise, imagePromise])
                      //   .then(() => {
                      //     // Toutes les extractions sont terminées
                      //     console.log("Toutes les données ont été extraites et affichées.");

                      //     // Maintenant que les données sont extraites, ajoutez-les aux éléments correspondants

                      //     // Pour le texte
                      //     document.querySelectorAll(".pdf > p").forEach((pdf) => {
                      //       for (let container of textContainers) {
                      //         if (pdf.id === container.id) {
                      //           pdf.textContent = container.text;
                      //         }
                      //       }
                      //     });

                      //     // Pour les images
                      //     document.querySelectorAll(".pdf > img").forEach((image) => {
                      //       for (let container of imageContainers) {
                      //         if (image.id === container.id) {
                      //           image.src = container.images[0].src;
                      //           image.alt = container.images[0].alt;
                      //         }
                      //       }
                      //     });
                      //   })
                      //   .catch((error) => {
                      //     console.error("Une erreur est survenue lors de l'extraction des données :", error);
                      //   });

                   

                          //     // Fonction récursive pour extraire les images d'une page
                          // async function extractImages(page, images) {
                          //   const ops = await page.getOperatorList();
                          //   for (let i = 0; i < ops.fnArray.length; i++) {
                          //     if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
                          //       try {
                          //         const imageInfo = page.objs.get(ops.argsArray[i]);
                          //         const image = new Image();
                          //         image.src = imageInfo.src.toString();
                          //         image.alt = 'Image';
                          //         images.push(image);
                          //       } catch (error) {
                          //         console.error('Erreur lors de l\'extraction de l\'image :', error);
                          //       }
                          //     }
                          //   }
                          // }

             
                              //                         // Fonction pour extraire les données (texte ou images)
                              // async function extractAndDisplayData(pdfPath) {
                              //   const pdf = await pdfjsLib.getDocument(pdfPath).promise;
                              //   const pagesData = [];

                              //   async function processPage(pageNum) {
                              //     if (pageNum > pdf.numPages) {
                              //       return; // Sortie de la fonction récursive lorsque toutes les pages sont traitées
                              //     }

                              //     const page = await pdf.getPage(pageNum);
                              //     const pageData = {
                              //       text: '',
                              //       images: [],
                              //     };

                              //     // Extraction du texte
                              //     const content = await page.getTextContent();
                              //     content.items.forEach((item) => {
                              //       pageData.text += item.str + ' ';
                              //     });

                              //     // Extraction des images
                              //     await extractImages(page, pageData.images);

                              //     // Ajouter les données de la page au tableau
                              //     pagesData.push(pageData);

                              //     // Appeler la fonction récursive pour la page suivante
                              //     await processPage(pageNum + 1);
                              //   }

                              //   // Commencer le traitement à partir de la première page
                              //   await processPage(1);

                              //   return pagesData;
                              // }

 
                    
                //////////////////////////////////////////// INTEGRATION HTML ///////////////////////////////////////////////////////////////////////////////

                // contentsDiv.appendChild(mapModules);
                contentsDiv.appendChild(divModule);
                contentsDiv.insertBefore(btnSlide, contentsDiv.firstChild);
                slider.appendChild(mapModules);
                slider.appendChild(contentsDiv);
                containerGlobal.appendChild(slider);




                enseignants.innerHTML = containerGlobal.outerHTML;



                let quizzOn = false;
                // const qAccess = false;

                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                let formationId = localStorage.getItem("idFormation");

                fetch(
                  `http://localhost:3000/api/getuser/${id}/getformationprogress/${formationId}`,
                  {
                    method: "GET",
                    headers: {
                      "content-type": "application/json",
                      accept: "application/json",
                      authorization: `Bearer ${token}`,
                    },
                  }
                )
                  .then((data) => {
                    return data.json();
                  })
                  .then((res) => {
                    //console.log('ggggg',res);

                    // curseur.style.width = `${res.barProgress}px`

                    if (res.autoUnblockAt > res.blockedAt) {
                      let qA = {
                        idFormationN: formationId,
                        isQuizzBlocked: 0,
                      };

                      fetch(
                        `http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`,
                        {
                          method: "PATCH",
                          body: JSON.stringify(qA),
                          headers: {
                            accept: "application/json",
                            "content-type": "application/json",
                            authorization: `Bearer ${token}`,
                          },
                        }
                      ).then((data) => {
                        return data.json();
                      });
                    } else if (res.isQuizzBlocked) {
                      let quizzMsg = document.querySelector(".msgErrQuizz");
                      quizzMsg.style.position = "fixed";
                      quizzMsg.style.top = "25%";
                      quizzMsg.style.zIndex = "3";
                      quizzMsg.style.color = "yellow";
                      quizzMsg.style.backgroundColor = "cyan";
                      quizzMsg.style.backgroundColor = "black";
                      quizzMsg.style.borderRadius = "10px";
                      quizzMsg.style.left = "2%";
                      quizzMsg.style.padding = "10px";
                      quizzMsg.style.margin = "20px";
                      quizzMsg.style.fontSize = "4rem";
                      quizzMsg.style.textAlign = "center";
                      quizzMsg.textContent = `Vous devez attendre ${
                        res.blockTime / 60 / 60 / 1000
                      }Heures pour passer de nouveau l'examen .`;
                      setTimeout(() => {
                        quizzMsg.textContent = "";
                        quizzMsg.style.backgroundColor = "transparent";
                        // minimapSpot();
                      }, 9000);

                      document.querySelector(".quizz_display").style.display =
                        "none";
                    } else {
                      let qA = {
                        idFormationN: formationId,
                        isQuizzBlocked: 0,
                      };

                      fetch(
                        `http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`,
                        {
                          method: "PATCH",
                          body: JSON.stringify(qA),
                          headers: {
                            accept: "application/json",
                            "content-type": "application/json",
                            authorization: `Bearer ${token}`,
                          },
                        }
                      ).then((data) => {
                        return data.json();
                      });
                    }

                    ////////////////////////////// Faire une forEach pour contrôler si chaque video de chaque divModule est visioné ... /////////////////////////////////////

                    document
                      .querySelectorAll(".content")
                      .forEach((content, index) => {
                        document
                          .querySelector(".quizz_display")
                          .addEventListener("click", () => {
                            window.scrollTo({
                              top: 200,
                              left: 0,
                              behavior: "smooth",
                            });

                            /////  SAUVEGARDE FINAL DE PARCOURS AVANT DEPLOIEMENT QUIZZ ////
                            let tempsP = localStorage.getItem("tempsProgress");
                            let idM = localStorage.getItem("moduleId");
                            let idFormation = parseInt(
                              localStorage.getItem("idFormation")
                            );
                            let barP = parseInt(
                              localStorage.getItem("barProgress")
                            );
                            const progress = {
                              barProgress: parseInt(barP),
                              tempsProgress: parseInt(tempsP),
                              idModule: parseInt(idM),
                              idFormation: idFormation,
                            };

                            fetch(
                              `http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`,
                              {
                                method: "PATCH",
                                body: JSON.stringify(progress),
                                headers: {
                                  accept: "application/json",
                                  "content-type": "application/json",
                                  authorization: `Bearer ${token}`,
                                },
                              }
                            )
                              .then((data) => {
                                return data.json();
                              })
                              .then((res) => {
                                console.log("Heyy !", res, progress);
                              });

                            /////  SAUVEGARDE FINAL DE PARCOURS AVANT DEPLOIEMENT QUIZZ ////

                            document.querySelector(".contents").style.display =
                              "none";

                            content
                              .querySelectorAll(".resizeVideo")
                              .forEach((video) => {
                                video.pause();
                              });

                            document.querySelector(
                              ".quizz_display"
                            ).style.display = "none";

                            if (count == 0) {
                              content.style.display = "none";
                              document.querySelector(
                                ".global-container"
                              ).style.display = "block";

                              quizzOn = true;

                              const firstQuizz =
                                document.querySelectorAll(
                                  ".global-container"
                                )[0];
                              console.log("btn cible:", firstQuizz.childNodes);

                              firstQuizz
                                .querySelector("button")
                                .addEventListener("click", (e) => {
                                  e.preventDefault();
                                  e.stopPropagation();

                                  const responses = [
                                    "b",
                                    "a",
                                    "c",
                                    "c",
                                    "a",
                                    "b",
                                    "a",
                                    "b",
                                    "b",
                                    "c",
                                  ];

                                  const results = [];

                                  const radioButtons =
                                    firstQuizz.querySelectorAll(
                                      "input[type='radio']:checked"
                                    );

                                  console.log(radioButtons);

                                  radioButtons.forEach((radioButton, index) => {
                                    if (
                                      radioButton.value === responses[index]
                                    ) {
                                      results.push(true);
                                    } else {
                                      results.push(false);
                                    }
                                  });

                                  // const emojis = ["✔️", "✨", "👀", "😭", "👎"];

                                  const titleResult =
                                    document.querySelector(".results h2");
                                  const markResult =
                                    document.querySelector(".mark");
                                  const helpResult =
                                    document.querySelector(".help");

                                  //  const errorsNumber = results.filter(el => el === false).length;
                                  const rightNumber = results.filter(
                                    (el) => el === true
                                  ).length;

                                  nbOfResponse = results.length;

                                  function showResults(results) {
                                    const note =
                                      (100 * (rightNumber * 10)) / 100;

                                    if (note <= 30) {
                                      const grade =
                                        document.querySelector(".grade");
                                      titleResult.textContent = `😭Malheureusement, vous devrez repasser l'épreuve ... 😭 `;
                                      helpResult.textContent =
                                        "Veuillez noter de bien devoir attendre 5 Heures avant de pouvoir repasser le test !";
                                      helpResult.style.display = "block";
                                      markResult.innerHTML = `<span> ${note}% de réussite , seulement </span>`;
                                      markResult.style.display = "block";

                                      const BLOCK_TIME_IN_MS = 18000000;

                                      let notation = {
                                        idFormationN: formationId,
                                        note: note,
                                        isQuizzBlocked: 1,
                                        blockedAt: new Date(),
                                        blockTime: BLOCK_TIME_IN_MS,
                                        autoUnblockAt: new Date(
                                          Date.now() + BLOCK_TIME_IN_MS
                                        ),
                                        barProgress: parseInt(
                                          localStorage.getItem("barProgress")
                                        ),
                                        tempsProgress:
                                          localStorage.getItem("tempsProgress"),
                                        notation:
                                          localStorage.getItem("notation"),
                                        idModule: parseInt(
                                          localStorage.getItem("moduleId")
                                        ),
                                      };

                                      fetch(
                                        `http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`,
                                        {
                                          method: "PATCH",
                                          body: JSON.stringify(notation),
                                          headers: {
                                            accept: "application/json",
                                            "content-type": "application/json",
                                            authorization: `Bearer ${token}`,
                                          },
                                          body: JSON.stringify(notation),
                                        }
                                      )
                                        .then((data) => {
                                          return data.json();
                                        })
                                        .then((res) => {
                                          console.log(res, "patch Note");
                                          grade.style.display = "none";
                                          setTimeout(() => {
                                            location.reload();
                                          }, 5000);
                                        });
                                    } else if (note > 30) {
                                      const grade =
                                        document.querySelector(".grade");
                                      const backToMenu =
                                        document.querySelector(
                                          ".grade > button"
                                        );

                                      console.log(grade);
                                      titleResult.textContent = ` ✔️ // Bravo, c'est dans la poche ! ✔️`;
                                      helpResult.textContent =
                                        "Vos efforts ont été récompensés !";
                                      helpResult.style.display = "block";
                                      markResult.innerHTML = `<span> ${
                                        (rightNumber / nbOfResponse) * 100
                                      }% de réussite !</span>`;
                                      markResult.style.display = "block";

                                      let notation = {
                                        idFormationN: formationId,
                                        note: note,
                                        barProgress: parseInt(
                                          localStorage.getItem("barProgress")
                                        ),
                                        tempsProgress:
                                          localStorage.getItem("tempsProgress"),
                                        notation:
                                          localStorage.getItem("notation"),
                                        idModule: parseInt(
                                          localStorage.getItem("moduleId")
                                        ),
                                      };

                                      fetch(
                                        `http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`,
                                        {
                                          method: "PATCH",
                                          body: JSON.stringify(notation),
                                          headers: {
                                            accept: "application/json",
                                            "content-type": "application/json",
                                            authorization: `Bearer ${token}`,
                                          },
                                          body: JSON.stringify(notation),
                                        }
                                      )
                                        .then((data) => {
                                          return data.json();
                                        })
                                        .then((res) => {
                                          //  console.log(res);
                                          grade.style.display = "block";

                                          ////  DELIVRABILITE DIPLOME
                                        });

                                      fetch(
                                        `http://localhost:3000/api/getuser/${id}/formations`,
                                        {
                                          method: "GET",
                                          headers: {
                                            accept: "application/json",
                                            "content-type": "application/json",
                                            authorization: `Bearer ${token}`,
                                          },
                                        }
                                      )
                                        .then((data) => {
                                          return data.json();
                                        })
                                        .then((res) => {
                                          grade.addEventListener(
                                            "click",
                                            (e) => {
                                              let success = 1;

                                              const formationId =
                                                localStorage.getItem(
                                                  "idFormation"
                                                );

                                              let achieved = {
                                                success: success,
                                                idFormationN: formationId,
                                                note: note,
                                                barProgress: parseInt(
                                                  localStorage.getItem(
                                                    "barProgress"
                                                  )
                                                ),
                                                tempsProgress:
                                                  localStorage.getItem(
                                                    "tempsProgress"
                                                  ),
                                                notation:
                                                  localStorage.getItem(
                                                    "notation"
                                                  ),
                                                idModule: parseInt(
                                                  localStorage.getItem(
                                                    "moduleId"
                                                  )
                                                ),
                                              };

                                              fetch(
                                                `http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`,
                                                {
                                                  method: "PATCH",
                                                  body: JSON.stringify(
                                                    achieved
                                                  ),
                                                  headers: {
                                                    accept: "application/json",
                                                    "content-type":
                                                      "application/json",
                                                    authorization: `Bearer ${token}`,
                                                  },
                                                }
                                              )
                                                .then((data) => {
                                                  return data.json();
                                                })
                                                .then((res) => {
                                                  console.log("Victory !", res);
                                                });

                                              // Création d'un objet Blob à partir des données du fichier que vous souhaitez télécharger

                                              const modeleHtml = `<!DOCTYPE html>
                    
                                                              <html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
                                                              <head>
                                                              <title></title>
                                                              
                                                              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
                                                               <br/>
                                                              <style type="text/css">
                                                              .logo_ncf {
                                                                position: absolute;
                                                                top:15px;
                                                                left: 15px;
                                                                z-index: 1;
                                                                height: 180px;
                                                                width: 180px;
                                                              }

                                                              .certificate_success {
                                                                position: relative;
                                                              }

                                                              <!--
                                                                p {margin: 0; padding: 0;}	.ft10{font-size:44px;font-family:Times;color:#363636;}
                                                                .ft11{font-size:21px;font-family:Times;color:#363636;}
                                                                .ft12{font-size:85px;font-family:Times;color:#363636;}
                                                                .ft13{font-size:16px;font-family:Times;color:#363636;}
                                                                .ft14{font-size:19px;font-family:Times;color:#000000;}
                                                                .ft15{font-size:16px;font-family:Times;color:#000000;}
                                                                .ft16{font-size:85px;line-height:96px;font-family:Times;color:#363636;}
                                                              -->
                                                              </style>
                                                              </head>
                                                              <body bgcolor="#A0A0A0" vlink="blue" link="blue">
                                                              <div id="page1-div" style="position:relative;width:1262px;height:893px;">
                                                              <img width="1262" height="893" src="target001.png" class='certificate_success' alt="background image"/>
                                                              <img class="logo_ncf" src="http://localhost:5500/Frontend/images/logo-normesse-formation.png" alt="background image"/>
                                                              <p style="position:absolute;top:185px;left:125px;white-space:nowrap" class="ft10"><b>CERTIFICAT&#160;D'ACHÈVEMENT</b></p>
                                                              <p style="position:absolute;top:264px;left:125px;white-space:nowrap" class="ft11"><i>Cela&#160;certifie&#160;que</i></p>
                                                              <p style="position:absolute;top:321px;left:125px;white-space:nowrap" class="ft16"><b>${res.name}<br/>${res.secondName}</b></p>
                                                              <p style="position:absolute;top:530px;left:125px;white-space:nowrap" class="ft13"><i>a&#160;terminé&#160;la&#160;formation&#160;réactualisation&#160;compétences&#160;enseignants&#160;de&#160;la&#160;Conduite.</i></p>
                                                              <p style="position:absolute;top:762px;left:125px;white-space:nowrap" class="ft14"><b>M.Nuguet&#160;Daniel</b></p>
                                                              <p style="position:absolute;top:793px;left:125px;white-space:nowrap" class="ft15">Directeur&#160;de&#160;formation</p>
                                                              </div>
                                                              </body>
                                                              </html>`;

                                              backToMenu.addEventListener(
                                                "click",
                                                () => {
                                                  location.replace(
                                                    "/index.html"
                                                  );
                                                }
                                              );

                                              //   let pathImg = document.querySelector('.sample_facture > img');  `Frontend/images/NEW LOGO NORMESSE - NCF ES.jpg`;

                                              const blob = new Blob(
                                                [modeleHtml],
                                                { type: "text/html" }
                                              );

                                              // Création d'une URL de téléchargement à partir de l'objet Blob
                                              const url =
                                                URL.createObjectURL(blob);

                                              // Création d'un élément de lien pour télécharger le fichier
                                              const lienTelechargement =
                                                document.createElement("a");
                                              lienTelechargement.href = url;
                                              lienTelechargement.download = `NCF Normesse Formation, Certification ${i.nameFormation}.html`;

                                              // Clic sur le lien de téléchargement
                                              lienTelechargement.click();

                                              // Nettoyage de l'URL de téléchargement
                                              URL.revokeObjectURL(url);
                                            }
                                          );
                                        });
                                    }
                                  }

                                  const questions =
                                    document.querySelectorAll(
                                      ".question-block"
                                    );

                                  const radioInputs = document.querySelectorAll(
                                    "input[type='radio']"
                                  );

                                  radioInputs.forEach((radioInput) =>
                                    radioInput.addEventListener(
                                      "input",
                                      resetColor
                                    )
                                  );

                                  function resetColor(e) {
                                    const index =
                                      e.target.getAttribute("name").slice(1) -
                                      1;
                                    const parentQuestionBlock =
                                      questions[index];

                                    parentQuestionBlock.style.backgroundColor =
                                      "#f1f1f1";
                                    parentQuestionBlock.style.backgroundImage =
                                      "none";
                                  }

                                  showResults(results);
                                });

                              count++;
                            } else {
                              return;
                            }
                          });
                        // }

                        let moduleId = content.getAttribute("data-module-id");
                        let pourcentageProgression = Math.floor(moduleId * 100);
                        // /nbOfModules
                        if (index === 0) {
                          if (localStorage.getItem("moduleId")) {
                            localStorage.removeItem("moduleId");
                            localStorage.setItem("moduleId", moduleId);
                          } else {
                            console.log(moduleId);
                            localStorage.setItem("moduleId", moduleId);
                          }
                        }

                        if (res.idModuleProgress && res.idModuleProgress > 0) {
                          if (
                            res.idModuleProgress ==
                            content.getAttribute("data-module-id")
                          ) {
                            if (
                              localStorage.getItem("moduleId") <
                              res.idModuleProgress
                            ) {
                              localStorage.removeItem("moduleId");
                              localStorage.setItem(
                                "moduleId",
                                res.idModuleProgress
                              );
                            }
                            localStorage.setItem("moduleId", moduleId);
                            content.style.display = "block";
                            if (
                              res.barProgress &&
                              res.barProgress >
                                localStorage.getItem("barProgress")
                            ) {
                              curseur.style.width = `${
                                (res.idModuleProgress * 100) / nbOfModules
                              }px`;
                            } else {
                              curseur.style.width = `${
                                (res.idModuleProgress * 100) / nbOfModules
                              }px`;
                            }
                          } else {
                            content.style.display = "none";
                          }
                        }

                        let lastVideoContent =
                          content.querySelectorAll(".resizeVideo")[
                            content.querySelectorAll(".resizeVideo").length - 1
                          ];
                        //let lastPdfContent = content.querySelectorAll('.pdf')[content.querySelectorAll('.pdf').length - 1]

                        function minimapSpot(e) {
                          document
                            .querySelectorAll(".hoverMapModule")
                            .forEach((mapM, index) => {
                              if (
                                localStorage.getItem(".moduleId") ==
                                document.querySelectorAll(".hoverMapModule")
                                  .length
                              ) {
                                mapM.style.backgroundColor = "Yellow";
                               
                              } else if (
                                mapM.getAttribute("data-map-id") <=
                                localStorage.getItem("moduleId")
                              ) {
                                mapM.style.backgroundColor = "Yellow";
                                mapM.style.borderRadius = "10px";
                              }

                              // Gestion affichage module selon Map ID minimap

                              mapM.addEventListener("click", (e) => {
                                if (quizzOn) {
                                  let errVideo =
                                    document.querySelector(".msgErrVideo");
                                  errVideo.style.color = "red";
                                  errVideo.style.zIndex = "5000";
                                  errVideo.style.fontSize = "3rem";
                                  errVideo.style.top = "20%";
                                  errVideo.style.left = "2%";
                                  errVideo.style.padding = "10px";
                                  errVideo.style.position = "fixed";
                                  errVideo.style.textAlign = "center";
                                  errVideo.style.backgroundColor = "black";
                                  errVideo.style.borderRadius = "10px";
                                  errVideo.style.animation =
                                    "slide .800s ease-in-out 0s forwards";
                                  errVideo.textContent =
                                    "Vous êtes en éxamen ! Vous ne pouvez pas accédez aux ressources...";
                                  setTimeout(() => {
                                    errVideo.textContent = "";
                                    errVideo.style.backgroundColor =
                                      "transparent";
                                  }, 2800);
                                  return;
                                } else {
                                  const mapId =
                                    mapM.getAttribute("data-map-id");

                                  if (
                                    localStorage.getItem("moduleId") >= mapId
                                  ) {
                                    // || lastPdfContent

                                    // Parcourez tous les éléments "content"
                                    document
                                      .querySelectorAll(".content")
                                      .forEach((content) => {
                                        // Trouvez l'élément "content" dont la valeur de l'attribut "data-module-id" correspond à la valeur de l'attribut "data-map-id" de l'élément "mapM" qui a été cliqué
                                        if (
                                          content.getAttribute(
                                            "data-module-id"
                                          ) === mapId
                                        ) {
                                          // Pour chaque élément "content", masquez-le en définissant son style "display" sur "none"
                                          document
                                            .querySelectorAll(".content")
                                            .forEach((c) => {
                                              c.style.display = "none";

                                              if (
                                                c.childNodes[1] &&
                                                typeof c.childNodes[1].pause ===
                                                  "function"
                                              ) {
                                                console.log(c.childNodes[2]);
                                              } else {
                                                c.querySelectorAll(
                                                  "video"
                                                ).forEach((video) => {
                                                  video.pause();
                                                });

                                                //childNodes[2].pause();
                                              }
                                            });

                                          // Affichez la div qui correspond à l'élément "content" trouvé en définissant son style "display" sur "block"
                                          content.style.display = "block";

                                          window.scrollTo({
                                            top: 200,
                                            left: 0,
                                            behavior: "smooth",
                                          });
                                        }
                                      });
                                  } else {
                                    let errVideo =
                                      document.querySelector(".msgErrVideo");
                                    errVideo.style.color = "red";
                                    errVideo.style.zIndex = "5000";
                                    errVideo.style.fontSize = "3rem";
                                    errVideo.style.top = "20%";
                                    errVideo.style.left = "2%";
                                    errVideo.style.padding = "10px";
                                    errVideo.style.position = "fixed";
                                    errVideo.style.textAlign = "center";
                                    errVideo.style.backgroundColor = "black";
                                    errVideo.style.borderRadius = "10px";
                                    errVideo.style.animation =
                                      "slide .800s ease-in-out 0s forwards";
                                    errVideo.textContent =
                                      "Vous devez visionner intégralement toutes les vidéos du module, et prendre connaissance des ressources avant de passer suivant !";
                                    setTimeout(() => {
                                      errVideo.textContent = "";
                                      errVideo.style.backgroundColor =
                                        "transparent";
                                    }, 2800);
                                  }
                                }
                              });
                            });
                        }
                        minimapSpot();

                        content
                          .querySelectorAll(".resizeVideo")
                          .forEach((video) => {
                            video.setAttribute("data-ended", "false");

                            if (video.getAttribute("data-ended") == "false") {
                              video.addEventListener("timeupdate", () => {
                                document
                                  .querySelector("#next-btn")
                                  .addEventListener("click", (e) => {
                                    console.log("FALSE !");
                                    let errVideo =
                                      document.querySelector(".msgErrVideo");
                                    errVideo.style.position = "fixed";
                                    errVideo.style.top = "20%";
                                    errVideo.style.zIndex = "5000";
                                    errVideo.style.color = "red";
                                    errVideo.style.margin = "20px";
                                    errVideo.style.left = "2%";
                                    errVideo.style.padding = "10px";
                                    errVideo.style.zIndex = "2000";
                                    errVideo.style.backgroundColor = "black";
                                    errVideo.style.borderRadius = "10px";
                                    errVideo.style.fontSize = "4rem";
                                    errVideo.style.textAlign = "center";
                                    errVideo.style.animation =
                                      "slide .800s ease-in-out 0s forwards";
                                    errVideo.textContent =
                                      "Vous devez visionner intégralement toutes les vidéos du module, et prendre connaissance des ressources avant de passer suivant !";
                                    setTimeout(() => {
                                      errVideo.textContent = "";
                                      errVideo.style.backgroundColor =
                                        "transparent";
                                    }, 2800);
                                  });
                              });
                            }

                            let moduleActuVideo = video.parentElement;

                            video.addEventListener("ended", () => {
                              video.setAttribute("data-ended", "true");

                              if (
                                moduleId == nbOfModules &&
                                lastVideoContent.getAttribute("data-ended") ==
                                  "true"
                              ) {
                                curseur.style.width = `${
                                  pourcentageProgression / nbOfModules
                                }%`;

                                localStorage.removeItem("moduleId");
                                localStorage.setItem("moduleId", moduleId);

                                if (localStorage.getItem("barProgress")) {
                                  localStorage.removeItem("barProgress");
                                  localStorage.setItem(
                                    "barProgress",
                                    pourcentageProgression
                                  );
                                } else {
                                  localStorage.setItem(
                                    "barProgress",
                                    pourcentageProgression
                                  );
                                }

                                document.querySelector(
                                  "#next-btn"
                                ).style.display = "none";

                                if (
                                  document.querySelectorAll(".resizeVideo")[
                                    document.querySelectorAll(".resizeVideo")
                                      .length - 1
                                  ]
                                ) {
                                  if (res.success) {
                                    let errVideo =
                                      document.querySelector(".msgErrVideo");
                                    errVideo.style.position = "fixed";
                                    errVideo.style.top = "25%";
                                    errVideo.style.zIndex = "3";
                                    errVideo.style.color = "yellow";
                                    errVideo.style.backgroundColor = "black";
                                    errVideo.style.borderRadius = "10px";
                                    errVideo.style.left = "2%";
                                    errVideo.style.padding = "10px";
                                    errVideo.style.margin = "20px";
                                    errVideo.style.fontSize = "4rem";
                                    errVideo.style.textAlign = "center";
                                    errVideo.style.animation =
                                      "slide .800s ease-in-out 0s forwards";
                                    errVideo.textContent = `Vous êtes certifié(é) de cette formation !`;
                                    setTimeout(() => {
                                      errVideo.textContent = "";
                                      errVideo.style.backgroundColor =
                                        "transparent";
                                      minimapSpot();
                                    }, 5000);

                                    document.querySelector(
                                      ".quizz_display"
                                    ).style.display = "none";
                                  } else if (
                                    !res.autoUnblockAt ||
                                    res.autoUnblockAt > res.blockedAt
                                  ) {
                                    let errVideo =
                                      document.querySelector(".msgErrVideo");
                                    errVideo.style.position = "fixed";
                                    errVideo.style.top = "25%";
                                    errVideo.style.zIndex = "3";
                                    errVideo.style.color = "yellow";
                                    errVideo.style.backgroundColor = "black";
                                    errVideo.style.borderRadius = "10px";
                                    errVideo.style.left = "2%";
                                    errVideo.style.padding = "10px";
                                    errVideo.style.margin = "20px";
                                    errVideo.style.fontSize = "4rem";
                                    errVideo.style.textAlign = "center";
                                    errVideo.style.animation =
                                      "slide .800s ease-in-out 0s forwards";
                                    errVideo.textContent = `Félicitations ! Vous avez terminé votre session d'apprentissage Vous pouvez maintenant passer à l'éxamen !`;
                                    setTimeout(() => {
                                      errVideo.textContent = "";
                                      errVideo.style.backgroundColor =
                                        "transparent";
                                      minimapSpot();
                                    }, 5000);

                                    document.querySelector(
                                      ".quizz_display"
                                    ).style.display = "block";
                                  } else if (res.isQuizzBlocked) {
                                    document.querySelector(
                                      ".quizz_display"
                                    ).style.display = "none";

                                    let quizzMsg =
                                      document.querySelector(".msgErrQuizz");
                                    quizzMsg.style.position = "fixed";
                                    quizzMsg.style.top = "25%";
                                    quizzMsg.style.zIndex = "3";
                                    quizzMsg.style.color = "yellow";
                                    quizzMsg.style.backgroundColor = "cyan";
                                    quizzMsg.style.backgroundColor = "black";
                                    quizzMsg.style.borderRadius = "10px";
                                    quizzMsg.style.left = "2%";
                                    quizzMsg.style.padding = "10px";
                                    quizzMsg.style.margin = "20px";
                                    quizzMsg.style.fontSize = "4rem";
                                    quizzMsg.style.textAlign = "center";
                                    quizzMsg.textContent = `Vous devez attendre ${
                                      res.blockTime / 60 / 60 / 1000
                                    }Heures pour passer de nouveau l'examen .`;
                                    setTimeout(() => {
                                      quizzMsg.textContent = "";
                                      quizzMsg.style.backgroundColor =
                                        "transparent";
                                      // minimapSpot();
                                    }, 9000);
                                  }
                                }

                                ///////// CODE CI DESSOUS À CHANGER /////////////
                              } else if (
                                lastVideoContent.getAttribute("data-ended") ==
                                "true"
                              ) {
                                // || lastPdfContent
                                // || !content.querySelectorAll('.resizeVideo')

                                let errVideo =
                                  document.querySelector(".msgErrVideo");
                                errVideo.style.position = "fixed";
                                errVideo.style.top = "20%";
                                errVideo.style.zIndex = "3";
                                errVideo.style.color = "cyan";
                                errVideo.style.padding = "20px";
                                errVideo.style.backgroundColor = "black";
                                errVideo.style.borderRadius = "10px";
                                errVideo.style.margin = "20px";
                                errVideo.style.fontSize = "6rem";
                                errVideo.style.textAlign = "center";
                                errVideo.style.animation =
                                  "slide .800s ease-in-out 0s forwards";
                                errVideo.textContent =
                                  "Bravo ! Vous pouvez passer au module suivant.";

                                setTimeout(() => {
                                  errVideo = "";
                                }, 3500);

                                document
                                  .querySelector("#next-btn")
                                  .addEventListener("click", (e) => {
                                    let moduleIdNext =
                                      content.nextElementSibling.getAttribute(
                                        "data-module-id"
                                      );
                                    console.log(moduleIdNext);

                                    if (localStorage.getItem("moduleId")) {
                                      localStorage.removeItem("moduleId");
                                      localStorage.setItem(
                                        "moduleId",
                                        moduleIdNext
                                      );
                                    }

                                    let tempsP =
                                      localStorage.getItem("tempsProgress");
                                    let idM = localStorage.getItem("moduleId");
                                    let idFormation = parseInt(
                                      localStorage.getItem("idFormation")
                                    );
                                    let barP = parseInt(
                                      localStorage.getItem("barProgress")
                                    );
                                    const progress = {
                                      barProgress: parseInt(barP),
                                      tempsProgress: parseInt(tempsP),
                                      idModule: parseInt(idM),
                                      idFormation: idFormation,
                                    };

                                    fetch(
                                      `http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`,
                                      {
                                        method: "PATCH",
                                        body: JSON.stringify(progress),
                                        headers: {
                                          accept: "application/json",
                                          "content-type": "application/json",
                                          authorization: `Bearer ${token}`,
                                        },
                                      }
                                    )
                                      .then((data) => {
                                        return data.json();
                                      })
                                      .then((res) => {
                                        console.log("Heyy !", res, progress);
                                      });
                                    //   }

                                    // Affichage surlignement module minimap
                                    minimapSpot();

                                    if (localStorage.getItem("barProgress")) {
                                      localStorage.removeItem("barProgress");
                                      localStorage.setItem(
                                        "barProgress",
                                        pourcentageProgression
                                      );
                                    } else {
                                      localStorage.setItem(
                                        "barProgress",
                                        pourcentageProgression
                                      );
                                    }

                                    content
                                      .querySelectorAll(".resizeVideo")
                                      .forEach((video) => {
                                        video.pause();
                                      });

                                    curseur.style.width = `${
                                      pourcentageProgression / nbOfModules
                                    }%`;

                                    masqueModuleActu(
                                      moduleActuVideo,
                                      moduleIdNext
                                    );

                                    window.scrollTo({
                                      top: 200,
                                      left: 0,
                                      behavior: "smooth",
                                    });
                                  });
                              } else {
                                document
                                  .querySelector("#next-btn")
                                  .addEventListener("click", (e) => {
                                    content
                                      .querySelectorAll(".resizeVideo")
                                      .forEach((video) => {});
                                    console.log("FALSE !");
                                  });
                              }
                              /////////////////////////////////////////////////////
                            });

                            function afficherModuleSuivant(nextModule) {
                              nextModule = content.nextElementSibling;
                              console.log(nextModule);

                              if (nextModule) {
                                nextModule.style.display = "block";
                              } else {
                                console.log("ça marche pas !");
                              }
                            }

                            function masqueModuleActu(
                              moduleActuVideo,
                              moduleIdNext
                            ) {
                              //  let moduleId = content.getAttribute('data-module-id');
                              if (moduleActuVideo) {
                                moduleActuVideo.style.display = "none";

                                afficherModuleSuivant(moduleIdNext);
                              } else {
                              }
                              // code pour afficher le module suivant
                            }
                          });
                      });
                  });

                ///////////////////////////////////   GESTION QUIZZ ////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////
              })
            )
              .then(() => {
                containerGlobal.appendChild(quizz);
                enseignants.innerHTML = containerGlobal.outerHTML;

                //  le code à exécuter une fois que toutes les promesses ont été résolues
                document.querySelectorAll(".pdfSpeech").forEach((btn) => {
                  let currentUtterance = null; // Variable pour stocker l'instance de l'objet SpeechSynthesisUtterance

                  btn.addEventListener("click", function () {
                    if (
                      currentUtterance !== null &&
                      window.speechSynthesis.speaking
                    ) {
                      // Si un texte est en cours de lecture et un autre bouton est cliqué, arrêter le texte en cours
                      window.speechSynthesis.cancel();
                      currentUtterance = null;
                      btn.textContent = "▶";
                      btn.style.backgroundColor = "lightgreen";
                    } else if (
                      currentUtterance !== null &&
                      window.speechSynthesis.paused
                    ) {
                      // Si un texte est en pause, reprendre la lecture
                      window.speechSynthesis.resume();
                      btn.textContent = "❚❚";
                      btn.style.backgroundColor = "red";
                    } else {
                      console.log("Attaque tonnerre !");
                      // Extraire le texte du PDF avec pdf.js
                      pdfjsLib
                        .getDocument(
                          btn.previousElementSibling.getAttribute("src")
                        )
                        .promise.then(function (pdf) {
                          let pages = [];
                          for (let i = 1; i <= pdf.numPages; i++) {
                            pages.push(pdf.getPage(i));
                          }
                          Promise.all(pages).then(function (pageObjs) {
                            let texts = [];
                            for (let i = 0; i < pageObjs.length; i++) {
                              texts.push(pageObjs[i].getTextContent());
                            }
                            Promise.all(texts).then(function (textArrs) {
                              let fullText = "";
                              for (let i = 0; i < textArrs.length; i++) {
                                fullText += textArrs[i].items
                                  .map(function (s) {
                                    return s.str;
                                  })
                                  .join(" ");
                              }
                              // Créer l'objet SpeechSynthesisUtterance
                              let utterance = new SpeechSynthesisUtterance(
                                fullText
                              );
                              // Lire le texte à voix haute avec la synthèse vocale
                              window.speechSynthesis.speak(utterance);
                              currentUtterance = utterance;
                              btn.textContent = "❚❚";
                              btn.style.backgroundColor = "red";

                              // Identifier le texte lu
                              utterance.addEventListener("end", function () {
                                currentUtterance = null;
                                btn.textContent = "▶";
                                btn.style.backgroundColor = "lightgreen";
                              });

                              // Gérer la reprise de la lecture depuis la pause
                              utterance.addEventListener("pause", function () {
                                btn.textContent = "▶";
                                btn.style.backgroundColor = "lightgreen";
                              });

                              utterance.addEventListener("resume", function () {
                                btn.textContent = "❚❚";
                                btn.style.backgroundColor = "red";
                              });
                            });
                          });
                        });
                    }
                  });
                });
              })
              .catch((error) => console.log(error));
          }
        }
      }
    });

  /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

} else if (document.URL.includes("formationHub.html")) {
  localStorage.removeItem("idFormation");
  localStorage.removeItem("itemSoldId");
  localStorage.removeItem("idEnseignant");

  fetch("http://localhost:3000/api/formations", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((items) => {
      console.log(items);

      for (let item of items) {
        for (let properties in item) {
          console.log(item);
          if (properties == "nameFormation") {
            if (item.nameFormation == "Réactualisation Enseignants") {
              localStorage.setItem("idEnseignant", item.id);
            }
          }
        }
      }

      for (let formation of items) {
        console.log(formation);
        document.querySelector(".pannelFormationsHub--content").innerHTML += `
            <h3 class='pannelFormationsHub--contentDesc'> ${formation.nameFormation} </h3>
        `;
      }

      document
        .querySelector(".displayPannelFormationsBtn")
        .addEventListener("click", (e) => {
          document
            .querySelector(".pannelFormationsHub")
            .classList.toggle("hidden");
        });

      document
        .querySelectorAll(".pannelFormationsHub--contentDesc")
        .forEach((formDesc) => {
          formDesc.addEventListener("click", (e) => {
            console.log(e);
            document
              .querySelector(".pannelFormationsHub--Description")
              .classList.toggle("hidden");
            document.querySelector(
              ".pannelFormationsHub--Description"
            ).innerHTML = `
        
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
          });
        });

      const idEnseignant = localStorage.getItem("idEnseignant");

      const idF = localStorage.getItem("idF");

      fetch(`http://localhost:3000/api/formation/${idF || idEnseignant}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          let itemName = data.nameFormation;
          let itemPrice = data.priceFormation;
          let typeFormation = data.role;
          let itemId = data.id;

          document.querySelector(
            ".mainRoad__tarif"
          ).textContent = `Tarif : ${itemPrice} €`;

          const btnOverlayPay = document.querySelector(".pannelPayBtn");

          btnOverlayPay.addEventListener("click", () => {
            overlayPayment.style.display = "block";

            // nameFormationOverlay.textContent = `${item.nameFormation}`;
            cpfBtn.style.fontSize = "1.2rem";
            cbButton.style.fontSize = "1.2rem";
            // priceSet.textContent = `${item.priceFormation}`;

            cancelOverlay.style.type = "button";

            cancelOverlay.addEventListener("click", () => {
              overlayPayment.style.display = "none";
            });

            const btnPayment = document.querySelector("#paymentBtn");

            btnPayment.addEventListener("click", () => {
              // Stocker les valeurs dans le localStorage
              //localStorage.setItem('mesDonnees', JSON.stringify({ itemPrice:itemPrice, itemName:itemName, itemId:itemId, typeFormation: typeFormation }));

              fetch("http://localhost:3000/create-checkout-session", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  accept: "application/json",
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
                .then(
                  ({
                    sessionId,
                    url,
                    type,
                    itemName,
                    montant,
                    idFormation,
                  }) => {
                    localStorage.setItem("Produit Type", type);
                    localStorage.setItem("session_id", sessionId);
                    localStorage.setItem("idFormation", idFormation);

                    window.location = url;
                  }
                )
                .catch((e) => {
                  console.error(e.error);
                });
            });
          });
        });
    });
}

// Gestion appel validation Paiement.

window.addEventListener("load", () => {
  if (document.URL.includes("/paymentSuccess.html")) {
    // // Gestion appel validation Paiement

    const clientId = localStorage.getItem("id");
    const formationId = localStorage.getItem("idFormation");
    const token = localStorage.getItem("token");
    const idF = localStorage.getItem("idF");

    fetch(`http://localhost:3000/api/formation/${formationId || idF}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data0) => {
        console.log(data0);

        const priceF = data0.priceFormation;
        const nameF = data0.nameFormation;
        const dateAchat = new Date();

        document.querySelector(
          ".pay-success"
        ).textContent = `Félicitations 😃 ! Vous êtes maintenant bénéficiaire de votre nouvelle formation ${nameF} ! On te souhaite un bel apprentissage`;

        const data = {
          dateAchat: dateAchat.toISOString(),
          priceF: priceF,
          nameF,
          nameF,
          userId: clientId,
          formationId: formationId,
        };

        async function getItemSold() {
          return await fetch(
            `http://localhost:3000/api/getuser/${clientId}/formation`,
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                accept: "application/json",
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          ).then((res) => {
            console.log(res);
          });
        }

        getItemSold();
      });

    setTimeout(() => {
      // insertion du param de la formation pour redirection
      location.replace("./profil.html");
    }, 3000);

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
  } else if (document.URL.includes("formationsStore.html")) {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/formations", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((items) => {
        for (let item of items) {
          document.querySelector(
            ".containero"
          ).innerHTML += ` <div class="itemStore" data-id="${item.id}" data-role="${item.role}" data-price="${item.priceFormation}" data-name="${item.nameFormation}">
                    <h2>${item.nameFormation}</h2>
                    <h2>${item.priceFormation}€</h2>
                                                     </div>   `;
        }

        console.log(items);
        const allBoxes = document.querySelectorAll(".itemStore");
        for (let box of allBoxes) {
          let itemId = box.getAttribute("data-id");
          let itemName = box.getAttribute("data-name");
          let itemPrice = box.getAttribute("data-price");
          let typeFormation = box.getAttribute("data-role");

          box.addEventListener("click", (e) => {
            e.preventDefault();
            overlayPayment.style.display = "block";
            cpfBtn.style.fontSize = "1.2rem";
            cbButton.style.fontSize = "1.2rem";

            cancelOverlay.style.type = "button";

            cancelOverlay.addEventListener("click", () => {
              overlayPayment.style.display = "none";
            });

            const btnPayment = document.querySelector("#paymentBtn");

            btnPayment.addEventListener("click", () => {
              localStorage.setItem("idFormation", itemId);

              fetch("http://localhost:3000/create-checkout-session", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  accept: "application/json",
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
                .then(({ url, type, priceFormation, nameFormation }) => {
                  console.log(url, type);
                  let productType = type;
                  localStorage.setItem("Produit Type", productType);
                  localStorage.setItem("nameF", nameFormation);
                  localStorage.setItem("priceF", priceFormation);
                  window.location = url;
                })
                .catch((e) => {
                  console.error(e.error);
                });
            });
          });
        }
      });
  } else if (document.URL.includes("factures.html")) {
    fetch(`http://localhost:3000/api/getuser/${id}/formations`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        console.log(res);

        for (let i of res.Formations) {
          document.querySelector(".containerFactures").innerHTML += `
    
                <div class='containerFactures__facture'>
                <p> Reçu : </p>
                      <p>Produit : ${i.nameFormation} </p>
                      <p>Prix : ${i.priceFormation} </p>
                      <p>Date achat : ${i.produits_achetes.date_achat.slice(
                        0,
                        i.produits_achetes.date_achat.length - 5
                      )} </p>
                      <p> ${i.durationFormation} heures </p>
                </div>
                
                `;

          // Récupération de l'élément à rendre téléchargeable
          const downloadFactureBtns = document.querySelectorAll(
            ".containerFactures__facture"
          );

          // Ajout du gestionnaire d'événements de clic sur l'élément
          downloadFactureBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
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
                                                  <h2> Formation ${
                                                    i.nameFormation
                                                  }</h2>
                                                  <h2>Prix : ${
                                                    i.priceFormation
                                                  } €</h2>
                                                  <h2>${
                                                    i.durationFormation
                                                  } heures</h2>
                                                  <h2>Date achat : ${i.produits_achetes.date_achat.slice(
                                                    0,
                                                    i.produits_achetes
                                                      .date_achat.length - 5
                                                  )}</h2>
                                                  <h2>Client : ${res.name} ${
                res.secondName
              }</h2>
                                                  <h2>Entreprise/Établissement : ${
                                                    res.company
                                                  }</h2>
                                                  </div>
                                                </body>
                                           </html>`;

              //   let pathImg = document.querySelector('.sample_facture > img');  `Frontend/images/NEW LOGO NORMESSE - NCF ES.jpg`;

              const blob = new Blob([modeleHtml], { type: "text/html" });

              // Création d'une URL de téléchargement à partir de l'objet Blob
              const url = URL.createObjectURL(blob);

              // Création d'un élément de lien pour télécharger le fichier
              const lienTelechargement = document.createElement("a");
              lienTelechargement.href = url;
              lienTelechargement.download = `NCF Normesse Formation, facture ${i.nameFormation}.html`;

              // Clic sur le lien de téléchargement
              lienTelechargement.click();

              // Nettoyage de l'URL de téléchargement
              URL.revokeObjectURL(url);
            });
          });
        }
      });
  }
});

// GESTION DECONNEXION UTILISATEUR

function logout() {
  if (document.URL.includes("/reaTeachers.html")) {
    const token = localStorage.getItem("token");
    let idFormation = parseInt(localStorage.getItem("idFormation"));

    fetch(`http://localhost:3000/api/getuser/${id}/formations`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        for (let i of res.Formations) {
          let idM;

          if (localStorage.getItem("idModule") == i.idModuleProgress) {
            idM = localStorage.getItem("moduleId");
          } else if (localStorage.getItem("idModule") > i.idModuleProgress) {
            idM = parseInt(localStorage.getItem("moduleId"));
          } else {
            idM = parseInt(i.idModuleProgress);
          }

          let note;

          if (!localStorage.getItem("notation")) {
            note = null;
          } else if (localStorage.getItem("notation")) {
            note = localStorage.getItem("notation");
          }

          let barP;

          if (!localStorage.getItem("barProgress")) {
            barP = null;
          } else if (localStorage.getItem("barProgress")) {
            barP = parseInt(localStorage.getItem("barProgress"));
          }

          let tempsP;

          if (localStorage.getItem("tempsProgress")) {
            tempsP = localStorage.getItem("tempsProgress");
          } else if (localStorage.getItem("tempsProgress")) {
            tempsP = localStorage.getItem("tempsProgress");
          }

          const progress = {
            barProgress: parseInt(barP),
            tempsProgress: parseInt(tempsP),
            notation: parseInt(note),
            idModule: parseInt(idM),
            idFormation: idFormation,
          };

          fetch(
            `http://localhost:3000/api/getuser/${id}/patchformationprogress/${formationId}`,
            {
              method: "PATCH",
              body: JSON.stringify(progress),
              headers: {
                accept: "application/json",
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          )
            .then((data) => {
              return data.json();
            })
            .then((res) => {
              console.log(res, progress);

              localStorage.removeItem("tempsProgress");
              localStorage.removeItem("barProgress");
              localStorage.removeItem("notation");
              localStorage.removeItem("itemSoldId");
              localStorage.removeItem("moduleId");
              localStorage.removeItem("progressTime");

              location.replace("../profil.html");
            });
        }
      });
  } else {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("./index.html");
  }
}
