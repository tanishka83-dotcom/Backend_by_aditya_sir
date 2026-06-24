const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const startServer = async () => {
  await connectDB();

  const app = express();
  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);

  app.get('/', (req, res) => {
    res.send('Authentication API is running');
  });

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the other process or set a different PORT in your .env file.`);
    } else {
      console.error(`Server error: ${err.message}`);
    }
    process.exit(1);
  });
};

startServer();
