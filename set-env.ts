const { writeFile } = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

// Set environment variables
const targetPath = join(__dirname, 'src/environments/environment.ts');

const envConfigFile = `export const environment = {
  dev: '${process.env['IS_DEV']}',
  SPOTIFY_CLIENT_ID: '${process.env['SPOTIFY_CLIENT_ID']}',
  SPOTIFY_CLIENT_SECRET: '${process.env['SPOTIFY_CLIENT_SECRET']}',
};`;

writeFile(targetPath, envConfigFile, (err: any) => {
  if (err) {
    console.error(err);
  }
});
