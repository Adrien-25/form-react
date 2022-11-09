import React, { useCallback, useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile.jsx';
import {useRef} from 'react';
import axios from 'axios';

function UserList() {    
    // Barre de recherche
    const [criteria, setCriteria] = useState('') 
    const handleSearch = useCallback((event) => {
        setCriteria(event.target.value);
    },[])

    // API utilisateurs
    const[users, setUsers] = useState([])
    useEffect(() => {
        // version Fetch
        // fetch('https://jsonplaceholder.typicode.com/users')
        // .then((res) => res.json())
        // .then((result) => setUsers(result))

        // version Axios
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(result => setUsers(result.data))
    }, [])
    const inputRef = useRef(null);
    const [filteredUsers, setFilteredUsers] = useState([]) 
    //const [newsUsers, setNewUsers] = useState([]) 

    // Ajout d'un utilisateur
    const handleClick = useCallback(() => {
        let userInfo = {
            id: (users.length+1),
            name: inputRef.current.value,
            username: 'non renseigné'
        }
        users.push(userInfo) 
        setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(criteria.toLowerCase())))
    },[users,criteria])

    useEffect(() =>{
        setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(criteria.toLowerCase())))
    },[criteria,users])

    const deleteUser = useCallback((userId) => {
        setUsers(users.filter(user => user.id !== userId))
    },[users])
    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            <div className='d-flex col-12 gap-3 flex-column flex-sm-row'>
                <div className='w-100'>
                    <input type='text' className='form-control' placeholder='Recherche' onChange={handleSearch}/>
                </div>
                <div className='w-100 gap-1 d-flex'>
                    <input ref={inputRef} type='text' className='form-control' placeholder='Nouvel utilisateur'/>
                    {/* <button onClick={() => addUser()} className="btn btn-primary me-1 px-5 px-sm-2">Créer</button> */}
                    <button className="btn btn-primary me-1 px-5 px-sm-2" onClick={handleClick}>Créer</button>

                </div>
            </div>

            <div className='container'>
                <div className='row mt-3'>
                    {filteredUsers.map((user, i) => (
                        <div key={i} className="col-lg-3 col-md-4 col-xs-6 mb-3">
                            <UserProfile user={user} deleteUser={deleteUser} />
                        </div>
                        ))}
                    <div className="col-lg-3 col-md-4 col-xs-6 mb-3 d-flex justify-content-center align-items-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserList;