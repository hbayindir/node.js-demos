# Node.js self contained demo repository.

This repository is based on my Node.js examples that I've written. This repository collects all the demos and some more to a single, self-served application.

## List of Demos

- `main.js`: Runs a web server and provides event handling and path based redirection. Currently a little primitive but, works. 
- `autoIndexer.js`: Generates the main page of the application. Searches for `js` files and creates the HTML file to show.
- `events.js`: Demonstrates the event structure of the Node.js.
- `multipleEvents.js`: Demonstrates multiple event handlers per event.

##ÂNPM Dependencies
This demo uses [`glob`](https://github.com/isaacs/node-glob) by isaacs. I bundled a version in the git, the demo is not tied to specific version. `glob` is used by `autoIndexer` to search for `js` files. 
