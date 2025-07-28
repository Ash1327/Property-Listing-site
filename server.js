const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const propertiesRoutes = require('./routes/properties');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', propertiesRoutes);
app.use('/api', healthRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Property API server running on port ${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   GET    /api/properties`);
  console.log(`   GET    /api/properties/:id`);
  console.log(`   POST   /api/properties`);
  console.log(`   PUT    /api/properties/:id`);
  console.log(`   DELETE /api/properties/:id`);
}); 