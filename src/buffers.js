/*
 * buffers.js - Demonstrate buffers and their features.
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

function startDemo (httpResponse)
{
    // Let's create a simple buffer, from a string.
    var helloBuffer = new Buffer("Hello, World!", "utf-8");

    // Let's create another one.
    var sizedBuffer = new Buffer(20); // Looks like C arrays!
    var octetsWritten = sizedBuffer.write("I've written this!"); // Without encoding.
    httpResponse.write("[startDemo]" + octetsWritten + " octet(s) are written to buffer.\n");

    // Now let's read them.
    // Start with helloBuffer.
    httpResponse.write("[startDemo] Hello buffer to string (utf-8): " + helloBuffer.toString("utf8") + "\n");
    httpResponse.write("[startDemo] Hello buffer to string (direct): " + helloBuffer.toString(undefined) + "\n");
    httpResponse.write("[startDemo] Hello buffer to string (hex): " + helloBuffer.toString("hex") + "\n");

    // Let's play some games.
    httpResponse.write("[startDemo] Partial hello buffer to string (utf-8): " + helloBuffer.toString("utf8", 7) + "\n");

    // Buffers can be converted to JSON, with a single line. Neat.
    var jsonizedBuffer = sizedBuffer.toJSON(sizedBuffer);
    httpResponse.write("[startDemo] Sized Buffer to JSON:" + "\n");
    httpResponse.write(JSON.stringify(jsonizedBuffer, null, 4));
    httpResponse.write("\n");

    httpResponse.end("[startDemo] Program ended.\n");
}

exports.startDemo = startDemo;
