import app from './app';
import pool from './db/db'

async function init() {
    //Valida conexion a bd
    pool.getConnection((err) => {
        if (err) throw err;
        console.log("DB Connected");
    });

    app.listen(app.get('PORT'));
    console.log(`App on port ${app.get('PORT')}`);
}

init();