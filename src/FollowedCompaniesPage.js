import React from 'react';
import axios from 'axios';

function FollowedCompaniesPage(obj){
	return (
		<div>
			<h2>Followed Companies</h2>
			<ul>{
				obj.followComps.map((comp, idx)=>{
					return (
						<li key = { idx }>{ comp.id }</li>
					)
				})
			}</ul>
		</div>
	)
}

export default FollowedCompaniesPage;