import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
        <div>
            <img className='object-scale-down h-40 w-full' src='logo.png'/>
        </div>
        <div>
            <Button>Sign In</Button>
        </div>
    </div>
  )
}

export default Header