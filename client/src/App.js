import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, useParams } from 'react-router-dom';
import Posts from './components/Posts';
import Users from './components/Users';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => console.log(error));
  }, [])

  return (
    <div className="App">
      <Link to='/'>Users List</Link>
      <Route exact path='/'>
        <Users users={users}/>
      </Route>
      <Route exact path='/post/:id'>
        <Posts />
      </Route>
    </div>
  );
}

export default App;
