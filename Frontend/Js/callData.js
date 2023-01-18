
const exploitants = document.querySelector('#exploitants');
const enseignants = document.querySelector('#enseignants');
const formationX = document.querySelector('#formationX');
const timer = document.querySelector('.timer');
 let time2countDown = localStorage.getItem('timeFormation');

const data = localStorage.getItem('formationData');


let timerId;


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

    let div = document.createElement('div');

    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.justifyContent = 'flex-start';
    div.style.margin = '15px';
        div.style.width = 'auto';
        div.style.height = 'auto';

       

      for(let i in videos) {
        

        let pathImg = i.replace('fakepath\\', 'Users\\Utilisateur\\Downloads\\');

   //    console.log(i.replace('fakepath\\', 'Users\\Utilisateur\\Downloads\\'));
        
        let videoInput = document.createElement('video');
        videoInput.src = pathImg;
        videoInput.width = '1000';
        videoInput.height = '800';
        
        videoInput.style.margin = '40px';
        videoInput.style.border = '1ps solid red';
        videoInput.style.borderRadius = '10';

        videoInput.controls;
        videoInput.volume;
       // videoInput.

        
        div.appendChild(videoInput);



        videoFiles.push(i);

      }
      console.log(div);

   console.log(div.outerHTML);

     enseignants.innerHTML += div.outerHTML;
 
     
     
   console.log(videos);


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
}
