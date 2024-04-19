import { useSocket } from "../Context/SocketProvider";
import { useState, useEffect } from "react";

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = useSocket();

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('chat message', message);
            // Add only the sent message with sender information
            setMessages(prevMessages => [...prevMessages, { text: message, sender: 'me' }]);
            setMessage('');
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on('chat message', (receivedMessage) => {
                setMessages(prevMessages => [...prevMessages, { text: receivedMessage, sender: 'others' }]);
            });
        }
        // Clean up socket event listener on unmount
        return () => {
            if (socket) {
                socket.off('chat message');
            }
        };
    }, [socket]);

    return (
        <div className="w-auto h-auto bg-red-300 rounded-lg p-[2vw]">
            <ul className="w-auto h-[8vh] overflow-auto" id="chat">
                {messages.map((msg, index) => (
                    <li key={index} className={`mb-[1vh] p-[3px] w-auto rounded-md overflow-x text-gray-200 text-overflow ${msg.sender === 'me' ? 'bg-red-400' : 'bg-white text-gray-800'}`}>
                        {msg.sender === 'me' ? 'You: ' : 'Others: '}{msg.text}
                    </li>
                ))}
            </ul>
            <div className="flex">
                <input type="text" value={message} onChange={handleMessageChange} className="h-[4vh] flex-1 mt-[1vh] rounded-md py-2 px-4 mr-2 bg-white text-black focus:outline-none" />
                <button onClick={sendMessage} className="flex w-[4vw] h-[4vh] mt-[1vh] bg-white text-red-500 rounded-md hover:bg-red-400 hover:text-white transition duration-300 text-center justify-center text-[8px] md:text-md">Send</button>
            </div>
        </div>
    );
};

export default Chat;
