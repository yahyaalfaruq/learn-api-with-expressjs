const {
  getDataUserById,
  getDataUsers,
  addDataNewUser,
  updateDataUser,
  deleteDataUser,
  getIndexDataUserById,
} = require("../gateways/users-gateway");

module.exports.getUserActions = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(getDataUsers()));
};

module.exports.getUserByIdAction = (req, res) => {
  const userId = parseInt(req.params.id); // Mengambil ID dari req.params
  const user = getDataUserById(userId);
  if (user) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.end("User not found");
  }
};

module.exports.createNewUserAction = (req, res) => {
  const newUser = addDataNewUser(req.body.name);
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 201;
  res.end(JSON.stringify(newUser));
};

module.exports.updateUserAction = (req, res) => {
  const userId = parseInt(req.params.id); // Mengambil ID dari req.params
  const userIndex = getIndexDataUserById(userId);
  if (userIndex !== -1) {
    const userUpdated = updateDataUser(userIndex, req.body.name);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(userUpdated));
  } else {
    res.statusCode = 404;
    res.end("User not found");
  }
};

module.exports.deleteUserAction = (req, res) => {
  const userId = parseInt(req.params.id); // Mengambil ID dari req.params
  const userIndex = getIndexDataUserById(userId);
  if (userIndex !== -1) {
    const userDeleted = deleteDataUser(userIndex);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(userDeleted));
  } else {
    res.statusCode = 404;
    res.end("User not found");
  }
};
