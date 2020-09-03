import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Posts() {

  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  
  const history = useHistory();
  const routeToHome = () => {
    history.push('/');
  }

  useEffect(() => {
    axios.get(`http://localhost:4000/users/${id}/posts`)
    .then(res => {
      setPosts(res.data);
    })
    .catch(error => console.log(error));
  }, [])

  return (
    <div className='posts'>
      <ul className='plist'>
        {posts.map(post => {
          return(
            <li className='plist-item'>{post.text}</li>
          );
        })}
      </ul>
      <div className='button-container'>
        <button className='back' onClick={routeToHome}>Back</button>
      </div>
    </div>
  );
}
