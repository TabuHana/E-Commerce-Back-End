const router = require('express').Router()
const { Category, Product } = require('../models')

// The `/api/categories` endpoint

router.get('/categories', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    Category.findAll({ include: [Product] })
    .then(categorySeek => {
      res.status(200).json(categorySeek)
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/categories/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    Category.findOne({ where: { id: req.params.id }, include: [Product] })
      .then(categorySeek => {
        res.status(200).json(categorySeek)
      })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/categories', (req, res) => {
  // create a new category
  try{
    Category.create(req.body)
    .then(categoryCreate =>{
      res.json(categoryCreate)
    })
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/categories/:id', (req, res) => {
  // update a category by its `id` value
  try{
    Category.update(req.body, { where: { id: req.params.id } })
    .then(categoryUpdate => {
      res.sendStatus(200)
    })
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/categories/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    Category.destroy({ where: { id: req.params.id } })
    .then(categoryDelete =>{
      res.sendStatus(200)
    })
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
