const mongoose = require('mongoose');
const Payment = require('../models/PaymentModel');
const Cart = require('../models/CartModel');

const getPayments = async (req, res) => {
    const payments = await Payment.find()

    res.status(200).json(payments);
};

const getPayment = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Payment not found'});
    }

    const response = await Payment.findById(id);

    if (!response) {
        return res.status(404).json({error: 'Payment not found'});
    }

    res.status(200).json(response);
};

const createPayment = async (req, res) => {
    const params = {
        firstName: req.body.firstName.toString(),
        lastName: req.body.lastName.toString(),
        items: Array.from(req.body.cart.items),
        price: Number(req.body.price)
    };
    let cart = req.body.cart;

    let emptyFields = []

    if (!firstName)
        emptyFields.push('firstName')
    if (!lastName)
        emptyFields.push('lastName')
    if (!cart.items)
        emptyFields.push('items')

    if (emptyFields.length > 0)
        return res.status(400).json({error: `All fields must be filled`, emptyFields});

    try {
        const created = await Payment.create(params);
        await Cart.findByIdAndUpdate({_id: cart._id}, {items: []});
        res.status(200).json(created);
    } catch (err) {
        console.log(err);
        res.status(400).json({error: err.message});
    }
};

const updatePayment = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Payment not found'});
    }

    const response = await Payment.findByIdAndUpdate(id, req.body, {new: true});

    if (!response) {
        return res.status(404).json({error: 'Payment not found'});
    }

    res.status(200).json(response);
};

const deletePayment = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Payment not found'});
    }

    const response = await Payment.findByIdAndDelete(id);

    if (!response) {
        return res.status(404).json({error: 'Payment not found'});
    }

    res.status(200).json(response);
};

module.exports = {
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment
};