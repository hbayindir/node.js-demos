/*
 * syncAndAsync.js - Demonstrate sync and async calls in Node.js.
 * Copyright (C) 2016 Hakan BayÄ±ndÄ±r
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

// We need to access some files inside the demo directory.
var fs = require("fs");

var asyncReadResult;

function startDemo (httpResponse)
{
    httpResponse.write("Hey!\n");

    // Let's read the data synchronously
    httpResponse.write("[startDemo] Reading the input file with synchronous call.\n");

    httpResponse.write( "[startDemo] File contents are as follows:\n");
    httpResponse.write(fs.readFileSync('input.txt') + "\n"); // End with newline.

    httpResponse.write('[startDemo] Synchronous call has ended.\n');
    httpResponse.write('[startDemo] Will read the file aysnchronous way.\n');

    // Now let's do the same thing asynchronously.
    fs.readFile('input.txt', function (error, text_data) {
    
        if (error) 
        {
            return console.error('Something happened: ' + error);
        }

        httpResponse.write("[startDemo] Asynchronous file call has returned.\n");
        
        // Since this is the last call of this single demo, we can end the 
        // response with this line.
        httpResponse.end(text_data.toString() + "\n");
    });

    // Let's finish the application.
    httpResponse.write("[startDemo] Asynchronous file call has sent.\n");
    httpResponse.write("[startDemo] This is end of the program.\n");
}

exports.startDemo = startDemo;
