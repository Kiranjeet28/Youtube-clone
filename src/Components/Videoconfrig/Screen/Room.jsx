import React, { useEffect, useCallback, useState } from "react";
import { useSocket } from "../Context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../Services/Peer";
import { NavLink } from "react-router-dom";
import Chat from "./Chat"
import WatchVideo from"./WatchVideo" 


const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [status, setStatus] = useState("NO one in ROOM");
  const [stream,setStream] = useState(true);

  const handleUserJoined = useCallback(({ email, id }) => {
    setRemoteSocketId(id);
    setStatus(` ${email} joined room`);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    setStream(false);
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);



  const LeaveTheRoom = useCallback(async () => {
    try {
      // Stop all streams
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
   

      // Leave the room
      socket.emit("room:leave");
      setStatus("SomeOne Leave the Room ")
      // Reset states
      setMyStream(null);
      setRemoteStream(null);
      setRemoteSocketId(null);
      setStatus("NO one in ROOM");
    } catch (error) {
      console.error("Error leaving the room:", error);
    }
  }, [myStream, socket]);

  // Ensure the useEffect cleanup hook is called only on component unmount
  useEffect(() => {
    return () => {
      LeaveTheRoom();
    };
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="flex flex-col  justify-center h-auto mt-14 items-center bg-gray-200 w-full top ">
     
      <div className=" w-auto  flex flex-col justify-center items-center p-2 bg-white rounded shadow-md ">
        <h1 className="text-lg font-bold text-gray-800 ">Room </h1>
        <h4 className="text-gray-600 mb-4">
          {myStream == null && status}
        </h4>
        {stream && myStream && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
            onClick={sendStreams}
          >
            Send Stream
          </button >
        )}
        {remoteSocketId && myStream == null && (
          <button
            className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
            onClick={handleCallUser}
          >
            CALL
          </button>
        )}
      </div>

      <div className="w-full flex flex-row justify-around">
        {myStream && (
          <div className="flex flex-col items-center  rounded shadow-md  m-[2vh] bg-red-300 p-[2vh]">
            <h1 className="text-sm font-semibold text-gray-800 mb-1">
              Me : 
            </h1>
            <ReactPlayer playing muted height="30vh" width="30vh" url={myStream} />
          </div>
        )}

        {remoteStream && (
          <div className="flex flex-col items-center rounded shadow-md m-[2vh] bg-red-300 p-[2vh]">
            <h1 className="text-sm font-semibold text-gray-800 mb-2">
              You:
            </h1>
            <ReactPlayer playing muted height="30vh" width="30vh" url={remoteStream} />
          </div>
        )}
    </div>

    {myStream && (
        <div className="w-full flex flex-row justify-around ">
          <div>
            <WatchVideo/>
          </div>
           <div >
              <Chat/>
          </div>
       </div>
    )
  }


      <div className="m-0">
        <NavLink to='/Lobby'>
         
            <button
              className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={LeaveTheRoom}
            >
              Leave
            </button>
          
        </NavLink>
      </div>
    </div>
  );
};

export default Room;
// add the functionally where if someone leave the room show the a message that $email is leave the room 