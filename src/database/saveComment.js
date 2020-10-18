function saveComment(db, orphanage, comment) {
  const { id } = orphanage;
  const { name, text } = comment;
  return db.run(`
  INSERT INTO comments (
    id,
    name,
    text
  ) VALUES (
    "${id}",
    "${name}",
    "${text}"
    );
  `);
}

module.exports = saveComment;