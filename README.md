# Tor Twitter Proxy

This project is a Node.js application that proxies Twitter and X (formerly Twitter) through the Tor network. The application displays a top frame with advertisements and loads Twitter/X content in the remaining part of the screen. The proxy uses the Tor network to anonymize requests, ensuring privacy for the users. Additionally, all subdomains of `twitter.com` and `x.com` are rewritten to ensure the content remains proxied through your service.

## Features

- **Tor Network Integration:** All requests to Twitter and X are routed through the Tor network for enhanced privacy.
- **Advertisement Frame:** A top frame displays advertisements, which can be customized.
- **URL Rewriting:** All subdomains of `twitter.com` and `x.com` are rewritten to use your service's URL.
- **Dockerized:** The application can be easily deployed using Docker and Docker Compose.

## Prerequisites

- **Node.js 20+**
- **npm (Node Package Manager)**
- **Docker (for containerized deployment)**
- **Docker Compose (for orchestrating multi-container Docker applications)**
- **Tor:** Ensure that Tor is installed and running on your machine if running locally without Docker.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/luismr/tor-twitter-proxy.git
cd tor-twitter-proxy
```

### 2. Install Dependencies (if running locally)

Install the required Node.js dependencies:

```bash
npm install
```

### 3. Run the Application Locally

You can start the application with:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

### 4. Running with Docker Compose

To build and run the application using Docker Compose:

1. **Create the `docker-compose.yml` file:**

   Ensure you have the following `docker-compose.yml` file in the root of your project:

   ```yaml
   version: '3.8'

   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - TOR_PROXY=tor:9050
       depends_on:
         - tor
       networks:
         - tor-network

     tor:
       image: dperson/torproxy
       environment:
         - ALLOW_NON_ANONYMOUS=1
         - SOCKS_PORT=9050
       ports:
         - "9050:9050"
       networks:
         - tor-network

   networks:
     tor-network:
       driver: bridge
   ```

2. **Build and Start the Services:**

   Navigate to your project directory and run:

   ```bash
   docker-compose up --build
   ```

   This command will build the images (if not already built) and start the containers.

3. **Access the Application:**

   Once the containers are running, you can access your application at `http://localhost:3000`.

4. **Stopping the Services:**

   To stop the services, press `CTRL+C` in the terminal where Docker Compose is running, or use:

   ```bash
   docker-compose down
   ```

   This will stop and remove the containers.

## Project Structure

```
tor-twitter-proxy/
├── node_modules/         # Installed dependencies (ignored by Git)
├── public/
│   └── index.html        # Frontend code (advertisement frame and iframe for Twitter content)
├── index.js              # Main Node.js server file
├── package.json          # npm project configuration
├── Dockerfile            # Docker configuration file for the app
├── docker-compose.yml    # Docker Compose file to run the app with Tor
├── .gitignore            # Git ignore file
└── README.md             # Project documentation
```

## Customization

### Advertisement Frame

The advertisement displayed in the top frame can be customized by editing the `public/index.html` file.

### Tor Configuration

The application uses the `tor-request` library to route requests through the Tor network. You can configure Tor by modifying the `index.js` file if needed.

### URL Rewriting

The application rewrites all URLs pointing to subdomains of `twitter.com` and `x.com` to use your service's URL, ensuring that all content remains within the proxied environment.

## Contributing

Feel free to submit issues, fork the repository, and make pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Tor Project:** This project relies on the Tor network for anonymizing requests.
- **Node.js:** Built using the Node.js platform.

