// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import Service from '../models/Service.js';
// import User from '../models/User.js';

// dotenv.config();

// const MONGO_URL = process.env.MONGO_URI;

// const connect = async () => {
//   try {
//     await mongoose.connect(MONGO_URL);
//     console.log('✅ MongoDB connected');
//   } catch (err) {
//     console.error('❌ DB connection failed:', err);
//     process.exit(1);
//   }
// };

// const seedServices = async () => {
//   try {
//     await connect();

//     // ❗️Make sure a consultant exists (you can also manually find by role)
//     const consultant = await User.findOne({ role: 'consultant' });
//     if (!consultant) throw new Error('No consultant found in DB');

//     const services = [
//       {
//         title: 'Personal Fitness Training',
//         description: '1-on-1 fitness sessions with certified trainer.',
//         experience: 3,
//         durationInMinutes: 60,
//         price: 500,
//         category: 'Fitness',
//         consultant: consultant._id,
//       },
//       {
//         title: 'Astrology Consultation',
//         description: 'Detailed horoscope reading and remedies.',
//         experience: 10,
//         durationInMinutes: 45,
//         price: 700,
//         category: 'Astrology',
//         consultant: consultant._id,
//       },
//     ];

//     // await Service.deleteMany(); // optional: clean existing services
//     const created = await Service.insertMany(services);

//     console.log(`✅ Seeded ${created.length} services`);
//     process.exit();
//   } catch (err) {
//     console.error('❌ Error seeding services:', err.message);
//     process.exit(1);
//   }
// };

// seedServices();
