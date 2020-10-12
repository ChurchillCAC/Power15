var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')


const DBSOURCE = "newAnswered.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE answerList (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            answerId INTEGER, 
            questionId INTEGER, 
            buzzed text,
            clue text,
            score NUMERICAL,
            rating NUMERICAL
            )`,
        (err) => {
            if (err) {
                //Table exists
            }else{
                var insert = 'INSERT INTO answerList (userId, answerId, questionId, buzzed, clue, score, rating) VALUES (?,?,?,?,?)'
                db.run(insert, [0,0,0,"Buzzed Answer", "Clue buzzed", 800.0, 123.4])
            }
        });  
    }
});

module.exports = db