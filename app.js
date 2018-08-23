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
    Parameters {itemid: int}
    Response Format {error:{code:int,msg:str} or null, name: str, }
     */
    let itemid = req.body.itemid;
    if (itemid) {
        res.send(JSON.stringify({name: "Angi", size: "XL"}))
    }
    else {
        res.send(JSON.stringify({error: {code: 1, msg: "Some error"}}))
    }

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

app.get('/getUserNames', (req, res) => {
    con.query("select * from users",
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
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
