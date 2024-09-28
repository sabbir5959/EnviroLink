import oracledb from "oracledb";

let connection;





async function connect() {
    try {
        connection = await oracledb.getConnection({
            user: 'ADMIN',
            password: 'admin',
            connectString: 'localhost:1521/xepdb1'
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
}





async function ensureConnection() {
    if (!connection) {
        await connect();
    }
}





async function getData(query, params = []) {
    try {
        await ensureConnection();
        const result = await connection.execute(query, params);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}





async function insert(query, params) {
    try {
        await ensureConnection();
        await connection.execute(query, params);
        await connection.commit();  // Ensure the insertion is committed

        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error executing insert:', error);
        throw error;
    }
}





async function get(query) {
    try {
        await ensureConnection();
        const result = await connection.execute(query);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}





async function update(query, params) {
    try {
        await ensureConnection();
        await connection.execute(query, params);
        await connection.commit();  // Ensure the update is committed
        console.log('Data updated successfully');
    } catch (error) {
        console.error('Error executing update:', error);
        throw error;
    }
}





export { connect, getData, insert, get, update };
