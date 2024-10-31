let users = [
  { id: 1, name: "Hafiz" },
  { id: 2, name: "Gaza" },
];
module.exports.getDataUsers = () => users;

module.exports.getDataUserById = (id) => users.find((u) => u.id === id);

module.exports.getIndexDataUserById = (id) =>
  users.findIndex((u) => u.id === id);

module.exports.addDataNewUser = (name) => {
  const newUser = {
    id: users.length + 1,
    name,
  };
  users.push(newUser);
  return newUser;
};

module.exports.updateDataUser = (idx, name) => {
  users[idx].name = name;
  return users[idx];
};

module.exports.deleteDataUser = (idx) => {
  return users.splice(idx, 1);
};
