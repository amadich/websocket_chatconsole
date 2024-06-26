"use client";
import { useEffect, useState } from "react";

export default function Chat({ socket, username, room_id, userCount } : any) {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([] as any[]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageContent = {
        room_id: room_id,
        username: username,
        message: message,
      };
      await socket.emit("send_message", messageContent);
      setMessagesList((oldArray) => [...oldArray, messageContent]);
      setMessage("");
    }
  };

  useEffect(() => {
    const receiveMessageHandler = (data : any) => {
      console.log("Message received:", data);
      setMessagesList((oldArray) => [...oldArray, data]);
    };

    socket.on("receive_message", receiveMessageHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket]);

  return (
    <>
      <div className="navbar">
        <h2>Connected Users: {userCount}</h2>
      </div>
      <div className="list text-center mt-10 border-t border-t-black">
        <h3 className="font-bold bg-yellow-300">Chat</h3>
        <div className="mt-10">
          <input
            type="text"
            value={message}
            placeholder="Message ..."
            className="w-42 h-10 border border-black text-center font-bold outline-none"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button onClick={sendMessage} className="h-10 bg-green-500">
            &#9658;
          </button>
        </div>

         <div id="messageList" >
            {messagesList.map((message, index) => (
               <div key={index} className="text-left">
               <span className="font-bold" style={username == message.username ? {color: "red"} : {color: "black"}}>{message.username}</span>: {message.message}
               </div>
            ))}
         </div>

      </div>
    </>
  );
}
