function saveOrphanage(db, orphanage) {
  const { lat, lng, name, about, whatsapp, images, instructions, opening_hours, weekends } = orphanage;
  return db.run(`
  INSERT INTO orphanages (
    lat,
    lng,
    name,
    about,
    whatsapp,
    images,
    instructions,
    opening_hours,
    weekends
  ) VALUES (
    "${lat}",
    "${lng}",
    "${name}",
    "${about}",
    "${whatsapp}",
    "${images}",
    "${instructions}",
    "${opening_hours}",
    "${weekends}"
    );
  `);
}

module.exports = saveOrphanage;