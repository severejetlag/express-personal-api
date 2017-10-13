// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

var profile = {
  name: 'Nick Lee', 
  github: 'https://github.com/severejetlag',
  githubAvator: 'https://avatars0.githubusercontent.com/u/31427289?v=4',
  personalSite: 'https://severejetlag.github.io/',
  currentCity: 'San Francisco', 
  pets: `none :'(`
}

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

// Personal API response
app.get('/api/personal', function apiPerssonal(req,res){
  res.json(profile);
});

app.get('/api/software', function apiGetSoftware(req,res){
  db.Software.find({})
    .exec(function(err, books){
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({data:books, length:books.length});
    });
});

app.delete('/api/software/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log(req.params)
  var softwareId = req.params.id;

  db.Software.findOneAndRemove({ _id: softwareId }, function (err, deletedSoftware) {
    res.json(deletedSoftware);
  });
});

app.put('/api/software/:id', function(req,res){
// get book id from url params (`req.params`)
  console.log('software update', req.params);
  // find the index of the book we want to remove
  db.Software.findById(req.params.id, function(err, updatedSoftware){
    if (err) {
        res.status(500).send(err);
    } else {
        updatedSoftware.description = req.body.description || updatedSoftware.description;
        updatedSoftware.save((err, updatedSoftware) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(updatedSoftware);
        });
    }
  })
  
  res.json(req.params);
});

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  })
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
