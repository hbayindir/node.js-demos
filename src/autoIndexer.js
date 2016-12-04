/*
 * autoIndexer.js - Automagically provide links to the demos inside the folder.
 * Copyright (C) 2016 Hakan Bayındır
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

// We need filesystem operations.
var fileSystem = require("fs");

// I'm running out of time,
// So I called some help.
var glob = require("glob");

// This function provides a list of .js files inside the 
function scanFolder (folderName, extensionToFilter)
{
    var filesToReturn;

    // Devise the standard behavior
    if (folderName === undefined)
    {
        folderName = ".";
    }

    console.log ("INFO: Current folder to scan is: " + folderName);

    // Get all files by default.
    if (extensionToFilter === undefined)
    {
        extensionToFilter = "*"; // If not defined, accept everything.
    }

    console.log ("INFO: Current extension filter is: " + extensionToFilter);

    // Let's work in sync manner. It's on critical path and we will
    // nevertheless wait this stuff in.
    files = fileSystem.readdirSync(folderName);

    filesToReturn = glob.sync ("*." + extensionToFilter);

    console.log ("INFO: scanFolder got the following files: " + filesToReturn);

    return filesToReturn;
}


/*
 * This function is a crude HTML generator, where template is written inline.
 * Designed for simplicity. I've written HTML is a one liner to save space in the code.
 */
function generateIndex ()
{
    var html = "<html><head><title>Node.js live-demo index</title></head><body><h1>Node.js live-demo</h1><p>This page contains the list of demos that you can play around.</p><h2>List of available demos:</h2><ul>";

    // Will create the list items one by one.
    // First get the raw file names.
    availableDemos = scanFolder(".", "js");

    // Then create the items.
    availableDemos.forEach(function (item, index)
    {
        html += "<li><a href=\"/" + item + "\">"  + item.substr(0, item.length - 3)  + "</li>";
    });


    // List is over, let's close the HTML structure.
    html += "</ul></body></html>";

    // Return the resulting HTML file. 
    return html;
}

exports.generateIndex = generateIndex;
