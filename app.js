const express = require('express');        // here we load express with help of require
const user = require('./users.json');       // here we load JSON file with help of require
const fs = require('fs');                   // here we load file system module with help of require
const bodyParser = require('body-parser');  // here we load body-parse middleware for handling JSON

var app = express();                        // here we create an object with value express()

app.use(bodyParser.json());                 // it tells the system that we want to use JSON

app.get("/users", (req, res) => {

    res.json(user);
});

app.post('/users/add', (req, res) => {                 
    fs.readFile(__dirname + "/" + "users.json", 'utf-8', function (err, user) { 
        if (err) throw err
        var jsonObject = JSON.parse(user);          
        console.log(user+"-----------------")
       
        jsonObject.user.push({
            id: req.body.id,
            fame: req.body.fame,    
            lname: req.body.lname
        })
              
        fs.writeFile('./users.json', JSON.stringify(jsonObject), 'utf-8', function (err) {  //it use to write the file
            if (err) throw err
            console.log('New user added');
        })
        
        res.send(jsonObject);
        console.log(jsonObject);
    });
});


app.listen(8000, () => {
    console.log('server started on port 8000');
});