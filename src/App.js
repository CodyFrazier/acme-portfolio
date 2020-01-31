import React from 'react';
import './App.css';
import axios from 'axios';

const API = 'https://acme-users-api-rev.herokuapp.com/api';

const fetchUser = async () => {
	const storage = window.localStorage;
	const userID = storage.getItem('userId');
	if(userID){
		try{
			return (await axios.get(`${ API }/users/detail${ userID }`)).data;
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
  return (
    <div className="App">
    </div>
  );
}

export default App;
