const app = require('./app');
const http = require('http');
const User = require('./Models/User');
const Formation = require('./Models/Formation');
const server = http.createServer(app);
const port = 3000;


require('dotenv').config();

 const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

server.listen(port , () => {
    console.log(`Server is listening on http://localhost:${port}`)
}) 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});







// console.log('Array produit formations:');
 //  const { qty, id, itemName, price } = req.body;
     
     // const storeItems = new Map([
     //     [item.id, {  price: price, name: itemName, quantity: qty}]
     // ])
     //  console.log(req.body);
     let itemFrame = [];
     Formation.findAll()
     .then(formations => {
         for(let item of formations) {
            console.log(item);
        itemFrame.push({id: item.id, price: item.priceFormation, name: item.nameFormation, quantity: 1});  
     }
     return itemFrame;
 })

console.log(itemFrame);

    app.post('/create-checkout-session', async (req, res) => {
    
           // console.log(itemFrame);
            console.log(req.body);
            try{
    
                const session = stripe.checkout.sessions.create({
                  
                    payment_method_types: ['card'],
                    mode: 'payment',
                    line_items: req.body.items.map(item => {
                        const storeItem = itemFrame.get(item.id)
                        return {
                            price_data: {
                                currency: "eur",
                                product_data: {
                                    name: storeItem.name,
                                },
                                unit_amount: storeItem.price,
                            },
                            quantity: storeItem.quantity,
                        }   
                    }),
                    success_url: `${process.env.SERVER_CLIENT}/Frontend/pages/paymentSuccess.html`,
                    cancel_url: `${process.env.SERVER_CLIENT}/Frontend/pages/formationHub.html`
                })
                res.json({url: session.url});
            } catch (e){
                res.status(500).json({error: e.message})
        };
    });