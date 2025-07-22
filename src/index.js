const express = require("express");
const {PORT} = require("./config/serverConfigs");
const apiRoutes = require("./routes/index");
const app = express();
const errorHandler = require('./middlewares/errorHandler');

// const db = require("./models/index");

const prepareAndStartServer = ()=>{
    app.use(express.json());
    app.use("/api",apiRoutes);


    app.use(errorHandler);
    app.listen(PORT,(error)=>{
        if(error) {
            console.log("Error while started the auth server");
            throw error;
        }
        // syncing the DB
        // if(process.env.SYNC_DB){
        //     db.sequelize.sync({alter:true});
        // }
        console.log(`Auth server started at port: ${PORT}`);
    })
}

prepareAndStartServer();
