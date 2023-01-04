
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
    return `${timeHour}:${timeMinutes}:${timeSeconds % 60 < 10 ? `0${timeSeconds % 60}`: timeSeconds % 60}`;
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
    return `${timeHour}:${timeMinutes}:${timeSeconds % 60 < 10 ? `0${timeSeconds % 60}`: timeSeconds % 60}`;
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



} else if ( document.URL.includes("formationExploitants.html")) {



  let initialTime = parseInt(time2countDown);
  let Minutes = 59;
  let time2Seconds = 59;
  
  initialTime--;
  function formatedTime(timeHour, timeMinutes, timeSeconds) {
    return `${timeHour}:${timeMinutes}:${timeSeconds % 60 < 10 ? `0${timeSeconds % 60}`: timeSeconds % 60}`;
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