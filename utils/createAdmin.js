// const bcrypt = require('bcryptjs');
// const User = require('../models/User'); // Adjust path based on your project

// const createAdmin = async () => {
//   try {
//     const existingAdmin = await User.findOne({ role: 'admin' });

//     if (!existingAdmin) {
//       const hashedPassword = await bcrypt.hash('admin123', 10); // Change password as needed
//       await User.create({
//         name: 'Admin',
//         email: 'admin@supporta.com',
//         password: hashedPassword,
//         role: 'admin',
//         userId: 'ADMIN01',
//       });
//       console.log('✅ Admin account created');
//     } else {
//       console.log('✅ Admin already exists');
//     }
//   } catch (err) {
//     console.error('❌ Error creating admin:', err.message);
//   }
// };

// module.exports = createAdmin;
