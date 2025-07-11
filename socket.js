import net from 'node:net';

export async function isServerReplySame(msg) {
  return await sendMsgGetReply(msg);

  async function sendMsgGetReply(msg) {
    const mySocket = new net.createConnection({ port: 1111 });
    const originalMsg = msg;
    console.log('original message:', originalMsg);
    let serverReply;

    //set encoding to read strings
    mySocket.setEncoding('utf8');
    //Check if connected, then write msg
    mySocket
      .on('connect', () => console.log('connection event emitted'))
      .on('ready', () => console.log('socket ready'))
      .on('end', () => console.log('connection ended'))
      .on('error', (error) => console.log('error:', error))
      .write(msg, (error) => {
        console.log('sending message:', msg);
        if (error) return console.log('if there are errors:', error);
      });

    mySocket.on('data', (data) => {
      console.log('server reply:', data);
      serverReply = data;
      mySocket.destroy();
    });

    return serverReply === originalMsg;
  }
}
console.log(isServerReplySame('hello'));
