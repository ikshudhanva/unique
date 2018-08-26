"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const util = require('util');

const con = mysql.createConnection({
    host: "localhost",
    user: "aniksa",
    password: "Ikshu!92",
    database: "unique"
});

con.connect(function (err) {
    if (err) {
        console.log("Failed to connect toDatabse")
    }
    else {
        console.log("Connected!");
    }
});


app.use(express.static('public'));
app.use(bodyParser.json());
app.post('/getItemInfo', (req, res) => {
    /*
        Parameters : { itemid : int }
        Response Format : { error : msg : str } or { itemNum : str , ... }
     */
    let itemId = req.body.itemid;
    console.log(itemId);
    con.query( util.format( "SELECT * FROM item WHERE itemNum = '%s' ", itemId ),
        (err, result) => {
            if (err) {
                console.log( err );
                res.send("ERROR");
            }
            else {
                let c = result.cost;
                res.send(result);
            }
        });
});




app.get('/insertUser', (req, res) => {
    let email = req.query.username;
    let password = req.query.password;
    con.query(util.format("insert into users values ('%s','%s',0,0)", email, password),
        (err, resu) => {
            if (err) {
                console.log("some error", err);
                res.send("Err")
            }
            else {
                console.log("Succeess");
                res.send(resu)
            }
        });
});

/*app.get('/getUserNames', (req, res) => {
    /*Sample GET Query*/
  /*  con.query("select * from users",
        (err, resu) => {
            if (err) {
                console.log("some error", err);
                res.send("Err")
            }
            else {
                console.log("Succeess");
                let str = "<table>";
                resu.forEach(x => str += "<tr> <td>" + x.email + "</td>" + "<td>" + x.password + "</td></tr>");
                str += "</table>"
                res.send(str);
            }
        });
});*/

app.listen(3000, () => console.log('Example app listening on port 3000!'));
