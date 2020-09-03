import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  console.log(users);

  useEffect(() => {
    axios.get('http://localhost:4000/users')
      .then(res => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch(error => console.log(error));
  }, [])

  const getUserPosts = id => {
    axios.get(`http://localhost:4000/users/${id}/posts`)
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch(error => console.log(error));
    }

  return (
    <div className="App">
      {users.map(user => {
        return(
          <div className='user-list' onClick={() => getUserPosts(user.id)}>{user.name}</div>
        );
      })}
      {posts.map(post => {
        return(
          <div className='user-list'>{post.text}</div>
        );
      })}
    </div>
  );
}

export default App;
