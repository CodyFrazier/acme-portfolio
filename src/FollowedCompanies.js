import React from 'react';

function FollowedCompanies(notes){
	return (
		<div className = 'statBlock'>You Are Following { notes.length || 0 } Companies</div>
	)
}

export default FollowedCompanies;