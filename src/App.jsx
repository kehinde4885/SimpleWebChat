import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { changeName, updateChats } from "./app/userSlice";

function intializeLocalStorage() {
  //localStorage.setItem("User1", "userChatss");
}

intializeLocalStorage();

function App() {
  const [isUserSet, changeUserSet] = useState(true);
  const userName = useSelector((state) => state.user.name);

  console.log(userName);
  console.log(isUserSet);

  return isUserSet ? <Chat /> : <OnBoard changeUserSet={changeUserSet} />;
}

function OnBoard({ changeUserSet }) {
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formDets = new FormData(e.target);
        const user = formDets.get("User");
        dispatch(changeName(user));
        changeUserSet(true);
      }}
      className="form">
      <p>Please Enter your Name</p>
      <input type="text" name="User" id="" />
      <button className="bg-black text-white">Submit</button>
    </form>
  );
}

function Chat() {
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.user.name);
  const chats = useSelector((state) => state.user.chats);

  console.log(chats)

  function sendChat() {
    
    const textBox = document.getElementById("chatText");
    
    const text = textBox.value;
    
    if (text.length !== 0) {
      console.log("Text sent");
      const newChats = chats.concat(text)
      dispatch(updateChats(newChats))
      localStorage.setItem(userName, JSON.stringify(newChats));
    }
  }

  return (
    <div className="relative h-screen w-[500px] max-w-[600px] bg-blue-800">
      <h1 className="">This is my First Chat App</h1>
      <div className="absolute bottom-0 w-full bg-black">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            sendChat();
          }}
          action="">
          <input id="chatText" placeholder="message" type="text" />
        </form>
      </div>
    </div>
  );
}

export default App;
