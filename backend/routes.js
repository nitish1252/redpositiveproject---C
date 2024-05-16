const express = require('express');
const router = express.Router();

// Import controller functions

const {saveData, getData, updateData, deleteData, sendEmail} = require('./controllers/dataController')


router.get('/getdata', getData);
router.post('/savedata', saveData);
router.put('/updatedata/:id', updateData);
router.delete('/deletedata/:id', deleteData);
router.post('/sendmail', sendEmail);

// Export the router
module.exports = router;
