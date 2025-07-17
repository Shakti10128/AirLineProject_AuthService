const express = require("express");
const {PORT} = require("./config/serverConfigs");
const apiRoutes = require("./routes/index");
const app = express();

const prepareAndStartServer = ()=>{
    app.use(express.json());
    app.use("/api",apiRoutes);

    app.listen(PORT,(error)=>{
        if(error) {
            console.log("Error while started the auth server");
            throw error;
        }
        console.log(`Auth server started at port: ${PORT}`);
    })
}

prepareAndStartServer();
