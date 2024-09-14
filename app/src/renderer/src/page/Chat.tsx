import  { useState } from 'react';
import Sidebar from '../components/ChatSideBar';
import ChatWindow from '../components/ChatWindow';

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const selectChat = (contact) => {
    setActiveChat(contact);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex">
      <Sidebar isOpen={isSidebarOpen} selectChat={selectChat} />
      <ChatWindow
        activeChat={activeChat}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
};

export default Chat;
