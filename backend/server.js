import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import consultantBookingRoutes from './routes/consultantBookingRoutes.js';
import availabilityRoutes from './routes/availabilityRoutes.js';
import consultantRoutes from './routes/consultantRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import customerDetailsRoutes from './routes/customerDetailsRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

import createDefaultAdmin from './config/defaultAdmin.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Setup Socket.io
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('🟢 Socket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 Socket disconnected:', socket.id);
  });
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Test route
app.get('/', (req, res) => res.send('🚀 API is working...'));

// All API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/consultant-bookings', consultantBookingRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/consultants', consultantRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/customer-details', customerDetailsRoutes);
app.use('/api/reviews', reviewRoutes);

// Connect to MongoDB & Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ MongoDB connected');
  await createDefaultAdmin(); // Ensure admin is created on first run
  server.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});
