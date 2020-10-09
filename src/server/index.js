const express = require('express');
//bring routes
const authRoute = require('./REST/auth');
const auctionRoute = require('./REST/auction');
const bidRoute = require('./REST/bid');
const registerRoute = require('./REST/user');
//app
const app = express();
//bodyparser

const init = () =>{
    app.use('/auth', authRoute);
    app.use('/auction', auctionRoute);
    app.use('/bid', bidRoute);
    app.use('/register', registerRoute);
    return app;
}

module.exports = init;