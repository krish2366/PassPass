import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white flex justify-around items-center px-4 h-14'>
        <div className='logo font-bold '>
            <span className='text-green-400'>&lt;</span>
            Pass
            <span className='text-green-400'>Pass /&gt;</span>
        </div>
      <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
