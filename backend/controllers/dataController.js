const Data = require('../models/data');
const nodemailer = require('nodemailer');

const saveData = (req, res) => {
    console.log(req.body);
    const newData = new Data({
        name: req.body.name,
        phone: req.body.phoneNumber,
        email: req.body.email,
        hobbies: req.body.hobbies,
      });
    
    // Save the new user to the database
        newData.save()
        .then(createdPost => {
            console.log('Data saved successfully:', createdPost);
            res.status(201).json({ message: 'Record created successfully'});
        })
        .catch(err => {
            console.error('Error :', err);
            res.status(500).json({ error: 'Error', message: err.message });
        });
};

const getData = async (req, res) => {

    try {
      const data = await Data.find().sort({ createdAt: -1 }); // Find all users (no conditions specified)
      
      if (!data || data.length === 0) {
          return res.status(404).json({ error: 'No record found' });
      }
  
      // If users are found, send them as a JSON response
      res.status(200).json(data);
  } catch (err) {
      console.error('Error fetching posts:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const updateData = async (req, res) => {
    try {
      const _id = req.params.id;
      const newData = req.body; 
  
      if (!_id) {
        return res.status(400).json({ error: 'Please provide an _id for the data to update.' });
      }
  
      const updatedData = await Data.findByIdAndUpdate(_id, newData, { new: true });

      if (!updatedData) {
        return res.status(404).json({ error: 'Data with the provided _id was not found.' });
      }

      res.status(200).json(updatedData);
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'An error occurred while updating the data.' });
    }
  };

const deleteData = async (req, res) => {
    try {
      const _id  = req.params.id;

      if (!_id) {
        return res.status(400).json({ error: 'Please provide an _id for the data to delete.' });
      }
  
      const deletedData = await Data.findByIdAndDelete(_id);

      if (!deletedData) {
        return res.status(404).json({ error: 'Data with the provided _id was not found.' });
      }

      res.status(200).json({ message: 'Record deleted successfully.' });
    } catch (error) {

      console.error('Error deleting record:', error);
      res.status(500).json({ error: 'An error occurred while deleting the record.' });
    }
  };

  const sendEmail = async (req, res) => {
    const { subject, text } = req.body;
  
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: '19ucs096@lnmiit.ac.in', // Your email address
          pass: 'chetaksq' // Your email password or app password if using Gmail
        }
      });
  
      const mailOptions = {
        from: '19ucs096@lnmiit.ac.in',
        to: 'info@redpositive.in',
        subject,
        text
      };
  
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  };
  

module.exports = {saveData, getData, updateData, deleteData, sendEmail};