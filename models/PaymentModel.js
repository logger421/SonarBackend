const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Payment', paymentSchema);