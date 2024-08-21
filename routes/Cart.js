const express = require('express');
const {
    getCarts,
    getCart,
    createCart,
    updateCart,
    deleteCart
} = require('../controllers/cartController');

const router = express.Router();

router.get('/', getCarts);

router.get('/:id', getCart);

router.post('/', createCart);

router.patch('/:id', updateCart);

router.delete('/:id', deleteCart);

module.exports = router;