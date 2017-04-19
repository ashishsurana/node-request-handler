var express = require('express');
var app = express();
// var mongoose = require('mong oose');



app.get('/api/request/', function (req, res, next) {
    let args = req.query;

    if (args.connId == undefined || args.timeout == undefined) {
        console.log("Bad request");
        res.status(500).end();
    } else {
        setTimeout(function () {
            res.send({ "status": "ok" });
        }, args.timeout);
    }
});

app.listen(3000, function () {
    console.log('Example app running on  3000')
});