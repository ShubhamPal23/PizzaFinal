import React, { useContext, useEffect, useState } from 'react';
import "./NavBar.css";
import { Link } from 'react-router-dom';
import TotalContext from '../../context/TotalContext';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const { quantity } = useContext(TotalContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // Clear user from localStorage and state, then navigate to home
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser && loggedUser.username) {
      setUser(loggedUser);
    }
  }, []);

  return (
    <nav className="container-1">
      <div className="inner-container">
        <ul>
          <li><Link id="nav-title" to="/" >PizzaX</Link></li>
          <div className="bod">
            <li><Link id="lin" to="/menu">Menu</Link></li>

            {user ? (
              <>
                <Link style={{marginRight:"370px"}} id='lin' to="/addpizza">Add Pizza</Link>
                <span style={{fontSize:"24px",color:"rgb(37, 147, 187)"}}>Welcome, {user.username}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </>
            ) : (
              <>
                <button onClick={handleRegister} className="logout-btn">Register</button>
                <button onClick={handleLogin} className="logout-btn">Login</button>
              </>
            )}

            <li>
              <Link id="lin" to="/cart">
                <i className="fa badge" style={{ fontSize: "24px" }} value={quantity}>&#xf07a;</i>
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};
