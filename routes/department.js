const express = require('express');
const Department = require('../models/department');

const router = express.Router();


router.get('/departments', async (req, res) => {
    try {
        const department = await Department.find({})
        res.send(department)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/departments/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const department = await Department.findById(_id)
        
        if(!department){
            return res.status(404).send()
        }

        res.send(department)        
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/departments/create', async (req, res) => {

    await Department.findOne({name: req.body.name}, (err, department) => {
        if(department){
            return res.status(400).send({
                error: "This Department Name Is Taken! Try Another!"
            })
        }
    })

    if(!req.body.name){
        return res.status(400).send({
            error: "Please Enter The Department Name!"
        })
    }

    const department = new Department(req.body)

    try{
        await department.save()
        res.status(201).send(department)
    } catch (e){
        res.status(400).send(e)
    }
    
})

router.patch('/departments/update/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']
    const isValidOpration = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOpration){
        return res.status(400).send({ 'error' : 'Invalid Updates Not Allowed!'})
    }

    try {
        const department = await Department.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if(!department){
            return res.status(404).send()
        }

        res.send(department)
    } catch (e) {
        res.status(400).send(e)
    }  
})

router.delete('/departments/delete/:id', async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id)

        if(!department){
            res.status(404).send()
        }

        res.send(department)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;