const express = require("express");

/*
const db = require("./database.js");
const aDb = require("./answered.js");
const naDb = require("./newAnswered.js");
*/

const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://zmetwwifeybftf:5eb6e48ba17ac2aa3cfb0063c133ea8a0e14fbaf6755426caaa4fa63d2850930@ec2-3-91-139-25.compute-1.amazonaws.com:5432/df049esj9d4bgk",
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const app = express();
const bodyparser = require("body-parser");
var md5 = require("md5");

const port = process.env.PORT || 3200;


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/",(req,res) => {
    res.end("Incorrect params: ip marked");
});


app.get("/answers",(req,res) => {
  var s = new JSON.stringify();
  client.query('SELECT * FROM answered', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      s = JSON.stringify(row);
      console.log(JSON.stringify(row));
    }
  });
  res.end("found = " +s);
});

/*
app.get("/users", (req, res, next) => {
  var sql = "select * from user"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

app.post("/user", (req, res, next) => {
  var errors=[]
  if (!req.body.password){
      errors.push("No password specified");
  }
  if (!req.body.email){
      errors.push("No email specified");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  var data = {
      name: req.body.name,
      email: req.body.email,
      password : md5(req.body.password)
  }
  var sql ='INSERT INTO user (username, email, password) VALUES (?,?,?)'
  var params =[data.name, data.email, data.password]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data,
          "id" : this.lastID
      })
  });
});

app.get("/answers", (req,res,next) =>{
  var sql = "select * from answerList";
  var params = []
  aDb.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

app.get("/wake",(req,res,next) =>{
  res.end("Awake");
});

app.post("/answer", (req,res,next) =>{
  var errors=[]
  if (!req.body.userid){
      errors.push("No userid specified");
  }
  if (!req.body.answerid){
      errors.push("No answerid specified");
  }
  if (!req.body.questionid){
    errors.push("No questionid specified");
  }
  if (!req.body.buzzed){
    errors.push("No buzzed text specified");
  }
  if (!req.body.clue){
    errors.push("No clue text specified");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  var data = {
    userId : req.body.userid,
    answerId : req.body.answerid,
    questionId : req.body.questionid,
    buzzed : req.body.buzzed,
    clue : req.body.clue
  }

  var insert = 'INSERT INTO answerList (userId, answerId, questionId, buzzed, clue) VALUES (?,?,?,?,?)'
  var params = [data.userId,data.answerId,data.questionId,data.buzzed,data.clue]

  aDb.run(insert,params, function(err, result){
    if (err){
      res.status(400).json({"error": err.message})
      return;
    }
    res.json({
        "message": "success",
        "data": data,
        "id" : this.lastID
    })
  });

});

app.post("/addAnswer", (req,res,next) =>{
  var errors=[]
  if (!req.body.userid){
      errors.push("No userid specified");
  }
  if (!req.body.answerid){
      errors.push("No answerid specified");
  }
  if (!req.body.questionid){
    errors.push("No questionid specified");
  }
  if (!req.body.buzzed){
    errors.push("No buzzed text specified");
  }
  if (!req.body.clue){
    errors.push("No clue text specified");
  }
  if (!req.body.score){
    errors.push("No score specified");
  }
  if(!req.body.rating){
    errors.push("No rating specified"); 
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  var data = {
    userId : req.body.userid,
    answerId : req.body.answerid,
    questionId : req.body.questionid,
    buzzed : req.body.buzzed,
    clue : req.body.clue,
    score : req.body.score,
    rating : req.body.rating
  }

  var insert = 'INSERT INTO answerList (userId, answerId, questionId, buzzed, clue, score, rating) VALUES (?,?,?,?,?,?,?)'
  var params = [data.userId,data.answerId,data.questionId,data.buzzed,data.clue,data.score,data.rating]

  naDb.run(insert,params, function(err, result){
    if (err){
      res.status(400).json({"error": err.message})
      return;
    }
    res.json({
        "message": "success",
        "data": data,
        "id" : this.lastID
    })
  });

});


app.get("/newAnswers", (req,res,next) =>{
  var sql = "select * from answerList";
  var params = []
  naDb.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});
*/




app.listen(port, () => {
  console.log(`running at port ${port}`);
});
