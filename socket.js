import net from 'node:net';

export function socketClientSendMsg(msg) {
  const mySocket = new net.Socket();
  mySocket.connect({ port: 1111 }, () => {
    console.log('connected...');
  });

  //Check if connected, then write msg
  return mySocket
    .on('connect', () => {
      console.log('connection event emitted');
    })
    .on('ready', () => console.log('socket ready'))
    .on('end', ()=> console.log('connection ended'))
    .on('data', ()=>console.log('Data returned from client:', data))
    .write(msg, (error) => {
      if (error) return console.log('if there are errors:', error);
    })


}
console.log(socketClientSendMsg('hello'));
// console.log('connectino written T/F: ',socketClient('hello'))
