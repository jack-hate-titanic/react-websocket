/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2022-06-18 13:31:48
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2022-06-18 18:27:35
 * @FilePath: /react-websocket/react-socket/src/App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect } from 'react';
import './App.css';

function App() {


  useEffect(() => {
    let wsUrl = 'ws://localhost:8083/ws/chat';
    const ws = new WebSocket(wsUrl)
    ws.onopen = function (e) {
        console.log('开启')
        ws.send(JSON.stringify({type: 'text', msg: 'Hello 大家好~'}))
    }//连接上时回调
    ws.onclose = function (e) {
        console.log('关闭')
    }//断开连接时回调
    ws.onmessage = function (e) {
        // let data =e.data
        console.log('收到消息' + e.data)
         ws.close();
    }//收到服务端消息
    ws.onerror = function (e) {
        console.log('出错')
    }//连接出错
  }, [])

  return (
    <div className="App">
     1111
    </div>
  );
}

export default App;
