const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const metaphone = require('metaphone')
const routes = require('./routes')

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'sinfron_voterapp',
  user: 'root',
  multipleStatements: true
});

connection.connect(err => {
  if (err) {
    return err;
  }
});


/*const connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-01.cleardb.net',
  database: 'heroku_bae143c0a0f8500',
  user: 'bf4f3943e4b069',
  password: "f4475fbc",
  multipleStatements: true
});

connection.connect(err => {
  if (err) {
    return err;
  }
});*/

app.use('/static', express.static(path.join(__dirname, 'client/build')));

//app.use( express.static( `${__dirname}/../build` ) )
app.use(cors());

app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(router);

router.get('/hello', (req, res) => {
    res.send("Hello");
    res.end();
    console.log('youve reached the root of the backend!')
  });


router.get('/voterss', (req, res) => {
  res.send("this is the voter data page");
  res.end();
  console.log('youve reached the backend!');
});

router.get("/voterdata", (req, res) => {
  let voterName = req.query.name;
  let voterID = req.query.voter_reg_num;
  let sql = "SELECT * FROM voters WHERE name LIKE '%" + voterName + "%' OR voter_reg_num = ?"
  connection.query(sql, [voterName, voterID], (err, results) => {
    if (err) {
      return res.send (err)
    }
    else {
      return res.json({
      data: results
    })
  } 
})
});

router.get("/electiondata", (req, res) => {
  let voterID = req.query.voter_reg_num;
  let sql = "SELECT * FROM elections WHERE voter_reg_num LIKE '%" + voterID + "%'"
  //let sql = "SELECT * FROM voters LIMIT 5"  
  connection.query(sql, [voterID], (err, results) => {
    if (err) {
      return res.send (err)
    }
    else {
      return res.json({
      data: results
    })
  } 
})
});

router.get("/walklist", (req, res) => {
  let ward = req.query.WRD;
  let precinct = req.query.PCT;
  let vscore = req.query.VoteScore;
  let sql = `SELECT * FROM voters WHERE VoteScore >= ? AND WRD = ${ward} AND PCT = ${precinct} ORDER BY Address ASC`

  connection.query(sql, [vscore, ward, precinct], (err, results) => {
    if (err) {
      return res.send (err)
    }
    else {
      return res.json({
      data: results
    })
  } 
})
});

router.get("/WRD", (req, res) => {
  let sql = "SELECT DISTINCT WRD FROM voters ORDER BY WRD"

  connection.query(sql, (err, results) => {
    if (err) {
      return res.send (err)
    }
    else {
      return res.json({
      data: results
    })
  } 
})
});

router.get("/PCT", (req, res) => {
  let sql = "SELECT DISTINCT PCT FROM voters ORDER BY PCT"

  connection.query(sql, (err, results) => {
    if (err) {
      return res.send (err)
    }
    else {
      return res.json({
      data: results
    })
  } 
})
});



app.listen(port, () => console.log(`Listening on port ${port}`));