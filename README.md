# Property Listing API

A RESTful API server for managing property listings built with Express.js.

## Features

- **RESTful API** - Full CRUD operations for properties
- **Filtering & Search** - Query properties by type and search terms
- **Data Validation** - Input validation and error handling
- **CORS Support** - Cross-origin resource sharing enabled
- **Health Check** - API status monitoring endpoint

## API Endpoints

### Properties

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/properties` | Get all properties (with optional filtering) |
| `GET` | `/api/properties/:id` | Get a specific property by ID |
| `POST` | `/api/properties` | Create a new property |
| `PUT` | `/api/properties/:id` | Update an existing property |
| `DELETE` | `/api/properties/:id` | Delete a property |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Check API status |

## Query Parameters

### GET /api/properties

- `type` (optional): Filter by property type (House, Apartment, Condo, Townhouse, Villa)
- `search` (optional): Search in name, location, and description

**Example:**
```
GET /api/properties?type=House&search=downtown
```

## Request/Response Examples

### Create Property (POST /api/properties)

**Request Body:**
```json
{
  "name": "Modern Downtown Apartment",
  "type": "Apartment",
  "price": 250000,
  "location": "Downtown, City Center",
  "description": "Beautiful modern apartment with stunning city views.",
  "image": "https://example.com/image.jpg",
  "bedrooms": 2,
  "bathrooms": 2,
  "area": 1200
}
```

**Response:**
```json
{
  "id": "1234567890",
  "name": "Modern Downtown Apartment",
  "type": "Apartment",
  "price": 250000,
  "location": "Downtown, City Center",
  "description": "Beautiful modern apartment with stunning city views.",
  "image": "https://example.com/image.jpg",
  "bedrooms": 2,
  "bathrooms": 2,
  "area": 1200,
  "createdAt": "2024-01-15T00:00:00.000Z"
}
```

## Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

3. **Access the API:**
   - Server runs on `http://localhost:5001`
   - API base URL: `http://localhost:5001/api`

## Environment Variables

Create a `.env` file in the api directory:

```env
PORT=5001
NODE_ENV=development
```

## Development

### Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with nodemon

### Project Structure

```
api/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
└── README.md         # This file
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

Error responses include a message:

```json
{
  "error": "Missing required fields"
}
```

## Data Storage

Currently uses in-memory storage. In a production environment, this would be replaced with:

- **Database**: PostgreSQL, MongoDB, MySQL
- **File System**: JSON files, CSV
- **Cloud Storage**: AWS S3, Google Cloud Storage

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (React development server)
- `http://localhost:3001` (Alternative React port)

## Testing

You can test the API using tools like:

- **Postman** - API testing tool
- **curl** - Command line HTTP client
- **Browser** - For GET requests

### Example curl commands:

```bash
# Get all properties
curl http://localhost:5001/api/properties

# Get properties filtered by type
curl "http://localhost:5001/api/properties?type=House"

# Create a new property
curl -X POST http://localhost:5001/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Property",
    "type": "House",
    "price": 300000,
    "location": "Test Location",
    "description": "Test description"
  }'
``` 