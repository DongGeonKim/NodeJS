const SocketIO = require('socket.io');

module.exports = (server) => {
  const io = SocketIO(server, { path: '/socket.io' });

  io.on('connection', (socket) => {
	  console.log("!2121212");
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on('error', (error) => {
      console.error(error);
    });
    socket.on('reply', (data) => {
      console.log(data);
    });	
    socket.interval = setInterval(() => {
      socket.emit('news', 'Hello Socket.IO');
      // (news:이벤트 이름, Hello...:데이터)
      // 클라이언트가 이 메시지를 받기 위해서는 news 이벤트 리스터를 만들어두어야 함
    }, 3000);
  });
};
