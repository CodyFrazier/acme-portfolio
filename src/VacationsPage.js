import React, { useState } from 'react';
import moment from 'moment';

//				TODO
/*
	-Should remove vacations that ENDED in the past -- leave concurrent vacations
	-Should not allow a vacations to be added in it ends in the past. (starting in the past is fine)
	-Should Post new vacations to the user id
	-Should Delete old or expired vacations from the user id
	-Should offer an option to remove the vacation
	-Pass user to this component for above Post/Delete functionality? (Is that necessary?)
*/

function VacationsPage(vacations, setVacations){
	
	const [start, setStart] = useState(moment().format('YYYY-MM-DD'));
	const [end, setEnd] = useState(moment().format('YYYY-MM-DD'));
	
	return (
		<div>
			<h2>Next Vacation</h2>
			<div className = 'boxList'>
				<div>{ moment(vacations.vacations.startDate).format('ddd DD MMM YYYY') }</div>
				<div>until</div>
				<div>{ moment(vacations.vacations.endDate).format('ddd DD MMM YYYY') }</div>
			</div>
			<hr />
			<h2>Add New Vacation</h2>
			<form className = 'boxList' onClick = { (ev) => { ev.preventDefault() } }>
				
				<div>Start:<input type = 'date' value = { start } onChange = { (ev) => { setStart(ev.target.value) } }/></div>
				<div>End: <input type = 'date' value = { end } onChange = { (ev) => { setEnd(ev.target.value) } }/></div>
				<input id = 'submit' type = 'submit' value = 'Submit'/>
			</form>
			<hr />
			<h2>Upcoming Vacations</h2>	
			<ul className = 'unlist'>{
				vacations.vacations.map((vacation, idx)=>{
					if(idx && vacation.startDate > moment()){
						return (
							<li className = 'boxList' key = { idx }>
								<div>{ moment(vacation.startDate).format('ddd DD MMM YYYY') }</div>
								<div>until</div>
								<div>{ moment(vacation.endDate).format('ddd DD MMM YYYY') }</div>
							</li>
						)
					}
				})
			}</ul>
		</div>
	)
}

export default VacationsPage;