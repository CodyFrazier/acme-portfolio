import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const API = 'https://acme-users-api-rev.herokuapp.com/api';

const fetchUser = async () => {
	const storage = window.localStorage;
	const userId = storage.getItem('userId');
	if(userId){
		try{
			return (await axios.get(`${ API }/users/detail${ userId }`)).data;
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
	
	console.log(user);
	return (
		<div className="App">
			<div className = 'userBox'>
				<img id = 'avatar' alt = '' src = { user.avatar }/>
				<div>{ `Welcome ${ user.email }` }</div>
				<input type = 'button' value = 'Change User' onClick = { () => { removeUser(); getNewUser() }}/>
				
			</div>
		</div>
	);
}

export default App;
