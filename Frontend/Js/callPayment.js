// Gestion appel validation Paiement.

const btnPayment = document.querySelector('#paymentBtn');

 btnPayment.addEventListener('click', () => {

    // infoClient
    // const infoClient = {
    //     nameClient: nameClient.value,
    //     cardN: cardN.value,
    //     expirationDate: expirationDate.value,
    //     codeValidation: codeValidation.value
    // };
    
    fetch('http://localhost:3000/create-checkout-session', {
        method: 'post',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({
            items: [
                {id: 1, quantity: 3},
                {id: 2, quantity: 1},
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