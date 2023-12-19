// Test cases for selected files

// 1. Register a new user
test('Register a new user', async () => {
  const req = {
    body: {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    }
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  await registerUser(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
});

// 2. Update a user
test('Update a user', async () => {
  const req = {
    params: {
      id: '1234567890'
    },
    body: {
      username: 'updateduser',
      email: 'updateduser@example.com',
      password: 'newpassword'
    }
  };

  const res = {
    json: jest.fn()
  };

  await updateUser(req, res);

  expect(res.json).toHaveBeenCalled();
});

// 3. Update password
test('Update password', async () => {
  const req = {
    params: {
      id: '1234567890'
    },
    body: {
      password: 'newpassword'
    }
  };

  const res = {
    json: jest.fn()
  };

  await updatePassword(req, res);

  expect(res.json).toHaveBeenCalled();
});