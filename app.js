const express = require('express');
const itemsRouter = require('./routes/items');
const cartRouter = require('./routes/Cart');
const paymentRouter = require('./routes/Payment');
const mongose = require('mongoose');
require('dotenv').config();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// ROUTES
app.use('/api/items', itemsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/payment', paymentRouter);

mongose.connect(process.env.DB_URI).then(() => {
    app.listen(process.env.PORT_NUMBER, () => {
        console.log(`Server is running on port ${process.env.PORT_NUMBER}`);
    });
}).catch((err) => {
    console.log(err);
});