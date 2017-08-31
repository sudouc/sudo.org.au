var static = require('node-static');
var ssi = require("ssi");
var file = new static.Server('./');

var inputDirectory = "./";
var outputDirectory = "./";
var matcher = "**/*.html";

var includes = new ssi(inputDirectory, outputDirectory, matcher, true);
includes.compile();

require('http').createServer(function(request, response) {
    request.addListener('end', function() {
        file.serve(request, response);
    }).resume();
}).listen(process.env.PORT || 8080);
