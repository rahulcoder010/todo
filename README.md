# todo
To Do Application

## Test Cases

### File: app.js

1. Test Case: Checking if the app initializes without any errors
```javascript
// Importing the app.js file
const app = require('./app');

// Running the app
app.initialize();

// Checking if the app is running without any errors
expect(app.error).toBeNull();
```

### File: todoList.js

1. Test Case: Checking if a new todo item is added successfully
```javascript
// Importing the todoList.js file
const todoList = require('./todoList');

// Adding a new todo item
const newTodo = {
    id: 1,
    title: "Buy groceries",
    completed: false
};

todoList.addItem(newTodo);

// Checking if the new todo item is added successfully
expect(todoList.getItems()).toContain(newTodo);
```

2. Test Case: Checking if a todo list item is marked as completed successfully
```javascript
// Importing the todoList.js file
const todoList = require('./todoList');

// Adding a new todo item
const newTodo = {
    id: 1,
    title: "Buy groceries",
    completed: false
};

todoList.addItem(newTodo);

// Marking the todo item as completed
todoList.markCompleted(newTodo.id);

// Checking if the todo item is marked as completed successfully
expect(todoList.getItem(newTodo.id).completed).toBe(true);
```

3. Test Case: Checking if a todo list item is deleted successfully
```javascript
// Importing the todoList.js file
const todoList = require('./todoList');

// Adding a new todo item
const newTodo = {
    id: 1,
    title: "Buy groceries",
    completed: false
};

todoList.addItem(newTodo);

// Deleting the todo item
todoList.deleteItem(newTodo.id);

// Checking if the todo item is deleted successfully
expect(todoList.getItem(newTodo.id)).toBeUndefined();
```