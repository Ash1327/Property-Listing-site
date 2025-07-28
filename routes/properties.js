const express = require('express');
const router = express.Router();

// In-memory database (in a real app, this would be a database)
let properties = [
  {
    id: '1',
    name: 'Modern Downtown Apartment',
    type: 'Apartment',
    price: 250000,
    location: 'Downtown, City Center',
    description: 'Beautiful modern apartment with stunning city views. Features include hardwood floors, stainless steel appliances, and a private balcony.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    createdAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Luxury Villa with Pool',
    type: 'Villa',
    price: 850000,
    location: 'Beverly Hills, CA',
    description: 'Stunning luxury villa featuring a private pool, gourmet kitchen, and panoramic views. Perfect for entertaining with multiple living areas.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=300&fit=crop',
    bedrooms: 4,
    bathrooms: 3,
    area: 3500,
    createdAt: '2024-01-20T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Cozy Family House',
    type: 'House',
    price: 450000,
    location: 'Suburban Neighborhood',
    description: 'Perfect family home with a large backyard, updated kitchen, and finished basement. Great schools nearby.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    createdAt: '2024-01-25T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Contemporary Condo',
    type: 'Condo',
    price: 320000,
    location: 'Urban District',
    description: 'Sleek contemporary condo with floor-to-ceiling windows, modern amenities, and 24/7 security.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop',
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    createdAt: '2024-01-30T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Elegant Townhouse',
    type: 'Townhouse',
    price: 380000,
    location: 'Historic District',
    description: 'Charming townhouse with original architectural details, updated interiors, and a private garden.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    createdAt: '2024-02-05T00:00:00.000Z'
  }
];

// Helper function to generate unique ID
const generateId = () => {
  return Date.now().toString();
};

// GET /api/properties - Get all properties
router.get('/properties', (req, res) => {
  try {
    const { type, search } = req.query;
    
    let filteredProperties = [...properties];
    
    // Filter by type if provided
    if (type && type !== 'All') {
      filteredProperties = filteredProperties.filter(property => 
        property.type.toLowerCase() === type.toLowerCase()
      );
    }
    
    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProperties = filteredProperties.filter(property =>
        property.name.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        property.description.toLowerCase().includes(searchLower)
      );
    }
    
    res.json(filteredProperties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// GET /api/properties/:id - Get a specific property
router.get('/properties/:id', (req, res) => {
  try {
    const property = properties.find(p => p.id === req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

// POST /api/properties - Create a new property
router.post('/properties', (req, res) => {
  try {
    const { name, type, price, location, description, image, bedrooms, bathrooms, area } = req.body;
    
    // Validation
    if (!name || !type || !price || !location || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newProperty = {
      id: generateId(),
      name,
      type,
      price: price, // Keep as string to allow any value
      location,
      description,
      image: image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      bathrooms: bathrooms ? Number(bathrooms) : undefined,
      area: area ? Number(area) : undefined,
      createdAt: new Date().toISOString()
    };
    
    properties.unshift(newProperty); // Add to beginning of array
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create property' });
  }
});

// PUT /api/properties/:id - Update a property
router.put('/properties/:id', (req, res) => {
  try {
    const propertyIndex = properties.findIndex(p => p.id === req.params.id);
    if (propertyIndex === -1) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    const { name, type, price, location, description, image, bedrooms, bathrooms, area } = req.body;
    
    // Validation
    if (!name || !type || !price || !location || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const updatedProperty = {
      ...properties[propertyIndex],
      name,
      type,
      price: price, // Keep as string to allow any value
      location,
      description,
      image: image || properties[propertyIndex].image,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      bathrooms: bathrooms ? Number(bathrooms) : undefined,
      area: area ? Number(area) : undefined
    };
    
    properties[propertyIndex] = updatedProperty;
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update property' });
  }
});

// DELETE /api/properties/:id - Delete a property
router.delete('/properties/:id', (req, res) => {
  try {
    const propertyIndex = properties.findIndex(p => p.id === req.params.id);
    if (propertyIndex === -1) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    const deletedProperty = properties[propertyIndex];
    properties.splice(propertyIndex, 1);
    res.json({ message: 'Property deleted successfully', property: deletedProperty });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

module.exports = router; 