const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport =  require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash')
const session = require('express-session');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const Store = require('express-session').Store;
const routes = require('./routes')

function loggedIn(req, res, next) {
  if (req.user) {
      next();
  } else {
      res.redirect('/');
  }
}

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

//app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static( `${__dirname}/../build` ) )
app.use(cors());


app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(router);

//passport init
app.use(session({ 
  name: 'SessionID',
  secret: "cats",
  resave: true,
  saveUninitialized: true }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

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

router.get("/sfid", (req, res) => {
  let id = req.query.q;

  let sql = "SELECT * FROM voters WHERE SFID = ?"
  connection.query(sql, [id], (err, results) => {
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

router.get("/tagged", (req, res) => {

  let voterid = req.query.voterid;
  let sql = `SELECT * FROM tagged INNER JOIN tags WHERE tagged.tagid = tags.id AND voterid = ${voterid}`

  connection.query(sql, [voterid], (err, results) => {
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

router.get("/notes", (req, res) => {

  let voterid = req.query.voterid;
  let sql = `SELECT * FROM notes WHERE SFID = ${voterid}`

  connection.query(sql, [voterid], (err, results) => {
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

router.post("/notes", (req, res) => {

  let sfid = req.body.SFID;
  let subject = req.body.Subject;
  let note = req.body.Note;

  let sql = `INSERT INTO notes (SFID, Subject, Note) VALUES (${sfid}, "${subject}", "${note}")`

  connection.query(sql, [sfid, subject, note], (err, results) => {
    if (err) {
      return res.send (err)
    }
    else {
      return res.send("Successfully added!")
  } 
})
});

router.get("/users", (req,res) => {
  let username= req.body.username;
  let password = req.body.password;
  let sql = `SELECT * FROM users WHERE username="${username}" AND password="${password}"`

  connection.query(sql, [username, password], (err, results) => {
  if (err) {
    // console.log("error ocurred",error);
    res.send(err)
  }else{
    // console.log('The solution is: ', results);
    if(results.length > 0){
      if(results[0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"invalid credentials"
          });
    }
  }
  });
})

passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true 
},
  function(req, username, password, done) {

    connection.query('SELECT * FROM users where username = ?', [username], function(err, user) {
      if (err) { 
        return done(err); 
      }
      if (!user.length) {
        return done(null, false, console.log('no user found'));
      }
      if ((user[0].password != password)) {
        return done(null, false, console.log('wrong password'));
      } 
      console.log(req.user);
      return done(null, user);

    });
  } 
));

passport.serializeUser(function(user, done){
  done(null, user[0].id);
});

passport.deserializeUser(function(id, done){
  connection.query("SELECT * FROM users WHERE id = ?", [id], function (err, user){
      done(err, user);
  });
});

app.get('/x /:username', function(req, res) {
  console.log(req.user) // undefined
})


/*router.post('/login', function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err || !user) {
          return res.status(400).json({
              message: 'Something is not right',
              user   : user
          });
      }
     req.login(user, {session: false}, (err) => {
         if (err) {
             res.send(err);
         }
         // generate a signed son web token with the contents of user object and return it in the response
         const token = jwt.sign(user[0].username, 'your_jwt_secret');
         return res.json({token});
      }); 
  }) (req, res);
});*/
    


app.post('/login',
    passport.authenticate('local', 
    { 
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash: true })
            );


app.listen(port, () => console.log(`Listening on port ${port}`));