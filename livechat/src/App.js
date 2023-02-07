import './App.css';
import io from "socket.io-client";
import { useEffect, useState } from "react"; 

import JoinRoom from "./components/JoinRoom.js"
import SendMessage from "./components/SendMessage.js"
const socket = io.connect("http://localhost:3001");
function App() {
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState(["defaultMessage", "defaultMessage2"])
  const [room, setRoom] = useState("")
  const [roomData, setRoomData] = useState()
  const sendMessage = () => {
    if(roomData){
      socket.emit("send_message", {message, room})
    }else{
      alert("not in room")
    }
  }

  const joinRoom = () => {
    console.log(room)
    if(room !== ""){
      socket.emit("join_room", room);
    }
  }

  const leaveRoom = () => {
    socket.emit("leave_room", roomData)
    setRoomData()
  }

  useEffect( () => {
    socket.on("receive_message", (data) => {
      setMessageReceived([...messageReceived, data.message])
    });
  }); 

  useEffect( () => {
    socket.on("join_room", (data) => {
      setRoomData(data)
    })
  })
  
  return (
    <div className="App">
      {roomData ? <>
        <p>joined room: {roomData.room} with connection id: {roomData.id}</p>
        <h1> Messages:</h1>
        <div className="messages">
          {messageReceived.map((e) => <p>{e}</p>)}
        </div>
        <SendMessage setMessage={setMessage} sendMessage={sendMessage}/>
        <button onClick={leaveRoom}>leave room</button>
      </>:
      <>
        <JoinRoom setRoom={setRoom} joinRoom={joinRoom}/>
      </>}
    </div>
  );
}

export default App;
