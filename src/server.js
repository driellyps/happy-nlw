  //Using commonjs
  
  const express = require('express');
  const path = require('path');
  const pages = require('./pages.js')
  
  const server = express();
  
  server
  // Using req.body
  .use(express.urlencoded({ extended: true }))
  // Using static files
  .use(express.static('public'))

  // set template engine
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'hbs')
  
  
  .get('/', pages.index)
  .get('/orphanages', pages.orphanages)
  .get('/orphanage', pages.orphanage)
  .get('/create-orphanage', pages.createOrphanage)
  .post('/save-orphanage', pages.saveOrphanage)
  .post('/save-comment', pages.saveComment)
  
  server.listen(5500);
 

  // Not working
//import express from 'express';

// const app = express();

// //using static documents
// app
// .use(express.static('public'))

// .get('/', (req, res) => {
//   res.sendFile('src/views/index.html')
// })

// app.listen(5500, () => 
//   console.log('Im here')
// );