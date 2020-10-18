const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');
const saveComment = require('./database/saveComment')

module.exports = {

  index(req, res) {
    //const city = req.query.city
    //return res.render('index, { city })
    return res.render('index')
  },

  async orphanages(req, res) {
    // add orphange through database
    try {
      const db = await Database;
      const orphanages = await db.all("SELECT * FROM orphanages");
      return res.render('orphanages', { orphanages })

    } catch (error) {
      console.log(error)
      return res.send('Erro no banco de dados')
    }
  },
  
  async orphanage(req, res) {
    const id = req.query.id;
    try {
      const db = await Database;
      const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`);
      const comments = await db.all(`SELECT * FROM comments WHERE id = "${id}"`)
      const orphanage = results[0];

      orphanage.images = orphanage.images.split(",");
      orphanage.firstImage = orphanage.images[0];

      // if(orphanage.weekends == "0") {
      //   orphanage.weekends = false;
      // } else {
      //   orphanage.weekends = true;
      // }
      
     orphanage.weekends == "0" ? orphanage.weekends = false : orphanage.weekends = true;

      return res.render('orphanage', { orphanage, comments });

    } catch (error) {
      console.log(error)
      return res.send('Erro no banco de dados')
    }
  },

  createOrphanage(req, res) {
    return res.render('create-orphanage')
  },

  async saveOrphanage(req, res) {
    const fields = req.body;

    // Check if all fields are completed
    if(Object.values(fields).includes('')) {
      return res.send('Todos os campos devem ser preenchidos')
    }

    try {
      // save orphanage
      const db = await Database;
      await saveOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        weekends: fields.weekends
      })

      // Redirect to orphanages
      return res.redirect('/orphanages')

    } catch (error) {
      console.log(error)
      return res.send('Erro no banco de dados')
    }

  },

  async saveComment(req, res) {
    const fields = req.body;
    const id = req.query.id;

    // Check if all fields are completed
    if(Object.values(fields).includes('')) {
      return res.send('Todos os campos devem ser preenchidos')
    }

    try {
      // save comment
      const db = await Database;
      await saveComment(db, {
        name: fields.name,
        text: fields.text
      })

      // Redirect to orphanage page
      return res.redirect(`/orphanage?id=${id}`)

    } catch (error) {
      console.log(error)
      return res.send('Erro no banco de dados')
    }

  }
}