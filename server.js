require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const app = express();
const port = process.env.PORT || 8080;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API proxy endpoints
app.get('/api/coins', async (req, res) => {
  try {
    const { limit = 50, offset = 0, referenceCurrencyUuid } = req.query;
    const url = new URL('https://coinranking1.p.rapidapi.com/coins');
    url.searchParams.set('limit', limit);
    url.searchParams.set('offset', offset);
    if (referenceCurrencyUuid) {
      url.searchParams.set('referenceCurrencyUuid', referenceCurrencyUuid);
    }

    const response = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/coin/:uuid', async (req, res) => {
  try {
    const response = await fetch(`https://coinranking1.p.rapidapi.com/coin/${req.params.uuid}`, {
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/coin/:uuid/history', async (req, res) => {
  try {
    const { timePeriod = '30d' } = req.query;
    const response = await fetch(`https://coinranking1.p.rapidapi.com/coin/${req.params.uuid}/history?timePeriod=${timePeriod}`, {
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

const clientRoutes = ['/', '/home', '/about', '/coin', '/dashboard']; // whatever you have

clientRoutes.forEach((route) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
});


// Handle all other routes by serving index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});