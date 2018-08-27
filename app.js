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
        Parameters : { itemId : str }
        Response Format : { error msg : str } or { itemNum : str , ... }
     */
    let itemId = req.body.itemId;
    con.query( util.format( "SELECT * FROM item WHERE itemId = '%s';", itemId ),
        (err, result) => {
            if (err) {
                console.log( err );
                res.send("ERROR");
            }
            else {
                res.send(result);
            }
        });
});

app.post( '/insertItem' , ( req , res ) => {
    /*
        Paramerters : { itemId : str , type : str , cost : float , stockLeft : int , rPrice : float , wPrice : float }
        Response Format : { error ms : str } or { success(1) or failure(0) }
     */
    let item = req.body;
    con.query(util.format(" INSERT INTO item VALUES ( '%s' , '%s' , %f , %d , %f , %f );", item.itemId, item.type, item.cost, item.stockLeft, item.rPrice, item.wPrice),
        (err, result) => {
            if (err) {
                //console.log(err);
                res.send("0");
            }
            else {
                //console.log("SUCESS");
                res.send("1");
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
