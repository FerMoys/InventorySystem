require('dotenv').config();

const express = require('express');

const cors = require('cors');

const app = express();

/* =========================
   CORS
========================= */

app.use(cors({
  origin: 'http://inventory-frontend-fermoys.s3-website-us-east-1.amazonaws.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/* =========================
   MIDDLEWARES
========================= */

app.use(express.json());

/* =========================
   ROUTES
========================= */

const authRoutes = require('./routes/authRoutes');

const productRoutes = require('./routes/productRoutes');

const userRoutes = require('./routes/userRoutes');

app.use('/auth', authRoutes);

app.use('/products', productRoutes);

app.use('/users', userRoutes);

/* =========================
   TEST ROUTE
========================= */

app.get('/', (req, res) => {

  res.send('Inventory API Running');
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log('DB_HOST:', process.env.DB_HOST);

  console.log(`Server running on port ${PORT}`);
});