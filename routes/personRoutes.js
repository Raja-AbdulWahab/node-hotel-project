const express = require('express')
const router = express.Router()
const Person = require('./../model/Person')

//Performing crud for Person Schema
//POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body; //request body contains person data coming from front-end.

        //Create new person row/document using the Mongoose model
        const newPerson = new Person(data)

        //save newPerson to the database
        const response = await newPerson.save()
        console.log("data saved")
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server Error' })

    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log("data saved")
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server Error' })
    }
})

//Now we are going to make parameterized variable
router.get('/:workType', async (req, res) => {  //By writing colon : before the workType means now workType becomes a variable
    try {
        const workType = req.params.workType; // Extract the work Type from the URL parameter
        if (workType == 'manager' || workType == 'waiter' || workType == 'chef') {
            const response = await Person.find({ work: workType })
            console.log('response fetched')
            res.status(200).json(response)
        }
        else {
            res.status(404).json({ error: 'Invalid Work Type' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: 'internal server error' })
    }
})

router.patch('/:pid', async (req, res) => {
    try {
        const personId = req.params.pid;// The id we are sending as parameter in url
        const updatedPersonData = req.body;// The data we are sending in body to update

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // return the updated document
            runValidators: true // run Mongoose validation
        })

        if(!response){
            return res.status(404).json({ error: 'Invalid Id Type' })
        }

        console.log("Successfully updated the data")
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: 'internal server error' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const deletepersonId = req.params.id;// Extract the person's ID from the url Parameter

        const response = await Person.findByIdAndDelete(deletepersonId)
        if (!response) {
            return res.status(404).json({ error: 'Invalid Id' })
        }

        console.log("Successfully Deleted the person's data")
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: 'internal server error' })
    }
})

module.exports = router;