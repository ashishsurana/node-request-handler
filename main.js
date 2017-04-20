var express = require('express');
var app = express();
var bodyParser = require('body-parser')

let reqList = []

app.use(bodyParser.urlencoded({
    extended: true
}));

let temp;

app.get('/api/request/', function (req, res, next) {
    let args = req.query;

    temp = res;

    if (args.connId == undefined || args.timeout == undefined) {
        console.log("Bad request");
        res.status(500).end();
    } else {
        // adding to global object array
        reqList.push({
            connId: args.connId,
            time: Number(Date.now() + Number(args.timeout)),
            resp: res
        });

        setTimeout(function () {
            // deleting on completion
            reqList.forEach(function (r, i) {
                if (r.connId == args.connId) {
                    delete reqList[i];
                }
            });

            res.send({ "status": "ok" });
        }, args.timeout);
    }
});

app.get('/api/serverStatus', function (req, res, next) {
    let resultList = {};

    reqList.forEach(function (r) {
        resultList[r.connId] = String(r.time - Date.now());
    });

    res.send(resultList);
});

app.put('/api/kill', function (req, res, next) {
    let conId = req.body.connId;

    let result = { "status": "" }

    let flag = false;

    reqList.forEach(function (r, i) {
        if (r.connId == conId) {
            flag = true;
            delete reqList[i];
            result["status"] = "killed";
            r.resp.send(result);
        }
    });

    // not in the list
    if (!flag) {
        result["status"] = "invalid connection Id : " + String(conId);
    } else {
        result["status"] = "ok"
    }

    res.send(result);
})

app.listen(3000, function () {
    console.log('Example app running on  3000')
});