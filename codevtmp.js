const mysql = require('mysql');
const express = require('express');
const { env } = require('process');
const app = express()

const host = 'localhost';

let envs = process.env


const db = mysql.createPool({
    host: envs.DB_HOST,
    user: envs.DB_USER,
    database: envs.DB,
    password: envs.DB_PWD
});

/*db.connect(function(err) {
    if(err) throw err;
    console.log("Connecté à la base de données MySQL!");
});*/

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

app.get('/tmp/region/:region', (req,res) => {
    const query = "SELECT * FROM temperature WHERE région = ? ";
    db.query(query, [req.params.region], (error, results) => {
        if(!results[0]) {
            res.json({status: "Not found!"});
        }else{
            res.json(results);
        }
    })
})

app.get('/tmp/year/:year', (req,res) => {
    var dateBeg = req.params.year + "-01-01";
    var dateEnd = req.params.year + "-12-31";
    const query = "SELECT * FROM temperature WHERE date BETWEEN '" + dateBeg + "' AND '" + dateEnd + "'";
    db.query(query, (error, results) => {
        if(!results[0]) {
            res.json({status: "Not found!"});
        }else{
            res.json(results);
        }
    })
})

app.get('/tmp/yearRegion/:year/:region', (req,res) => {
    var dateBeg = req.params.year + "-01-01";
    var dateEnd = req.params.year + "-12-31";
    const query = "SELECT * FROM temperature WHERE date BETWEEN '" + dateBeg + "' AND '" + dateEnd + "' AND région = ?";
    db.query(query, [req.params.region], (error, results) => {
        if(!results[0]) {
            res.json({status: "Not found!"});
        }else{
            res.json(results);
        }
    })
})

app.set('port', (envs.PORT || 5000));

app.listen(app.get('port'), () => {
    console.log("Serveur à l'écoute")
  })
