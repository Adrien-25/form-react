import React, { useCallback,useContext } from 'react';
import propTypes from 'prop-types';
import fond from '../logo.svg';
import axios from 'axios';
import { Context } from '../context';
import classnames from 'classnames';

function UserProfile(props) {
  const handleClick = useCallback(() => {
    axios.delete('https://jsonplaceholder.typicode.com/users/'+props.user.id);
    props.deleteUser(props.user.id)
  },[props])
  const { context } = useContext(Context)

  return (
    <div className={classnames('card bg-' + context.theme, { 'text-light': context.theme === 'dark' })}>
        <img src={fond} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{props.user.name}</h5>
            <p className="card-text mb-0">{props.user.username}</p>
            <p className="card-text">{props.user.email}</p>
            <div className="d-flex justify-content-end">
              <button className="btn btn-danger" onClick={handleClick}>
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
