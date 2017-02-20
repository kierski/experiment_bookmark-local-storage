
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;
const router = express.Router();

// init app
const app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// parse application - middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set static path
app.use(express.static(path.join(__dirname, 'public')));

router.use(function (req, res, next) {
  next();
});

// home
router.get("/",function(req,res){
  res.render('index', {
    title: 'home'
  });
});

// favourite bookmarks
router.get("/favourite",function(req,res){
  res.render('favourite', {
    title: 'favourite'
  });
});

// web bookmarks
router.get("/web",function(req,res){
  res.render('website', {
    title: 'web'
  });
});

// youtube bookmarks
router.get("/youtube",function(req,res){
  res.render('youtube', {
    title: 'youtube'
  });
});

// bookmark panel
router.get("/bookmark_panel",function(req,res){
  res.render('bookmark', {
    title: 'panel'
  });
});

app.use("/", router);

// 404
app.use("*",function(req,res) {
  res.render('404', {
    title: '404',
  });
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});
