CryptoTracker Pro - Crypto Market Tracking Application
Overview
CryptoTracker Pro is a web application that provides real-time cryptocurrency market data, including prices, market caps, and historical trends. The application fetches data from the CoinRanking API and presents it in an intuitive interface with sorting, filtering, and detailed coin information.

<img width="1918" height="896" alt="crypto-2" src="https://github.com/user-attachments/assets/1c3ea359-693a-4424-9fc2-37f4735d3b48" />
<img width="1892" height="873" alt="crypto-1" src="https://github.com/user-attachments/assets/13130aa9-3c9e-4cea-9fc3-b419b057ac27" />



Features
Real-time cryptocurrency price tracking

Detailed coin information with historical price charts

Sorting and filtering capabilities

Light/dark theme toggle

Favorites system

Responsive design for all device sizes

Docker Deployment
Image Details
Docker Hub Repository: rurangajabes/cryptotracker

Image Tags: latest, v1

Build Instructions
To build the Docker image locally:

bash
docker build -t rurangajabes/cryptotracker:v1 .
Run Locally
To run the container locally for testing:

bash
docker run -p 8080:8080 -e API_KEY=your_api_key rurangajabes/cryptotracker:v1
Verify it's working:

bash
curl http://localhost:8080
Deployment on Lab Machines
SSH into web-01 and web-02:

bash
ssh ubuntu@localhost -p 2211  # web-01
ssh ubuntu@localhost -p 2212  # web-02
On each machine, pull and run the image:

bash
docker pull rurangajabes/cryptotracker:latest
docker run -d --name app --restart unless-stopped \
  -p 8080:8080 \
  -e API_KEY=your_api_key \
  rurangajabes/cryptotracker:v1
Verify each instance is reachable:

bash
curl http://web-01:8080
curl http://web-02:8080
Load Balancer Configuration
SSH into lb-01:

bash
ssh ubuntu@localhost -p 2210
Update /etc/haproxy/haproxy.cfg with:

config
backend webapps
  balance roundrobin
  server web01 172.20.0.11:8080 check
  server web02 172.20.0.12:8080 check
  http-response set-header X-Served-By %[srv_name]
Reload HAProxy:

bash
haproxy -sf $(pidof haproxy) -f /etc/haproxy/haproxy.cfg
Testing Load Balancing
From your host machine:

bash
curl -I http://localhost:8082
Make multiple requests and observe the X-Served-By header alternating between web01 and web02.

API Usage
This application uses the CoinRanking API through a proxy server to:

Fetch cryptocurrency listings

Get detailed coin information

Retrieve historical price data

Security Considerations
API keys are passed as environment variables to the container rather than being hardcoded in the application. For production use, consider using a secrets management solution.

Development
Prerequisites
Node.js 16+

npm/yarn

Installation
bash
npm install
Running Locally
bash
npm start
The application will be available at http://localhost:8080

Troubleshooting
If you encounter issues:

Verify the API key is correctly set as an environment variable

Check container logs with docker logs <container_id>

Ensure ports are correctly mapped and not in use by other services
