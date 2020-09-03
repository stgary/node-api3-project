import React from 'react';
import { Link } from 'react-router-dom';

export default function Users({ users, getUserPosts }) {
    return(
        <div className='users-container'>
        <ul className='list'>
          {users.map(user => {
            return(
              <Link to={`/post/${user.id}`}>
                <li className='list-item'>{user.name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
}