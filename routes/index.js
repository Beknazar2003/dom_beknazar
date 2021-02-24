var express = require('express');
var router = express.Router();
var fs = require('fs');

let formObj = []

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


/* GET home page. */
router.get('/', function(req, res, next) {

  const data = JSON.parse(fs.readFileSync("studdata.txt", "utf-8")) 

  res.render('index', { 
    title: 'Home',
    HomeName: data[data.length],
    HomeLastName: data[data.length],
    HomeAge: data[data.length],
    HomeGroup: data[data.length],
    HomeCourse: data[data.length],
    HomeData: data
  });
});

module.exports = router;
