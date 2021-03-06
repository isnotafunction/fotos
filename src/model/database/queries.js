const db = require('./db_connection');

const getAll = () => {
  return db.query(`SELECT users.username, photos.title, photos.date, photos.description, photos.image_url, photos.id FROM photos
  LEFT JOIN users
  ON photos.user_id = users.id;`);
};

const getPhoto = photoId => {
  return db.query(`SELECT users.username, photos.title, photos.date, photos.description, photos.image_url FROM photos
  LEFT JOIN users
  ON photos.user_id = users.id WHERE photos.id = ${photoId};`);
};

const addUser = (username, hash) => {
  return db.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [
    username,
    hash
  ]);
};

const getUserId = (username) => {
  return db.query(
    `SELECT id FROM users WHERE username = $1`,
    [username]
  );
};

const userPhotos = (username) => {
  return db.query(
    `SELECT photos.title, photos.date, photos.description, photos.image_url FROM photos
    LEFT JOIN users
    ON photos.user_id = users.id WHERE users.username = $1;`,
    [username]
  );
};

const postPhoto = (user_id, title, description, url) => {
  return db.query(
    `INSERT INTO photos (user_id, title, description, image_url) VALUES ($1, $2, $3, $4)`,
    [user_id, title, description, url]
  );
};

const checkUserDetails = (username) => {
  console.log("Checkuserdetails reached");
  return db.query(`SELECT password FROM users WHERE username = $1`, [username]);
};

module.exports = {
  getAll,
  getPhoto,
  addUser,
  getUserId,
  postPhoto,
  checkUserDetails,
  userPhotos
};
