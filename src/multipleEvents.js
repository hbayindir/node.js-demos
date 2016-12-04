/*
 * multiple-events.js - Demonstrate multiple handlers per event.
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

// We need to process events.
var events = require("events");

// Create a global response variable to make server accessible from file.
var serverResponse

// Create the event emitter.
var eventEmitter = new events.EventEmitter();

// Create the first listener.
var listener1 = function listenerF1()
{
    serverResponse.write("[listener1] Listener 1 is executed.\n");
}

// Create the second listener.
var listener2 = function listenerF2()
{
    serverResponse.write("[listener2] Listener 2 is executed.\n");
}

function startDemo (httpResponse)
{
    // Connect local response object to global one.
    serverResponse = httpResponse;

    // Connect both listeners to event emitter.

    // Add with addListener
    eventEmitter.addListener("connection", listener1);
    serverResponse.write("[startDemo] listener1 is registered for \"connection\" event.\n");

    // Add with another method
    eventEmitter.on("connection", listener2);
    serverResponse.write("[startDemo] listener1 is registered for \"connection\" event.\n");

    // Get the listener count from the event emitter.
    var connectionEventListenerCount = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');

    serverResponse.write("[startDemo] " + connectionEventListenerCount + " event listener(s) are listening for \"connection\" events.\n");

    // Let's emit an event
    serverResponse.write("[startDemo] A \"connection\" event will be emitted.\n");
    eventEmitter.emit("connection");
    serverResponse.write("[startDemo] A \"connection\" event is emitted.\n");

    // Remove the first event listener from the emitter.
    eventEmitter.removeListener("connection", listener1);
    serverResponse.write("[startDemo] listener1 is removed from connection event listening\n");

    // Let's emit an event again.
    serverResponse.write("[startDemo] Another \"connection\" event will be emitted.\n");
    eventEmitter.emit("connection");
    serverResponse.write("[startDemo] Another \"connection\" event is emitted.\n");

    // Get the listener count from the event emitter again.
    var connectionEventListenerCount = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');

    serverResponse.write("[startDemo] " + connectionEventListenerCount + " event listener(s) are listening for \"connection\" events.\n");

    // Remove all event listeners to prepare for next demo.
    eventEmitter.removeAllListeners("connection");
    serverResponse.write("[startDemo] Removed all listeners for \"connection\" event to prepare for next demo.\n");

    serverResponse.end("[startDemo] Program ended.\n");
}

exports.startDemo = startDemo;
