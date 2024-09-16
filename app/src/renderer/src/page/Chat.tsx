import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

function Chat() {
  const [activeChat, setActiveChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [message, setMessage] = useState({
    receiverId: '',
    text: '',
    sender: ''
  });
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const wsUrl = import.meta.env.VITE_API_WS_URL;


  const fetchData = async (endpoint, setData) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/${endpoint}`);
      setData(response.data);
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setCurrentUserId(decodedToken.id);
      } catch (error) {
        console.error('Failed to decode JWT token:', error);
      }
    } else {
      console.error('No JWT token found');
    }
  }, []);

  useEffect(() => {
    if (currentUserId) {
      fetchData('/massage/contact', (data) => {
        setContacts(data.contact.filter((contact) => contact.id !== currentUserId));
      });
    }
  }, [currentUserId]);

  useEffect(() => {
    if (activeChat && currentUserId) {
      fetchData(`massage/${currentUserId}/${activeChat.id}`, (data) => {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [activeChat.id]: data.messages
        }));
        setIsFirstLoad(true); 
      });
    }
  }, [activeChat, currentUserId]);

  useEffect(() => {
    ws.current = new WebSocket(wsUrl);

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'newMessage') {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [message.data.receiverId]: [
            ...(prevMessages[message.data.receiverId] || []),
            message.data
          ]
        }));
        setIsFirstLoad(true)
      }
    };

    ws.current.onopen = () => console.log('WebSocket connection established');
    ws.current.onerror = (error) => console.error('WebSocket error:', error);
    ws.current.onclose = () => console.log('WebSocket connection closed');

    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    if (activeChat) {
      if (isFirstLoad) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }
    }
  }, [messages, activeChat, isFirstLoad]);

  const handleChange = (e) => {
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const selectChat = (contact) => {
    setActiveChat(contact);
    setMessage((prev) => ({ ...prev, receiverId: contact.id }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!currentUserId) {
      console.error('No current user ID found');
      return;
    }

    try {
      await axios.post(`${apiBaseUrl}/massage`, {
        sender: currentUserId,
        receiverId: message.receiverId,
        text: message.text
      });

      const newMessage = {
        senderId: currentUserId,
        receiverId: message.receiverId,
        text: message.text
      };

      ws.current.send(JSON.stringify({
        type: 'newMessage',
        data: newMessage
      }));

      setMessage((prev) => ({ ...prev, text: '' }));
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div
        className={`bg-transparent backdrop-blur-lg fixed top-0 left-0 h-full bg-gray-900 text-white transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: '250px' }}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Contacts</h2>
        </div>
        <ul className="p-4">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <li
                key={contact.id}
                onClick={() => selectChat(contact)}
                className="p-2 cursor-pointer hover:bg-gray-800 rounded-md transition-colors duration-200"
              >
                {contact.name}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No contacts available</li>
          )}
        </ul>
      </div>

      {/* Chat Window */}
      <div className={`flex-grow flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 focus:outline-none transition-colors duration-200"
          >
            <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faChevronRight} />
          </button>
          <h1 className="text-lg font-semibold">
            {activeChat ? `Chat with ${activeChat.name}` : 'Select a contact to start chatting'}
          </h1>
        </div>

        <div className="flex-grow px-4 overflow-y-auto mb-5">
          {activeChat ? (
            <div className="flex flex-col h-full">
              <div className="flex-grow p-2 rounded-lg shadow-inner space-y-4">
                {(messages[activeChat.id] || []).map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-3 rounded-lg ${msg.senderId === currentUserId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    >
                      <strong>{msg.senderId === currentUserId }</strong> {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />  
              </div>
              <div className="">
                <form onSubmit={handleSendMessage} className="flex items-center   border-gray-300">
                  <input
                    type="text"
                    name="text"
                    placeholder="Type a message..."
                    value={message.text}
                    onChange={handleChange}
                    className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 text-zinc-700 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-300"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center text-gray-500">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
