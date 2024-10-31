
// server3.js
const MyExpress = require('express');
const {
  getUserActions,
  getUserByIdAction,
  createNewUserAction,
  updateUserAction,
  deleteUserAction,
} = require('./actions/users-action');
const app = new MyExpress();
// Middleware untuk mengurai JSON body
app.use(MyExpress.json());

app.get('/api/users', getUserActions);
app.get('/api/users/:id', getUserByIdAction);
app.post('/api/users', createNewUserAction);
app.put('/api/users/:id', updateUserAction);
app.delete('/api/users/:id', deleteUserAction);
// Listen on port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
