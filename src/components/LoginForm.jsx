import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './LoginForm.css';

export default function LoginForm(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {loginMock} = useContext(AuthContext);
  const nav = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    const ok = loginMock({email,password});
    if(ok) nav('/dashboard');
    else alert('Login failed');
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Sign in</button>
        <p style={{fontSize:13,marginTop:8}}>Use <strong>admin@demo</strong> to sign in as admin (mock)</p>
      </form>
    </div>
  )
}