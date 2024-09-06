import {React, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {TrySearchButton} from './TrySearchButton'
import './Navbar.css'
import Login from './login/Login'
import MobileApp from './mobileApp/MobileApp'

import { Button, ButtonToolbar } from 'rsuite';

function Navbar() {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if(window.innerWidth <= 960){
      setButton(false)
    } else{
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener('resize', showButton)
  
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              ARDENT
          </Link>
            <div className='menu-icon' onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fa-solid fa-bars'} />
            </div>
            <ul className= {click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/workspace' className='nav-links' onClick={closeMobileMenu}>
                  Try it Out
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                  About
                </Link>
              </li>
              <li className='nav-item'>
                <div className='nav-links'>
                  <Login/>
                </div>                
              </li> 
              {/* <li className='nav-item'>
                <div className='nav-links'>
                  <MobileApp/>
                </div>                
              </li>*/}            
            </ul>
            {button && <TrySearchButton buttonStyle='btn--outline'>Get the App!</TrySearchButton>}
        </div>
      </nav>
    </>
  )
}

export default Navbar