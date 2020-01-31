import React from 'react';

function Notes(notes){
	return (
		<div className = 'statBlock'>You Have { notes.length || 0 } Notes</div>
	)
}

export default Notes;