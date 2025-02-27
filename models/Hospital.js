const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be longer than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add address']
    },
    district: {
        type: String,
        required: [true, 'Please add district']
    },
    province: {
        type: String,
        required: [true, 'Please add province']
    },
    postalcode: {
        type: String,
        required: [true, 'Please add postalcode'],
        maxlength: [5, 'Postal code cannot be longer than 5 digits']
    },
    tel: {
        type: String,
    },
    region: {
        type: String,
        required: [true, 'Please add region']
    },
});

module.exports = mongoose.model('Hospital', HospitalSchema);