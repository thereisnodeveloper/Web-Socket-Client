// const net = require('net');

import { socketClientSendMsg } from './socket.js';


import net from 'node:net'
// === CLIENT FUNCTION ===
// function socketClient() {
//   return new Promise((resolve, reject) => {
//     const client = new net.Socket();
//     const message = 'hello123';

//     client.connect(1111, '127.0.0.1', () => {
//       client.write(message);
//     });

//     client.setTimeout(2000);
//     client.on('data', (data) => {
//       const response = data.toString();
//       client.end();
//       resolve(response === message);
//     });

//     client.on('timeout', () => {
//       client.destroy();
//       reject(new Error('Connection timed out'));
//     });

//     client.on('error', (err) => {
//       reject(err);
//     });
//   });
// }

// === SERVER HELPERS ===
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

function socketServerReversed() {
  return new Promise((resolve) => {
    const server = net.createServer((socket) => {
      socket.once('data', (data) => {
        const reversed = data.toString().split('').reverse().join('');
        socket.write(reversed);
        socket.end();
        server.close(() => resolve());
      });
    });
    server.listen(1111, '127.0.0.1');
  });
}

// === TEST RUNNER ===
async function runTests() {
  const exampleOrder = [true, false, true, false, false, true, true, true, true, false];
  let passed = 0;

  for (let i = 0; i < exampleOrder.length; i++) {
    const expected = exampleOrder[i];
    const server = expected ? socketServerRegular : socketServerReversed;

    const serverPromise = server();
    await new Promise((res) => setTimeout(res, 100)); // allow server to start

    let result;
    try {
      result = await socketClientSendMsg('hello test!');
    } catch (err) {
      console.error(`❌ Test ${i + 1} errored:`, err.message);
      continue;
    }

    await serverPromise;

    if (result === expected) {
      console.log(`✅ Test ${i + 1} passed`);
      passed++;
    } else {
      console.log(`❌ Test ${i + 1} failed (expected ${expected}, got ${result})`);
    }
  }

  console.log(`\n🎯 ${passed} / ${exampleOrder.length} tests passed`);
}

runTests();
