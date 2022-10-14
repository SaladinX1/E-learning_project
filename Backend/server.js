const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const port = 3000;

server.listen(port , () => {
    console.log(`Server is listening on http://localhost:${port}`)
}) 



    app.get('/health', function (req, res) {
        res.send("The API is working properly congratulations !")
    })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});