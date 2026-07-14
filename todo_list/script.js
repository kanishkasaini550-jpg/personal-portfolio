function addTask(){
	const taskInput= document.getElementById('taskInput');
	const taskText= taskInput.value.trim();

	if(taskText===''){
	alert('Please enter a task')
	return;
	}
	
	const taskList= document.getElementById('taskList');
	const listItem= document.createElement('li');

	const taskSpan= document.createElement('span');
	taskSpan.textContent = taskText;

//Complete Button
	const completeButton= document.createElement('button');
	completeButton.innerHTML= '✅';
        completeButton.title= "Mark as completed";
	completeButton.onclick = () =>{
		taskSpan.classList.toggle('completed');
	};

//Remove Button
	const removeButton = document.createElement('button');
	removeButton.textContent = 'Remove';
	removeButton.className = 'remove-btn';
        removeButton.title="delete this task";
	removeButton.onclick= () => {
		taskList.removeChild(listItem);
	};

//Append Everything
	listItem.appendChild(completeButton);
	listItem.appendChild(taskSpan);
	listItem.appendChild(removeButton);

	taskList.appendChild(listItem);

	taskInput.value= '';
}