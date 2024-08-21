const mongoose = require('mongoose');
const Item = require('../models/itemModel');

const getItems = async (req, res) => {
    const items = await Item.find()

    res.status(200).json(items);
};

const getItem = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Item not found'});
    }

    const response = await Item.findById(id);

    if (!response) {
        return res.status(404).json({error: 'Item not found'});
    }

    res.status(200).json(response);
};

const createItem = async (req, res) => {
    const {name, description, price} = req.body;
    let emptyFields = []

    if (!name)
        emptyFields.push('name')
    if (!description)
        emptyFields.push('description')
    if (!price)
        emptyFields.push('price')

    if (emptyFields.length > 0)
        return res.status(400).json({error: `All fields must be filled`, emptyFields});

    try {
        const ItemCreated = await Item.create({name, description, price});
        res.status(200).json(ItemCreated);
    } catch (err) {
        console.log(err);
        res.status(400).json({error: err.message});
    }
};

const updateItem = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Item not found'});
    }

    const response = await Item.findByIdAndUpdate(id, req.body, {new: true});

    if (!response) {
        return res.status(404).json({error: 'Item not found'});
    }

    res.status(200).json(response);
};

const deleteItem = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Item not found'});
    }

    const response = await Item.findByIdAndDelete(id);

    if (!response) {
        return res.status(404).json({error: 'Item not found'});
    }

    res.status(200).json(response);
};

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
};