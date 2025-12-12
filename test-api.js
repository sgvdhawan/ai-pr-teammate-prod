/**
 * User API - needs improvements
 */

export function getUser(userId) {
  const user = database.find(userId);
  return user;
}

export function createUser(data) {
  const newUser = database.insert(data);
  return newUser;
}

export function deleteUser(id) {
  database.remove(id);
  return true;
}

export function updateUserEmail(userId, email) {
  const user = database.find(userId);
  user.email = email;
  database.save(user);
  return user;
}

