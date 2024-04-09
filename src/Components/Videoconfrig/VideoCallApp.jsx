import React, { useState, useEffect, useRef } from 'react';

const generateRoomId = () => {
  const roomIdLength = 6;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let roomId = '';
  for (let i = 0; i < roomIdLength; i++) {
    roomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return roomId;
};

const JoinOrStartCall = ({ onJoin, onStart, roomId }) => {
  const [inputRoomId, setInputRoomId] = useState('');

  const handleJoinClick = () => {
    if (inputRoomId.trim() !== '') {
      onJoin(inputRoomId);
    }
  };

  const handleStartClick = () => {
    onStart();
  };

  return (
    <div className="bg-red-500 text-white p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Join or Start a Call</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={inputRoomId}
          onChange={(e) => setInputRoomId(e.target.value)}
          className="mr-2 p-2 rounded-md border border-white bg-transparent text-white"
        />
        <button onClick={handleJoinClick} className="px-4 py-2 bg-white text-red-500 rounded-md hover:bg-red-600 hover:text-white">
          Join Call
        </button>
      </div>
      <div>
        <button onClick={handleStartClick} className="px-4 py-2 bg-white text-red-500 rounded-md hover:bg-red-600 hover:text-white">
          Start New Call
        </button>
      </div>
      <p className="mt-4">Room ID: {roomId}</p>
    </div>
  );
};

const VideoCallApp = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [roomId, setRoomId] = useState(generateRoomId());
  const [showStartNewVideo, setShowStartNewVideo] = useState(false);
  const [showJoinVideo, setShowJoinVideo] = useState(true);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const screenVideoRef = useRef();
  const peerConnection = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const initLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    initLocalStream();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = new WebSocket('ws://localhost:8080');

    socketRef.current.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'offer') {
        await handleOffer(message.offer);
      } else if (message.type === 'answer') {
        await handleAnswer(message.answer);
      } else if (message.type === 'iceCandidate') {
        await handleIceCandidate(message.candidate);
      } else if (message.type === 'joinedCall') {
        showNotification('Someone joined the call!');
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const showNotification = (message) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(message);
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(message);
        }
      });
    }
  };

  const startScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      setScreenStream(stream);
      setIsScreenSharing(true);
    } catch (error) {
      console.error('Error accessing screen:', error);
    }
  };

  const stopScreenSharing = () => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
      setIsScreenSharing(false);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !isCameraEnabled;
      });
      setIsCameraEnabled(prevState => !prevState);
    }
  };

  const createPeerConnection = () => {
    const peer = new RTCPeerConnection();
    peer.ontrack = handleRemoteStream;
    peer.onicecandidate = handleIceCandidateEvent;
    peerConnection.current = peer;
  };

  const handleRemoteStream = (event) => {
    setRemoteStream(event.streams[0]);
    remoteVideoRef.current.srcObject = event.streams[0];
  };

  const handleIceCandidateEvent = (event) => {
    if (event.candidate) {
      // Send ICE candidate to the remote peer
      socketRef.current.send(JSON.stringify({
        type: 'iceCandidate',
        candidate: event.candidate
      }));
    }
  };

  const handleOffer = async (offer) => {
    try {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      // Send answer to the remote peer
      socketRef.current.send(JSON.stringify({
        type: 'answer',
        answer: peerConnection.current.localDescription
      }));
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswer = async (answer) => {
    try {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleIceCandidate = async (candidate) => {
    try {
      await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('Error handling ICE candidate:', error);
    }
  };

  const connectToPeer = (roomId) => {
    if (!peerConnection.current) {
      createPeerConnection();
    }

    if (roomId.trim() !== '') {
      setRoomId(roomId);

      // Send room ID to signaling server to find the remote peer
      socketRef.current.send(JSON.stringify({
        type: 'joinRoom',
        roomId: roomId
      }));
    }
  };

  const startCall = async () => {
    if (!peerConnection.current) {
      createPeerConnection();
    }

    localStream.getTracks().forEach(track => {
      peerConnection.current.addTrack(track, localStream);
    });

    if (screenStream) {
      screenStream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, screenStream);
      });
    }

    try {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      // Send offer to the remote peer
      socketRef.current.send(JSON.stringify({
        type: 'offer',
        offer: offer
      }));
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const handleStartNewVideoClick = () => {
    setShowStartNewVideo(true);
    setShowJoinVideo(false);
  };

  const handleJoinVideoClick = () => {
    setShowStartNewVideo(false);
    setShowJoinVideo(true);
  };

  return (
    <div className="container mx-auto p-8 bg-red-100">
      <div className="flex">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-semibold mb-4 text-red-700">Your Camera</h2>
          <video ref={localVideoRef} autoPlay className="mb-2" />
          <button onClick={toggleCamera} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            {isCameraEnabled ? 'Disable Camera' : 'Enable Camera'}
          </button>
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-semibold mb-4 text-red-700">Remote Video</h2>
          {remoteStream ? (
            <video ref={remoteVideoRef} autoPlay className="mb-2" />
          ) : (
            <div className="bg-gray-200 p-4 rounded-md">
              <p className="text-red-700">No remote video available</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        {showStartNewVideo && (
          <JoinOrStartCall onJoin={connectToPeer} onStart={startCall} roomId={roomId} />
        )}
        {showJoinVideo && (
          <button onClick={handleStartNewVideoClick} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-4">
            Start New Video
          </button>
        )}
        {showJoinVideo && (
          <button onClick={handleJoinVideoClick} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Join Video
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCallApp;
