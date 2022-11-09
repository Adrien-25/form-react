import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import fond from '../logo.svg';
import axios from 'axios';

function UserProfile(props) {
  const handleClick = useCallback(() => {
    axios.delete('https://jsonplaceholder.typicode.com/users/'+props.user.id);
    props.deleteUser(props.user.id)
  },[props])
  return (
    <div className='card'>
        <img src={fond} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{props.user.name}</h5>
            <p className="card-text">Nam sodales pulvinar malesuada. 
            </p>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleClick}>
                <i className=' bi bi-trash3'></i>
              </button>
            </div>
        </div>
    </div>
  )
}

UserProfile.propTypes = {
    user: propTypes.object.isRequired, 
    deleteUser : propTypes.func.isRequired

};

export default UserProfile;
