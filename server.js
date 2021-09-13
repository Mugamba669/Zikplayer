const http = require("http");
const path = require("path");
const fs = require("fs");

var server = http.createServer((request, response) => {
    var url = path.join(__dirname, request.url == "/" ? "Eq.html" : request.url);

    var extension = path.extname(url);
    var type;
    switch (extension) {
        case ".html":
            type = "text/html";
            break;
        case ".txt":
            type = "text/plain";
            break;
        case ".css":
            type = "text/css";
            break;

        case ".js":
            type = "text/javascript";
            break;

        case ".png":
            type = "image/png";
            break;
        case ".jpg":
        case ".jpeg":
            type = "image/jpeg";
            break;
        default:
            type = "text/plain";
            break;
    }
    fs.readFile(url, (error, data) => {
        if (error) {
            if (error.code == "ENONET") {
                console.log("Page note found");
            } else {
                console.log(error);
            }
        } else {
            response.writeHead(200, { "Content-type": type });
            response.end(data, "utf-8");
        }

    });

});
var port = process.env.PORT || 2000;
server.listen(port, console.log("Running on port 2000 http://127.0.0.1:2000"));