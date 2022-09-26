const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.get('/', function (req, res) {

    res.status(200).json({
        success: true
    });
});

let users = [];

app.use(cors());

io.on('connection', function (socket) {
    if (users.length < 2) {
        console.log('A user connected', socket.id);
        users.push(socket.id);
    }

    socket.on("message", (...args) => {
        const found = users.find(r => r === socket.id)
        if (found) {
            io.emit("messageResponse", args[args.length - 1]);
        }
    });
    socket.on('disconnect', function () {
        users = users.filter((user) => user !== socket.id);
        console.log('A user disconnected', socket.id);
    });


});

http.listen(3000, function () {
    console.log('listening on *:3000');
});