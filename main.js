var express = require('express');
var app = express();
var bodyParser = require('body-parser')

let connList = {};

app.use(bodyParser.urlencoded({
    extended: true
}));

let temp ;

app.get('/api/request/', function (req, res, next) {
    let args = req.query;

    temp = res;

    if (args.connId == undefined || args.timeout == undefined) {
        console.log("Bad request");
        res.status(500).end();
    } else {
        // adding to global object array
        connList[args.connId] = String(Date.now() + Number(args.connId));
        
        setTimeout(function () {
            // deleting on completion
            delete connList[args.connId];

            res.send({ "status": "ok" });
        }, args.timeout);
    }
});

app.get('/api/serverStatus', function(req, res, next){
    console.log("List", connList)
    res.send(connList);
});

app.put('/api/kill', function(req, res, next){
    console.log("Req", req.body);
    let conId = req.body.connId;
    
    let result = {"status":""}

    // not in the list
    if(connList[conId] == undefined){
        result["status"] = "invalid connection Id : " + String(conId);
    } else {
        result["status"] = "ok"
    }

    res.send(result);
})

app.listen(3000, function () {
    console.log('Example app running on  3000')
});