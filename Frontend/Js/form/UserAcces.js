  const token = localStorage.getItem('token');

window.addEventListener('load', () => {

    if(!token) {
        alert(` | ! | Veuillez vous connecter s'il vous plaît, merci (Accès non Autorisé)`);
        window.location.replace('/index.html');
    }

})