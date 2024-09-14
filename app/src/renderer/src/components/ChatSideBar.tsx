const contacts = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const Sidebar = ({ isOpen, selectChat }) => {
  return (
    <div
      className={`bg-transparent backdrop-blur-lg fixed top-0 left-0 h-full bg-gray-900 text-white transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '250px' }}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Contacts</h2>
      </div>
      <ul className="p-4">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => selectChat(contact)}
            className="p-2 cursor-pointer hover:bg-gray-800 rounded-md transition-colors duration-200"
          >
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
