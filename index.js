const express = require('express');
const torRequest = require('tor-request');
const path = require('path');

// Optionally set up Tor control port settings
// torRequest.TorControlPort.password = 'your-tor-control-port-password-here'; // Optional

// Create an Express app
const app = express();

// Replace Twitter and X URLs (including subdomains) with your service URL
const replaceUrls = (body, req) => {
  const serviceBaseUrl = `${req.protocol}://${req.get('host')}/proxy`;

  // Regular expressions to match all subdomains of twitter.com and x.com
  const twitterRegex = /https?:\/\/([a-zA-Z0-9-]+\.)?twitter\.com/g;
  const xRegex = /https?:\/\/([a-zA-Z0-9-]+\.)?x\.com/g;

  // Replace all occurrences of Twitter and X URLs with your service URL
  return body.replace(twitterRegex, serviceBaseUrl)
             .replace(xRegex, serviceBaseUrl);
};

// Serve static files (e.g., HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Proxy Twitter and X via Tor and rewrite URLs in the response
app.use('/proxy', (req, res) => {
  const targetUrl = `https://twitter.com${req.url}`; // Adjust if needed for other URLs

  torRequest.request(targetUrl, (err, response, body) => {
    if (err) {
      res.status(500).send('Error fetching content through Tor.');
    } else {
      // Replace Twitter and X URLs with the proxy URLs
      const modifiedBody = replaceUrls(body, req);
      res.send(modifiedBody);
    }
  });
});

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
