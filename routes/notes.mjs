// const util = require('util')

import { default as express } from 'express'
import { NotesStore as notes } from '../app.mjs'

export const router = express.Router()

// To add notes

router.get('/add', (req, res, next) => {
    res.render('noteEdit', {
        title: "Add a Note",
        doCreate: true,
        noteKey: '',
        note: undefined
    })
})

// To save notes

router.post('/save', async(req, res, next) => {
    try {
        let note
        if(req.body.doCreate === "create") {
            note = await notes.create(req.body.noteKey, req.body.title, req.body.body)
        }
        res.redirect('/notes/view?key='+ req.body.noteKey)
    }
    catch (err) {
        next(err)
    }
})

// To read notes

router.get('/view', async (req, res, next) => {
    try {
        let note = await notes.read(req.query.key)
        res.render('noteview', {
            title: note ? note.title: '',
            noteKey: req.query.key,
            note: note
        })
    } catch (err) {
        next(err)
    }
})