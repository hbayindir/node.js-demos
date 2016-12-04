/*            
 * multiple-events.js - Demonstrate multiple handlers per event.
 * Copyright (C) 2016 Hakan Bayindir
 *            
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by                               * the Free Software Foundation, either version 3 of the License, or                                  * (at your option) any later version.
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

// We also need a global variable to write output.
var eventsString;

// Create the event emitter.
var eventEmitter = new events.EventEmitter();

// Create the first listener.
var listener1 = function listenerF1()
{
    eventsString += "[listener1] Listener 1 is executed.\n";
}

// Create the second listener.
var listener2 = function listenerF2()
{
    eventsString += "[listener2] Listener 2 is executed.\n";
}

function startDemo ()
{
    // Clear eventsString variable for clean output.
    eventsString = "";

    // Connect both listeners to event emitter.

    // Add with addListener
    eventEmitter.addListener("connection", listener1);
    eventsString += "[startDemo] listener1 is registered for \"connection\" event.\n";

    // Add with another method
    eventEmitter.on("connection", listener2);
    eventsString += "[startDemo] listener1 is registered for \"connection\" event.\n";

    // Get the listener count from the event emitter.
    var connectionEventListenerCount = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');

    eventsString += "[startDemo] " + connectionEventListenerCount + " event listener(s) are listening for \"connection\" events.\n";

    // Let's emit an event
    eventEmitter.emit("connection");
    eventsString += "[startDemo] A \"connection\" event is emitted.\n";

    // Remove the first event listener from the emitter.
    eventEmitter.removeListener("connection", listener1);
    eventsString += "[startDemo] listener1 is removed from connection event listening\n";

    // Let's emit an event again.
    eventEmitter.emit("connection");
    eventsString += "[startDemo] Another \"connection\" event is emitted.\n";

    // Get the listener count from the event emitter again.
    var connectionEventListenerCount = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');

    eventsString += "[startDemo] " + connectionEventListenerCount + " event listener(s) are listening for \"connection\" events.\n";

    // Remove all event listeners to prepare for next demo.
    eventEmitter.removeAllListeners("connection");
    eventsString += "[startDemo] Removed all listeners for \"connection\" event to prepare for next demo.\n";

    eventsString += "[startDemo] Program ended.\n";

    return eventsString;
}

exports.startDemo = startDemo;
