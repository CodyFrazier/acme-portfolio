import React from 'react';

function NotesPage(notes){
	return (
		<div>
			<h2>Notes</h2>
			<ul>{
				notes.notes.map((note, idx)=>{
					return (
						<li key = { idx }>{ note.text }</li>
					)
				})
			}</ul>
		</div>
	)
}

export default NotesPage;