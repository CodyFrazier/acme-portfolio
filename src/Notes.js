import React from 'react';

function Notes(obj){
	return (
		<div className = 'statBlock'>
			<a href = '#view=notes'><h3 onClick = { () => { console.log("Display notes and change hash") } }>Notes</h3></a>
			<div>You Have { obj.notes.length || 0 } Notes</div>
		</div>
	)
}

export default Notes;