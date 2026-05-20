require('dotenv').config();

const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://inventory-frontend-fermoys.s3-website-us-east-1.amazonaws.com'
}))

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/auth', authRoutes);

app.use('/products', productRoutes);

app.use('/users', userRoutes);

app.get('/', (req, res) => {

  res.send('Inventory API Running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);
});
