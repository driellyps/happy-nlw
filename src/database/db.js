const Database = require('sqlite-async');

function execute(db) {
  return db.exec(`
  CREATE TABLE IF NOT EXISTS orphanages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lat TEXT,
    lng TEXT,
    name TEXT,
    about TEXT,
    whatsapp TEXT,
    images TEXT,
    instructions TEXT,
    opening_hours TEXT,
    weekends TEXT
    );
  `)
}

function comments(db) {
  return db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTERGER,
      name TEXT,
      text TEXT
    );
  `)
}


module.exports = Database.open(__dirname + '/database.sqlite').then(execute).then(comments);


