if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  console.log('Running in development mode - loading .env');
}

const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API proxy endpoints
const createApiRoute = async (url, req, res) => {
  try {
    if (!process.env.API_KEY) {
      throw new Error('API_KEY is not configured');
    }

    const response = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ 
      error: error.message,
      env: process.env.NODE_ENV,
      apiKeyConfigured: !!process.env.API_KEY
    });
  }
};

// Coins endpoint
app.get('/api/coins', async (req, res) => {
  const { limit = 50, offset = 0, referenceCurrencyUuid } = req.query;
  const url = new URL('https://coinranking1.p.rapidapi.com/coins');
  url.searchParams.set('limit', limit);
  url.searchParams.set('offset', offset);
  if (referenceCurrencyUuid) {
    url.searchParams.set('referenceCurrencyUuid', referenceCurrencyUuid);
  }
  await createApiRoute(url, req, res);
});

// Single coin endpoint
app.get('/api/coin/:uuid', async (req, res) => {
  const url = `https://coinranking1.p.rapidapi.com/coin/${req.params.uuid}`;
  await createApiRoute(url, req, res);
});

// Coin history endpoint
app.get('/api/coin/:uuid/history', async (req, res) => {
  const { timePeriod = '30d' } = req.query;
  const url = `https://coinranking1.p.rapidapi.com/coin/${req.params.uuid}/history?timePeriod=${timePeriod}`;
  await createApiRoute(url, req, res);
});

// Client routes
const clientRoutes = ['/', '/home', '/about', '/coin', '/dashboard'];
clientRoutes.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    apiKeyConfigured: !!process.env.API_KEY
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server or export for Vercel
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
    console.log(`API Key configured: ${!!process.env.API_KEY}`);
  });
}
module.exports = app;

// Start server only locally (not on Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}