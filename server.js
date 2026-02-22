const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public folder
app.use(express.static('public'));

// API route: GET /api/status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'maintenance',
    message: 'We are cooking something powerful. Come back on March 1st.'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
