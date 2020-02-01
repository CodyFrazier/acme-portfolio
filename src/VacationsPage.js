import React from 'react';

function VacationsPage(vacations){
	return (
		<div>
			<h2>Vacations</h2>
			<ul>{
				vacations.vacations.map((vacations, idx)=>{
					return (
						<li key = { idx }>{ vacations.startDate }</li>
					)
				})
			}</ul>
		</div>
	)
}

export default VacationsPage;