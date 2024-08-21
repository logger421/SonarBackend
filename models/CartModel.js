const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    items: {
        type: Array,
        default: undefined
    }
}, {timestamps: true});

module.exports = mongoose.model('Cart', cartSchema);