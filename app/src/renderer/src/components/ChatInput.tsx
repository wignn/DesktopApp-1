import React, { useState } from 'react';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Handle sending message
    setMessage('');
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 rounded"
        placeholder="Type your message..."
      />
      <button
        onClick={handleSend}
        className="mt-2 bg-blue-500 text-white p-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
