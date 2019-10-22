const http = require('http');
const app = require('./backend/app');

const port = process.env.PORT || 3000;

app.set('port', port)
const server = http.createServer(app)

// app.set('port', port)

server.listen(port) //this defines a port to be listed to should incase the process.env.PORT is not dynamically set


// password XLu5liaLQ1s4eptD
// username owillz
