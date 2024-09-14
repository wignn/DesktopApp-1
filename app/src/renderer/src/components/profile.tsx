// import { useState } from 'react';
// import img from '../assets/11233.png';


// const ProfileButton = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClick = () => {
//     setIsOpen(!isOpen);
//   };


//   return (
//     <div className="fixed top-4 right-4 z-50">
//       <div
//         onClick={handleClick}
//         className="p-2 rounded-full w-16 shadow-lg cursor-pointer hover:bg-gray-300 transition-colors duration-300 ease-in-out"
//       >
//         <img
//           src={img}
//           alt="Profile"
//           className="w-12 h-12 rounded-full object-cover"
//         />
//       </div>

//       <div
//         className={`absolute right-0 mt-2 bg-white shadow-xl rounded-lg p-4 transition-transform duration-500 ease-in-out transform ${
//           isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
//         }`}
//         style={{ top: 'calc(100% + 0.5rem)' }}
//       >
//         {isOpen && (
//           <div className="flex flex-col">
//             <div className="flex items-center space-x-3 mb-3">
//               <img
//                 src={img}
//                 alt="Profile"
//                 className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 shadow-md"
//               />
//               <div>
//                 <h4 className="font-semibold text-gray-800 text-sm">
//                   {user?.name}
//                 </h4>
//                 <p className="text-xs text-gray-600">
//                   {user?.email}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileButton;
