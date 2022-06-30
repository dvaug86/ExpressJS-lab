const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const fs = require('fs');
let app = express();



// app.get('/', (req, res) => {
//     res.send("Hello from the web server side...");

// });
//needs to be commeted out so we can use everything else



app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/formEntry', (req, res, next) => {

    let myData = fs.readFileSync(path.join(__dirname, './formData.json'));
    // let parseData = JSON.parse(myData);


    
    let name = req.body.name
    let email = req.body.email;
    let formData = {
        "Name": name,
        "Email": email
    };


    let parseDataArray =[]
    parseDataArray.push(formData);

    fs.writeFileSync(path.join(__dirname, './formData.json'), JSON.stringify(parseDataArray))

    res.redirect('/')
    next();

});



app.use(express.static(path.join(__dirname, '../public')));
app.listen(3000);

