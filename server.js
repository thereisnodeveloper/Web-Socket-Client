import net from "node:net"

function socketServerRegular() {
  return new Promise((resolve) => {
    const server = net.createServer((socket) => {
      socket.once('data', (data) => {
        socket.write(data);
        socket.end();
        server.close(() => resolve());
      });
    });
    server.listen(1111, '127.0.0.1');
  });
}
socketServerRegular()