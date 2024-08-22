const mongoose = require('mongoose');
const Cart = require('../models/CartModel');

const getCarts = async (req, res) => {
    const items = await Cart.find()

    res.status(200).json(items);
};

const getCart = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Cart not found'});
    }

    const response = await Cart.findById(id);

    if (!response) {
        return res.status(404).json({error: 'Cart not found'});
    }

    res.status(200).json(response);
};

const createCart = async (req, res) => {
    let params = {item: Object.create(req.body.item)};

    try {
        const cartCreated = await Cart.create({items: [item]});
        res.status(200).json(cartCreated);
    } catch (err) {
        console.log(err);
        res.status(400).json({error: err.message});
    }
};

const updateCart = async (req, res) => {
    const id = req.params.id;
    let {items} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Cart not found'});
    }

    let response = await Cart.findByIdAndUpdate(id,
        {items: items.filter(item => item !== null)},
        {new: true});

    if (!response) {
        return res.status(404).json({error: 'Cart not found'});
    }

    res.status(200).json(response);
};

const deleteCart = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Cart not found'});
    }

    const response = await Cart.findByIdAndDelete(id);

    if (!response) {
        return res.status(404).json({error: 'Cart not found'});
    }

    res.status(200).json(response);
};

module.exports = {
    getCarts,
    getCart,
    createCart,
    updateCart,
    deleteCart
};