const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/api/movies', async (req, res) => {
  try {
    const response = await axios.get('https://imdb8.p.rapidapi.com/auto-complete', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
      },
      params: { q: req.query.q },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/onlymovies', async (req, res) => {
  try {
    const response = await axios.get('https://imdb8.p.rapidapi.com/v2/search', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
      },
      params: { searchTerm: req.query.q, type: 'MOVIE' },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/health', async (req, res) => {
  res.json({ status: 'Up and Running' });
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
