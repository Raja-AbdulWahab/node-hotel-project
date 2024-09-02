const express = require('express')
const router = express.Router()
const Person = require('./../model/Person')
const { jwtAuthMiddleware, generateToken } = require('./../jwt')

//Performing crud for Person Schema
//POST route to add a person
router.post('/signup', async (req, res) => {
    try {
        const data = req.body; //request body contains person data coming from front-end.

        //Create new person row/document using the Mongoose model
        const newPerson = new Person(data)

        //save newPerson to the database
        const response = await newPerson.save()
        console.log("data saved")
        const payload = {
            id: response.id,
            username: response.username
        }
        const token = generateToken(payload)
        console.log('Token is: ', token)

        res.status(200).json({ response: response, token: token })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server Error' })

    }
})

//Login Route
router.post('/login', async (req, res) => {
    try {
        //Extract username and password from request body
        const { username, password } = req.body;

        //Find the user by username
        const user = await Person.findOne({ username: username })

        //If user does not exist or password does not match return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ err: 'Invalid username and password' })
        }

        //generate token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload)
        //return token as response
        res.json({ token })
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server Error' })
    }
})

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const {userData} = req.user; //extract payload from req.user
        console.log('user data: ', userData)

        const userId = userData.id
        const user = await Person.findById(userId)
        res.status(200).json({ user })
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server Error' })
    }
})

router.get('/', jwtAuthMiddleware, async (req, res) => {
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

        if (!response) {
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