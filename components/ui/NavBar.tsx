'use client'
import useAuth from '@/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

const NavBar = () => {

  const { isAuthenticated, isAuthenticating, signOut } = useAuth()

  return (
    <nav className="navbar bg-base-300 px-12 py-4 shadow-xl  z-10  min-h-min">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href='/'>Immersive Twin</Link>
      </div>

      {isAuthenticated ? (

        <div className="flex-none">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image src="/profile.svg" alt={'profile'} width={50} height={50}/>
          </div>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow bg-base-100 rounded-md">
          <li>
            <Link href="/" onClick={() => signOut()}>
                Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>

    ): ( <span></span> )}

  </nav>
  )
}

export default NavBar