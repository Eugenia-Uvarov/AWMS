// All code is based on the CS 340 starter code:
// Date: 11/30/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_uvarove',
    password        : 'wRyFAK6ytQIq',
    database        : 'cs340_uvarove'
})

// Export it for use in our application
module.exports.pool = pool;
