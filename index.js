const express = require("express");
const db = require("./database.js");
const aDb = require("./answered.js");

const app = express();
const bodyparser = require("body-parser");
var md5 = require("md5");

const port = process.env.PORT || 3200;

// middleware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/",(req,res) => {
    res.end("Incorrect params: ip marked");
});

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

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
