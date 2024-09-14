import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const messages = {
  1: [
    { id: 1, sender: 'Alice', text: 'Hello!' },
    { id: 2, sender: 'Me', text: 'Hi, how are you?' }
  ],
  2: [
    { id: 1, sender: 'Bob', text: 'Hey, got a minute?' },
    { id: 2, sender: 'Me', text: "Sure, what's up?" }
  ],
  3: [
    { id: 1, sender: 'Charlie', text: 'Are you coming to the party?' },
    { id: 2, sender: 'Me', text: 'I might be late.' }
  ]
};

const ChatWindow = ({ activeChat, toggleSidebar, isSidebarOpen }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log('Message sent:', message);
    setMessage('');
  };

  return (
    <div className={`flex-grow flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
      <div className="flex items-center justify-between p-4">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 focus:outline-none transition-colors duration-200"
        >
          {isSidebarOpen ? (
            <FontAwesomeIcon icon={faChevronLeft} />
          ) : (
            <FontAwesomeIcon icon={faChevronRight} />
          )}
        </button>
        <h1 className="text-lg font-semibold">
          {activeChat ? `Chat with ${activeChat.name}` : 'Select a contact to start chatting'}
        </h1>
        <div></div>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        {activeChat ? (
          <div className="flex flex-col h-full">
            <div className="flex-grow p-2 rounded-lg shadow-inner space-y-4">
              {messages[activeChat.id] ? (
                messages[activeChat.id].map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'Me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        msg.sender === 'Me' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                      }`}
                    >
                      <strong>{msg.sender === 'Me' ? 'You' : msg.sender}:</strong> {msg.text}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No messages yet.</div>
              )}
            </div>
            <div className="mt-4">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center border-gray-300"
              >
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
  );
};

export default ChatWindow;
