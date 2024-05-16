const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://infoprd1:nitish12345@cluster0.lcl5dmt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Export the Mongoose connection
module.exports = mongoose.connection;