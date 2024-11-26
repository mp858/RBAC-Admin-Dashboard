let users = require("../data").users;
let roles = require("../data").roles;

export const getUsers = () => Promise.resolve(users);

export const getRoles = () => Promise.resolve(roles);

export const addUser = (user) => {
  user.id = users.length + 1;
  users.push(user);
  return Promise.resolve(user);
};

export const updateUser = (id, updatedUser) => {
  users = users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user));
  return Promise.resolve(updatedUser);
};

export const deleteUser = (id) => {
  users = users.filter((user) => user.id !== id);
  return Promise.resolve();
};
