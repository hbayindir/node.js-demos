/*
 * main.js - Root of the Node.js demo application.
 * Copyright (C) 2016 Hakan Bayindir
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Add the required modules.
var httpServer = require("http"); // Will serve itself over http://.

// Add our own modules
var autoIndexer = require("./autoIndexer.js");
var eventDemo = require("./events.js");
var multipleEventsDemo = require("./multipleEvents.js");
var syncAndAsyncDemo = require("./syncAndAsync.js");
var buffersDemo = require("./buffers.js");

function httpRequestHandler (request, response)
{
    // Let's log the requested path to the console.
    console.log("INFO: We have a guest from " + request.connection.remoteAddress + ".");
    console.log("INFO: Path requested: " + request.url + ".");

    // Send the HTTP status OK (200) and content (text/plain)
    response.writeHead(200, {'Content-Type': 'text/html'});                    
    
    // User requests the events demo.
    if (request.url === "/events.js")
    {
        // Send the HTTP status OK (200) and content (text/plain)
        response.writeHead(200, {'Content-Type': 'text/plain'});

        // Call the function that brings the demo in.
        eventDemo.startDemo(response);
    }
    
    // User requests multiple events demo.
    else if (request.url === "/multipleEvents.js")
    {
        // Send the HTTP status OK (200) and content (text/plain)
        response.writeHead(200, {'Content-Type': 'text/plain'});

        // Call the function that brings the demo in.
        multipleEventsDemo.startDemo(response);
    }
    
    // User requests sync and async calls demo.
    else if (request.url === "/syncAndAsync.js")
    {
        // Send the HTTP status OK (200) and content (text/plain)
        response.writeHead(200, {'Content-Type': 'text/plain'});

        // Call the function that brings the demo in.
        syncAndAsyncDemo.startDemo(response);
    }
    
    // User requests sync and async calls demo.
    else if (request.url === "/buffers.js")
    {
        // Send the HTTP status OK (200) and content (text/plain)
        response.writeHead(200, {'Content-Type': 'text/plain'});

        // Call the function that brings the demo in.
        buffersDemo.startDemo(response);
    }

    // Prevent hammering and return to main page every time.
    // Request the root document.
    else
    {
        // Send the HTTP status OK (200) and content (text/plain)
        response.writeHead(200, {'Content-Type': 'text/html'});                    

        // Generate the index document and return to requester.
        response.end(autoIndexer.generateIndex());
    }
}

// The callback funtion you provide is automatically added to 'request' event.
httpServer.createServer(httpRequestHandler).listen(8081);
console.log("HTTP server is started and serving on port 8081. Press CTRL+C to exit.");
