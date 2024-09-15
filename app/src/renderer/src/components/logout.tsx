import React from 'react'

const Logout: React.FC = () => {
  const click = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  return (
    <button
      onClick={click}
      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out"
    >
      Logout
    </button>
  )
}

export default Logout
