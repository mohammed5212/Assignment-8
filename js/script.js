



// Wait for the DOM to fully load before running script//


document.addEventListener('DOMContentLoaded', ()=> {

    // select DOM elents

    const taskInput=document.getElementById("task-input")
    const addTaskBtn = document.getElementById("add-task-btn")
    const taskList = document.getElementById("task-list")
   
   //get tasks from local storage
    const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

    const saveTasksToLocalStorage = () => {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
      const text = li.querySelector('span').textContent;
      const completed = li.classList.contains('completed');
      tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

    // Function to add a task 

    const addTask = (text, completed =false) => {

        // GET THE text from input or use passed value

        const taskText = text || taskInput.value.trim()
        if(!taskText) {
            return
        }

        // create anew list item//
        const li = document.createElement('li') 
        
         //set the inner HTML of the new task item//
        li.innerHTML = `
        <input type ="checkbox" class ='checkbox'
         ${completed ? 'checked' :''}/>
         <span>${taskText}</span>
         <div class="task-buttons">
         <button class= "edit-btn"><i class="fa-solid fa-pen"></i></button>
         <button class= "delete-btn"><i class="fa-solid fa-trash"></i></button>
         </div>
         `
          //select inner elements of the task item/

         const checkbox = li.querySelector('.checkbox')
         const editBtn =li.querySelector('.edit-btn')
           //if tsk is marked complete
         if (completed) {
            li.classList.add('completed');
            editBtn.disabled =true;
            editBtn.style.opacity ='0.5';
            editBtn.style.pointerEvents ='none'
         }
         //togle task completetion status
         checkbox.addEventListener('change',()=>{
            const isChecked = checkbox.checked;
            li.classList.toggle('completed',isChecked)
            editBtn.disabled = isChecked;
            editBtn.style.opacity =isChecked ? '0.5':'1';
            editBtn.style.pointerEvents =isChecked ? 'none':'auto';
             saveTasksToLocalStorage();
         })
            //edit task//

         editBtn.addEventListener('click',()=>{
            if(!checkbox.checked){
                taskInput.value =li.querySelector('span').textContent
                li.remove();
                  saveTasksToLocalStorage();
            }
         })


                 //delete task from list/

        li.querySelector('.delete-btn').
        addEventListener('click',()=>{
            li.remove();  saveTasksToLocalStorage();
        })
        

          //append the new task to the task list/

        taskList.appendChild(li)

        // clear the input field

        taskInput.value ='';
          saveTasksToLocalStorage();
    }    
    
       //add task on button click
    addTaskBtn.addEventListener('click', (e) => addTask());

    //add task when enter key is ressed inside input field

    taskInput.addEventListener('keypress',(e)=> {
       
        //prevent form submission/
        if(e.key === 'Enter'){  e.preventDefault();
            addTask()}
    })
      // Load existing tasks
  getTasksFromLocalStorage().forEach(task => addTask(task.text, task.completed));
});
