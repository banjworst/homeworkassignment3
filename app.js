const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');


function sendResponse(res, statusCode, contentType, content) {
	res.writeHead(statusCode, {'Content-Type': contentType });
	res.end(content);

}


//sendFile function
function sendFile(filePath, res) {
    const ext = path.extname(filePath).toLowerCase();

    // content type detection
    let contentType = 'text/html'; // default
    if (ext === '.css') contentType = 'text/css';
    else if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext == '.json') contentType = 'application/json';
    else if (ext == '.txt') contentType = 'text/plain';

    // Read the file
    fs.readFile(filePath, function(err, content) {
        if (err) {;
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File not found');
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        }
    });
}

// Main callback function 
function serveStatic(req, res) {
    console.log("Request received for:", req.url);
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Default page
    if (pathname === '/') {
        pathname = '/index.html';
    }


    if (pathname === '/schedule') {
   	 console.log("Schedule route reached with query:", parsedUrl.query);
    	 return sendResponse(res, 200, 'Schedule route reached', 'text/plain');
    } else if (pathname === '/cancel') {
    	 console.log("Cancel route reached with query:", parsedUrl.query);
    	 return sendResponse(res, 200, 'Cancel route reached', 'text/plain');
    } else if (pathname === '/check') {
    	 console.log("Check route reached with query:", parsedUrl.query);
    	 return sendResponse(res, 200, 'Check route reached', 'text/plain');
}


    const filePath = './public_html' + pathname;
    sendFile(filePath, res);
}


const myserver = http.createServer(serveStatic);
myserver.listen(80, function() {
    console.log("Listening on port 80");
});

