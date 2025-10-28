import React, {useContext} from 'react';
import { AuthContext } from '../auth/AuthContext';

export default function Profile(){
  const {user} = useContext(AuthContext);
  return (
    <div className="container">
      <h2>Profile</h2>
      <div className="card">
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
    </div>
  )
}