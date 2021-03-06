var todoListObj = {
    todos: [],
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function (position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        if (todo.completed === true) {
            todo.completed = false;
        } else {
            todo.completed = true;
        }
        // todo.completed = !todo.completed;
        // this.displayTodos();
    },
    toggleAll: function () {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        //Get the number of completed todos.
        this.todos.forEach(function (todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });

        this.todos.forEach(function (todo) {
            // Case 1: If everything’s true, make everything false.
            if (completedTodos === totalTodos) {
                todo.completed = false;
            //Case 2: Otherwise, make everything true.
            } else {
                todo.completed = true;
            }
        });
    }
};

var handlers = {
    addTodo: function () {
        var addTodoInput = document.getElementById('addTodoInput');
        todoListObj.addTodo(addTodoInput.value);
        addTodoInput.value = '';
        view.displayTodos();
    },
    changeTodo: function () {
        var changeTodoPosition = document.getElementById('changeTodoPosition');
        var changeTodoText = document.getElementById('changeTodoText');
        todoListObj.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value);
        changeTodoPosition.value = '';
        changeTodoText.value = '';
        view.displayTodos();
    },
    deleteTodo: function (position) {
        todoListObj.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function () {
        var toggleCompletedInput = document.getElementById('toggleCompletedInput');
        todoListObj.toggleCompleted(toggleCompletedInput.valueAsNumber);
        toggleCompletedInput.value = '';
        view.displayTodos();
    },
    toggleAll: function () {
        todoListObj.toggleAll();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function () {
        var todoUl = document.querySelector('ul');
        todoUl.innerHTML = '';
        todoListObj.todos.forEach(function(todo,position){
            var todoLi = document.createElement('li');
            var todoWithInfo = '';
            if (todo.completed === true) {
                todoWithInfo = '(x) ' + todo.todoText;
            } else {
                todoWithInfo = '( ) ' + todo.todoText;
            }
            todoLi.id = position;
            todoLi.textContent = todoWithInfo;
            todoLi.appendChild(this.createDeleteButton());
            todoUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function () {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListeners: function () {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function (event) {
            //Clicked element.
            var elementClicked = event.target;
            //Checking if the clicked element is delete button
            if (elementClicked.className === 'deleteButton') {
            //deleting delete button with its position
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });
    }
};
view.setUpEventListeners();
