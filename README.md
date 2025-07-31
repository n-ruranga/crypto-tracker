# CryptoTracker Pro - Crypto Market Tracking Application

CryptoTracker Pro is a responsive web application that delivers **real-time cryptocurrency market data**, including prices, market capitalization, and historical trends. It leverages the **CoinRanking API** and presents information through an intuitive and interactive interface.

## Screenshots

![crypto-2](https://github.com/user-attachments/assets/1c3ea359-693a-4424-9fc2-37f4735d3b48)
![crypto-1](https://github.com/user-attachments/assets/13130aa9-3c9e-4cea-9fc3-b419b057ac27)

## Demo Video

[Watch on YouTube](https://youtu.be/uTbP4lnBDpk)

---

## Features

* Real-time cryptocurrency price tracking
* Historical price charts for each coin
* Sorting and filtering capabilities
* Light/Dark theme toggle
* Favorites system
* Fully responsive for all device sizes

---

## Docker Deployment

### Image Details

* **Docker Hub Repository**: [`rurangajabes/cryptotracker`](https://hub.docker.com/r/rurangajabes/cryptotracker)
* **Tags**: `latest`, `v1`

### Build Instructions (Local)

```bash
docker build -t rurangajabes/cryptotracker:v1 .
```

### Run Locally

```bash
docker run -p 8080:8080 -e API_KEY=your_api_key rurangajabes/cryptotracker:v1
```

To verify:

```bash
curl http://localhost:8080
```

---

## Deployment on Lab Machines

### 1. SSH into the Machines

```bash
# Web Server 1
ssh ubuntu@localhost -p 2211

# Web Server 2
ssh ubuntu@localhost -p 2212
```

### 2. Pull & Run the Docker Image

```bash
docker pull rurangajabes/cryptotracker:latest

docker run -d --name app --restart unless-stopped \
  -p 8080:8080 \
  -e API_KEY=your_api_key \
  rurangajabes/cryptotracker:v1
```

### 3. Verify Each Instance

```bash
curl http://web-01:8080
curl http://web-02:8080
```

---

## Load Balancer Setup

### 1. SSH into Load Balancer

```bash
ssh ubuntu@localhost -p 2210
```

### 2. Edit `/etc/haproxy/haproxy.cfg`

```cfg
backend webapps
  balance roundrobin
  server web01 172.20.0.11:8080 check
  server web02 172.20.0.12:8080 check
  http-response set-header X-Served-By %[srv_name]
```

### 3. Reload HAProxy

```bash
haproxy -sf $(pidof haproxy) -f /etc/haproxy/haproxy.cfg
```

### 4. Test Load Balancing

```bash
curl -I http://localhost:8082
```

Make multiple requests and observe the `X-Served-By` header alternating between `web01` and `web02`.

---

## API Usage

CryptoTracker Pro uses the **CoinRanking API** (through a proxy server) to:

* Fetch cryptocurrency listings
* Retrieve individual coin information
* Fetch historical price data

**Note:** The API key is injected via environment variables.

---

## Security Considerations

* API keys are not hardcoded; they are passed as environment variables.
* For production deployments, consider using a secrets management solution like **Vault**, **AWS Secrets Manager**, or **Docker secrets**.

---

## Development Setup

### Prerequisites

* **Node.js v16+**
* **npm** or **yarn**

### Installation

```bash
npm install
```

### Run Locally

```bash
npm start
```

Visit: [http://localhost:8080](http://localhost:8080)

---

## Troubleshooting

* Ensure your API key is set correctly with `-e API_KEY=...`

* View logs with:

  ```bash
  docker logs <container_id>
  ```

* Check that port `8080` is not already in use.

---

## License

This project is for educational and demonstration purposes.
