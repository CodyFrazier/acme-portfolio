import React from 'react';

function Vacations(obj){
	return (
		<div className = 'statBlock' >
			<a href = '#view=vacations'><h3>Vacations</h3></a>
			<div>You Have { obj.vacations.length } Vacations</div>
		</div>
	)
}

export default Vacations;