var mysql = require("mysql");
var fs = require('fs');

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@scar2015"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query('show databases',function(err,rows){
  if(err) throw err;

  //Async processing sucks
  console.log('Please make sure that output.txt does not already exist before running this program');


  console.log('Data received from Db:\n');
  console.log(rows);

  //output to file
  //if the stream is declared outside the function it is not within scope
  var stream = fs.createWriteStream("output.txt", {flags:'a'});
  stream.once('open', function(fd) {
    stream.write(JSON.stringify(rows));//todo end with a newline
    stream.write("END stream1\n");
    stream.end();
  });
  var stream2 = fs.createWriteStream("output.txt", {flags:'a'});
  stream2.once('open', function(fd) {
    stream2.write("placeholder for stream2 output\n");
    stream2.write("END stream2\n");
    stream2.end();
  });

  console.log('File output complete\n');

});


con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});


