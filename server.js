import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import expenseRoutes from './routes/expenseRoutes.js'

app.use('/api/auth', authRoutes);
app.use('/api/expenses',  expenseRoutes);
app.get('/api/protected', (req, res) => {
    res.json({message: `Hello user ${req.userId}, you are authorized!`});
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log('Server running...')))
  .catch((err) => console.log(err));
