"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Chat from "./components/Chat";

export default function Home() {
  const socket = io("http://localhost:3001" , {
    autoConnect: false,
    
  });

  const [username, setUsername] = useState("");
  const [room_id, setRoom_id] = useState("");
  const [userCount, setUserCount] = useState(0);

  

    // Setup event listeners here before connecting.
    
    
  
   
  
    

  
  
  const joinRoom = () => {
    if (username !== "" && room_id !== "") {
      // Ensure the socket is connected before trying to emit events.
      if (!socket.connected) {
        socket.connect();
       
      }
      
      
       socket.emit("join_room", { username, room_id });
       //socket.on("update_user_count", (count) => {setUserCount(count);});

    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <>
      <div id="join_room" className="list text-center space-y-2 mt-10">
        <h3 className="font-bold">Join Rooms</h3>
        <input
          type="text"
          placeholder="username"
          required
          value={username}
          className="w-42 h-10 border border-black text-center font-bold outline-none"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          id="room_id"
          required
          placeholder="Enter Room ID"
          value={room_id}
          className="w-42 h-10 border border-black text-center font-bold outline-none"
          onChange={(e) => {
            setRoom_id(e.target.value);
          }}
        />
        <br />
        <button
          id="join_room_btn"
          className="w-28 h-10 rounded-lg bg-green-500 duration-150 hover:bg-green-400"
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>

      <Chat socket={socket} username={username} room_id={room_id} userCount={userCount} />
    </>
  );
}
