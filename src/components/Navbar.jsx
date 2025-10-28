import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export default function Navbar(){
  const {user, logout} = useContext(AuthContext);
  const nav = useNavigate();
  return (
    <nav>
      <h1>Agrisense</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/map">Map</Link></li>
        <li><Link to="/disease">Disease</Link></li>
      </ul>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        {user ? (
          <>
            <span style={{fontSize:13}}>{user.email}</span>
            <button onClick={()=>{logout(); nav('/login')}}>Logout</button>
          </>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
      </div>
    </nav>
  )
}
