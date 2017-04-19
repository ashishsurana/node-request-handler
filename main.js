var express = require('express');
var app = express();
// var mongoose = require('mongoose');

app.get('/test',function (req, res , next){
    res.send("Hello World");
})

app.listen(3000, function () {
	console.log('Example app running on  3000')
});