import React from 'react';

function FollowedCompanies(obj){
	return (
		<div className = 'statBlock' >
			<a href = '#view=followed_companies'><h3 onClick = { () => { console.log("Display Followed Companies and change hash") } }>Companies</h3></a>
			<div>You Are Following { obj.followComps.length } Companies</div>
		</div>
	)
}

export default FollowedCompanies;