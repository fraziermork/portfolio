//node has a whole bunch of different modules available
//this requires the module express-request-proxy
//these dependecies are installed when we do npm installed
//these are listed explicity in package.json
//a server file is also required which starts and builds the server
'use strict';
var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var bodyParser = require('body-parser');
var Mailgun = require('mailgun-js');
var mailgun = new Mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_TEST_DOMAIN});

var proxyGitHub = function(request, response) {
  console.log('Routing GitHub request for', request.params[0]);
  (requestProxy({
    url: 'https://api.github.com/' + request.params[0],
    headers: { Authorization: 'token ' + process.env.GITHUB_TOKEN }
  }))(request, response);
};

app.use(bodyParser.urlencoded());
app.get('/github/*', proxyGitHub);
// app.post('/email', function(request, response) {//this throws an error but does actually send an email
//   console.log('post made to /email');
//   console.log(request.body);
//   request.body.to = 'fraziermork@gmail.com';
//   
//   mailgun.messages().send(request.body, function(err, body) {
//     if (err){
//       console.log('Error occured', err);
//       response.status(404).end();
//     } else {
//       console.log('success');
//       console.log(body);
//       response.status(200).end();
//     }
//   });
// });

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});




app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
