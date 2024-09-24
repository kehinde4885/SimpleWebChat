import { useDispatch } from "react-redux";
import { changeName } from "./app/userSlice";

function OnBoard({ changeIsUserSet }) {
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formDets = new FormData(e.target);
        const user = formDets.get("User");
        dispatch(changeName(user));
        changeIsUserSet(true);
      }}
      className="form">
      <p>Enter your Name</p>
      <input className="onboardInput" type="text" name="User" id="" />
      <button className="rounded px-2 py-1 bg-black text-white">Proceed</button>
    </form>
  );
}

export default OnBoard