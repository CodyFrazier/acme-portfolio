import React from 'react';

function Vacations(notes){
	return (
		<div className = 'statBlock'>You Have { notes.length || 0 } Vacations</div>
	)
}

export default Vacations;