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

//sql commands here
queryDB(con, "SHOW DATABASES", "console");
queryDB(con, "USE oscar15_bc");
queryDB(con, "SELECT TABLE_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS LIMIT 1000", "output.txt");
//queryDB(con, "SHOW COLUMNS FROM AppDefinition", "output1.txt");


con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});



//=====================
//functions here

//@parameters
//con -> a mysql connection object
//command -> a mysql command, as a string
//output -> "console", string filename, or empty for no output
function queryDB(con, command, output){
	
	con.query(command,function(err,rows){
		if(err) throw err;


		if(output == "console"){
			console.log('Data received from Db:\n');
			console.log(rows);
		}
		else if(output != undefined){
	
			//output to file
			//if the stream is declared outside the function it is not within scope
			//{flags:'a'} in the 2nd parameter of the argument sets append mode
			//please manually delete/clear the output file if you want to start with a blank file
			var stream = fs.createWriteStream(output, {flags:'a'});
			stream.once('open', function(fd) {
				//warning: stream.write is an ASYNC method
				stream.write(JSON.stringify(rows)/*	+'\n'	*/);
				stream.write("END stream1\n");
				stream.end();	
			});

/*			uncomment if multiple streams are needed
			var stream2 = fs.createWriteStream(output, {flags:'a'});
			stream2.once('open', function(fd) {
				stream2.write("placeholder for stream2 output\n");
				stream2.write("END stream2\n");
				stream2.end();
			});
*/
			console.log('File output complete to filename: '+output+'\n');
		}
	});
}


