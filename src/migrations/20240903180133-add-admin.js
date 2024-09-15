const bcrypt = require('bcryptjs');

module.exports = {
  async up(db, client) {
    await db.collection('users').insertOne({
      email: 'admin@gmail.com',
      password: await bcrypt.hash('Test@1234', 8),
      role: 'ADMIN',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
  },

  async down(db, client) {
    await db.collection('users').deleteMany({ email: 'admin@gmail.com' });
  }
};
