import React from 'react';

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