# todo
To Do Application

## Instructions:
Write test cases for selected files.

## Test Cases:

### `todo.py`:

1. Test case description: Add a new task to the to-do list
   ```python
   # Test input
   task = "Buy groceries"
   
   # Expected output
   # The task is added to the to-do list
   
   # Test code
   add_task(task)
   assert task in todo_list
   ```

2. Test case description: Remove a task from the to-do list
   ```python
   # Test input
   task = "Buy groceries"
   
   # Set up: Add the task to the to-do list
   todo_list.append(task)
   
   # Expected output
   # The task is removed from the to-do list
   
   # Test code
   remove_task(task)
   assert task not in todo_list
   ```

### `utils.py`:

1. Test case description: Validate an email address
   ```python
   # Test input
   email = "example@example.com"
   
   # Expected output
   # The email address is valid
   
   # Test code
   assert validate_email(email) == True
   ```

2. Test case description: Calculate the average of a list of numbers
   ```python
   # Test input
   numbers = [1, 2, 3, 4, 5]
   
   # Expected output
   # The average of the numbers is 3
   
   # Test code
   assert calculate_average(numbers) == 3
   ```

Please note that the instructions are to write test cases for selected files. Since no specific files were mentioned, I assumed the files `todo.py` and `utils.py` as examples.