import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDice, faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react";
import React from 'react'
function NavBar() {
    const [toggle, setToggle] = useState(false)

    const handleClick = () => {
        setToggle(!toggle)
    }

    return (
        <nav className="bg-neutral-900 sticky top-0">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between">
                    {/* Left Side of NavBar */}
                    <div className="flex space-x-2">
                        {/* Logo */}
                        <div>
                            <Link href="/" className="flex items-center font-sans font-bold text-2xl py-4 px-5 text-white hover:opacity-50">
                                <FontAwesomeIcon icon={faDice} className="w-10 h-10 mr-3"></FontAwesomeIcon>
                                <span>Games.Next</span>
                            </Link>
                        </div>

                        {/* Primary Nav */}
                        <div className="hidden md:flex items-center space-x-4 font-sans font-semibold text-2xl text-white">
                            <a href="/journal" className="py-4 hover:text-neutral-300">Journal</a>
                            <a href="/macros" className="py-4 hover:text-neutral-300">Macros</a>
                        </div>
                    </div>

                    {/* Secondary Nav */}
                    <div className="hidden md:flex items-center space space-x-2 px-5">
                        <AuthShowcase />
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden flex items-center text-white hover:opacity-50">
                        <button onClick={()=>handleClick()} className="mobile-menu-button">
                            {toggle ? 
                            <FontAwesomeIcon icon={faXmark} className="w-8 h-8 mr-3"></FontAwesomeIcon> 
                            : <FontAwesomeIcon icon={faBars} className="w-8 h-8 mr-3"></FontAwesomeIcon>
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {toggle && <div className="mobile-menu md:hidden">
                <a href="/journal" className="hover:bg-neutral-800 block px-4 py-4 text-white font-sans font-semibold">Sign Up</a>
                <AuthShowcase />
                <a href="/journal" className="hover:bg-neutral-800 block px-4 py-4 text-white font-sans font-semibold">Journal</a>
                <a href="/macros" className="hover:bg-neutral-800 block px-4 py-4 text-white font-sans font-semibold">Macros</a>
            </div>}
        </nav>
    )
}

export default NavBar;

const AuthShowcase: React.FC = () => {
    const { data: sessionData } = useSession();
  
    return (
        <button
          className="hover:bg-neutral-800 block px-4 py-4 text-white font-sans font-semibold"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
    );
  };