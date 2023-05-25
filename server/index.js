require('dotenv').config()
const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD, DB_HOST, API_VERSION, IP_SERVER } = require('./constants');
const app = require('./app');

const PORT = process.env.PORT || 4000;


mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/`)
    .then(() => {

        console.log('Connected to MongoDB:');
        app.listen(PORT, () =>{
                console.log('#########################');
                console.log('####### API REST ########');
                console.log('#########################');
                console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
        });

    }).catch((error) => {
        throw('Error connecting to MongoDB', error);
    }); 

