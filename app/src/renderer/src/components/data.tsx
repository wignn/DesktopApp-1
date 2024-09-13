import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faDatabase, faInfoCircle, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/main.css';

function PathWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const goToPath = (path) => {
    navigate(path);
  };

  return (
    <div
      className={`fixed right-[20px] top-1/3 bg-transparent shadow-none rounded-full p-2 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-16 h-16 scale-100 opacity-100' : 'w-16 h-16 scale-75 opacity-75'
      } flex flex-col items-center justify-start`}
    >
      {/* Icon Toggle */}
      <div
        className="text-xl text-gray-700 cursor-pointer flex items-center justify-center bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 transition-transform duration-150 ease-in-out transform active:scale-95"
        onClick={toggleWidget}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>

      {/* Menu Content */}
      <div className={`mt-4 flex flex-col items-center space-y-2 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {/* Home Icon */}
        <div
          className="text-xl text-blue-500 cursor-pointer bg-transparent p-2 rounded-full hover:bg-blue-100 transition-transform duration-150 ease-in-out transform active:scale-95"
          onClick={() => goToPath('/')}
          aria-label="Home"
        >
          <FontAwesomeIcon icon={faHome} />
        </div>


        <div className="flex flex-col items-center space-y-2">
          {[{ icon: faDatabase, color: 'green', path: '/data', label: 'Data' },
            { icon: faInfoCircle, color: 'purple', path: '/post', label: 'Info' },
            { icon: faUser, color: 'orange', path: '/login', label: 'Profile' },
            { icon: faCog, color: 'red', path: '/Register', label: 'Settings' }
          ].map(({ icon, color, path, label }) => (
            <div
              key={path}
              className={`text-xl text-${color}-500 cursor-pointer bg-transparent p-2 rounded-full hover:bg-${color}-100 transition-transform duration-150 ease-in-out transform active:scale-95`}
              onClick={() => goToPath(path)}
              aria-label={label}
            >
              <FontAwesomeIcon icon={icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PathWidget;
