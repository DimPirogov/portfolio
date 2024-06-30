require('dotenv').config();

export const environment = {
  production: false,
  RAPIDAPI_KEY: process.env['RAPIDAPI_KEY'],
  rapidHostUrl: 'imdb8.p.rapidapi.com',
  serverUrl: 'http://localhost:8000',
  testBaseUrl: 'http://localhost:3000',
};
