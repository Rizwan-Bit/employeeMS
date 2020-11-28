const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

router.post("/employees/create", async (req, res) => {

    const {name, surname, address, qualification, contactNumber, departments} = req.body;
    const selected = 0;
  //console.log(req.body)
    
    if(!name || !surname || !address || !qualification || !contactNumber){
        return res.status(400).send({
            error: "All Fields Are Required!"
        })
    }

    if(contactNumber.length !== 10){
        return res.status(400).send({
            error: "Contact number must be of 10 digits only!"
        })
    }
    const department = departments[selected]._id;
    const employee = new Employee({name, surname, address, qualification, contactNumber, department});

    try {
        await employee.save()
        res.status(201).send(employee)
    } catch (e){
        res.status(400).send(e)
    }

})

router.get("/employees", async (req, res) => {

    try {
       const employee = await Employee.find({})
            res.status(200).send(employee)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get("/employees/:id", async (req, res) => {

    const _id = req.params.id

    try {
        const employee = await Employee.findById(_id)
        if(!employee){
            return res.status(404).send()
        }

        res.send(employee)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.patch("/employees/update/:id", async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(req.body)
    const allowedUpdates = ['name', 'surname', 'address', 'qualification', 'contactNumber']
    const isValidOpration = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOpration){
        return res.status(400).send({ 'error' : 'Invalid Updates Not Allowed!'})
    }

    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if(!employee){
            return res.status(404).send()
        }

        res.send(employee)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router;