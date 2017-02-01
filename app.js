//global consts here
const mysql = require("mysql");
const fs = require('fs');
const oscarCredentials = {  host: "localhost",  user: "root",  password: "@scar2015"}

//execution here

// First you need to create a connection to the db
var con = mysql.createConnection(oscarCredentials);

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

queryDB(con, "SHOW DATABASES", "console");
queryDB(con, "USE oscar15_bc", "console");
var cols = queryDB(con, "SHOW COLUMNS FROM AppDefinition", "output.txt");
console.log("cols"+JSON.stringify(cols));

con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});



//=====================
//functions here

function queryDB(con, command, output){
	var r;
	con.query(command,function(err,rows){
	  if(err) throw err;

	  //Async processing sucks
	  //console.log('Please make sure that output.txt does not already exist before running this program');

	  if(output == "console"){
		  console.log('Data received from Db:\n');
		  console.log(rows);
	  }
	  else if(output != undefined){

		  //output to file
		  //if the stream is declared outside the function it is not within scope
		  var stream = fs.createWriteStream(output, {flags:'a'});
		  stream.once('open', function(fd) {
		    stream.write(JSON.stringify(rows)+'\n');
		    stream.write("END stream1\n");
		    stream.end();	
		  });
		  var stream2 = fs.createWriteStream(output, {flags:'a'});
		  stream2.once('open', function(fd) {
		    stream2.write("placeholder for stream2 output\n");
		    stream2.write("END stream2\n");
		    stream2.end();
		  });
	  console.log('File output complete\n');
	}
	r=rows;//todo this does not work
	});
	return r;
}


