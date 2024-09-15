require('dotenv').config();

const config = {
  mongodb: {
    url: process.env.MONGODB_URL,
  },
  migrationsDir: "src/migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
