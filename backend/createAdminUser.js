// ✅ createAdminUser.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Mongoose connection
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// User Schema (same as your server)
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// ✅ Create Admin User Function
const createAdminUser = async () => {
  const username = 'admin';
  const plainPassword = 'Admin@123';
  const role = 'admin';

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      console.log('⚠️ Admin user already exists.');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role
    });

    console.log('✅ Admin user created successfully:');
    console.log(`👉 Username: ${username}`);
    console.log(`👉 Password: ${plainPassword}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin user:', err);
    process.exit(1);
  }
};

createAdminUser();
