const prisma = require('../../prisma/client'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async ({ name, email, password, role, fssaiCertificate }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      fssaiCert: role === 'RESTAURANT' ? fssaiCertificate : null
    }
  });

  return {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
    message: 'Registration successful',
  };
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  return { token, user: { id: user.id, name: user.name, role: user.role } };
};

module.exports = { registerUser, loginUser };