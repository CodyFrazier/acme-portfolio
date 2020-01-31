import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Notes from './Notes.js';
import Vacations from './Vacations.js';
import FollowedCompanies from './FollowedCompanies.js';

const API = 'https://acme-users-api-rev.herokuapp.com/api';

const fetchUser = async () => {
	const storage = window.localStorage;
	const userId = storage.getItem('userId');
	if(userId){
		try{
			return (await axios.get(`${ API }/users/detail/${ userId }`)).data;
		}catch(ex){
			storage.removeItem('userId');
			return fetchUser();
		}
	}
	const user = (await axios.get(`${ API }/users/random`)).data;
	storage.setItem('userId', user.id);
	return user;
};


function App() {
	
	const [user, setUser] = useState({});
	const [notes, setNotes] = useState([]);
	const [vacations, setVacations] = useState([]);
	const [followComps, setFollowComps] = useState([]);
	
	
	const getNewUser = async () => {
		const user = await fetchUser();
		setUser(user);
	};
	
	const removeUser = () => {
		window.localStorage.removeItem('userId');
		
	};
	
	useEffect(() => {
		getNewUser();
	}, []);
	
	useEffect(() => {
		if(user.id){
			axios.get(`${ API }/users/${ user.id }/notes`)
			.then(resp => setNotes(resp.data));
			axios.get(`${ API }/users/${ user.id }/vacations`)
			.then(resp => setVacations(resp.data));
			axios.get(`${ API }/users/${ user.id }/followingCompanies`)
			.then(resp => setFollowComps(resp.data));
		}
	}, [user.id]);
	
	return (
		<div className="App">
			<div className = 'userBox'>
				<img id = 'avatar' alt = '' src = { user.avatar }/>
				<div>{ `Welcome ${ user.email }` }</div>
				<input type = 'button' value = 'Change User' onClick = { () => { removeUser(); getNewUser() }}/>
				
			</div>
			<div className = 'stats'>
				<Notes notes = { notes }/>
				<Vacations vacations = { vacations }/>
				<FollowedCompanies followComps = { followComps }/>
			</div>
		</div>
	);
}

export default App;
