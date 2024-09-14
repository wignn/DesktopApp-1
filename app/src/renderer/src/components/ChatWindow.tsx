import React from 'react';

const ChatWindow: React.FC = () => {
  return (
    <div className="flex-1 p-4 bg-gray-100">
      <h2 className="text-xl font-bold">Chat</h2>
      <div className="mt-4">
        {/* Chat messages will be displayed here */}
      </div>
    </div>
  );
};

export default ChatWindow;
