const express = require('express')
const router = express.Router()
const MenuItem = require('./../model/MenuItem');

//Performing crud for MenuItem Schema
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const NewMenuItem = new MenuItem(data);
        const response = await NewMenuItem.save();
        console.log("Menu Item saved")
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' })
    }

})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find()
        console.log('fetched menuitem data')
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' })
    }
})

router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == 'sour' || tasteType == 'sweat' || tasteType == 'spicy') {
            const response = await MenuItem.find({ taste: tasteType })
            console.log('menu taste type fetched')
            res.status(200).json(response)
        }
        else {
            res.status(404).json({ error: 'Invalid Taste type' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: 'internal server error' })
    }
})

router.patch('/:menuid', async (req, res) => {
    try {
        const menuitemId = req.params.menuid;// The id we are sending as parameter in url
        const updatedMenuitem = req.body;// The data we are sending in body to update

        const response = await MenuItem.findByIdAndUpdate(menuitemId, updatedMenuitem, {
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
        const deletemenuId = req.params.id;// Extract the person's ID from the url Parameter

        const response = await MenuItem.findByIdAndDelete(deletemenuId)
        if (!response) {
            return res.status(404).json({ error: 'Invalid Id' })
        }

        console.log("Successfully Deleted the menu item")
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: 'internal server error' })
    }
})

module.exports = router;