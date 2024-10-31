// server2.js
const MyExpress = require("express-mini");
const app = new MyExpress();
let users = [
  { id: 1, name: "Hafiz" },
  { id: 2, name: "Gaza" },
];
// Get all users
app.get("/api/users", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(users));
});
// Get user by ID
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id); // Mengambil ID dari req.params
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.end("User not found");
  }
});
// Create a new user
app.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 201;
  res.end(JSON.stringify(newUser));
});
// Update an existing user
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id); // Mengambil ID dari req.params
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].name = req.body.name;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(users[userIndex]));
  } else {
    res.statusCode = 404;
    res.end("User not found");
  }
});
// Delete a user
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id); // Mengambil ID dari req.params
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(deletedUser[0]));
  } else {
    res.statusCode = 404;
    res.end("User not found");
  }
});
// Listen on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
