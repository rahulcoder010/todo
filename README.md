# README.md

## todo

**To Do Application**

### Instructions

Write test cases for selected files.

### Test Case 1: test_add_task()
```python
def test_add_task():
    # Create a task manager instance
    task_manager = TaskManager()

    # Add a task to the task manager
    task_manager.add_task("Complete assignment")

    # Verify that the task manager has one task
    assert len(task_manager.tasks) == 1

    # Verify that the added task is the correct one
    assert task_manager.tasks[0].title == "Complete assignment"
    assert task_manager.tasks[0].status == "Pending"
```

### Test Case 2: test_complete_task()
```python
def test_complete_task():
    # Create a task manager instance
    task_manager = TaskManager()

    # Add a task to the task manager
    task_manager.add_task("Complete assignment")

    # Complete the task
    task_manager.complete_task(0)

    # Verify that the task manager has one task
    assert len(task_manager.tasks) == 1

    # Verify that the completed task has the correct status
    assert task_manager.tasks[0].status == "Completed"
```

### Test Case 3: test_remove_task()
```python
def test_remove_task():
    # Create a task manager instance
    task_manager = TaskManager()

    # Add a task to the task manager
    task_manager.add_task("Complete assignment")

    # Remove the task
    task_manager.remove_task(0)

    # Verify that the task manager has no tasks
    assert len(task_manager.tasks) == 0
```

### Test Case 4: test_view_all_tasks()
```python
def test_view_all_tasks():
    # Create a task manager instance
    task_manager = TaskManager()

    # Add multiple tasks to the task manager
    task_manager.add_task("Complete assignment 1")
    task_manager.add_task("Complete assignment 2")
    task_manager.add_task("Complete assignment 3")

    # Retrieve all tasks
    tasks = task_manager.view_all_tasks()

    # Verify that the task manager has the correct number of tasks
    assert len(tasks) == 3

    # Verify that each task title is correct
    assert tasks[0].title == "Complete assignment 1"
    assert tasks[1].title == "Complete assignment 2"
    assert tasks[2].title == "Complete assignment 3"
```

### Test Case 5: test_view_completed_tasks()
```python
def test_view_completed_tasks():
    # Create a task manager instance
    task_manager = TaskManager()

    # Add multiple tasks to the task manager
    task_manager.add_task("Complete assignment 1")
    task_manager.add_task("Complete assignment 2")
    task_manager.add_task("Complete assignment 3")

    # Complete the first two tasks
    task_manager.complete_task(0)
    task_manager.complete_task(1)

    # Retrieve completed tasks
    completed_tasks = task_manager.view_completed_tasks()

    # Verify that the task manager has the correct number of completed tasks
    assert len(completed_tasks) == 2

    # Verify that each completed task title is correct
    assert completed_tasks[0].title == "Complete assignment 1"
    assert completed_tasks[1].title == "Complete assignment 2"
```

### Test Case 6: test_view_pending_tasks()
```python
def test_view_pending_tasks():
    # Create a task manager instance
    task_manager = TaskManager()

    # Add multiple tasks to the task manager
    task_manager.add_task("Complete assignment 1")
    task_manager.add_task("Complete assignment 2")
    task_manager.add_task("Complete assignment 3")

    # Complete the first two tasks
    task_manager.complete_task(0)
    task_manager.complete_task(1)

    # Retrieve pending tasks
    pending_tasks = task_manager.view_pending_tasks()

    # Verify that the task manager has the correct number of pending tasks
    assert len(pending_tasks) == 1

    # Verify that the pending task title is correct
    assert pending_tasks[0].title == "Complete assignment 3"
```