var mysql =require('mysql');
var operations = require('./operations.js');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'messi',
    password : '10',
    database : 'toiler'
});
function connectDB() {
    connection.connect();
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
}
function addData(name,pro,lat,pno,pass,fees,cb){
    operations.add(connection,name,pro,lat,pno,pass,fees,function (data) {
      cb(data);
    })
}
function sendUser(lat,lon,val,cb){

operations.set(connection,lat,lon,val,function (data) {
    cb(data);
})
}
module.exports ={
    connectDB,sendUser,addData,connection
};