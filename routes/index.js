var express = require('express');
var router = express.Router();
var fs = require('fs');

let formData = {}

router.post('/getuser' , async (req , res) => {
    formData = {
      name:     req.body.name,
      lastname: req.body.lastname,
      age:      req.body.age,
      group:      req.body.group,
      course:      req.body.course
  }

  fs.appendFileSync("studdata.txt", JSON.stringify(formData) + `\n\n` )

  console.log(formData)
    res.redirect('/');
  })


/* GET home page. */
router.get('/', function(req, res, next) {

  const data = fs.readFileSync("studdata.txt", "utf-8")

  res.render('index', { 
    title: 'Home',
    HomeName: formData.name,
    HomeLastName: formData.lastname,
    HomeAge: formData.age,
    HomeGroup: formData.group,
    HomeCourse: formData.course,
    HomeData: data + `\n\n`
  });
});

module.exports = router;
