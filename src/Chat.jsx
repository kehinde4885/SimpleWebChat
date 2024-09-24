import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChats } from "./app/userSlice";

function Chat() {
  return (
    <div className="flex h-[80vh] max-h-[600px] w-[500px] max-w-[600px] flex-col rounded-lg drop-shadow-2xl">
      <ChatsHeader />
      <Chats />
      <ChatBtns />
    </div>
  );
}

function ChatsHeader() {
  const userName = useSelector((state) => state.user.name);

  return (
    <div className="border-b border-solid bg-white py-2">
      <p className="text-center text-xs">{`Group Chat (${userName})`}</p>
    </div>
  );
}

function Chats() {
  const serverChats = useSelector((state) => state.user.serverChats);

  const userName = useSelector((state) => state.user.name);

  let currentName;



  return (
    <div className="grow space-y-4 overflow-auto bg-[rgba(250,250,250)] px-6 py-6">
      {serverChats.map((chat, index) => {
        const msg = Object.values(chat).shift();
        const sentBy = Object.keys(chat).shift();

        if (sentBy === userName) {
          currentName = sentBy;
        }

        return sentBy === userName ? (
          //if the message from server was sent by Current user
          <p className="chatMsg myChat" key={index}>
            {msg}
          </p>
        ) : (
          //if the message from server was sent by Other users
          renderChatBox(sentBy, msg, index)
        );
      })}
    </div>
  );

  function renderChatBox(sentBy, msg, index) {
    if (currentName === undefined || currentName !== sentBy) {
      currentName = sentBy;
      return (
        <div key={index}>
          <p className="text-[8px]">{sentBy.toUpperCase()}</p>
          <p className="chatMsg otherChats">{msg}</p>
        </div>
      );
    } else if (currentName === sentBy) {
      return (
        <p className="chatMsg otherChats" key={index}>
          {msg}
        </p>
      );
    }
    return;
  }
}

function ChatBtns() {
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-white px-6 py-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          sendChat(userName);
        }}
        action=""
        className="flex items-center gap-8">
        <input
          className="textBox grow px-1"
          id="chatText"
          placeholder="Your message..."
          type="text"
        />
        <button className="rounded bg-green-600 px-2 py-1 text-sm text-white">
          Send
        </button>
      </form>
    </div>
  );

  function sendChat(userName) {
    const textBox = document.getElementById("chatText");

    const text = textBox.value;

    if (text.length !== 0) {
      const serverChats = JSON.parse(localStorage.getItem("serverMessages"));
      const newChatObj = { [userName]: text };

      const newServerChats = serverChats.concat(newChatObj);

      //update local Storage
      localStorage.setItem("serverMessages", JSON.stringify(newServerChats));
      //update Redux Store
      dispatch(updateChats(newServerChats));

      textBox.value = "";
    }
  }
}

export default Chat;
