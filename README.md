# CryptoTracker Pro - Crypto Market Tracking Application

![App Screenshot 1](https://github.com/user-attachments/assets/1c3ea359-693a-4424-9fc2-37f4735d3b48)
![App Screenshot 2](https://github.com/user-attachments/assets/13130aa9-3c9e-4cea-9fc3-b419b057ac27)

## Live Demo
[Watch Demo Video on YouTube](https://youtu.be/uTbP4lnBDpk) | [Try Live Version](https://crypto-tracker-sable-iota.vercel.app)

## Features
* Real-time cryptocurrency price tracking
* Historical price charts (30-day view)
* Sorting by market cap, price, and 24h change
* Light/Dark theme toggle
* Favorites system (local storage)
* Responsive design for all devices

## Setup Instructions (Local Development)

### 1. Get Your API Key
1. Visit [CoinRanking API on RapidAPI](https://rapidapi.com/Coinranking/api/coinranking1/)
2. Click "Subscribe" to get your free API key
3. Copy your key from the RapidAPI dashboard

### 2. Install and Run
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/cryptotracker-pro.git
cd cryptotracker-pro

# 2. Install dependencies
npm install

# 3. Create .env file
echo "API_KEY=your_rapidapi_key_here" > .env

# 4. Start the development server
npm start
3. Access the Application
Open your browser and visit:
http://localhost:8080

Important Notes
You must run the Node.js server - simply opening index.html won't work

The server is required to:

Load environment variables securely

Proxy API requests

Enable all application features

Troubleshooting
If you see "Failed to fetch" errors:

Verify your API key in .env matches your RapidAPI key

Ensure the server is running (npm start)

Check for errors in the terminal where you ran npm start

Make sure you're accessing http://localhost:8080 not just the HTML file

Security Reminder
Never commit your .env file to GitHub

Your API key will only be used locally

For production use, consider proper secret management

Screenshots
https://github.com/user-attachments/assets/1c3ea359-693a-4424-9fc2-37f4735d3b48
https://github.com/user-attachments/assets/13130aa9-3c9e-4cea-9fc3-b419b057ac27