REQUIRED:
NodeJS
Node module "mysql"
Node module "fs"

*note that simply calling "npm install" will not work, since the dependencies file is not configured yet

USAGE:

run oscarstart to activate the mysql database, you may need to keep this open in a separate command window

node app.js 
(depending on where node is installed you may need to specify path such as ../node/bin/node app.js)


MODIFYING app.js

call mysql commands by using the function queryDB(con, command, output)
	where command is a sql command in string form, such as "SELECT * FROM tablename"
	and output is either "console", a file name, or empty

to work with the data as an object instead of (or in addition to) printing the text, do this within the callback function of
	con.query(command,function(err,rows){}
	where rows contains the data as a JSON object

when writing to a file, by default the program will append rather than overwrite. 
To overwrite instead, you can remove the {flags:'a'}. However, this is NOT RECOMMENDED because this will simply make the program START from byte 0. It will not clear the rest of the file. Overwriting "pineapple" with "apple" will yield "applepple".
Instead, it is preferable to manually delete any existing output files before running the program.
