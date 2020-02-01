import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Notes from './Notes.js';
import Vacations from './Vacations.js';
import FollowedCompanies from './FollowedCompanies.js';
import NotesPage from './NotesPage.js';
import VacationsPage from './VacationsPage.js';
import FollowedCompaniesPage from './FollowedCompaniesPage.js';
import qs from 'qs';

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
	
	const getHash = () => {
		return window.location.hash.slice(1);
	};
	
	const [user, setUser] = useState({});
	const [notes, setNotes] = useState([]);
	const [vacations, setVacations] = useState([]);
	const [followComps, setFollowComps] = useState([]);
	const [params, setParams] = useState(qs.parse(getHash()));
	
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
	
	useEffect(() => {
		window.addEventListener('hashchange', () => {
			setParams(qs.parse(getHash()));
		});
	}, []);
	
	return (
		<div className="App">
			<div className = 'userBox'>
				<a href = '/#'><img id = 'avatar' alt = '' src = { user.avatar }/></a>
				<div>{ `Welcome ${ user.email }` }</div>
				<input type = 'button' value = 'Change User' onClick = { () => { removeUser(); getNewUser() }}/>
				
			</div>
			<div className = 'stats'>
				{!params.view && <Notes notes = { notes }/>}
				{!params.view && <Vacations vacations = { vacations }/>}
				{!params.view && <FollowedCompanies followComps = { followComps }/>}
				{params.view === 'notes' && <NotesPage notes = { notes }/>}
				{params.view === 'vacations' && <VacationsPage vacations = { vacations } setVacations = { setVacations }/>}
				{params.view === 'followed_companies' && <FollowedCompaniesPage followComps = { followComps }/>}
			</div>
		</div>
	);
}

export default App;
