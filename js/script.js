document.addEventListener('DOMContentLoaded', () => {

    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const dateInput = document.getElementById('date-input');
    const todoList = document.getElementById('todo-list');
    const filterInput = document.getElementById('filter-input');

    todoForm.addEventListener('submit', addTodo);
    todoList.addEventListener('click', deleteTodo);
    filterInput.addEventListener('keyup', filterTodos);

    function addTodo(event) {
        event.preventDefault(); 

        if (todoInput.value.trim() === '' || dateInput.value === '') {
            alert('Please fill in both the task and the date.');
            return;
        }

        const li = document.createElement('li');
        
        const taskText = document.createElement('span');
        taskText.textContent = `${todoInput.value} (Due: ${dateInput.value})`;
        li.appendChild(taskText);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        li.appendChild(deleteBtn);

        todoList.appendChild(li);

        todoInput.value = '';
        dateInput.value = '';
    }

    function deleteTodo(event) {
        if (event.target.classList.contains('delete-btn')) {
            const li = event.target.parentElement;
            li.classList.add('removing');
            li.addEventListener('transitionend', () => {
                li.remove();
            });
        }
    }

    function filterTodos(event) {
        const searchText = event.target.value.toLowerCase();
        const items = todoList.getElementsByTagName('li');

        Array.from(items).forEach(item => {
            const itemText = item.firstChild.textContent.toLowerCase();
            if (itemText.includes(searchText)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
});