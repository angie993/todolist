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

        for (var i = 0; i < totalTodos; i++) {
            if (this.todos[i].completed === true) {
                completedTodos++;
            }
        }
        if (completedTodos === totalTodos) {
            for (i = 0; i < totalTodos; i++) {
                this.todos[i].completed = false;
            }
        } else {
            for (i = 0; i < totalTodos; i++) {
                this.todos[i].completed = true;
            }
        }
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
        for (var i = 0; i < todoListObj.todos.length; i++) {
            var todoLi = document.createElement('li');
            var todo = todoListObj.todos[i];
            var todoWithInfo = '';
            if (todo.completed === true) {
                todoWithInfo = '(x) ' + todo.todoText;
            } else {
                todoWithInfo = '( ) ' + todo.todoText;
            }
            todoLi.id = i;
            todoLi.textContent = todoWithInfo;
            todoLi.appendChild(this.createDeleteButton());
            todoUl.appendChild(todoLi);
        }
    },
    createDeleteButton: function () {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListeners: function () {
        var todoUl = document.querySelector('ul');

        todoUl.addEventListener('click', function (event) {
                //console.log(event.target.parentNode.id);

                //element that was clicked
                var elementClicked = event.target;
                //check if the clicked element is deleteButton
                if (elementClicked.className === 'deleteButton') {
                    //run handlers.deleteTodo method
                    handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
                    //parseInt methos takes a string and casts it to a number that todoListObj.deleteTodo() expects
                }
            }

        };
    });
view.setUpEventListeners();
