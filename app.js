// external or node_modules files
let express = require('express');
let exec = require('child_process').exec;

// Create an express application
let app = express();

// Store the argument list here - argv0 is the application to start.
let argv = 'C:\\Windows\\System32\\notepad.exe';

// Launch function for running the application
function launch(req, res){
  console.log("running application...");

  // Start notepad here. Potentially scrub line termination characters for security.
  exec(argv, function(err, data) { 
    if(err) 
    {
      console.log(err);
      res.send("Error!");
    }

    if(data)
      console.log(data.toString());
  });  

  // Send back that this worked.
  res.send("Launched application!");
}

// Set up the path for launching notepad.
// In-browser, use AJAX to send a request. Prefer non-caching.
// EXAMPLE GET REQUEST: 127.0.0.1:7000/notepad
// Next step: Use a querystring to pass arguments.
//app.get('/notepad', launch);
//app.post('/notepad', launch);
app.all('/notepad', launch);

// Listen on whatever port you want.
app.listen(7000);
console.log('listening');

