import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faHome,
  faDatabase,
  faInfoCircle,
  faUser,
  faCog,faChartBar, 
} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/main.css';

function PathWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const goToPath = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className={`right-[20px] top-1/3 bg-transparent shadow-none rounded-full absolute p-2 transition-all duration-300 ease-in-out z-50 ${
        isOpen ? 'w-16 h-16 scale-100 opacity-100' : 'w-16 h-16 scale-75 opacity-75'
      } flex flex-col items-center justify-start`}
    >
      <div
        className="text-xl text-gray-700 cursor-pointer flex items-center justify-center bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 transition-transform duration-150 ease-in-out transform active:scale-95"
        onClick={toggleWidget}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>

      {/* Icon container */}
      <div
        className={`mt-4 flex flex-col items-center space-y-4 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Home icon */}
        <div
          className="relative group"
          onMouseEnter={() => setHoveredIcon('Home')}
          onMouseLeave={() => setHoveredIcon(null)}
          onClick={() => goToPath('/')}
        >
          <div
            className="text-xl text-blue-500 cursor-pointer bg-transparent p-2 rounded-full hover:bg-blue-100 transition-transform duration-150 ease-in-out transform active:scale-95"
            aria-label="Home"
          >
            <FontAwesomeIcon icon={faHome} />
          </div>
          {hoveredIcon === 'Home' && (
            <span className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 py-1 rounded-lg transition-all duration-300">
              Home
            </span>
          )}
        </div>

        {/* Other icons */}
        <div className="flex flex-col items-center space-y-4">
          {[
            { icon: faDatabase, color: 'green', path: '/data', label: 'Data' },
            { icon: faChartBar, color: 'green', path: '/chat', label: 'chat' },
            { icon: faUser, color: 'blue', path: '/login', label: 'Profile' },
            { icon: faCog, color: 'red', path: '/settings', label: 'Settings' },
          ].map(({ icon, color, path, label }) => (
            <div
              key={path}
              className="relative group"
              onMouseEnter={() => setHoveredIcon(label)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => goToPath(path)}
            >
              <div
                className={`text-xl text-${color}-500 cursor-pointer bg-transparent p-2 rounded-full hover:bg-${color}-100 transition-transform duration-150 ease-in-out transform active:scale-95`}
                aria-label={label}
              >
                <FontAwesomeIcon icon={icon} />
              </div>
              {hoveredIcon === label && (
                <span
                  className={`absolute right-12 top-1/2 transform -translate-y-1/2 bg-${color}-500 text-white px-2 py-1 rounded-lg transition-all duration-300`}
                >
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PathWidget;
