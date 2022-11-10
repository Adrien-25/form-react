import React from 'react';
import { useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import Counter from './pages/Counter';
import Header from './components/Header';
import UserList from './pages/UserList';
import Login from './pages/Login';
import './App.css';
import propTypes from 'prop-types';
import Roles from './pages/Roles'
import Register from './pages/Register2';


function App() {
  const [user, setUser] = useState('');
  
  return (
    <div className=''>
      <Header user={user} />
      <div className='p-3'>
          <Routes>
            <Route path="/" element={<UserList />}/>
            <Route path="/counter" element={<Counter />}/>
            <Route path="/login" element={<Login setUser={setUser} />}/>
            <Route path="/roles" element={<Roles />}/>
            <Route path="/register" element={<Register setUser={setUser} />}/>
          </Routes>
      </div>
    </div>
  );
}

App.propTypes = {
  user: propTypes.string,
};

export default App;
