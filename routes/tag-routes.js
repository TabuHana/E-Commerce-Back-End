const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../models')

// The `/api/tags` endpoint

router.get('/tags', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    Tag.findAll({ include: [Product] })
      .then(tagSeek => {
        res.status(200).json(tagSeek)
      })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/tags/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    Tag.findOne({ where: { id: req.params.id }, include: [Product] })
      .then(tagSeek => {
        res.status(200).json(tagSeek)
      })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/tags', (req, res) => {
  // create a new tag
  try {
    Tag.create(req.body)
      .then(tagCreate => {
        res.json(tagCreate)
      })
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/tags/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    Tag.update(req.body, { where: { id: req.params.id } })
      .then(tagUpdate => {
        res.sendStatus(200)
      })
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/tags/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    Tag.destroy({ where: { id: req.params.id } })
      .then(tagDelete => {
        res.sendStatus(200)
      })
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
