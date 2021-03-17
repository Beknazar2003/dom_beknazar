var express = require('express');
var router = express.Router();
var fs = require('fs');

const {Pool, Client} = require('pg')

const pool = new Pool({
  database: 'universitet',
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  host: 'localhost'
})

let formObj = []
let insertObj = {}

router.post('/getuser' , async (req , res) => {
  formObj[formObj.length] = {
      name:     req.body.name,
      lastname: req.body.lastname,
      age:      req.body.age,
      group:      req.body.group,
      course:      req.body.course
  }

  fs.writeFileSync("studdata.txt", JSON.stringify(formObj))

  console.log(formObj)
    res.redirect('/');
  })

  router.post('/createuser' , async (req , res) => {
    insertObj = {
        fam:  req.body.fam,
        name: req.body.name,
        surname: req.body.surname,
        post: req.body.post
    }
  
    pool.query(`INSERT INTO teacher(fam, name, surname, post) VALUES ( '${insertObj.fam}', '${insertObj.name}', '${insertObj.surname}', '${insertObj.post}' )`), (err, res) => {
      console.log(err, res)
      pool.end()
    }
  
    console.log(insertObj)
      res.redirect('/createpage');
    })
    router.get('/createpage', function(req, res, next) {

      res.render('createpage', { 
        title: 'CreateUser',
        isCreate: true
      });
    });

/* GET home page. */
router.get('/', function(req, res, next) {

  const data = JSON.parse(fs.readFileSync("studdata.txt", "utf-8")) 

  res.render('index', { 
    title: 'Home',
    HomeName: data[data.length - 1]['name'],
    HomeLastName: data[data.length - 1]['lastname'],
    HomeAge: data[data.length - 1]['age'],
    HomeGroup: data[data.length - 1]['group'],
    HomeCourse: data[data.length - 1]['course'],
    HomeData: data,
    isHome: true

  });
});

module.exports = router;
