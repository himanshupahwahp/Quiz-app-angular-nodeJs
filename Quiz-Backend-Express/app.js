var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const dbConn = require('./config/db.config');
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function (req, res) {
    res.send("Hello world!");
});

//GET
app.get('/questions/:type', (req, res) => {
    dbConn.getConnection(function (err, conn) {
        if (err) throw err;
        conn.query("SELECT * FROM questions WHERE type = ?", [req.params.type], function (err, result, fields) {
            if (!err)
                res.send(result);
            else
                console.log(err);
        });

        //release the connection when finished!
        dbConn.releaseConnection(conn);
    });

});

app.post('/saveAnswers', (req, res) => {
    dbConn.getConnection(function (err, conn) {
        if (err) throw err;
        console.log(req.body);
        let sql = "INSERT INTO user_answers (name, email, question, answer) VALUES ?";
        let values = [];

        let userData = req.body;
        if(userData){
            for (let i = 0; i < userData.question.length; i++) {
                values[i] = [userData.name, userData.email, userData.question[i], userData.answers[i]];
            }
        }
        conn.query(sql, [values], (err, result, fields) => {
            if (!err)
                res.send(values);
            else
                console.log(err);
        });
    });
});


app.listen(3000);