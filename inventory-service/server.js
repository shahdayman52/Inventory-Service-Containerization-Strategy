// Minimal Inventory Tracking Service: a Node.js HTTP server on port 3000.
const http = require('http');

const PORT = process.env.PORT || 3000;

const inventory = [
  { sku: 'GLP-001', name: 'Pallet Jack', quantity: 12 },
  { sku: 'GLP-002', name: 'Shipping Container Seal', quantity: 450 },
  { sku: 'GLP-003', name: 'RFID Tag', quantity: 2000 },
];

const server = http.createServer((req, res) => {
  const send = (status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  };

  if (req.method === 'GET' && req.url === '/health') return send(200, { status: 'ok' });
  if (req.method === 'GET' && req.url === '/inventory') return send(200, inventory);
  if (req.method === 'GET' && req.url === '/') return send(200, { service: 'inventory-service', version: 'v1' });
  return send(404, { error: 'Not found' });
});

server.listen(PORT, () => console.log(`Inventory service listening on port ${PORT}`));

// Shut down cleanly on docker stop (SIGTERM).
process.on('SIGTERM', () => server.close(() => process.exit(0)));
