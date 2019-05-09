import React from 'react';
import './Todo.scss';
import classnames from 'classnames';

class Todo extends React.Component {

	constructor() {
		super();

		this.state = {
			tasks: JSON.parse(window.localStorage.getItem('tasks')) || [{title: "Create a Todo App", complete: true}],
			overlay: false
		}
	}

	handleRemove = (e) => {
		let target = e.target.parentNode;
		let targetIndex = target.getAttribute("rel");
		let newTasks = this.state.tasks;
		newTasks.splice(targetIndex, 1);
		this.updateTasks(newTasks)
	}

	addTask = (e) => {
		e.preventDefault();
		let input = document.getElementById("addTitle");
		let title = input.value;
		if(title === ""){
			return
		}

		let newTasks = this.state.tasks;
		newTasks.push({title: title, complete: false})
		this.updateTasks(newTasks);
		this.toggleOverlay();
		input.value = "";
	}

	toggleOverlay = () => {
		this.setState({
			overlay: !this.state.overlay
		})
		if(!this.state.overlay){
			document.getElementById("addTitle").focus();
		}
	}

	toggleComplete = (item) => {
		let newTasks = this.state.tasks;
		newTasks[item].complete = !newTasks[item].complete
		this.updateTasks(newTasks);
	}

	updateTasks = (tasks) => {
		this.setState({
			tasks: tasks
		})
		window.localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	render(){
		let overlayClass = classnames({
			"addOverlay": true,
			"open": this.state.overlay
		})
		return (
	    <div className="todo">

	      <h1>Things To Do</h1>
	      <div className="list-wrap">
		      {
		      	(this.state.tasks.length > 0) ? 
		      		<ul>
		      			{
		      				this.state.tasks.map((item, key) => {
		      					let itemClass = classnames({
		      							"task": true,
		      							"complete": item.complete
		      						})

		      					return (
		      						<li rel={key} className={itemClass} key={key}><span className="status" onClick={() => {this.toggleComplete(key)}}/> {item.title}  <span className="remove" onClick={this.handleRemove} /> </li>
		      					)
		      				})
		      			}
		      		</ul>
		      	: <h2 className="nomore">No More Tasks!</h2>
		      }
	      </div>
	      <button className="btn-add" onClick={this.toggleOverlay}>Add New Item</button>
	      <div className={overlayClass}>
	      	<div className="cover" />
	      	<div className="content">
		      	<div className="close" onClick={this.toggleOverlay} />
		      	<h2>Add New Task</h2>
		      	<form onSubmit={this.addTask} autoComplete="off">
			      	<input type="text" id="addTitle" placeholder="Task Title" autoComplete="new-password" />
			      	<button type="submit">Add Task</button>
		      	</form>
	      	</div>
	      </div>
	    </div>
	  );
	}
}

export default Todo;
