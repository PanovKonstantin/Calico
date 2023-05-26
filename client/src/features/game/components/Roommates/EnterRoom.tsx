import React from "react";
import connectToRoom from "../../api/connectToRoom";

const EnterRoom = () => {
  const [room, setRoom] = React.useState("");
  const onEnter = () => {
    connectToRoom(room);
    setRoom("");
  };
  return (
    <>
      <input
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={onEnter}>Enter room</button>
    </>
  );
};

export default EnterRoom;
