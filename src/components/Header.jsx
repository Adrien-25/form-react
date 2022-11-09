import React, { useState} from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';



function Header(props) {
    // const [user, setUser ] = useState('');
    
    const login = props.user
    ? <span>Bienvenue {props.user} !</span>
    : <div className=''> 
    <Link to="/login" className="text-decoration-underline">Connectez-vous</Link>
    <br />ou&nbsp;<Link to="/register" className="text-decoration-underline">Inscrivez-vous</Link>
    </div>
    
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand mr-5" href="#">
                        <img src={logo} alt="" width="30" height="24" className="d-inline-block align-text-top mt-1"/>
                    </div>
                    <ul className='navbar-nav me-auto'>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Liste</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/counter" className="nav-link">Counter</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/roles" className="nav-link">Rôles</Link>
                        </li>
                    </ul>
                    <div className='navbar-text'>{login}</div>
                </div>
            </nav>
        </div>
    );
}

Header.propTypes = {
    user: PropTypes.string,
    setUser: PropTypes.func
}

export default Header;