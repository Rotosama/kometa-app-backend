const db = require("../db/queries");
class User {
  constructor(
    userID,
    firstName,
    lastName,
    birthdate,
    nationalID,
    phone,
    email,
    password,
    userUUID
  ) {
    this.userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.nationalID = nationalID;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.userUUID = userUUID;
  }
}

class UsersManager {
  static async getAll() {
    const queryResponse = await db.query("SELECT * FROM users");
    const users = usersDataToObject(queryResponse);
    return users;
  }
  static async getOneById(requestedId) {
    const queryResponse = await db.query(
      "SELECT * FROM users WHERE userid = $1",
      [requestedId]
    );
    const users = usersDataToObject(queryResponse);
    return users[0];
  }
  static async create(user) {
    const data = usersObjectToData(user);
    const queryResponse = await db.query(
      "INSERT INTO users(firstName,lastName, birthdate, nationalID, phone, email, password) VALUES ($1)",
      [data]
    );
    console.log(data, queryResponse);
    return queryResponse;
  }
}
function usersDataToObject(data) {
  const users = [];
  for (const userData of data) {
    users.push(
      new User(
        (userId = userData.userid),
        (firstName = userData.firstname),
        (lastName = userData.lastname),
        (birthdate = userData.birthdate),
        (nationalID = userData.nationalid),
        (phone = userData.phone),
        (email = userData.email),
        (password = userData.password),
        (userUUID = userData.useruuid)
      )
    );
  }
  return users;
}

function usersObjectToData(user) {
  return (
    `'${user.firstName}',
    '${user.lastName}',
    '${user.birthdate}', 
    '${user.nationalID}',
    '${user.phone}', 
    '${user.email}', 
    '${user.password}'`
    );
}
module.exports = UsersManager;
