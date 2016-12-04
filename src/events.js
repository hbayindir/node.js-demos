/*
 * events.js - Demonstrates Node.js event based callbacks.
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

// Start by importing events module
var events = require("events");

// Then create an emitter object.
var eventEmitter = new events.EventEmitter();

// Have a global response object to write to.
var serverResponse;

// We need an event handler to handle all these events.
var connectionHandler = function connected()
{
    serverResponse.write("[connectionHandler] Connection successful.\n");

    eventEmitter.emit("data_received");
}

function startDemo(httpResponse)
{
    serverResponse = httpResponse;

    // Set the handler of the event (Function pointers FTW!).
    eventEmitter.on('connection', connectionHandler);
    serverResponse.write("[startDemo] Connection handler registered.\n");

    // Create another data handler with an anonymous function.
    eventEmitter.on('data_received', function ()
    {
        serverResponse.write("[Inline Handler] Data received.\n");
    });

    // Fire the connection event, then watch the fireworks.
    serverResponse.write("[startDemo] Firing connection event.\n");
    eventEmitter.emit("connection");
    serverResponse.write("[startDemo] Done.\n");

    // Deconfigure the event listeners for next demo.
    // Since node.js is stateful, we need to do that.
    eventEmitter.removeAllListeners('connection');
    eventEmitter.removeAllListeners('data_received');
    serverResponse.write("[startDemo] All listeners removed.\n");

    serverResponse.end("[startDemo] Program ended.\n");
}

exports.startDemo = startDemo;
