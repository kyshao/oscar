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

  console.log('Data received from Db:\n');
  console.log(rows);

  //output to file
var stream = fs.createWriteStream("output.txt");
  stream.once('open', function(fd) {
    stream.write(JSON.stringify(rows));
    stream.write("\nEND\n");
    stream.end();
  });

  console.log('File output complete\n');

});


con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});


