import React from 'react';
import Sidebar from '../components/ChatSideBar';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';

const Chat: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-transparent">
        <ChatWindow />
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
