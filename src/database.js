import mysql from 'mysql'
import util from 'util'
import databaseLocal from './keys.js'

const pool = mysql.createPool(databaseLocal);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") console.error('DATABASE CONNECTION WAS CLOSED');
        if (err.code === "ER_CON_COUNT_ERROR") console.error("DATABASE HAS TO MANY CONNECTIONS");
        if (err.code === "ECONNREFUSED") console.error("DATABASE CONNECTION WAS REFUSED");
    }
    if (connection) {
        connection.release();
        console.log("CONNECTION ENABLED");
    }
    return;
})

pool.query = util.promisify(pool.query)

export default pool;
