const mysql = require('mysql');
const express = require('express')
const app = express()

const host = 'localhost';
const port = 8002;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "codev",
    password: ""
});

db.connect(function(err) {
    if(err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

app.get('/tmp', (req,res) => {
    const query = "SELECT * FROM temperature";
    db.query(query, (error, results) => {
        if(!results[0]) {
            res.json({status: "Not found!"});
        }else{
            res.json(results);
        }
    })
})

app.get('/tmp/:region', (req,res) => {
    const query = "SELECT * FROM temperature WHERE région = ? ";
    db.query(query, [req.params.region], (error, results) => {
        if(!results[0]) {
            res.json({status: "Not found!"});
        }else{
            res.json(results);
        }
    })
})

app.listen(port, () => {
    console.log("Serveur à l'écoute")
  })
