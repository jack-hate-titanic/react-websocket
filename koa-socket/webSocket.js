/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2022-06-18 17:11:29
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2022-06-18 18:31:21
 * @FilePath: /react-websocket/koa-socket/webSocket.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// webSocket.js
const url = require('url');

var messageIndex = 0;

// 广播当前 webSocket 连接用户
function broadcastUsers(wss, user) {
 
}

// 从 cookie 中获取 user
function cookiesUser(req) {

}

// 创建消息
function createMessage(type, data) {
  messageIndex++;
  return JSON.stringify({
    id: messageIndex,
    type: type, // 消息类型
    data: data, // {type: 数据类型}
  });
}

// 连接后回调
function onConnect() {

}

// 监听客户端消息
function onMessage(message) {
  let data = JSON.parse(message.toString());
  console.log(data);
    const msg = createMessage('chat', data.msg);
    this.wss.broadcast(msg);
}


// 客户端关闭 webSocket
function onClose() {

}

// webSocket 连接异常
function onError(err) {
  console.log('[WebSocket] error: ' + err);
};

// 创建 webSocket 服务器
function createWebSocketServer(server, WebSocketServer) {
  //创建WebSocketServer:
  const wss = new WebSocketServer({
    server,
  });
  // 聊天功能：在接收到信息后，将消息广播发送到 webSocket 所有绑定的 client
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        console.log(data);
        client.send(data);
      }
    });
  };
  wss.on('connection', function(client, req) {
    let location = url.parse(req.url, true);
    client.on('message', onMessage);
    client.on('close', onClose);
    client.on('error', onError);
    // 如果接收到 webSocket 请求，但不是 chat 聊天模块的，关闭改请求
    if (location.pathname !== '/ws/chat') {
      client.close(4000, 'Invalid URL');
    }
    client.user = cookiesUser(req);
    client.wss = wss;
    // 连接成功后的 自定义回调
    onConnect.apply(client);
  });
  console.log('webSocket 服务器启动成功!');
  return wss;
}

module.exports = { createWebSocketServer };