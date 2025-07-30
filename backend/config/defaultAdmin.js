import User from '../models/User.js';

const createDefaultAdmin = async () => {
  const existingAdmin = await User.findOne({ email: 'admin@consultbook.com' });
  if (existingAdmin) {
    console.log('ℹ️ Admin already exists');
    return;
  }

  // ❌ Do NOT hash manually
  const admin = new User({
    name: 'Admin',
    email: 'admin@consultbook.com',
    password: 'Admin@123', // plain password — will be hashed by pre-save hook
    role: 'admin',
    isApproved: true,
  });

  await admin.save();
  console.log('✅ Default admin user created');
};

export default createDefaultAdmin;
