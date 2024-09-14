import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed top-0 left-0 h-full transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-gray-800 text-white w-64`}>
      <button
        className="absolute top-4 right-4 text-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '×' : '≡'}
      </button>
      <div className="p-4">
        <h2 className="text-lg font-bold">Chat Contacts</h2>
        <ul>
          {/* List contacts here */}
          <li className="py-2">Contact 1</li>
          <li className="py-2">Contact 2</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
