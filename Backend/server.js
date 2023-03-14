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


app.post('/create-checkout-session', async (req, res) => {

    const {montant , itemName , id} = req.body.infoTransaction;
    
    const storeItems = new Map([
        [id,{priceInCents: montant, name: itemName}],
    ])
 
            console.log(req.body);
            try{

                       const session = await stripe.checkout.sessions.create({ 
                        payment_method_types: ['card'],
                        mode: 'payment', 
                        line_items: req.body.items.map(item => {
                            const storeItem = storeItems.get(item.id)
                            return {
                                price_data: {
                                    currency: 'eur',
                                    product_data: {
                                        name: storeItem.name,
                                    },
                                    unit_amount: storeItem.priceInCents,
                                },
                                quantity: item.quantity,
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