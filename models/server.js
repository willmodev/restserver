require('dotenv').config();
const express = require('express');
const cors = require('cors');


class Server { 

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.routeUsers = '/api/users';
        this.routeClients = '/api/clients';

        //Middlewares
        this.middlewares();

        // Routes of my application
        this.routes();

    }
    
    middlewares() {
        // CORS 
        this.app.use( cors() );

        //  read and parse to json
        this.app.use( express.json() )

        // public directory
        this.app.use( express.static('public'));
    }

    routes() {
       this.app.use( this.routeUsers, require('../routes/users') );
       this.app.use( this.routeClients, require('../routes/clients') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Restserver app listening on port', this.port);
        })
    }
}

module.exports = Server;