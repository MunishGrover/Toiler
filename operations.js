var database =require('./database');

function add(connection,name,pro,lat,pno,pass,fees,cb){
    var sql=`INSERT INTO worker VALUES (null,'${name}','${pro}','${lat}','${pno}','${pass}','${fees}')`;

    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        cb(results);
    });
}
function set(connection,lat,lon,val,cb){
    console.log(val);
    var sql=`SELECT * FROM worker WHERE pro='${val}'`;

    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        cb(results);
    });

}
module.exports={
    add,set
}