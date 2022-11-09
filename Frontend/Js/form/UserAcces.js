

window.addEventListener('load', () => {

    if(!token) {
        alert(`Veuillez vous connecter s'il vous plaît, merci`);
        window.location.replace('/index.html');
    }

})