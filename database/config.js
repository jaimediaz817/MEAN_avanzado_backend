const mongoose = require('mongoose');

const dbConnection = async () => {

    // process.env.DATABASE_ATLAS
    let URL_CONNECTION = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clusterudemyapps.csr2w.mongodb.net/${process.env.DB_NAME_CITASMEDICAS}`;
    
    try {
        await mongoose
        .connect(URL_CONNECTION, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(res => {
            //console.log('res: ', res);
        });
        
        console.log('>>>>>>>>>>>>>>>>>>> DB CONNECTED', process.env.DB_USER);

    } catch (error) {
        console.log('error: ', error);
        throw new Error('Error al inciciar la Base de datos, ver logs :::: >>> ', `mongodb+srv://${process.env.DB_USER_JDIAZ}:${process.env.DB_NAME_CITASMEDICAS}@clusterudemyapps.csr2w.mongodb.net/${process.env.DB_NAME_CITASMEDICAS}`);
    }
}

module.exports = {
    dbConnection
}
//exports.dbConnection = dbConnection;