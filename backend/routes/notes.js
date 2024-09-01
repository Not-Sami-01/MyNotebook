const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE: 1 -> Add notes to the database - POST: /api/note/addnote - Login Required
router.post('/addnote', [
  body('title', 'Please enter something valid').notEmpty().isString(),
  body('description', 'Please enter something valid').notEmpty().isString(),
  body('tag').optional().isString(),
], fetchUser, async (req, res) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const note = await Notes.create({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag || undefined,
    });
    let save = await note.save();
    return res.json({ success: note });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Some error occured');
  }
})


// ROUTE: 2 -> Get all the notes - GET: /api/note/fetchnotes - Login Required
router.get('/fetchnotes', fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id }).select('-__v');
  return res.json(notes);
})

// ROUTE: 3 -> Update the existing note - POST: /api/note/updatenote - Login Required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
  try {

    const { title ,description, tag } = req.body;
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note and update it
    const note = await Notes.findById(req.params.id);
    if (!note) return res.status(400).json({ error: 'Not Found', message: 'The note does not exist' });
    if (String(note.user) != req.user.id) {
      return res.status(401).json({ error: 'Unauthorized', message: 'You are not authorized to update this note' });
    } else {
      let update = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
      return res.json({ success: true, note: update });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: 'Some error occured' });
  }
})

// ROUTE: 4 -> Delete the existing note - POST: /api/note/updatenote - Login Required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(400).json({ error: 'Not Found', message: 'The note does not exist' });
    if (String(note.user) != req.user.id) {
      return res.status(401).json({ error: 'Unauthorized', message: 'You are not authorized to update this note' });
    } else {
      let remove = await Notes.findByIdAndDelete(req.params.id);
      res.json({ sucess: true, note: remove });
    }

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: 'Some error occured' });
  }
})

module.exports = router;
