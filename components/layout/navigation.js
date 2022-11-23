import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const Navigation = () => {

    const { data: session, status } = useSession();

    const [isActive, setIsActive] = useState(false);
    function toggleHamburger()  {
        setIsActive(current => !current);
    }

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a className="navbar-item" href="/">
            <img src="/images/nmdpra-fav.jpg" alt='Logo' width="auto" height="auto" />
            </a>

            <a role="button" className={ isActive ? "navbar-burger is-active" : "navbar-burger" } aria-label="menu" 
            aria-expanded="false" data-target="navbarBasicExample" onClick={toggleHamburger}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" className={ isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
            <div className="navbar-start">
            <a className="navbar-item">
                Action 1
            </a>

            {session &&(<a className="navbar-item">
                Action 2
            </a>)}

            </div>

            <div className="navbar-end">
            <div className="navbar-item">
                <div className="buttons">
                    <Link legacyBehavior href="/auth/register">
                        <a className="button is-primary">
                            <strong>Register</strong>
                        </a>
                    </Link>
                    <Link href='/auth/login'>
                        <a className="button is-light">
                            Log in
                        </a>    
                    </Link>
                </div>
            </div>
            {session &&(<div className="navbar-item has-dropdown is-hoverable">
                
                <a className="navbar-link">
                    {session.user.first_name +' '+session.user.last_name}
                </a>

                <div className="navbar-dropdown is-right">
                    <a className="navbar-item">
                        Edit Profile
                    </a>
                    <a className="navbar-item">
                        Messages
                    </a>
                    <hr className="navbar-divider"/>
                    <a className="navbar-item">
                        Logout
                    </a>
                </div>
            </div>)}
            </div>
        </div>
    </nav>
  )
}

export default Navigation