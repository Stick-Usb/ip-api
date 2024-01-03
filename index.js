// Import the required modules
const os = require('os');
const net = require('net');
const http = require('http');

// Define a function to get the public IP address
function getPublicIP() {
  // Get all the network interfaces
  let interfaces = os.networkInterfaces();
  // Loop through each interface
  for (let name in interfaces) {
    // Loop through each address of the interface
    for (let address of interfaces[name]) {
      // Check if the address is not internal and is IPv4
      if (!address.internal && net.isIPv4(address.address)) {
        // Return the address
        return address.address;
      }
    }
  }
  // Return null if no public IP address is found
  return null;
}

// Create a web server
const server = http.createServer((req, res) => {
  // Get the public IP address
  let ip = getPublicIP();
  // Check if the IP address is valid
  if (ip) {
    // Set the response headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Send the JSON object with the IP address
    res.end(JSON.stringify({ip: ip}));
  } else {
    // Send an error message
    res.statusCode = 500;
    res.end('Could not get the public IP address');
  }
});

// Listen on port 3000
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
