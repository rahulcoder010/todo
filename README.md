##### Test File: todo.test.js

```javascript
const { Todo } = require('./todo');

describe('Todo', () => {
  let todo;

  beforeEach(() => {
    todo = new Todo();
  });

  it('should initialize with an empty task array', () => {
    expect(todo.tasks).toEqual([]);
  });

  it('should add a task to the task array', () => {
    todo.addTask('Finish homework');
    expect(todo.tasks.length).toBe(1);
    expect(todo.tasks[0]).toEqual({ task: 'Finish homework', completed: false });
  });

  it('should mark a task as completed', () => {
    todo.addTask('Finish homework');
    todo.addTask('Go to the gym');
    
    todo.markTaskAsCompleted(1);
    expect(todo.tasks[1].completed).toBe(true);
  });

  it('should throw an error when trying to mark a non-existing task as completed', () => {
    expect(() => todo.markTaskAsCompleted(5)).toThrow('Task not found');
  });

  it('should remove a completed task from the task array', () => {
    todo.addTask('Finish homework');
    todo.addTask('Go to the gym');

    todo.markTaskAsCompleted(0);
    todo.removeCompletedTasks();

    expect(todo.tasks.length).toBe(1);
    expect(todo.tasks[0].task).toEqual('Go to the gym');
  });
});

```