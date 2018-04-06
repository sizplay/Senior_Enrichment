import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="navbar navbar-inverse">
      <div className='container-fluid'>
        <ul className='nav navbar-nav'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
        </ul>
        <ul className='nav navbar-nav'>
          <li>
            <NavLink to="/students" activeClassName="active">Student</NavLink>
          </li>
          <li>
            <NavLink to="/campuses" activeClassName="active">Campus</NavLink>
          </li>
        </ul>

      </div>
    </div>
  );
}

export default Nav;


