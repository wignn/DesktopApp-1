import { useState } from 'react'

function Versions(): JSX.Element {

  return (
    <div className="absolute bottom-[20px] right-[20px] bg-black bg-opacity-70 text-white p-4 rounded-lg shadow-lg max-w-xs">
      <h2 className="text-lg font-bold mb-3">Version Information</h2>
      <ul className="space-y-2">
        <li className="text-base">          
        <span className="font-medium">wignn</span> - v1.1.1.1
        </li>

      </ul>
    </div>
  )
}

export default Versions
