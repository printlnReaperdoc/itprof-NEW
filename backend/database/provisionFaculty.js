require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

const provision = async () => {
  const args = process.argv.slice(2);
  const username = args[0] || 'faculty_admin';
  const password = args[1] || 'SecureFaculty2026!';
  const firstName = args[2] || 'Faculty';
  const surname = args[3] || 'Administrator';
  const role = args[4] || 'faculty';

  if (!['faculty', 'admin'].includes(role)) {
    console.error('Error: Role must be "faculty" or "admin"');
    process.exit(1);
  }

  await connectDB();

  try {
    const existing = await User.findOne({ username: username.toLowerCase().trim() });
    if (existing) {
      console.log(`User "${username}" already exists with role: ${existing.role}`);
      process.exit(0);
    }

    const passwordHash = await User.hashPassword(password);
    const newUser = await User.create({
      username: username.toLowerCase().trim(),
      passwordHash,
      firstName,
      surname,
      role,
      isActive: true
    });

    await AuditLog.create({
      actorUserId: newUser._id,
      action: 'FACULTY_PROVISIONED',
      entityType: 'User',
      entityId: newUser._id,
      details: { username: newUser.username, role: newUser.role }
    });

    console.log(`\nSUCCESS: Provisioned new ${role.toUpperCase()} account:`);
    console.log(`  Username: ${newUser.username}`);
    console.log(`  Name:     ${newUser.firstName} ${newUser.surname}`);
    console.log(`  Role:     ${newUser.role}\n`);
    process.exit(0);
  } catch (err) {
    console.error('Error provisioning user:', err);
    process.exit(1);
  }
};

provision();

