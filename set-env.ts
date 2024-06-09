const { writeFile, existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

// Create folder if it does not exist
const folderPath = 'src/environments';
if (!existsSync(folderPath)) {
  mkdirSync(folderPath, { recursive: true });
}

// Create file path
const targetPath = join(__dirname, `${folderPath}/environment.ts`);

// Set environment variables
const envConfigFile = `export const environment = {
  dev: '${process.env['IS_DEV']}',
  SPOTIFY_CLIENT_ID: '${process.env['SPOTIFY_CLIENT_ID']}',
  SPOTIFY_CLIENT_SECRET: '${process.env['SPOTIFY_CLIENT_SECRET']}',
  REDIRECT_URI: '${process.env['REDIRECT_URI']}',
};`;

writeFile(targetPath, envConfigFile, (err: any) => {
  if (err) {
    console.error(err);
  }
});
