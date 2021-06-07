import React from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import navImage from '../assets/img/img2.svg';
import InputCheck from './Controls/InputCheck';

const Nav = ({darkTheme, toggleTheme, theme}) => {
  
    return (
        <nav style={theme} className="navigation">
            <div className="logo__container">
                <NavLink to="/"><img src={navImage} alt="navbar icon"/></NavLink>
            </div>
            <div className="menu__container">
                <div className="menu">
                    <InputCheck handleInputChange={toggleTheme} value={darkTheme} />
                    <NavLink to="/home"  activeClassName="active__menu">Home</NavLink>
                    <NavLink to="/polls"  activeClassName="active__menu">Polls</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Nav;