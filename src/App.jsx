// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

//Packages
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Components
import OnBoard from "./Onboard";
import Chat from "./Chat";

//Styles
import "./App.css";
import { updateChats } from "./app/userSlice";

function initLocalServer() {
  console.log("local Server Initialised");
  const serverLoadMsg = [];
  localStorage.getItem("serverMessages")
    ? ""
    : localStorage.setItem("serverMessages", JSON.stringify(serverLoadMsg));
}

initLocalServer();

function App() {
  const dispatch = useDispatch();
  const [isUserSet, changeIsUserSet] = useState(false);
  const userName = useSelector((state) => state.user.name);
  const [toggle, isToggle] = useState(true);

  useEffect(() => {
    console.log("App use Effect Running");
    dispatch(updateChats(JSON.parse(localStorage.getItem("serverMessages"))));
  }, [toggle]);


  window.addEventListener("storage", () => {
    console.log("Storage Updated")
    isToggle(!toggle);
  });
  

  console.log("Current User is", userName);
  console.log("Has a user been Selected = ", isUserSet);

  return isUserSet ? <Chat /> : <OnBoard changeIsUserSet={changeIsUserSet} />;
}

export default App;
