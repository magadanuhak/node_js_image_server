var multer  = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});

var upload = multer({storage: storage});
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/upload',upload.single('file'),function(req, res, next) {
  console.log(req.file);
  if(!req.file) {
    res.status(500);
    return next(err);
  }
  res.json({ fileUrl: 'http://localhost:3000/images/' + req.file.filename });
})



module.exports = router;
